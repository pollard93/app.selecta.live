import React, { FC } from 'react';
import { Navigation } from 'react-native-navigation';
import { useToast } from 'mbp-components-rn-toast';
import { useRequestPasswordResetMutation } from '../../API/mutation/requestPasswordReset/requestPasswordReset';
import RequestPasswordResetView from './RequestPasswordResetView';
import { ScreenProps } from '../../screens/utils/interfaces';
import Toast from '../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../utils/functions';
import { FormData } from '../Register/RegisterView';

export interface RequestPasswordResetProps extends ScreenProps {
  onCompletion: () => void;
  defaultEmailValue?: string;
}

const RequestPasswordReset: FC<RequestPasswordResetProps> = (props) => {
  const toast = useToast();


  /**
   * Request password reset mutation
   */
  const [requestPasswordResetMutation, { loading }] = useRequestPasswordResetMutation({
    onCompleted: () => {
      /**
       * Pop this screen and execute props.onCompletion
       */
      Navigation.pop(props.componentId).finally(props.onCompletion);
    },
    onError: (e) => {
      toast.push({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * Form submission
   */
  const onSubmit = (variables: FormData) => {
    requestPasswordResetMutation({
      variables,
    });
  };


  /**
   * Pop this screen
   */
  const onPop = () => {
    Navigation.pop(props.componentId);
  };


  return (
    <RequestPasswordResetView
      defaultEmailValue={props.defaultEmailValue}
      loading={loading}
      onSubmit={onSubmit}
      onPop={onPop}
    />
  );
};

export default RequestPasswordReset;
