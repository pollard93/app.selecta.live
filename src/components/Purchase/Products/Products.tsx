import React, { useEffect, useState, FC, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as RNIap from 'react-native-iap';
import { useApolloClient } from 'react-apollo';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { GET_PRODUCT_CONFIG_QUERY } from '../../../API/query/getProductConfig/getProductConfig';
import { getProductConfig } from '../../../API/query/getProductConfig/__generated__/getProductConfig';
import H2 from '../../UI/Typography/components/H2';
import Styles from './Products.style';
import Gradient from '../../UI/Gradient/Gradient';
import Toast from '../../UI/Toast/Toast';
import { pushToast } from '../../../modules/Toast';
import DrawerV2 from '../../UI/DrawerV2/DrawerV2';
import { closeTopUpModal } from '../../../screens/utils';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';

interface Product extends RNIap.Product {
  credit: number;
}

export interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  const client = useApolloClient();
  const safeAreaInsets = useSafeArea();
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const onCloseRef = useRef<() => void>();


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
        fetchPolicy: 'network-only',
      });


      /**
       * Get products from services
       */
      const products = await RNIap.getProducts(data.getProductConfig.map((pc) => pc.productId));
      if (!products || !products.length) {
        throw new Error();
      }


      /**
       * Set products in state, merging their credit from data.getProductConfig
       */
      setAvailableProducts(products.map((p) => ({
        ...p,
        credit: data.getProductConfig.find((pc) => pc.productId === p.productId).credit,
      })));
      setLoading(false);
    } catch (err) {
      /**
       * Close modal on error and toast
       */
      closeTopUpModal();
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
  if (loading) {
    return (
      <LoadRetry
        loading={loading}
        refetch={getAvailableProducts as any}
      />
    );
  }


  return (
    <DrawerV2 onClosed={closeTopUpModal}>
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
