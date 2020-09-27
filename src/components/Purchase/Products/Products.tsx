import React, { useEffect, useState, FC } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import * as RNIap from 'react-native-iap';
import { useApolloClient } from 'react-apollo';
import { FlatList } from 'react-native-gesture-handler';
import { useDynamicValue } from 'react-native-dynamic';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { useGetSelf } from '../../../API/query/getSelf/getSelf';
import { GET_PRODUCT_CONFIG_QUERY } from '../../../API/query/getProductConfig/getProductConfig';
import { getProductConfig } from '../../../API/query/getProductConfig/__generated__/getProductConfig';
import GlobalStyles, { GlobalDynamicStyles } from '../../../styles/stylesheets/GlobalStyles';
import H2 from '../../UI/Typography/components/H2';
import H3 from '../../UI/Typography/components/H3';
import Body from '../../UI/Typography/components/Body';
import Styles from './Products.style';
import Gradient from '../../UI/Gradient/Gradient';
import Icon, { ICON } from '../../UI/Icon/Icon';
import Toast from '../../UI/Toast/Toast';
import FadeInView from '../../UI/FadeInView/FadeInView';
import { pushToast } from '../../../modules/Toast';

interface Product extends RNIap.Product {
  credit: number;
}

export interface ProductsProps {
  onDismiss: () => void;
}

const Products: FC<ProductsProps> = (props) => {
  const client = useApolloClient();
  const self = useGetSelf();
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);


  /**
   * Gets product config from api
   * Gets products from apple|google
   * Sets products in state
   */
  const getAvailableProducts = async () => {
    setLoading(true);
    setError(false);

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
      setLoading(false);
      setError(true);
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
   */
  const purchaseProduct = async (productId: string) => {
    try {
      await RNIap.requestPurchase(productId, false);
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


  return (
    <SafeAreaView style={[globalDynamicStyles.background, GlobalStyles.PageFill]}>
      <View style={[GlobalStyles.PageFill, Styles.wrap]}>
        <TouchableOpacity
          onPress={props.onDismiss}
          style={Styles.dismiss}
        >
          <Icon name={ICON.CROSS} size="small" />
        </TouchableOpacity>

        <H2>Top Up</H2>
        <H3>Your Balance: {self.credit}</H3>
        <Body bold>Select the amount of credit's you'd like to purchase</Body>

        {
          loading || error
            ? (
              <LoadRetry
                loading={!error && loading}
                refetch={getAvailableProducts as any}
              />
            )
            : (
              <FadeInView style={[GlobalStyles.PageFill, Styles.list]}>
                <FlatList
                  bounces={false}
                  data={availableProducts}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={Styles.separator} />}
                  renderItem={({ item }) => (
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
                  )}
                  keyExtractor={(item) => item.productId}
                />
              </FadeInView>
            )
        }
      </View>
    </SafeAreaView>
  );
};

export default Products;
