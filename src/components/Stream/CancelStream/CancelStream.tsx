import React, { FC } from 'react';
import { OptionsModalTransitionStyle } from 'react-native-navigation';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import Button from '../../UI/Button/Button';
import { openModalScreen } from '../../../screens/utils';
import CancelStreamForm from './components/CancelStreamForm/CancelStreamForm';

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
        <CancelStreamForm {...props} />
      ),
    }, 'CANCEL_STREAM_MODAL', OptionsModalTransitionStyle.crossDissolve);
  };


  return (
    <Button
      title="Cancel"
      type="SECONDARY"
      onPress={open}
    />
  );
};

export default CancelStream;
