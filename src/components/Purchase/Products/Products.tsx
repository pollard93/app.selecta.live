import React, { useEffect, useState, FC, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as RNIap from 'react-native-iap';
import { useApolloClient } from 'react-apollo';
import { Navigation } from 'react-native-navigation';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { GET_PRODUCT_CONFIG_QUERY } from '../../../API/query/getProductConfig/getProductConfig';
import { getProductConfig } from '../../../API/query/getProductConfig/__generated__/getProductConfig';
import H2 from '../../UI/Typography/components/H2';
import Styles from './Products.style';
import Gradient from '../../UI/Gradient/Gradient';
import Toast from '../../UI/Toast/Toast';
import { pushToast } from '../../../modules/Toast';
import DrawerV2 from '../../UI/DrawerV2/DrawerV2';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';

interface Product extends RNIap.Product {
  credit: number;
}

export interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  const screenProps = useScreenProps();
  const client = useApolloClient();
  const safeAreaInsets = useSafeArea();
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const onCloseRef = useRef<() => void>();


  const onDismiss = () => {
    Navigation.dismissModal(screenProps.componentId);
  };


  /**
   * Gets product config from api
   * Gets products from apple|google
   * Sets products in state
   */
  const getAvailableProducts = async () => {
    setLoading(true);

    try {
      /**
       * Get product config from api
       * This will return the products that should be displayed
       */
      const { data } = await client.query<getProductConfig>({
        query: GET_PRODUCT_CONFIG_QUERY,
      });


      /**
       * Get products from services
       */
      const products = await RNIap.getProducts(data.getProductConfig.map((pc) => pc.productId));
      if (!products || !products.length) {
        throw new Error();
      }


      /**
       * Set only the available products in state
       * (the products that are returned from getProductConfig and that are available in getProducts)
       */
      setAvailableProducts(data.getProductConfig.reduce((a, c) => {
        const product = products.find((p) => p.productId === c.productId);
        if (product) {
          return a.concat({
            ...product,
            credit: c.credit,
          });
        }
        return a;
      }, []));

      setLoading(false);
    } catch (err) {
      /**
       * Close modal on error and toast
       */
      onDismiss();

      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content='Something went wrong'
          />
        ),
        dismissible: false,
      });
    }
  };


  /**
   * On mount get available packages
   */
  useEffect(() => {
    getAvailableProducts();
  }, []);


  /**
   * Requests a purchase from native
   * Close modal
   */
  const purchaseProduct = async (productId: string) => {
    try {
      await RNIap.requestPurchase(productId, false);
      // eslint-disable-next-line no-unused-expressions
      onCloseRef.current?.();
    } catch (err) {
      if (err.code !== RNIap.IAPErrorCode.E_USER_CANCELLED) {
        pushToast({
          duration: 1000,
          component: (
            <Toast
              type="ERROR"
              content={err.message}
            />
          ),
          dismissible: false,
        });
      }
    }
  };


  /**
   * Loading
   */
  if (loading) return null;


  return (
    <DrawerV2 onClosed={onDismiss}>
      {({ onClose }) => {
        onCloseRef.current = onClose;

        return (
          <View style={[Styles.wrap, { paddingBottom: safeAreaInsets.bottom }]}>
            {availableProducts.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  purchaseProduct(item.productId);
                }}
              >
                <Gradient style={Styles.item}>
                  <H2 forceLight>{item.credit} Credits</H2>
                  <H2 forceLight>{item.localizedPrice}</H2>
                </Gradient>
              </TouchableOpacity>
            ))}
          </View>
        );
      }}
    </DrawerV2>
  );
};

export default Products;
