/* eslint-disable max-len */
import React, { FC } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import WalletCard from '../UI/Cards/WalletCard/WalletCard';
import H2 from '../UI/Typography/components/H2';
import CreditTransactions from '../CreditTransaction/CreditTransactions/CreditTransactions';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import Styles from './Wallet.styles';
import Icon, { ICON } from '../UI/Icon/Icon';

export interface WalletProps {
  onDismiss: () => void;
}

const Wallet: FC<WalletProps> = (props) => (
  <View style={[GlobalStyles.PageFill, Styles.wrap]}>
    <TouchableOpacity
      onPress={props.onDismiss}
      style={Styles.dismiss}
    >
      <Icon name={ICON.CROSS} size="small" />
    </TouchableOpacity>

    <WalletCard />

    <View style={GlobalStyles.PageFill}>
      <H2 style={Styles.heading}>Purchase History</H2>
      <CreditTransactions />
    </View>
  </View>
);

export default Wallet;
