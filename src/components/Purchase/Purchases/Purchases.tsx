import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as RNIap from 'react-native-iap';
import { useApolloClient } from 'react-apollo';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { useGetSelfQuery } from '../../../API/query/getSelf/getSelf';
import { GET_PRODUCT_CONFIG_QUERY } from '../../../API/query/getProductConfig/getProductConfig';
import { getProductConfig } from '../../../API/query/getProductConfig/__generated__/getProductConfig';

interface Product extends RNIap.Product {
  credit: number;
}

const Purchases = () => {
  const client = useApolloClient();
  const { data: { getSelf } } = useGetSelfQuery();
  const [availableProducts, setAvailableProducts] = useState<Product[]>();
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
   * Loading or error
   * If error, allow refetch of products
   */
  if (loading || error) {
    return (
      <LoadRetry
        loading={loading}
        refetch={getAvailableProducts as any}
      />
    );
  }


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
    <View>
      <Text>Current credit: {getSelf.credit}</Text>
      {availableProducts.map((a) => (
        <TouchableOpacity
          key={a.productId}
          onPress={() => {
            purchaseProduct(a.productId);
          }}
          style={{ padding: 10 }}
        >
          <Text>Title: {a.title}</Text>
          <Text>Price: {a.price}</Text>
          <Text>Credit: {a.credit}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Purchases;
