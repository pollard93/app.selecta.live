import React from 'react';
import { ScreenProps } from '../utils/interfaces';
import Purchases from '../../components/Purchase/Purchases/Purchases';

export interface PurchasesScreenProps extends ScreenProps {}

const PurchasesScreen = () => (
  <Purchases />
);

export default PurchasesScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
PurchasesScreen.prototype.ScreenName = 'PurchasesScreen';

/**
 * Export as const so can be imported without the default
 */
export const PurchasesScreenName = PurchasesScreen.prototype.ScreenName;
