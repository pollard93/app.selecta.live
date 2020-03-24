import { expect } from 'chai';
import mockClient from '../../../../API/utils/mockClient';
import { PUT_ACCESS_TOKEN_MUTATION } from './putAccessTokenMutation';
import { putAccessToken, putAccessTokenVariables } from './__generated__/putAccessToken';
import { store } from '../../../../utils/storage';
import { LOCAL_AUTH_KEY } from './putAccessToken';
import { getAccessToken } from '../../query/getAccessToken/__generated__/getAccessToken';
import { GET_ACCESS_TOKEN_QUERY } from '../../query/getAccessToken/getAccessTokenQuery';

const client = mockClient();

describe('putAccessToken tests', () => {
  it('it should succeed', async () => {
    /**
     * Make request
     */
    const { data } = await client.mutate<putAccessToken, putAccessTokenVariables>({
      mutation: PUT_ACCESS_TOKEN_MUTATION,
      variables: {
        token: 'test',
      },
    });

    // Test response
    expect(data.putAccessToken).to.be.true;

    // Test the token has been written to cache
    const test = client.readQuery<getAccessToken>({
      query: GET_ACCESS_TOKEN_QUERY,
    });
    expect(test.getAccessToken).to.equal('test');

    // Test the token has been stored in async storage
    expect(await store(LOCAL_AUTH_KEY)).to.equal('test');
  });
});
