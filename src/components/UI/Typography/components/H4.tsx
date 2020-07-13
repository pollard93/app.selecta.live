import React, { FC } from 'react';
import Styles from '../Typography.style';
import Base, { BaseTextProps } from './Base';

const H4: FC<BaseTextProps> = (props) => (
  <Base
    {...props}
    style={[Styles.H4, props.style]}
  />
);

export default H4;
