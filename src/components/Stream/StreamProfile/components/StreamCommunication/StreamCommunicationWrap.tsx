import React, { FC } from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';
import Drawer, { DrawerProps } from '../../../../UI/Drawer/Drawer';
import StreamCommunication, { StreamCommunicationProps } from './StreamCommunication';
import { useHeaderStyles } from '../../../../UI/Headers/Header/Header';
import FadeInView from '../../../../UI/FadeInView/FadeInView';
import Styles from './StreamCommunication.styles';

interface StreamCommunicationWrapProps {
  drawerProps: DrawerProps;
  communicationProps: StreamCommunicationProps;
}

const StreamCommunicationWrap: FC<StreamCommunicationWrapProps> = (props) => {
  const { headerZindex } = useHeaderStyles();


  /**
   * Android
   * Some reason adding KeyboardAvoidingView to android breaks the drawers touch
   */
  if (Platform.OS === 'android') {
    return (
      <Drawer {...props.drawerProps}>
        <StreamCommunication {...props.communicationProps} />
      </Drawer>
    );
  }


  /**
   * Ios
   */
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[Styles.wrap, { zIndex: headerZindex + 1 }]}
      pointerEvents="box-none"
    >
      <FadeInView style={Styles.wrap}>
        <Drawer {...props.drawerProps}>
          <StreamCommunication {...props.communicationProps} />
        </Drawer>
      </FadeInView>
    </KeyboardAvoidingView>
  );
};

export default StreamCommunicationWrap;
