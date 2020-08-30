import React, { FC } from 'react';
import { View } from 'react-native';
import WalletCard from '../UI/Cards/WalletCard/WalletCard';
import H2 from '../UI/Typography/components/H2';
import CreditTransactions from '../CreditTransaction/CreditTransactions/CreditTransactions';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import Styles from './Wallet.styles';
import Header from '../UI/Headers/Header/Header';

export interface WalletProps {}

const Wallet: FC<WalletProps> = () => (
  <View style={GlobalStyles.PageFill}>
    <Header />

    <View style={[GlobalStyles.PageFill, Styles.wrap]}>
      <WalletCard />

      <View style={GlobalStyles.PageFill}>
        <H2 style={Styles.heading}>Purchase History</H2>
        <CreditTransactions />
      </View>
    </View>
  </View>
);

export default Wallet;
