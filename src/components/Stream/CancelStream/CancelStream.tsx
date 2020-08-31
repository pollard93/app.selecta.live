import React, { FC } from 'react';
import { Navigation } from 'react-native-navigation';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import Toast from '../../UI/Toast/Toast';
import Button from '../../UI/Button/Button';
import { openModalScreen } from '../../../screens/utils';
import CancelStreamForm from './components/CancelStreamForm/CancelStreamForm';
import { pushToast } from '../../../modules/Toast';

interface CancelStreamProps {
  data: STREAM_SELF_FRAGMENT;
}

const CancelStream: FC<CancelStreamProps> = (props) => {
  /**
   * openModalScreen CancelStreamForm
   */
  const open = () => {
    openModalScreen({
      component: (
        <CancelStreamForm
          {...props}
          onDismiss={(success) => {
            Navigation.dismissModal('CANCEL_STREAM_MODAL');

            if (success) {
              pushToast({
                duration: 1000,
                component: (
                  <Toast
                    type="SUCCESS"
                    content="Stream cancelled"
                  />
                ),
                dismissible: false,
              });
            }
          }}
        />
      ),
    }, 'CANCEL_STREAM_MODAL');
  };


  return (
    <Button
      title="Cancel stream"
      type="SECONDARY"
      onPress={open}
    />
  );
};

export default CancelStream;
