import * as RNIap from 'react-native-iap';
import { Platform, EmitterSubscription } from 'react-native';
import { VALIDATE_IN_APP_PURCHASE_MUTATION } from '../../API/mutation/validateInAppPurchase/validateInAppPurchase';
import { validateInAppPurchaseVariables, validateInAppPurchase } from '../../API/mutation/validateInAppPurchase/__generated__/validateInAppPurchase';
import AClient from '../../ApolloClient';

declare global {
  namespace NodeJS {
    interface Global {
      purchaseUpdateSubscription: EmitterSubscription;
      purchaseErrorSubscription: EmitterSubscription;
    }
  }
}

class InAppPurchases {
  public static init() {
    global.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(InAppPurchases.purchaseUpdated);
    global.purchaseErrorSubscription = RNIap.purchaseErrorListener(InAppPurchases.purchaseError);
  }

  public static disconnect() {
    if (global.purchaseUpdateSubscription) {
      global.purchaseUpdateSubscription.remove();
    }

    if (global.purchaseErrorSubscription) {
      global.purchaseErrorSubscription.remove();
    }
  }


  /**
   * Received when a purchase has been updated
   * This can be anytime after a purchase
   */
  private static async purchaseUpdated(purchase) {
    /**
     * Get receipt from transaction
     */
    const receipt = purchase.transactionReceipt;
    if (!receipt) return;

    try {
      /**
       * Send receipt to server for validation
       * If successful apollo will mutate user.credit in cache
       */
      await AClient.mutate<validateInAppPurchase, validateInAppPurchaseVariables>({
        mutation: VALIDATE_IN_APP_PURCHASE_MUTATION,
        variables: {
          receipt,
        },
      });

      // Tell the store that you have delivered what has been paid for.
      // Failure to do this will result in the purchase being refunded on Android and
      // the purchase event will reappear on every relaunch of the app until you succeed
      // in doing the below. It will also be impossible for the user to purchase consumables
      // again untill you do this.
      if (Platform.OS === 'ios') {
        RNIap.finishTransactionIOS(purchase.transactionId);
      } else if (Platform.OS === 'android') {
        // If consumable (can be purchased again)
        RNIap.consumePurchaseAndroid(purchase.purchaseToken);
      }
    } catch (e) {
      console.log('Purchases -> e', e);
    }
  }

  private static async purchaseError(error) {
    console.warn('purchaseError', error);
  }
}

export default InAppPurchases;
