import React, { FC } from 'react';
import { View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import H2 from '../../Typography/components/H2';
import Styles from './OnboardingPageWrap.style';
import GlobalStyles from '../../../../styles/stylesheets/GlobalStyles';

interface OnboardingPageWrapProps {
  heading: string;
}

const OnboardingPageWrap: FC<OnboardingPageWrapProps> = (props) => (
  <View style={[GlobalStyles.PageFill, Styles.wrap]}>
    <View style={Styles.heading}>
      <View style={Styles.logoWrap}>
        <Image
          source={require('../../../../assets/images/logo-icon.png')}
          style={Styles.logo}
          resizeMode="contain"
        />
      </View>
      <H2>{props.heading}</H2>
    </View>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[GlobalStyles.PageFill, GlobalStyles.MaxWidth]}
    >
      <ScrollView
        contentContainerStyle={Styles.scrollView}
        bounces={false}
      >
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  </View>
);

export default OnboardingPageWrap;
