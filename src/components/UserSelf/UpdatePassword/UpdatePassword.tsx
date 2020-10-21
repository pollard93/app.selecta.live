import React, { useRef, useEffect, FC } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useUpdatePasswordMutation } from '../../../API/mutation/updatePassword/updatePassword';
import TextInput from '../../UI/Form/components/TextInput/TextInput';
import Button from '../../UI/Button/Button';
import Styles from './UpdatePassword.style';
import DrawerV2 from '../../UI/DrawerV2/DrawerV2';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import spacing from '../../../styles/definitions/spacing';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { pushToast } from '../../../modules/Toast';

export interface UpdatePasswordProps {
  onClosed: () => void;
}

export type FormData = {
  newPassword: string;
  confirmPassword: string;
  currentPassword: string;
};

const UpdatePassword: FC<UpdatePasswordProps> = (props) => {
  const safeAreaInsets = useSafeArea();


  /**
   * Form
   */
  const { register, setValue, handleSubmit, errors, watch, triggerValidation } = useForm<FormData>({ mode: 'onChange' });


  /**
   * Refs
   */
  const confirmPasswordRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const onCloseRef = useRef<() => void>(null);


  /**
   * Register form
   */
  useEffect(() => {
    register({ name: 'newPassword' }, { required: true });

    register(
      { name: 'confirmPassword' },
      { required: 'Please confirm your password',
        validate: (v) => {
          if (v === watch('newPassword')) return true;
          return 'Password do not match';
        } },
    );

    register(
      { name: 'currentPassword' },
      { required: 'Please enter your current password', pattern: /^.{6,}$/ },
    );
  }, [register]);


  /**
   * Mutation
   */
  const [mutation, { loading }] = useUpdatePasswordMutation({
    onCompleted: () => {
      onCloseRef.current();

      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="SUCCESS"
            content="Password Updated"
          />
        ),
        dismissible: true,
      });
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
        dismissible: true,
      });
    },
  });


  /**
   * On Submit
   */
  const onSubmit = (data: FormData) => {
    mutation({
      variables: {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
    });
  };


  return (
    <DrawerV2 onClosed={props.onClosed}>
      {({ onClose }) => {
        onCloseRef.current = onClose;

        return (
          <View style={{ paddingBottom: safeAreaInsets.bottom + spacing.small }}>
            <View style={Styles.wrap}>
              <View style={Styles.input}>
                <TextInput
                  name="newPassword"
                  label="New Password"
                  onChangeText={(text) => {
                    // Validate on change if there's an error, otherwise validate onBlur
                    setValue('newPassword', text, !!errors.newPassword);
                  }}
                  placeholder="Enter new password"
                  secureTextEntry
                  autoCompleteType="password"
                  autoCapitalize="none"
                  returnKeyType="next"
                  errors={errors}
                  onBlur={() => triggerValidation('newPassword')}
                  onSubmitEditing={() => {
                    // eslint-disable-next-line no-unused-expressions
                    confirmPasswordRef.current?.focus();
                  }}
                />
              </View>

              <View style={Styles.input}>
                <TextInput
                  name="confirmPassword"
                  label="Confirm Password"
                  setRef={confirmPasswordRef}
                  onChangeText={(text) => {
                    // Validate on change if there's an error, otherwise validate onBlur
                    setValue('confirmPassword', text, !!errors.confirmPassword);
                  }}
                  placeholder="Enter new password again"
                  secureTextEntry
                  autoCompleteType="password"
                  autoCapitalize="none"
                  returnKeyType="done"
                  errors={errors}
                  onBlur={() => triggerValidation('confirmPassword')}
                  onSubmitEditing={() => {
                    // eslint-disable-next-line no-unused-expressions
                    currentPasswordRef.current?.focus();
                  }}
                />
              </View>

              <View style={Styles.input}>
                <TextInput
                  name="currentPassword"
                  label="Current Password"
                  setRef={currentPasswordRef}
                  onChangeText={(text) => {
                    // Validate on change if there's an error, otherwise validate onBlur
                    setValue('currentPassword', text, !!errors.currentPassword);
                  }}
                  placeholder="Enter your current password"
                  secureTextEntry
                  autoCompleteType="password"
                  autoCapitalize="none"
                  returnKeyType="done"
                  errors={errors}
                  onBlur={() => triggerValidation('currentPassword')}
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              </View>

              <View style={Styles.input}>
                <Button
                  title={loading ? 'Updating' : 'Update Password'}
                  onPress={handleSubmit(onSubmit)}
                  loading={loading}
                />
              </View>
            </View>
          </View>
        );
      }}
    </DrawerV2>
  );
};

export default UpdatePassword;
