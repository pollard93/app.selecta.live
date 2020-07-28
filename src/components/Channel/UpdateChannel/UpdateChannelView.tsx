import React, { useState, useRef, FC, useEffect } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { ReactNativeFile } from 'apollo-upload-client';
import { useToast } from 'mbp-components-rn-toast';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { useUpdateChannelMutation } from '../../../API/mutation/updateChannel/updateChannel';
import { EditableAsyncImage } from '../../UI/EditableAsyncImage/EditableAsyncImage';
import Styles from './UpdateChannel.style';
import scalePx from '../../../utils/scalePx';
import spacing from '../../../styles/definitions/spacing';
import { CHANNEL_SELF_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_SELF_FRAGMENT';
import TextInput from '../../UI/Form/components/TextInput';
import TextArea from '../../UI/Form/components/TextArea';
import Button from '../../UI/Button/Button';


type FormData = {
  name: string;
  description: string;
  websiteUrl: string;
  twitterUrl: string;
  facebookUrl: string;
  instagramUrl: string;
};

interface UpdateChannelViewProps {
  data: CHANNEL_SELF_FRAGMENT;
}

const UpdateChannelView: FC<UpdateChannelViewProps> = (props) => {
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty, dirtyFields }, triggerValidation, reset, getValues } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: props.data.name,
      description: props.data.description,
      websiteUrl: props.data.websiteUrl,
      twitterUrl: props.data.twitterUrl,
      facebookUrl: props.data.facebookUrl,
      instagramUrl: props.data.instagramUrl,
    },
  });
  const [defaultValues] = useState(getValues());
  const toast = useToast();
  const profileImageHeight = useRef(scalePx(120));


  // Refs
  const descriptionRef = useRef(null);
  const websiteUrlRef = useRef(null);
  const twitterUrlRef = useRef(null);
  const facebookUrlRef = useRef(null);
  const instagramUrlRef = useRef(null);


  /**
   * Update channel mutation
   */
  const [mutation, { loading }] = useUpdateChannelMutation({
    onCompleted: ({ updateChannel }) => {
      // Reset form
      reset({
        name: updateChannel.name,
        description: updateChannel.description,
        websiteUrl: updateChannel.websiteUrl,
        twitterUrl: updateChannel.twitterUrl,
        facebookUrl: updateChannel.facebookUrl,
        instagramUrl: updateChannel.instagramUrl,
      });

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
  const onSubmit = (formData: FormData) => {
    /**
     * Create object of only changed variables
     */
    const data: Partial<FormData> = Object.entries(formData).reduce((p, [key, value]) => {
      if (dirtyFields.has(key)) {
        return {
          ...p,
          [key]: value,
        };
      }

      return p;
    }, {});

    mutation({
      variables: {
        data,
      },
    });
  };


  /**
   * Register form
   */
  useEffect(() => {
    register(
      { name: 'name' },
      {
        required: false,
        validate: (v) => {
          if (!v) return false;

          if (v.length < 3) {
            return 'Minimum 3 characters';
          }

          return true;
        },
      },
    );

    register(
      { name: 'description' },
      {
        required: false,
        validate: (v) => {
          if (!v) return false;

          if (v.length < 3) {
            return 'Minimum 3 characters';
          }

          return true;
        },
      },
    );

    register(
      { name: 'websiteUrl' },
      { required: false },
    );
    register(
      { name: 'twitterUrl' },
      { required: false },
    );
    register(
      { name: 'facebookUrl' },
      { required: false },
    );
    register(
      { name: 'instagramUrl' },
      { required: false },
    );
  }, [register]);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={GlobalStyles.PageFill}
    >
      <ScrollView
        style={GlobalStyles.PageFill}
        bounces={false}
      >
        <EditableAsyncImage
          asyncImageProps={{
            splashUrl: props.data.coverImage?.url.splash,
            fullUrl: props.data.coverImage?.url.full,
            containerProps: {
              style: Styles.coverImage,
            },
            imageProps: {
              source: {
                cache: 'reload',
              },
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
                  imageProps: {
                    source: {
                      cache: 'reload',
                    },
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

        <View style={Styles.form}>
          <TextInput
            name="name"
            onChangeText={(text) => {
              // Validate on change if there's an error, otherwise validate onBlur
              setValue('name', text, !!errors.name);
            }}
            placeholder="Enter your channel name"
            defaultValue={defaultValues.name}
            returnKeyType="next"
            errors={errors}
            onBlur={() => triggerValidation('name', true)}
            onSubmitEditing={() => {
              // eslint-disable-next-line no-unused-expressions
              descriptionRef.current?.focus();
            }}
            style={[Styles.input, Styles.inputWrap]}
          />

          <TextArea
            name="description"
            onChangeText={(text) => {
              // Validate on change if there's an error, otherwise validate onBlur
              setValue('description', text, !!errors.description);
            }}
            setRef={(e) => {
              descriptionRef.current = e;
            }}
            placeholder="Enter your channel description"
            defaultValue={defaultValues.description}
            errors={errors}
            onBlur={() => triggerValidation('description', true)}
            onSubmitEditing={() => {
              // eslint-disable-next-line no-unused-expressions
              websiteUrlRef.current?.focus();
            }}
            style={[Styles.infoArea, Styles.inputWrap]}
          />

          <TextInput
            name="websiteUrl"
            onChangeText={(text) => {
              // Validate on change if there's an error, otherwise validate onBlur
              setValue('websiteUrl', text, !!errors.websiteUrl);
            }}
            setRef={(e) => {
              websiteUrlRef.current = e;
            }}
            placeholder="Enter your channel's website"
            defaultValue={defaultValues.websiteUrl}
            returnKeyType="next"
            errors={errors}
            onBlur={() => triggerValidation('websiteUrl', true)}
            onSubmitEditing={() => {
              // eslint-disable-next-line no-unused-expressions
              twitterUrlRef.current?.focus();
            }}
            style={[Styles.input, Styles.inputWrap]}
          />

          <TextInput
            name="twitterUrl"
            onChangeText={(text) => {
              // Validate on change if there's an error, otherwise validate onBlur
              setValue('twitterUrl', text, !!errors.twitterUrl);
            }}
            setRef={(e) => {
              twitterUrlRef.current = e;
            }}
            placeholder="Enter your channel's twitter url"
            defaultValue={defaultValues.twitterUrl}
            returnKeyType="next"
            errors={errors}
            onBlur={() => triggerValidation('twitterUrl', true)}
            onSubmitEditing={() => {
              // eslint-disable-next-line no-unused-expressions
              facebookUrlRef.current?.focus();
            }}
            style={[Styles.input, Styles.inputWrap]}
          />

          <TextInput
            name="facebookUrl"
            onChangeText={(text) => {
              // Validate on change if there's an error, otherwise validate onBlur
              setValue('facebookUrl', text, !!errors.facebookUrl);
            }}
            setRef={(e) => {
              facebookUrlRef.current = e;
            }}
            placeholder="Enter your channel's facebook url"
            defaultValue={defaultValues.facebookUrl}
            returnKeyType="next"
            errors={errors}
            onBlur={() => triggerValidation('facebookUrl', true)}
            onSubmitEditing={() => {
              // eslint-disable-next-line no-unused-expressions
              instagramUrlRef.current?.focus();
            }}
            style={[Styles.input, Styles.inputWrap]}
          />

          <TextInput
            name="instagramUrl"
            onChangeText={(text) => {
              // Validate on change if there's an error, otherwise validate onBlur
              setValue('instagramUrl', text, !!errors.instagramUrl);
            }}
            setRef={(e) => {
              instagramUrlRef.current = e;
            }}
            placeholder="Enter your channel's instagram url"
            defaultValue={defaultValues.instagramUrl}
            returnKeyType="done"
            errors={errors}
            onBlur={() => triggerValidation('instagramUrl', true)}
            onSubmitEditing={handleSubmit(onSubmit)}
            style={[Styles.input, Styles.inputWrap]}
          />

          <Button
            title="Update channel"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || !dirty}
            loading={loading}
            style={Styles.inputWrap}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateChannelView;
