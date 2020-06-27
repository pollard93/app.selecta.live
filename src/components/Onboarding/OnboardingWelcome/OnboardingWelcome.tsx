import React, { useEffect, FC } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';
import { useToast } from 'mbp-components-rn-toast';
import SplashScreen from 'react-native-splash-screen';
import OnboardingPageWrap from '../../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import TextInput from '../../UI/Form/components/TextInput';
import { useUpdateSelfMutation } from '../../../API/mutation/updateSelf/updateSelf';
import Button from '../../UI/Button/Button';
import Styles from './OnboardingWelcome.style';
import H4 from '../../UI/Typography/components/H4';
import { ScreenProps, STACK } from '../../../screens/utils/interfaces';
import { pushScreenV2 } from '../../../screens/utils';
import OnboardingNotificationsScreen from '../../../screens/OnboardingScreens/OnboardingNotificationsScreen/OnboardingNotificationsScreen';
import { getGQLErrorMessage, useDebounce } from '../../../utils/functions';
import Toast from '../../UI/Toast/Toast';
import { useIsUsernameUniqueLazyQuery } from '../../../API/query/isUsernameUnique/isUsernameUnique';
import color from '../../../styles/definitions/color';

export interface OnboardingWelcomeProps extends ScreenProps {}

type FormData = {
  username: string;
};

const OnboardingWelcome: FC<OnboardingWelcomeProps> = () => {
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty }, triggerValidation } = useForm<FormData>({ mode: 'onChange' });
  const toast = useToast();

  /**
   * Remove splash
   */
  useEffect(() => {
    SplashScreen.hide();
  }, []);


  /**
   * isUsernameUnique query
   */
  const [query, queryResult] = useIsUsernameUniqueLazyQuery({
    onCompleted: () => {
      triggerValidation('username');
    },
  });
  const { loading: queryLoading } = queryResult;


  /**
   * Register form
   */
  useEffect(() => {
    register(
      { name: 'username' },
      { required: true,
        validate: (v) => {
          /**
           * Validate username and return error messages to show
           */
          if (!/^.{3,}$/.test(v)) {
            return 'Username must be 3 characters or more';
          }

          if (queryResult.loading) {
            return <ActivityIndicator size="small" color={color.accent.primary} />;
          }

          if (queryResult.error || !queryResult.data?.isUsernameUnique) {
            return 'Username is not unique';
          }

          return true;
        } },
    );


    /**
     * When queryResult.data changes
     * If the query has been called, trigger validation
     */
    if (queryResult.called) {
      triggerValidation('username');
    }
  }, [queryResult.data]);


  /**
   * Update self mutation
   */
  const [mutation, { loading: mutationLoading }] = useUpdateSelfMutation({
    onCompleted: () => {
      pushScreenV2(STACK.ONBOARDING, OnboardingNotificationsScreen, {});
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
   * Function to debounce the variables state
   * Any values passed to it will be merged into setVariables with current variables
   */
  const debounceName = useDebounce((username) => {
    query({
      variables: {
        username,
      },
    });
  }, 500, []);


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
          name="username"
          light
          onChangeText={(text) => {
            // Validate on change if there's an error, otherwise validate onBlur
            setValue('username', text, !!errors.username);

            // Debounce isUniqueUsername request if the length of name is valid
            if (text && text.length >= 3) {
              debounceName(text);
            }
          }}
          placeholder="Enter username"
          autoCompleteType="username"
          autoCapitalize="none"
          returnKeyType="done"
          errors={errors}
          onBlur={() => triggerValidation('username')}
          onSubmitEditing={handleSubmit(onSubmit)}
        />
      </View>

      <Button
        title="Next"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || !dirty}
        loading={mutationLoading || queryLoading}
      />
    </OnboardingPageWrap>
  );
};

export default OnboardingWelcome;
