import React, { useState } from 'react';
import { ScrollView, TextInput, Button } from 'react-native';
import { useForm } from 'react-hook-form';
import { ReactNativeFile } from 'apollo-upload-client';
import { useToast } from 'mbp-components-rn-toast';
import { EditableAsyncImage } from 'mbp-components-rn-asyncimage';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { CHANNEL_SELF_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_SELF_FRAGMENT';
import { useUpdateChannelMutation } from '../../../API/mutation/updateChannel/updateChannel';
import { updateChannelVariables } from '../../../API/mutation/updateChannel/__generated__/updateChannel';

type FormData = {
  name: string;
  description: string;
  profileImage: ReactNativeFile;
  coverImage: ReactNativeFile;
};

interface UpdateChannelProps {
  data: CHANNEL_SELF_FRAGMENT;
}

const UpdateChannel = (props: UpdateChannelProps) => {
  const { register, setValue, handleSubmit, getValues, reset, formState: { isValid, dirty } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: props.data.name,
      description: props.data.description,
      profileImage: undefined,
      coverImage: undefined,
    },
  });
  const [defaultValues] = useState(getValues());
  const toast = useToast();


  /**
   * Update channel mutation
   */
  const [mutation, { loading }] = useUpdateChannelMutation({
    onCompleted: ({ updateChannel }) => {
      /**
       * Reset form
       */
      reset({
        name: updateChannel.name,
        description: updateChannel.description,
        profileImage: undefined,
        coverImage: undefined,
      });


      /**
       * Success toast
       */
      toast.push({
        duration: 1000,
        component: (
          <Toast content='Updated channel' />
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
   * On Submit execute putStreamMutation with form data
   */
  const onSubmit = (variables: updateChannelVariables) => {
    mutation({
      variables,
    });
  };


  return (
    <ScrollView style={GlobalStyles.PageFill}>
      <TextInput
        ref={
          register(
            { name: 'name' },
            { required: true, validate: (v) => v && v.length },
          )
        }
        onChangeText={(text) => setValue('name', text, true)}
        placeholder="Name"
        returnKeyType="next"
        defaultValue={defaultValues.name}
      />

      <TextInput
        ref={
          register(
            { name: 'description' },
            { required: true, validate: (v) => v && v.length },
          )
        }
        onChangeText={(text) => setValue('description', text, true)}
        placeholder="Info"
        returnKeyType="next"
        defaultValue={defaultValues.description}
      />

      <EditableAsyncImage
        setRef={
          register(
            { name: 'coverImage' },
            { required: false },
          )
        }
        asyncImageProps={{
          /**
           * TODO - add placeholder images
           */
          splashUrl: props.data.coverImage?.url?.full ?? 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=5&q=80',
          fullUrl: props.data.coverImage?.url?.full ?? 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
          containerProps: {
            style: {
              width: 250,
              height: 250,
            },
          },
        }}
        onChange={async (file) => setValue('coverImage', file, true)}
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

      <EditableAsyncImage
        setRef={
          register(
            { name: 'profileImage' },
            { required: false },
          )
        }
        asyncImageProps={{
          /**
           * TODO - add placeholder images
           */
          splashUrl: props.data.profileImage?.url?.full ?? 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=5&q=80',
          fullUrl: props.data.profileImage?.url?.full ?? 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
          containerProps: {
            style: {
              width: 250,
              height: 250,
            },
          },
        }}
        onChange={async (file) => setValue('profileImage', file, true)}
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

export default UpdateChannel;
