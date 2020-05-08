import React, { useEffect, useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { useRequestChannelLoginMutation } from '../../../API/mutation/requestChannelLogin/requestChannelLogin';
import { useLoginChannelMutation } from '../../../API/mutation/loginChannel/loginChannel';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { useGetChannelSelfLazyQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import { putChannelAccessToken, putChannelAccessTokenVariables } from '../../../ApolloClient/resolvers/mutation/putChannelAccessToken/__generated__/putChannelAccessToken';
import { PUT_CHANNEL_ACCESS_TOKEN_MUTATION } from '../../../ApolloClient/resolvers/mutation/putChannelAccessToken/putChannelAccessTokenMutation';
import { goToChannelStack } from '../../../screens/utils';

export interface ChannelLoginProps {
  id: string;
}

const ChannelLogin = (props: ChannelLoginProps) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [countDown, setCountDown] = useState(30);
  const toast = useToast();


  /**
   * Get channel self query, binds notifications and navigates home on completion
   */
  const [getChannelSelfQuery] = useGetChannelSelfLazyQuery({
    onCompleted: () => {
      // User is logged in as a channel, go to channel stack
      goToChannelStack();
    },
    onError: (e) => {
      setLoading(false);

      toast.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
    fetchPolicy: 'network-only',
  });


  /**
   * Request channel login mutation
   */
  const [loginChannelMutation, { client }] = useLoginChannelMutation({
    variables: {
      id: props.id,
      code,
    },
    onCompleted: async ({ loginChannel: { token } }) => {
      // Store token
      await client.mutate<putChannelAccessToken, putChannelAccessTokenVariables>({
        mutation: PUT_CHANNEL_ACCESS_TOKEN_MUTATION,
        variables: {
          token,
        },
      });

      // Execute getChannelSelf to cache it
      getChannelSelfQuery();
    },
    onError: (e) => {
      setLoading(false);

      toast.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * Request channel login mutation
   */
  const [requestChannelLoginMutation] = useRequestChannelLoginMutation({
    variables: {
      id: props.id,
    },
    onCompleted: () => {
      setLoading(false);
    },
    onError: (e) => {
      setLoading(false);

      toast.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * On mount request channel login
   */
  useEffect(() => {
    requestChannelLoginMutation();
  }, []);


  /**
   * On mount and when countDown changes
   * Set a timeout to decrement countDown every second until it is 0
   */
  useEffect(() => {
    if (countDown === 0) return undefined;

    const id = setTimeout(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [countDown]);


  /**
   * On resend code set countdown to 30 and request channel login
   */
  const onResendCode = () => {
    setLoading(true);
    requestChannelLoginMutation();
    setCountDown(30);
  };


  /**
   * On login channel, if the code is valid then execute loginChannelMutation
   */
  const onLoginChannel = () => {
    if (code && code.length === 6) {
      setLoading(true);
      loginChannelMutation();
    }
  };


  return (
    <View>
      <TextInput
        onChangeText={setCode}
        placeholder="Code"
        returnKeyType="done"
        keyboardType='numeric'
        defaultValue={code}
        onSubmitEditing={onLoginChannel}
      />

      <Button
        title="Submit"
        onPress={onLoginChannel}
        disabled={loading || !code || code.length !== 6}
        testID="LoginButton"
      />

      <Button
        title={countDown > 0 ? `Resend code in ${countDown} seconds` : 'Resend code'}
        onPress={onResendCode}
        disabled={loading || countDown > 0}
        testID="ResendButton"
      />
    </View>
  );
};

export default ChannelLogin;
