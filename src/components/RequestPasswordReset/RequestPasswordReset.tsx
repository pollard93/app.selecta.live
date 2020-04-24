import React, { useState } from 'react';
import { useRequestPasswordResetMutation } from '../../API/mutation/requestPasswordReset/requestPasswordReset';
import RequestPasswordResetView from './RequestPasswordResetView';
import { requestPasswordResetVariables } from '../../API/mutation/requestPasswordReset/__generated__/requestPasswordReset';

const RequestPasswordReset = () => {
  const [complete, setComplete] = useState(false);


  /**
   * Request password reset mutation
   */
  const [requestPasswordResetMutation, { loading }] = useRequestPasswordResetMutation({
    onCompleted: () => {
      setComplete(true);
    },
    onError: () => {
      setComplete(true);
    },
  });


  /**
   * Form submission
   */
  const onSubmit = (variables: requestPasswordResetVariables) => {
    requestPasswordResetMutation({
      variables: {
        ...variables,
      },
    });
  };


  return (
    <RequestPasswordResetView
      complete={complete}
      loading={loading}
      onSubmit={onSubmit}
    />
  );
};

export default RequestPasswordReset;
