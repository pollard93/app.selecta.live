import React from 'react';
import * as RNIap from 'react-native-iap';
import { Platform, EmitterSubscription } from 'react-native';
import { ApolloError } from 'apollo-client';
import { VALIDATE_IN_APP_PURCHASE_MUTATION } from '../../API/mutation/validateInAppPurchase/validateInAppPurchase';
import { validateInAppPurchaseVariables, validateInAppPurchase } from '../../API/mutation/validateInAppPurchase/__generated__/validateInAppPurchase';
import AClient from '../../ApolloClient';
import Toast from '../../components/UI/Toast/Toast';

declare global {
  namespace NodeJS {
    interface Global {
      purchaseUpdateSubscription: EmitterSubscription;
      purchaseErrorSubscription: EmitterSubscription;
    }
  }
}

class InAppPurchases {
  /**
   * Set subscribers
   */
  public static init() {
    global.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(InAppPurchases.purchaseUpdated) as EmitterSubscription;
    global.purchaseErrorSubscription = RNIap.purchaseErrorListener(InAppPurchases.purchaseError) as EmitterSubscription;
  }


  /**
   * Disconnect subscribers
   */
  public static disconnect() {
    if (global.purchaseUpdateSubscription) {
      global.purchaseUpdateSubscription.remove();
    }

    if (global.purchaseErrorSubscription) {
      global.purchaseErrorSubscription.remove();
    }
  }


  /**
   * Disconnects and Reconnects subscribers
   * This forces android to reprocess any pending transactions
   * Each transaction will be run through InAppPurchases.purchaseUpdated
   */
  private static reConnect() {
    InAppPurchases.disconnect();
    InAppPurchases.init();
  }


  /**
   * Received when a purchase has been updated
   * This can be anytime after a purchase
   */
  private static async purchaseUpdated(purchase: RNIap.InAppPurchase) {
    try {
      /**
       * Send receipt to server for validation
       * If successful apollo will mutate user.credit in cache
       * If it does not fail the transaction has been processed and should be 'finished'
       */
      await AClient.mutate<validateInAppPurchase, validateInAppPurchaseVariables>({
        mutation: VALIDATE_IN_APP_PURCHASE_MUTATION,
        variables: {
          receipt: Platform.OS === 'ios'
            ? purchase.transactionReceipt
            : JSON.parse(purchase.dataAndroid),
        },
      });

      // Tell the store that you have delivered what has been paid for.
      // Failure to do this will result in the purchase being refunded on Android and
      // the purchase event will reappear on every relaunch of the app until you succeed
      // in doing the below. It will also be impossible for the user to purchase consumables
      // again untill you do this.
      RNIap.finishTransaction(purchase, true);
    } catch (e) {
      if (e instanceof ApolloError) {
        for (const error of e.graphQLErrors) {
          if (error.message === 'Purchase Cancelled') {
            /**
             * If purchase is cancelled, we must finish the transaction otherwise the product can not be purchased again
             */
            RNIap.finishTransaction(purchase, true);
          }
        }
      }
    }
  }


  /**
   * Process error
   * TODO - test ios errors
   */
  private static async purchaseError(error: RNIap.PurchaseError) {
    switch (error.code) {
      case RNIap.IAPErrorCode.E_ALREADY_OWNED:
        /**
         * As all products are consumable, this error will only occur when there is a pending transaction
         * Alert the user there is a pending transaction
         * Try and reprocess the transactions
         */
        if (global.toast) {
          global.toast.push({
            duration: 1000,
            component: (
              <Toast content="There is a pending transaction for this item" />
            ),
            dismissible: false,
          });
        }

        InAppPurchases.reConnect();
        break;

      case RNIap.IAPErrorCode.E_USER_CANCELLED:
        // Do nothing
        break;

      default:
        if (global.toast) {
          global.toast.push({
            duration: 1000,
            component: (
              <Toast content={error.message || 'Something went wrong with your payment'} />
            ),
            dismissible: false,
          });
        }
        break;
    }
  }
}

export default InAppPurchases;
