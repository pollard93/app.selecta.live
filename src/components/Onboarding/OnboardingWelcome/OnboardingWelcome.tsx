import React, { useEffect, FC } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useToast } from 'mbp-components-rn-toast';
import OnboardingPageWrap from '../../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import TextInput from '../../UI/Form/components/TextInput';
import { useUpdateSelfMutation } from '../../../API/mutation/updateSelf/updateSelf';
import Button from '../../UI/Button/Button';
import Styles from './OnboardingWelcome.style';
import H4 from '../../UI/Typography/components/H4';
import { ScreenProps, STACK } from '../../../screens/utils/interfaces';
import { pushScreenV2 } from '../../../screens/utils';
import OnboardingNotificationsScreen from '../../../screens/OnboardingScreens/OnboardingNotificationsScreen/OnboardingNotificationsScreen';
import { getGQLErrorMessage } from '../../../utils/functions';
import Toast from '../../UI/Toast/Toast';

export interface OnboardingWelcomeProps extends ScreenProps {}

type FormData = {
  name: string;
};

const OnboardingWelcome: FC<OnboardingWelcomeProps> = () => {
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty }, triggerValidation } = useForm<FormData>({ mode: 'onChange' });
  const toast = useToast();


  /**
   * Register form
   */
  useEffect(() => {
    register({ name: 'name' }, { required: true, pattern: /^.{3,}$/ });
  }, []);


  /**
   * Update self mutation
   */
  const [mutation, { loading }] = useUpdateSelfMutation({
    onCompleted: () => {
      pushScreenV2(STACK.LOGIN, OnboardingNotificationsScreen, {});
    },
    onError: (e) => {
      toast.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * Submit
   */
  const onSubmit = (variables: FormData) => {
    mutation({
      variables,
    });
  };


  return (
    <OnboardingPageWrap heading="Welcome">
      <View style={Styles.input}>
        <H4 style={Styles.content}>Let’s get started by finding your unique name in the app.</H4>

        <TextInput
          name="name"
          light
          onChangeText={(text) => {
            // Validate on change if there's an error, otherwise validate onBlur
            setValue('name', text, !!errors.name);
          }}
          placeholder="Enter name"
          autoCompleteType="name"
          autoCapitalize="none"
          returnKeyType="done"
          errors={errors}
          onBlur={() => triggerValidation('name')}
          onSubmitEditing={handleSubmit(onSubmit)}
        />
      </View>

      <Button
        title="Next"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || !dirty}
        loading={loading}
      />
    </OnboardingPageWrap>
  );
};

export default OnboardingWelcome;
