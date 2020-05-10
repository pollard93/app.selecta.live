import { expect, assert } from 'chai';
import Sinon from 'sinon';
import mockClient from '../../../../API/utils/mockClient';
import { REMOVE_ACCESS_TOKEN_MUTATION } from './removeAccessTokenMutation';
import { removeAccessToken } from './__generated__/removeAccessToken';
import { store } from '../../../../utils/storage';
import { LOCAL_AUTH_KEY } from '../putAccessToken/putAccessToken';
import { putAccessToken, putAccessTokenVariables } from '../putAccessToken/__generated__/putAccessToken';
import { PUT_ACCESS_TOKEN_MUTATION } from '../putAccessToken/putAccessTokenMutation';
import { getAccessToken } from '../../query/getAccessToken/__generated__/getAccessToken';
import { GET_ACCESS_TOKEN_QUERY } from '../../query/getAccessToken/getAccessTokenQuery';
import PushNotifications from '../../../../modules/PushNotifications';
import InAppPurchases from '../../../../modules/InAppPurchases';

const client = mockClient();

describe('removeAccessToken tests', () => {
  it('it should succeed', async () => {
    /**
     * Store token
     */
    await client.mutate<putAccessToken, putAccessTokenVariables>({
      mutation: PUT_ACCESS_TOKEN_MUTATION,
      variables: {
        token: 'test',
      },
    });

    // Create spy on Pushnotificatons.disconnect()
    const pushNotificationDisconnectSpy = Sinon.stub(PushNotifications, 'disconnect');
    const inAppPurchasesDisconnectSpy = Sinon.stub(InAppPurchases, 'disconnect');

    /**
     * Make request
     */
    const { data } = await client.mutate<removeAccessToken>({
      mutation: REMOVE_ACCESS_TOKEN_MUTATION,
    });

    // Test response
    expect(data.removeAccessToken).to.be.true;

    // Test the token has been written to cache
    try {
      await client.readQuery<getAccessToken>({
        query: GET_ACCESS_TOKEN_QUERY,
      });
      expect.fail();
    } catch (e) {
      assert.isOk(true);
    }

    // Test the token has been stored in async storage
    expect(await store(LOCAL_AUTH_KEY)).to.equal(null);

    // Test spy called
    expect(pushNotificationDisconnectSpy.called).to.be.true;
    expect(inAppPurchasesDisconnectSpy.called).to.be.true;
  });
});
