import { expect } from 'chai';
import mockClient from '../../../../API/utils/mockClient';
import { PUT_CHANNEL_ACCESS_TOKEN_MUTATION } from './putChannelAccessTokenMutation';
import { putChannelAccessToken, putChannelAccessTokenVariables } from './__generated__/putChannelAccessToken';
import { getChannelAccessToken } from '../../query/getChannelAccessToken/__generated__/getChannelAccessToken';
import { GET_CHANNEL_ACCESS_TOKEN_QUERY } from '../../query/getChannelAccessToken/getChannelAccessTokenQuery';
import { store } from '../../../../utils/storage';
import { LOCAL_CHANNEL_AUTH_KEY } from './putChannelAccessToken';

const client = mockClient();

describe('putChannelAccessToken tests', () => {
  it('it should succeed', async () => {
    /**
     * Make request
     */
    const { data } = await client.mutate<putChannelAccessToken, putChannelAccessTokenVariables>({
      mutation: PUT_CHANNEL_ACCESS_TOKEN_MUTATION,
      variables: {
        token: 'test',
      },
    });

    // Test response
    expect(data.putChannelAccessToken).to.be.true;

    // Test the token has been written to cache
    const test = client.readQuery<getChannelAccessToken>({
      query: GET_CHANNEL_ACCESS_TOKEN_QUERY,
    });
    expect(test.getChannelAccessToken).to.equal('test');

    // Test the token has been stored in async storage
    expect(await store(LOCAL_CHANNEL_AUTH_KEY)).to.equal('test');
  });
});
