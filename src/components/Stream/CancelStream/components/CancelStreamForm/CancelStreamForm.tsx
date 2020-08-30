import React, { FC, useEffect, useRef } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { useForm } from 'react-hook-form';
import { STREAM_SELF_FRAGMENT } from '../../../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import { useCancelStreamMutation } from '../../../../../API/mutation/cancelStream/cancelStream';
import { getGQLErrorMessage } from '../../../../../utils/functions';
import Toast from '../../../../UI/Toast/Toast';
import Button from '../../../../UI/Button/Button';
import GlobalStyles from '../../../../../styles/stylesheets/GlobalStyles';
import TextArea from '../../../../UI/Form/components/TextArea/TextArea';
import Styles from './CancelStreamForm.styles';
import useSafeArea from '../../../../../modules/SafeAreaInsets/SafeAreaInsets';
import spacing from '../../../../../styles/definitions/spacing';

interface CancelStreamFormProps {
  data: STREAM_SELF_FRAGMENT;
  onDismiss: (success?: boolean) => void;
}

type FormData = {
  message: string;
};

const CancelStreamForm: FC<CancelStreamFormProps> = (props) => {
  /**
   * Form
   */
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty }, triggerValidation } = useForm<FormData>({ mode: 'onChange' });


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
  const toast = useToast();
  const safeAreaInsets = useSafeArea();
  const window = useRef(Dimensions.get('window')).current;
  const windowHeight = useRef(window.height - safeAreaInsets.bottom).current;


  /**
   * Cancel stream mutation
   */
  const [mutation, { loading }] = useCancelStreamMutation({
    onCompleted: () => {
      props.onDismiss(true);
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
    <ScrollView
      style={[GlobalStyles.PageFill, StyleSheet.absoluteFillObject, Styles.wrap]}
      contentContainerStyle={[Styles.flexEnd, { height: windowHeight }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[GlobalStyles.PageFill, Styles.flexEnd]}
      >
        <View style={[Styles.inner, { paddingBottom: safeAreaInsets.bottom + spacing.small }]}>
          <View>
            <Button
              title="back"
              type="SECONDARY"
              size="small"
              onPress={() => props.onDismiss()}
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
            disabled={!isValid || !dirty}
            loading={loading}
            style={Styles.button}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default CancelStreamForm;
