import React, { FC } from 'react';
import { Navigation } from 'react-native-navigation';
import OnboardingPageWrap from '../../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import Button from '../../UI/Button/Button';
import H4 from '../../UI/Typography/components/H4';
import Styles from './OnboardingGetStarted.style';
import { ScreenProps } from '../../../screens/utils/interfaces';
import { goHome } from '../../../screens/utils';

export interface OnboardingGetStartedProps extends ScreenProps {}

const OnboardingGetStarted: FC<OnboardingGetStartedProps> = (props) => {
  const onPop = () => {
    Navigation.pop(props.componentId);
  };


  return (
    <OnboardingPageWrap
      heading="Let's stream"
      onPop={onPop}
    >
      <H4 style={Styles.content}>TODO - content here</H4>

      <Button
        title="Get started"
        onPress={() => goHome()}
      />
    </OnboardingPageWrap>
  );
};

export default OnboardingGetStarted;
