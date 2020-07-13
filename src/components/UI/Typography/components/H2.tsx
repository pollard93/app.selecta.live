import React, { FC } from 'react';
import Styles from '../Typography.style';
import Base, { BaseTextProps } from './Base';

const H2: FC<BaseTextProps> = (props) => (
  <Base
    {...props}
    style={[Styles.H2, props.style]}
  />
);

export default H2;
