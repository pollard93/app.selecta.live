import React, { FC } from 'react';
import { View } from 'react-native';
import Button from '../../UI/Button/Button';
import Styles from './UpdateUsername.style';
import DrawerV2 from '../../UI/DrawerV2/DrawerV2';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import spacing from '../../../styles/definitions/spacing';
import UsernameInput from '../../UI/Form/components/UsernameInput/UsernameInput';

export interface UpdateUsernameProps {
  onClosed: () => void;
}

const UpdateUsername: FC<UpdateUsernameProps> = (props) => {
  const safeAreaInsets = useSafeArea();

  return (
    <DrawerV2 onClosed={props.onClosed}>
      {({ onClose }) => (
        <View style={[Styles.wrap, { paddingBottom: safeAreaInsets.bottom + spacing.small }]}>
          <UsernameInput onCompleted={onClose}>
            {(args) => (
              <View style={Styles.input}>
                <Button
                  title={args.mutationLoading ? 'Updating' : 'Update Username'}
                  onPress={args.onSubmit}
                  disabled={args.queryLoading || args.disabled}
                />
              </View>
            )}
          </UsernameInput>
        </View>
      )}
    </DrawerV2>
  );
};

export default UpdateUsername;
