import { expect, assert } from 'chai';
import mockClient from '../../../../API/utils/mockClient';
import { REMOVE_CHANNEL_ACCESS_TOKEN_MUTATION } from './removeChannelAccessTokenMutation';
import { removeChannelAccessToken } from './__generated__/removeChannelAccessToken';
import { putChannelAccessToken, putChannelAccessTokenVariables } from '../putChannelAccessToken/__generated__/putChannelAccessToken';
import { PUT_CHANNEL_ACCESS_TOKEN_MUTATION } from '../putChannelAccessToken/putChannelAccessTokenMutation';
import { getChannelAccessToken } from '../../query/getChannelAccessToken/__generated__/getChannelAccessToken';
import { GET_CHANNEL_ACCESS_TOKEN_QUERY } from '../../query/getChannelAccessToken/getChannelAccessTokenQuery';
import { store } from '../../../../utils/storage';
import { LOCAL_CHANNEL_AUTH_KEY } from '../putChannelAccessToken/putChannelAccessToken';

const client = mockClient();

describe('removeChannelAccessToken tests', () => {
  it('it should succeed', async () => {
    /**
     * Store token
     */
    await client.mutate<putChannelAccessToken, putChannelAccessTokenVariables>({
      mutation: PUT_CHANNEL_ACCESS_TOKEN_MUTATION,
      variables: {
        token: 'test',
      },
    });

    /**
     * Make request
     */
    const { data } = await client.mutate<removeChannelAccessToken>({
      mutation: REMOVE_CHANNEL_ACCESS_TOKEN_MUTATION,
    });

    // Test response
    expect(data.removeChannelAccessToken).to.be.true;

    // Test the token has been written to cache
    try {
      await client.readQuery<getChannelAccessToken>({
        query: GET_CHANNEL_ACCESS_TOKEN_QUERY,
      });
      expect.fail();
    } catch (e) {
      assert.isOk(true);
    }

    // Test the token has been stored in async storage
    expect(await store(LOCAL_CHANNEL_AUTH_KEY)).to.equal(null);
  });
});
