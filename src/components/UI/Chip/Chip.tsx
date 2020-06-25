import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import Styles from './Chip.style';
import Gradient from '../Gradient/Gradient';
import Body from '../Typography/components/Body';

export interface ChipProps {
  type?: 'PRIMARY' | 'SECONDARY' | 'LIGHT'; // Default PRIMARY
  bold?: boolean;
  style?: ViewStyle,
}

const Chip: FC<ChipProps> = (props) => {
  const type = props.type || 'PRIMARY';


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
            style={[Styles.text, Styles[`text${type}`], props.bold && Styles.bold]}
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
        style={[Styles.text, Styles[`text${type}`], props.bold && Styles.bold]}
      >
        {props.children}
      </Body>
    </View>
  );
};

export default Chip;
