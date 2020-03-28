/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import EditableImage from './EditableImage';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import GetSelfDecorator from '../../../../storybook/Decorators/GetSelfDecorator/GetSelfDecorator';
import AssetPickerDecorator from '../../../../storybook/Decorators/AssetPickerDecorator/AssetPickerDecorator';

storiesOf('EditableImage', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator((getStory) => <GetSelfDecorator>{getStory()}</GetSelfDecorator>)
  .addDecorator((getStory) => <AssetPickerDecorator>{getStory()}</AssetPickerDecorator>)
  .add('EditableImage - unControlled', () => (
    <EditableImage
      asyncImageProps={{
        splashUrl: 'https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2&q=80',
        fullUrl: 'https://images.unsplash.com/photo-1563342295-428fe4b7932e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop',
        containerProps: {
          style: {
            width: 250,
            height: 250,
          },
        },
      }}
      onSubmit={async (file) => console.log(file)}
    />
  ));
