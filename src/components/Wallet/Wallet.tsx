/* eslint-disable max-len */
import React, { FC } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import WalletCard from '../UI/Cards/WalletCard/WalletCard';
import H2 from '../UI/Typography/components/H2';
import CreditTransactions from '../CreditTransaction/CreditTransactions/CreditTransactions';
import GlobalStyles, { GlobalDynamicStyles } from '../../styles/stylesheets/GlobalStyles';
import Styles from './Wallet.styles';
import Header, { useHeaderStyles } from '../UI/Headers/Header/Header';
import spacing from '../../styles/definitions/spacing';

export interface WalletProps {}

const Wallet: FC<WalletProps> = () => {
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);
  const { headerHeight } = useHeaderStyles();

  return (
    <View style={GlobalStyles.PageFill}>
      <Header />

      <SafeAreaView style={[globalDynamicStyles.background, GlobalStyles.PageFill]}>
        <View style={[GlobalStyles.PageFill, Styles.wrap, { paddingTop: headerHeight + spacing.small }]}>
          <WalletCard />

          <View style={GlobalStyles.PageFill}>
            <H2 style={Styles.heading}>Purchase History</H2>
            <CreditTransactions />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Wallet;
