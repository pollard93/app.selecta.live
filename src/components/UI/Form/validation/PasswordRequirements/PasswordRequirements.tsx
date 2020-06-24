import React, { FC } from 'react';
import { View } from 'react-native';
import Small from '../../../Typography/components/Small';
import Styles from './PasswordRequirements.style';

const PasswordRequirements: FC = () => (
  <View style={Styles.wrap}>
    <Small style={Styles.passwordRequirements}>Password requirements:</Small>
    <Small style={[Styles.passwordRequirements, Styles.passwordRequirementsContent]}>
      Your password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.
    </Small>
  </View>
);

export default PasswordRequirements;
