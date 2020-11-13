import React, { FC, useEffect, useRef } from 'react';
import { Alert, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { Navigation } from 'react-native-navigation';
import { STREAM_SELF_FRAGMENT } from '../../../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import { useCancelStreamMutation } from '../../../../../API/mutation/cancelStream/cancelStream';
import { getGQLErrorMessage } from '../../../../../utils/functions';
import Toast from '../../../../UI/Toast/Toast';
import Button from '../../../../UI/Button/Button';
import TextArea from '../../../../UI/Form/components/TextArea/TextArea';
import Styles from './CancelStreamForm.styles';
import useSafeArea from '../../../../../modules/SafeAreaInsets/SafeAreaInsets';
import spacing from '../../../../../styles/definitions/spacing';
import { pushToast } from '../../../../../modules/Toast';
import DrawerV2 from '../../../../UI/DrawerV2/DrawerV2';
import { useScreenProps } from '../../../../../modules/ScreenPropsProvider/ScreenPropsProvider';

interface CancelStreamFormProps {
  data: STREAM_SELF_FRAGMENT;
}

type FormData = {
  message: string;
};

const CancelStreamForm: FC<CancelStreamFormProps> = (props) => {
  /**
   * Form
   */
  const { register, setValue, handleSubmit, errors, triggerValidation } = useForm<FormData>({ mode: 'onChange' });


  /**
   * Register form
   */
  useEffect(() => {
    register(
      { name: 'message' },
      { required: true,
        validate: (v) => {
          /**
           * Validate username and return error messages to show
           */
          if (v.length < 3) {
            return 'Message must be 3 characters or more';
          }

          return true;
        } },
    );
  }, [register]);


  /**
   * Misc
   */
  const safeAreaInsets = useSafeArea();
  const screenProps = useScreenProps();
  const onCloseRef = useRef<() => void>();


  /**
   * Cancel stream mutation
   */
  const [mutation, { loading }] = useCancelStreamMutation({
    onCompleted: () => {
      // eslint-disable-next-line no-unused-expressions
      onCloseRef.current?.();

      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="SUCCESS"
            content="Stream cancelled"
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
   * On cancel show alert to confirm action
   */
  const onSubmit = (data: FormData) => {
    mutation({
      variables: {
        ...data,
        id: props.data.id,
      },
    });
  };


  /**
   * On cancel show alert to confirm action
   */
  const onAlert = (data: FormData) => {
    Alert.alert(
      'Are you sure you want to cancel stream?',
      'This action is irreversible.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => onSubmit(data) },
      ],
    );
  };


  return (
    <DrawerV2 onClosed={() => Navigation.dismissModal(screenProps.componentId)}>
      {({ onClose }) => {
        onCloseRef.current = onClose;

        return (
          <View style={[Styles.inner, { paddingBottom: safeAreaInsets.bottom + spacing.small }]}>
            <View>
              <Button
                title="back"
                type="SECONDARY"
                size="small"
                onPress={onClose}
                disabled={loading}
                style={Styles.backButton}
              />
            </View>

            <TextArea
              name="message"
              onChangeText={(text) => {
                // Validate on change if there's an error, otherwise validate onBlur
                setValue('message', text, !!errors.message);
              }}
              placeholder="Enter a message for your fans"
              returnKeyType="default"
              errors={errors}
              onBlur={() => triggerValidation('message')}
            />

            <Button
              title={loading ? 'Cancelling' : 'Cancel Stream'}
              onPress={handleSubmit(onAlert)}
              loading={loading}
              style={Styles.button}
            />
          </View>
        );
      }}
    </DrawerV2>
  );
};

export default CancelStreamForm;
