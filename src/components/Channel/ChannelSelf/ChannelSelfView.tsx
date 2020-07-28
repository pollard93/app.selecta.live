import React, { FC } from 'react';
import { QueryResult } from 'react-apollo';
import Body from '../../UI/Typography/components/Body';
import { ScreenProps } from '../../../screens/utils/interfaces';
import { getChannelSelf } from '../../../API/query/getChannelSelf/__generated__/getChannelSelf';
import ChannelHeader from '../ChannelHeader/ChannelHeader';

export interface ChannelSelfViewProps extends ScreenProps {
  queryResult: QueryResult<getChannelSelf>;
}

const ChannelSelfView: FC<ChannelSelfViewProps> = (props) => (
  <ChannelHeader
    {...props}
    data={props.queryResult.data?.getChannelSelf}
    topContent={({ titleColor, followChannelColor }) => (
      <>
        <Body>Top content</Body>
      </>
    )}
  >
    {() => (
      <Body>Channel Self</Body>
    )}
  </ChannelHeader>
);

export default ChannelSelfView;
