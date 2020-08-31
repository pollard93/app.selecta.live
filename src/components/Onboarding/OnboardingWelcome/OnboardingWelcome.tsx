import React, { useEffect, FC } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import SplashScreen from 'react-native-splash-screen';
import { Navigation } from 'react-native-navigation';
import OnboardingPageWrap from '../../UI/Onboarding/OnboardingPageWrap/OnboardingPageWrap';
import { useUpdateSelfMutation } from '../../../API/mutation/updateSelf/updateSelf';
import Button from '../../UI/Button/Button';
import Styles from './OnboardingWelcome.style';
import H4 from '../../UI/Typography/components/H4';
import { pushScreen } from '../../../screens/utils';
import OnboardingNotificationsScreen from '../../../screens/OnboardingScreens/OnboardingNotificationsScreen/OnboardingNotificationsScreen';
import { getGQLErrorMessage, useDebounce } from '../../../utils/functions';
import Toast from '../../UI/Toast/Toast';
import { useIsUsernameUniqueLazyQuery } from '../../../API/query/isUsernameUnique/isUsernameUnique';
import SearchInput from '../../UI/Form/components/SearchInput/SearchInput';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import { pushToast } from '../../../modules/Toast';

export interface OnboardingWelcomeProps {}

type FormData = {
  username: string;
};

const OnboardingWelcome: FC<OnboardingWelcomeProps> = () => {
  const screenProps = useScreenProps();
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty }, triggerValidation, setError, clearError } = useForm<FormData>({ mode: 'onChange' });

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
    onCompleted: ({ isUsernameUnique }) => {
      /**
       * Set and clear error on completed
       */
      if (!isUsernameUnique) {
        setError('username', 'message', 'Username is already taken');
      } else {
        clearError('username');
      }
    },
    onError: () => {
      /**
       * Set error message
       */
      setError('username', 'message', 'Something went wrong');
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


          /**
           * If query has returned and is false, then persist this error
           */
          if (queryResult.data?.isUsernameUnique === false) {
            return 'Username is alrady taken';
          }

          return true;
        } },
    );
  }, [register, queryResult]);


  /**
   * Update self mutation
   */
  const [mutation, { loading: mutationLoading }] = useUpdateSelfMutation({
    onCompleted: () => {
      pushScreen(screenProps.componentId, OnboardingNotificationsScreen, {});
    },
    onError: (e) => {
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
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


  const onPop = () => {
    Navigation.pop(screenProps.componentId);
  };


  return (
    <OnboardingPageWrap
      heading="Welcome"
      onPop={onPop}
    >
      <View style={Styles.input}>
        <H4 style={Styles.content}>Let’s get started by finding your unique name in the app.</H4>

        <SearchInput
          name="username"
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
          loading={queryLoading}
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
