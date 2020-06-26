import React from 'react';
import OnboardingPageWrap from '../../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import Button from '../../UI/Button/Button';
import H4 from '../../UI/Typography/components/H4';
import Styles from './OnboardingGetStarted.style';

const OnboardingGetStarted = () => (
  <OnboardingPageWrap heading="Let's stream">
    <H4 style={Styles.content}>TODO - content here</H4>

    <Button
      title="Get started"
      onPress={() => {
        // TODO!
      }}
    />
  </OnboardingPageWrap>
);

export default OnboardingGetStarted;
