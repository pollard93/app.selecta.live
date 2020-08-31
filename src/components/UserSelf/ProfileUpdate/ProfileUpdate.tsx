import React from 'react';
import { Button, ScrollView, TextInput } from 'react-native';
import { useForm } from 'react-hook-form';
import { ReactNativeFile } from 'apollo-upload-client';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import { useGetSelfQuery } from '../../../API/query/getSelf/getSelf';
import { useUpdateSelfMutation } from '../../../API/mutation/updateSelf/updateSelf';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { updateSelfVariables } from '../../../API/mutation/updateSelf/__generated__/updateSelf';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { EditableAsyncImage } from '../../UI/EditableAsyncImage/EditableAsyncImage';
import { pushToast } from '../../../modules/Toast';

type FormData = {
  username: string;
  profilePicture: PhotoIdentifier['node'];
};

const ProfileUpdate = () => {
  const { data: { getSelf } } = useGetSelfQuery();
  const { register, setValue, handleSubmit, reset, formState: { isValid, dirty } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      username: undefined,
      profilePicture: undefined,
    },
  });


  /**
   * Update self mutation
   */
  const [updateSelfMutation, { loading }] = useUpdateSelfMutation({
    onCompleted: () => {
      /**
       * Reset form
       */
      reset({
        username: undefined,
        profilePicture: undefined,
      });

      /**
       * Success toast
       */
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="SUCCESS"
            content='Updated profile'
          />
        ),
        dismissible: false,
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
        dismissible: false,
      });
    },
  });


  /**
   * On Submit execute updateSelfMutation with form data
   */
  const onSubmit = (variables: updateSelfVariables) => {
    updateSelfMutation({
      variables: {
        ...variables,
        profilePicture: variables.profilePicture && new ReactNativeFile({
          uri: variables.profilePicture.image.uri,
          name: variables.profilePicture.image.filename,
          type: variables.profilePicture.type,
        }),
      },
    });
  };


  return (
    <ScrollView style={GlobalStyles.PageFill}>
      <TextInput
        ref={
          register(
            { name: 'username' },
            { required: false },
          )
        }
        onChangeText={(text) => setValue('username', text, true)}
        placeholder="Name"
        returnKeyType="next"
        defaultValue={getSelf.username}
      />

      <EditableAsyncImage
        setRef={
          register(
            { name: 'profilePicture' },
            { required: false },
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
      >
        {({ selectedAsset, openPicker, onCancel }) => (
          <>
            <Button
              title="Change"
              onPress={openPicker}
            />

            <Button
              title="Cancel"
              disabled={!selectedAsset}
              onPress={onCancel}
            />
          </>
        )}
      </EditableAsyncImage>

      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        disabled={loading || !isValid || !dirty}
      />
    </ScrollView>
  );
};

export default ProfileUpdate;
