import React, { useState, useRef, FC, useEffect } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { ReactNativeFile } from 'apollo-upload-client';
import { useToast } from 'mbp-components-rn-toast';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import ImageResizer from 'react-native-image-resizer';
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
import ChannelHeaderStyles from '../ChannelHeader/ChannelHeader.style';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';


type FormData = {
  name: string;
  description: string;
  coverImage: PhotoIdentifier['node'];
  profileImage: PhotoIdentifier['node'];
  websiteUrl: string;
  twitterUrl: string;
  facebookUrl: string;
  instagramUrl: string;
};

interface UpdateChannelViewProps {
  data: CHANNEL_SELF_FRAGMENT;
}

const UpdateChannelView: FC<UpdateChannelViewProps> = (props) => {
  /**
   * Form
   */
  const { register, setValue, handleSubmit, errors, formState: { isValid, dirty, dirtyFields }, triggerValidation, reset, getValues } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: props.data.name,
      description: props.data.description,
      coverImage: undefined,
      profileImage: undefined,
      websiteUrl: props.data.websiteUrl,
      twitterUrl: props.data.twitterUrl,
      facebookUrl: props.data.facebookUrl,
      instagramUrl: props.data.instagramUrl,
    },
  });
  const [defaultValues] = useState(getValues());


  /**
   * Refs
   */
  const descriptionRef = useRef(null);
  const websiteUrlRef = useRef(null);
  const twitterUrlRef = useRef(null);
  const facebookUrlRef = useRef(null);
  const instagramUrlRef = useRef(null);
  const coverImageResetRef = useRef(null);
  const profileImageResetRef = useRef(null);


  /**
   * Misc
   */
  const toast = useToast();
  const profileImageHeight = useRef(scalePx(120));
  const safeAreaInsets = useSafeArea();
  const [loading, setLoading] = useState(false);


  /**
   * Update channel mutation
   */
  const [mutation] = useUpdateChannelMutation({
    onCompleted: ({ updateChannel }) => {
      // Reset form
      reset({
        name: updateChannel.name,
        description: updateChannel.description,
        coverImage: undefined,
        profileImage: undefined,
        websiteUrl: updateChannel.websiteUrl,
        twitterUrl: updateChannel.twitterUrl,
        facebookUrl: updateChannel.facebookUrl,
        instagramUrl: updateChannel.instagramUrl,
      });

      // Reset images
      // eslint-disable-next-line no-unused-expressions
      coverImageResetRef.current?.();
      // eslint-disable-next-line no-unused-expressions
      profileImageResetRef.current?.();

      setLoading(false);

      toast.push({
        duration: 1000,
        component: (
          <Toast content='Updated channel' />
        ),
        dismissible: false,
      });
    },
    onError: (e) => {
      setLoading(false);

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
   * Resize image and return ReactNativeFile
   */
  const processImage = async (asset: PhotoIdentifier['node']) => {
    const image = await ImageResizer.createResizedImage(asset.image.uri, 800, 800, 'JPEG', 100);
    return new ReactNativeFile({
      uri: image.uri,
      name: image.name,
      type: 'image/jpeg',
    });
  };


  /**
   * On Submit execute putStreamMutation with form data
   */
  const onSubmit = async (formData: FormData) => {
    setLoading(true);

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


    try {
      /**
       * Process images
       */
      if (data.coverImage) {
        data.coverImage = await processImage(data.coverImage);
      }

      if (data.profileImage) {
        data.profileImage = await processImage(data.profileImage);
      }

      mutation({
        variables: {
          data,
        },
      });
    } catch {
      setLoading(false);

      toast.push({
        duration: 1000,
        component: (
          <Toast type="ERROR" content='Something went wrong' />
        ),
        dismissible: false,
      });
    }
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
      { name: 'coverImage' },
      { required: false },
    );
    register(
      { name: 'profileImage' },
      { required: false },
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
    <View style={GlobalStyles.PageFill}>
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
              placeholderImageProps: {
                source: require('../../../assets/images/logo-icon.png'),
                resizeMode: 'contain',
                style: ChannelHeaderStyles.skeletonCoverImageIcon,
              },
            }}
            iconPosition="bottomRight"
            onChange={(file) => setValue('coverImage', file, true)}
            resetRef={coverImageResetRef}
            loading={loading}
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
                    placeholderImageProps: {
                      source: require('../../../assets/images/logo-icon.png'),
                      resizeMode: 'contain',
                      style: ChannelHeaderStyles.skeletonProfileImageIcon,
                    },
                  }}
                  onChange={(file) => setValue('profileImage', file, true)}
                  resetRef={profileImageResetRef}
                  loading={loading}
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
              wrapStyle={Styles.inputWrap}
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
              wrapStyle={Styles.inputWrap}
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
              wrapStyle={Styles.inputWrap}
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
              wrapStyle={Styles.inputWrap}
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
              wrapStyle={Styles.inputWrap}
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
              wrapStyle={Styles.inputWrap}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View
        style={{
          paddingBottom: safeAreaInsets.bottom,
        }}
      >
        <Button
          title={loading ? 'Updating' : 'Update channel'}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || !dirty}
          loading={loading}
          style={Styles.button}
        />
      </View>
    </View>
  );
};

export default UpdateChannelView;
