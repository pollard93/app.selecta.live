/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ChannelCard from './ChannelCard';
import SafeAreaViewDecorator from '../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import { useGetChannelProfilesQuery } from '../../../../API/query/getChannelProfiles/getChannelProfiles';
import ChannelCardSekelelton from './ChannelCardSkeleton';
import DarkModeDecorator from '../../../../../storybook/Decorators/DarkModeDecorator/DarkModeDecorator';

storiesOf('Cards/ChannelCard', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{getStory()}</SafeAreaViewDecorator>)
  .addDecorator((getStory) => <DarkModeDecorator switchPosition="bottomRight">{getStory()}</DarkModeDecorator>)
  .add('ChannelCard', () => {
    const TestComponent = () => {
      const r = useGetChannelProfilesQuery();
      if (r.loading) return null;

      return (
        <ChannelCard data={r.data.getChannelProfiles.channels[0]} />
      );
    };

    return <TestComponent />;
  })
  .add('ChannelCardSkeleton', () => <ChannelCardSekelelton />);
