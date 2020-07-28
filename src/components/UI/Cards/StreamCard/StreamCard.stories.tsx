/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { useGetStreamProfilesQuery } from '../../../../API/query/getStreamProfiles/getStreamProfiles';
import StreamCard from './StreamCard';
import SafeAreaViewDecorator from '../../../../../storybook/Decorators/SafeAreaViewDecorator/SafeAreaViewDecorator';
import StreamCardSkeleton from './StreamCardSkeleton';

storiesOf('Cards/StreamCard', module)
  .addDecorator((getStory) => <SafeAreaViewDecorator style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{getStory()}</SafeAreaViewDecorator>)
  .add('StreamCard - today', () => {
    const TestComponent = () => {
      const r = useGetStreamProfilesQuery();
      if (r.loading) return null;

      return (
        <StreamCard data={{
          ...r.data.getStreamProfiles.streams[0],
          timeFrom: new Date().toISOString(),
        }} />
      );
    };

    return <TestComponent />;
  })
  .add('StreamCard - tomorrow', () => {
    const TestComponent = () => {
      const r = useGetStreamProfilesQuery();
      if (r.loading) return null;

      return (
        <StreamCard data={{
          ...r.data.getStreamProfiles.streams[0],
          timeFrom: new Date(Date.now() + 8.64e+7).toISOString(),
        }} />
      );
    };

    return <TestComponent />;
  })
  .add('StreamCard - next week', () => {
    const TestComponent = () => {
      const r = useGetStreamProfilesQuery();
      if (r.loading) return null;

      return (
        <StreamCard data={{
          ...r.data.getStreamProfiles.streams[0],
          timeFrom: new Date(Date.now() + 5.184e+8).toISOString(),
        }} />
      );
    };

    return <TestComponent />;
  })
  .add('StreamCard - last day', () => {
    const TestComponent = () => {
      const r = useGetStreamProfilesQuery();
      if (r.loading) return null;

      return (
        <StreamCard data={{
          ...r.data.getStreamProfiles.streams[0],
          timeFrom: new Date(Date.now() - 8.64e+7).toISOString(),
        }} />
      );
    };

    return <TestComponent />;
  })
  .add('StreamCard - last week', () => {
    const TestComponent = () => {
      const r = useGetStreamProfilesQuery();
      if (r.loading) return null;

      return (
        <StreamCard data={{
          ...r.data.getStreamProfiles.streams[0],
          timeFrom: new Date(Date.now() - 5.184e+8).toISOString(),
        }} />
      );
    };

    return <TestComponent />;
  })
  .add('StreamCard - live now', () => {
    const TestComponent = () => {
      const r = useGetStreamProfilesQuery();
      if (r.loading) return null;

      return (
        <StreamCard data={{
          ...r.data.getStreamProfiles.streams[0],
          timeFrom: new Date(Date.now()).toISOString(),
          timeTo: new Date(Date.now() + 8.64e+7).toISOString(),
        }} />
      );
    };

    return <TestComponent />;
  })
  .add('StreamCardSkeleton', () => <StreamCardSkeleton />)
  .add('StreamCardSkeleton - empty', () => <StreamCardSkeleton emptyMessage="Is Empty Result" />);
