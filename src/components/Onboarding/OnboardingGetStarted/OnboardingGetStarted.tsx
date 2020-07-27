import React, { FC } from 'react';
import OnboardingPageWrap from '../../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import Button from '../../UI/Button/Button';
import H4 from '../../UI/Typography/components/H4';
import Styles from './OnboardingGetStarted.style';
import { ScreenProps } from '../../../screens/utils/interfaces';
import { goHome } from '../../../screens/utils';
import { useGetSelf } from '../../../API/query/getSelf/getSelf';

export interface OnboardingGetStartedProps extends ScreenProps {}

const OnboardingGetStarted: FC<OnboardingGetStartedProps> = () => {
  const self = useGetSelf();

  return (
    <OnboardingPageWrap heading="Let's stream">
      <H4 style={Styles.content}>TODO - content here</H4>

      <Button
        title="Get started"
        onPress={() => goHome({ isProducer: self.isProducer })}
      />
    </OnboardingPageWrap>
  );
};

export default OnboardingGetStarted;
