import React, { useEffect, useState } from 'react';
import rnPurchases, { PurchasesPackage } from 'react-native-purchases';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import * as RNIap from 'react-native-iap';
import { useApolloClient } from 'react-apollo';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { useValidateInAppPurchaseMutation } from '../../../API/mutation/validateInAppPurchase/validateInAppPurchase';
import { PLATFORM } from '../../../../__generated__/globalTypes';
import { useGetSelfQuery } from '../../../API/query/getSelf/getSelf';
import { useGetProductConfigQuery, GET_PRODUCT_CONFIG_QUERY } from '../../../API/query/getProductConfig/getProductConfig';
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

    try {
      /**
       * Get product config from api
       * This will return the products that should be displayed
       */
      const { data } = await client.query<getProductConfig>({
        query: GET_PRODUCT_CONFIG_QUERY,
      });
      console.log('getAvailableProducts -> data', data);


      /**
       * Get products from services
       */
      const products = await RNIap.getProducts(data.getProductConfig.map((pc) => pc.productId));


      /**
       * Set products in state, merging their credit from data.getProductConfig
       */
      setAvailableProducts(products.map((p) => ({
        ...p,
        credit: data.getProductConfig.find((pc) => pc.productId === p.productId).credit,
      })));
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };


  /**
   * On mount get available packages
   */
  useEffect(() => {
    getAvailableProducts();
  }, []);


  const purchaseProduct = async (sku) => {
    try {
      await RNIap.requestPurchase(sku, false);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };


  if (loading || error) {
    return (
      <LoadRetry
        loading={loading}
        refetch={getAvailableProducts as any}
      />
    );
  }


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
