import React, { FC, useRef } from 'react';
import { View } from 'react-native';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import Styles from './OnboardingPageWrap.style';
import GlobalStyles from '../../../../styles/stylesheets/GlobalStyles';
import color from '../../../../styles/definitions/color';

interface OnboardingPageWrapProps {}

const OnboardingPageWrap: FC<OnboardingPageWrapProps> = (props) => {
  const colors = useRef(color.gradient.primary.map((c) => c.color().rgb().toString())).current;

  return (
    <View style={[GlobalStyles.PageFill, Styles.wrap]}>
      <View style={Styles.gradient}>
        <AnimatedLinearGradient
          points={{ start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } }}
          customColors={colors}
          speed={4000}
        />
      </View>
      {props.children}
    </View>
  );
};

export default OnboardingPageWrap;
