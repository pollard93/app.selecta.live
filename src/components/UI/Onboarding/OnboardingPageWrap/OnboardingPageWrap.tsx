import React, { FC } from 'react';
import { View } from 'react-native';
import Styles from './OnboardingPageWrap.style';
import GlobalStyles from '../../../../styles/stylesheets/GlobalStyles';
import Gradient from '../../Gradient/Gradient';

interface OnboardingPageWrapProps {}

const OnboardingPageWrap: FC<OnboardingPageWrapProps> = (props) => (
  <View style={[GlobalStyles.PageFill, Styles.wrap]}>
    <Gradient style={Styles.gradient} />
    {props.children}
  </View>
);

export default OnboardingPageWrap;
