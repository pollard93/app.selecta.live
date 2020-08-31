import React, { useRef, useEffect, FC } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useToast, ToastProps } from 'mbp-components-rn-toast';
import { validate as validateEmail } from 'email-validator';
import { useUpdateEmailMutation } from '../../../API/mutation/updateEmail/updateEmail';
import TextInput from '../../UI/Form/components/TextInput/TextInput';
import Button from '../../UI/Button/Button';
import Styles from './UpdateEmail.style';
import DrawerV2 from '../../UI/DrawerV2/DrawerV2';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import spacing from '../../../styles/definitions/spacing';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';

export interface UpdateEmailProps {
  onClosed: (toast?: ToastProps) => void; // On Success toast must be in the parent after modal dismissed
}

export type FormData = {
  email: string;
  password: string;
};

const UpdateEmail: FC<UpdateEmailProps> = (props) => {
  const safeAreaInsets = useSafeArea();
  const toast = useToast();


  /**
   * Form
   */
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty }, watch, triggerValidation } = useForm<FormData>({ mode: 'onChange' });


  /**
   * Refs
   */
  const passwordRef = useRef(null);
  const onCloseRef = useRef<(args?: ToastProps) => void>(null);


  /**
   * Register form
   */
  useEffect(() => {
    register({ name: 'email' }, { required: true, validate: validateEmail });

    register(
      { name: 'password' },
      { required: 'Please enter your password' },
    );
  }, [register]);


  /**
   * Mutation
   */
  const [mutation, { loading }] = useUpdateEmailMutation({
    onCompleted: () => {
      onCloseRef.current({
        duration: 1000,
        component: (
          <Toast
            type="SUCCESS"
            content="Email request submitted, please check your email"
          />
        ),
        dismissible: false,
      });
    },
    onError: (e) => {
      toast.push({
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
   * On Submit
   */
  const onSubmit = (data: FormData) => {
    mutation({
      variables: data,
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
                  name="email"
                  onChangeText={(text) => {
                    // Validate on change if there's an error, otherwise validate onBlur
                    setValue('email', text, !!errors.email);
                  }}
                  placeholder="Enter new email"
                  autoCompleteType="password"
                  autoCapitalize="none"
                  returnKeyType="next"
                  errors={errors}
                  onBlur={() => triggerValidation('email')}
                  onSubmitEditing={() => {
                    // eslint-disable-next-line no-unused-expressions
                    passwordRef.current?.focus();
                  }}
                />
              </View>

              <View style={Styles.input}>
                <TextInput
                  name="password"
                  setRef={(e) => {
                    passwordRef.current = e;
                  }}
                  onChangeText={(text) => {
                    // Validate on change if there's an error, otherwise validate onBlur
                    setValue('password', text, !!errors.password);
                  }}
                  placeholder="Enter your password"
                  secureTextEntry
                  autoCompleteType="password"
                  autoCapitalize="none"
                  returnKeyType="done"
                  errors={errors}
                  onBlur={() => triggerValidation('password')}
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              </View>

              <View style={Styles.input}>
                <Button
                  title={loading ? 'Requesting' : 'Request email update'}
                  onPress={handleSubmit(onSubmit)}
                  disabled={!isValid || !dirty}
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

export default UpdateEmail;
