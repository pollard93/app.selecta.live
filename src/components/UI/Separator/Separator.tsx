import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import Styles from './Separator.style';
import spacing from '../../../styles/definitions/spacing';

interface SeparatorProps extends ViewProps {
  margin: 'xxsmall' | 'xsmall' | 'small' | 'base' | 'large' | 'xlarge' | 'xxlarge';
}

const Separator: FC<SeparatorProps> = (props) => (
  <View style={[Styles.wrap, props.style, { marginVertical: spacing[props.margin] }]}/>
);

export default Separator;
