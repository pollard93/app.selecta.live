import React, { useState, useRef, FC } from 'react';
import { ScrollView, TextInput, Button, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { ReactNativeFile } from 'apollo-upload-client';
import { useToast } from 'mbp-components-rn-toast';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { useUpdateChannelMutation } from '../../../API/mutation/updateChannel/updateChannel';
import { updateChannelVariables } from '../../../API/mutation/updateChannel/__generated__/updateChannel';
import { EditableAsyncImage } from '../../UI/EditableAsyncImage/EditableAsyncImage';
import Styles from './UpdateChannel.style';
import scalePx from '../../../utils/scalePx';
import spacing from '../../../styles/definitions/spacing';
import { CHANNEL_SELF_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_SELF_FRAGMENT';
import { ScreenProps } from '../../../screens/utils/interfaces';


type FormData = {
  name: string;
  description: string;
  profileImage: ReactNativeFile;
  coverImage: ReactNativeFile;
};

interface UpdateChannelProps extends ScreenProps {
  data: CHANNEL_SELF_FRAGMENT;
}

const UpdateChannel: FC<UpdateChannelProps> = (props) => {
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
  const onSubmit = (variables: updateChannelVariables) => mutation({
    variables,
  });

  const profileImageHeight = useRef(scalePx(120));


  return (
    <View style={GlobalStyles.PageFill}>
      <View>
        <EditableAsyncImage
          asyncImageProps={{
            splashUrl: props.data.coverImage?.url.splash,
            fullUrl: props.data.coverImage?.url.full,
            containerProps: {
              style: Styles.coverImage,
            },
          }}
          iconPosition="bottomRight"
          onConfirm={(file) => mutation({
            variables: {
              data: {
                coverImage: new ReactNativeFile({
                  uri: file.image.uri,
                  name: file.image.filename,
                  type: file.type,
                }),
              },
            },
          })}
        />

        <View
          style={{
            height: profileImageHeight.current / 2,
            width: profileImageHeight.current,
            paddingHorizontal: spacing.small,
          }}
        >
          <View
            style={[
              Styles.profileImageWrap,
              {
                width: profileImageHeight.current,
                height: profileImageHeight.current,
              },
            ]}
          >
            <View style={Styles.profileImageInner}>
              <EditableAsyncImage
                asyncImageProps={{
                  splashUrl: props.data.profileImage?.url.splash,
                  fullUrl: props.data.profileImage?.url.full,
                  containerProps: {
                    style: Styles.profileImage,
                  },
                }}
                onConfirm={(file) => mutation({
                  variables: {
                    data: {
                      profileImage: new ReactNativeFile({
                        uri: file.image.uri,
                        name: file.image.filename,
                        type: file.type,
                      }),
                    },
                  },
                })}
              />
            </View>
          </View>
        </View>
      </View>

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

        <Button
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          disabled={loading || !isValid || !dirty}
        />
      </ScrollView>
    </View>
  );
};

export default UpdateChannel;
