import React, { FC } from 'react';
import Styles from '../Typography.style';
import Base, { BaseTextProps } from './Base';

const H3: FC<BaseTextProps> = (props) => (
  <Base
    {...props}
    style={[Styles.H3, props.style]}
  />
);

export default H3;
