import React, { FC } from 'react';
import { formatForTimezone } from '../../../../../../utils/functions';
import Chip from '../../../../Chip/Chip';
import { StreamCardProps } from '../../StreamCard';
import Styles from '../../StreamCard.style';

const StreamCardTime: FC<StreamCardProps> = (props) => {
  /**
   * Return cancelled message
   */
  if (props.data.cancelled !== null) {
    return <Chip bold>Cancelled</Chip>;
  }

  /**
   * Return Live
   */
  if (props.data.timeFromLive && !props.data.timeToLive) {
    return <Chip bold>Live</Chip>;
  }

  /**
   * Fallback to returning date and time
   */
  return (
    <>
      <Chip bold style={Styles.chipLeft}>{formatForTimezone(props.data.timeFromLive || props.data.timeFrom, 'calendar')}</Chip>
      <Chip bold>{formatForTimezone(props.data.timeFromLive || props.data.timeFrom, 'HH:mm')} {formatForTimezone(props.data.timeFromLive || props.data.timeFrom, 'z')}</Chip>
    </>
  );
};

export default StreamCardTime;
