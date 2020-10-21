import React, { FC, useRef, useEffect, useState } from 'react';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import { ReactNativeFile } from 'apollo-upload-client';
import { useForm } from 'react-hook-form';
import ImageResizer from 'react-native-image-resizer';
import { View } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import { useGetSelfQuery } from '../../../API/query/getSelf/getSelf';
import { useUpdateSelfMutation } from '../../../API/mutation/updateSelf/updateSelf';
import { pushToast } from '../../../modules/Toast';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { EditableAsyncImage } from '../../UI/EditableAsyncImage/EditableAsyncImage';
import Styles from './UpdateProfilePicture.style';
import { updateStoredGetSelf } from '../../../utils/userFunctions';
import GlobalStyles, { GlobalDynamicStyles } from '../../../styles/stylesheets/GlobalStyles';

export interface UpdateProfilePictureProps {}

type FormData = {
  profilePicture: PhotoIdentifier['node'];
};

const UpdateProfilePicture: FC<UpdateProfilePictureProps> = () => {
  const { data: { getSelf } } = useGetSelfQuery();
  const [loading, setLoading] = useState(false);
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);


  /**
   * Form
   */
  const { register, setValue, handleSubmit } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      profilePicture: undefined,
    },
  });


  /**
   * Register form
   */
  useEffect(() => {
    register(
      { name: 'profilePicture' },
      { required: false },
    );
  }, []);


  /**
   * Refs
   */
  const coverImageResetRef = useRef(null);


  /**
   * Update self mutation
   */
  const [updateSelfMutation] = useUpdateSelfMutation({
    onCompleted: () => {
      setLoading(false);

      // Reset image
      // eslint-disable-next-line no-unused-expressions
      coverImageResetRef.current?.();

      // Update store
      updateStoredGetSelf();

      /**
       * Success toast
       */
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="SUCCESS"
            content='Updated image'
          />
        ),
        dismissible: true,
      });
    },
    onError: (e) => {
      setLoading(false);

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
   * On Submit execute updateSelfMutation with form data
   */
  const onSubmit = async (variables: FormData) => {
    setLoading(true);

    updateSelfMutation({
      variables: {
        profilePicture: await processImage(variables.profilePicture),
      },
    });
  };


  return (
    <View style={Styles.wrap}>
      <EditableAsyncImage
        asyncImageProps={{
          splashUrl: getSelf.profilePicture?.url.splash,
          fullUrl: getSelf.profilePicture?.url.full,
          containerProps: {
            style: [GlobalStyles.ImageCircleBorderInner, globalDynamicStyles.ImageCircleBorderInner],
          },
        }}
        onChange={(file) => setValue('profilePicture', file, true)}
        resetRef={coverImageResetRef}
        loading={loading}
        onConfirm={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default UpdateProfilePicture;
