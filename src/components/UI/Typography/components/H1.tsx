import React, { FC } from 'react';
import Styles from '../Typography.style';
import Base, { BaseTextProps } from './Base';

const H1: FC<BaseTextProps> = (props) => (
  <Base
    {...props}
    style={[Styles.H1, props.style]}
  />
);

export default H1;
