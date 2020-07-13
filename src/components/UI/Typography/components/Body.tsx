import React, { FC } from 'react';
import Styles from '../Typography.style';
import Base, { BaseTextProps } from './Base';

const Body: FC<BaseTextProps> = (props) => (
  <Base
    {...props}
    style={[Styles.Body, props.style]}
  />
);

export default Body;
