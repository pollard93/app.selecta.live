import React, { FC } from 'react';
import Styles from '../Typography.style';
import Base, { BaseTextProps } from './Base';

const Small: FC<BaseTextProps> = (props) => (
  <Base
    {...props}
    style={[Styles.Small, props.style]}
  />
);

export default Small;
