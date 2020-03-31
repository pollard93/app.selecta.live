import React from 'react';
import { Button, ScrollView, TextInput } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { useForm } from 'react-hook-form';
import { ReactNativeFile } from 'apollo-upload-client';
import { useGetSelfQuery } from '../../../API/query/getSelf/getSelf';
import { useUpdateSelfMutation } from '../../../API/mutation/updateSelf/updateSelf';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { updateSelfVariables } from '../../../API/mutation/updateSelf/__generated__/updateSelf';
import EditableImage from '../../UI/EditableImage/EditableImage';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';

type FormData = {
  name: string;
  profilePicture: ReactNativeFile;
};

const ProfileUpdate = () => {
  const { data: { getSelf } } = useGetSelfQuery();
  const { register, setValue, handleSubmit, reset, formState: { isValid, dirty } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: undefined,
      profilePicture: undefined,
    },
  });
  const toast = useToast();


  /**
   * Update self mutation
   */
  const [updateSelfMutation, { loading }] = useUpdateSelfMutation({
    onCompleted: () => {
      /**
       * Reset form
       */
      reset({
        name: undefined,
        profilePicture: undefined,
      });

      /**
       * Success toast
       */
      toast.push({
        duration: 1000,
        component: (
          <Toast content='Updated profile' />
        ),
        dismissible: false,
      });
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
   * On Submit execute updateSelfMutation with form data
   */
  const onSubmit = (variables: updateSelfVariables) => {
    updateSelfMutation({
      variables,
    });
  };


  return (
    <ScrollView style={GlobalStyles.PageFill}>
      <TextInput
        ref={
          register(
            { name: 'name' },
            { required: false, validate: (v) => v === undefined || v.length },
          )
        }
        onChangeText={(text) => setValue('name', text, true)}
        placeholder="Name"
        returnKeyType="next"
        defaultValue={getSelf.name}
      />

      <EditableImage
        setRef={
          register(
            { name: 'profilePicture' },
            { required: false, validate: (v) => v === undefined || v instanceof ReactNativeFile },
          )
        }
        asyncImageProps={{
          splashUrl: getSelf.profilePicture?.url?.splash,
          fullUrl: getSelf.profilePicture?.url?.full,
          containerProps: {
            style: {
              width: 250,
              height: 250,
            },
          },
        }}
        onChange={async (file) => setValue('profilePicture', file, true)}
      />

      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        disabled={loading || !isValid || !dirty}
      />
    </ScrollView>
  );
};

export default ProfileUpdate;
