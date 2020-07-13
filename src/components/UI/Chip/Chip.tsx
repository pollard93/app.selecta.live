import React, { FC, memo } from 'react';
import { View, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { useDarkMode, useDynamicValue } from 'react-native-dynamic';
import Styles from './Chip.style';
import Gradient from '../Gradient/Gradient';
import Body from '../Typography/components/Body';
import { GlobalDynamicStyles } from '../../../styles/stylesheets/GlobalStyles';

export interface ChipProps {
  type?: 'PRIMARY' | 'SECONDARY' | 'LIGHT' | 'SKELETON'; // Default PRIMARY
  bold?: boolean;
  style?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>;
}

const Chip: FC<ChipProps> = (props) => {
  const darkMode = useDarkMode();
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

  const type = (() => {
    if (darkMode) {
      if (props.type === 'LIGHT') return 'SECONDARY';
      if (props.type === 'SECONDARY') return 'LIGHT';
    }
    return props.type || 'PRIMARY';
  })();


  /**
   * Skeleton
   */
  if (type === 'SKELETON') {
    return (
      <View style={[Styles.wrap, globalDynamicStyles.skeleton, props.style]}>
        <Body
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[Styles.text, globalDynamicStyles.skeleton]}
          bold={props.bold}
        >
          {props.children}
        </Body>
      </View>
    );
  }


  /**
   * Primary requries Gradient
   */
  if (type === 'PRIMARY') {
    return (
      <View style={[Styles.wrap, Styles[`text${type}`], props.style]}>
        <Gradient>
          <Body
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[Styles.text, Styles[`text${type}`]]}
            bold={props.bold}
          >
            {props.children}
          </Body>
        </Gradient>
      </View>
    );
  }


  return (
    <View style={[Styles.wrap, Styles[`wrap${type}`], props.style]}>
      <Body
        numberOfLines={1}
        ellipsizeMode='tail'
        style={[Styles.text, Styles[`text${type}`], props.textStyle]}
        bold={props.bold}
      >
        {props.children}
      </Body>
    </View>
  );
};

export default memo(Chip);
