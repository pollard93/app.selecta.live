import React, { useEffect, useState, FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as RNIap from 'react-native-iap';
import { useApolloClient } from 'react-apollo';
import { FlatList } from 'react-native-gesture-handler';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { useGetSelf } from '../../../API/query/getSelf/getSelf';
import { GET_PRODUCT_CONFIG_QUERY } from '../../../API/query/getProductConfig/getProductConfig';
import { getProductConfig } from '../../../API/query/getProductConfig/__generated__/getProductConfig';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import H2 from '../../UI/Typography/components/H2';
import H3 from '../../UI/Typography/components/H3';
import Body from '../../UI/Typography/components/Body';
import Styles from './Purchases.style';
import Gradient from '../../UI/Gradient/Gradient';
import Icon, { ICON } from '../../UI/Icon/Icon';

interface Product extends RNIap.Product {
  credit: number;
}

export interface PurchasesProps {
  onDismiss: () => void;
}

const Purchases: FC<PurchasesProps> = (props) => {
  const client = useApolloClient();
  const self = useGetSelf();
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


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
      /**
       * TODO - investigate error codes and update handling
       */
      console.warn(err.code, err.message);
    }
  };


  return (
    <View style={[GlobalStyles.PageFill, Styles.wrap]}>
      <TouchableOpacity
        onPress={props.onDismiss}
        style={Styles.dismiss}
      >
        <Icon name={ICON.CROSS} size="small" />
      </TouchableOpacity>

      <H2>Top Up</H2>
      <H3>Your Balance: {self.credit}</H3>
      <Body bold>Select the amount of credit's you'd like to buy</Body>

      {
        loading || error
          ? (
            <LoadRetry
              loading={loading}
              refetch={getAvailableProducts as any}
            />
          )
          : (
            <View style={[GlobalStyles.PageFill, Styles.list]}>
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
            </View>
          )
      }
    </View>
  );
};

export default Purchases;
