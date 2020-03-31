/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { useForm } from 'react-hook-form';
import { View, Button } from 'react-native';
import { ReactNativeFile } from 'apollo-upload-client';
import EditableImage from './EditableImage';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import AssetPickerDecorator from '../../../../storybook/Decorators/AssetPickerDecorator/AssetPickerDecorator';
import { useGetSelfQuery } from '../../../API/query/getSelf/getSelf';

type FormData = {
  name: string;
  profilePicture: ReactNativeFile;
};

storiesOf('EditableImage', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .addDecorator((getStory) => <AssetPickerDecorator>{getStory()}</AssetPickerDecorator>)
  .add('EditableImage - unpopulated', () => {
    const TestComponent = () => {
      const { register, setValue, handleSubmit, reset, formState: { isValid, dirty } } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
          profilePicture: undefined,
        },
      });


      const onSubmit = () => {
        /**
         * Insert query which will ultimately update the urls used below
         */

        reset({
          profilePicture: undefined,
        });
      };


      return (
        <View>
          <EditableImage
            setRef={
              register(
                { name: 'profilePicture' },
                { required: false, validate: (v) => v === undefined || v instanceof ReactNativeFile },
              )
            }
            asyncImageProps={{
              /**
               * Always populate urls for editable, because if the user cancels their selection it needs to revert the image
               * Can populate with placeholder image locally
               */
              splashUrl: 'https://images.unsplash.com/photo-1558980664-2506fca6bfc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=5&q=80',
              fullUrl: 'https://images.unsplash.com/photo-1558980664-2506fca6bfc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
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
            disabled={!isValid || !dirty}
          />
        </View>
      );
    };

    return <TestComponent />;
  })
  .add('EditableImage - populated', () => {
    const TestComponent = () => {
      const { data: { getSelf } } = useGetSelfQuery();
      const { register, setValue, handleSubmit, reset, formState: { isValid, dirty } } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
          profilePicture: undefined,
        },
      });


      const onSubmit = () => {
        /**
         * Insert query which will ultimately update the urls used below
         */

        reset({
          profilePicture: undefined,
        });
      };


      return (
        <View>
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
            disabled={!isValid || !dirty}
          />
        </View>
      );
    };

    return <TestComponent />;
  });
