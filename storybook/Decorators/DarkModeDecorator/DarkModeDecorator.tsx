/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState, memo } from 'react';
import { ColorSchemeProvider, useDynamicValue } from 'react-native-dynamic';
import { Switch, View, SafeAreaView, StyleSheet, Text } from 'react-native';
import color from '../../../src/styles/definitions/color';
import spacing from '../../../src/styles/definitions/spacing';
import shadow from '../../../src/styles/definitions/shadow';
import GlobalStyles, { GlobalDynamicStyles } from '../../../src/styles/stylesheets/GlobalStyles';

interface DarkModeDecoratorProps {}

const DarkModeDecoratorInner: FC<DarkModeDecoratorProps> = (props) => {
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

  return (
    <View style={[GlobalStyles.PageFill, globalDynamicStyles.background]}>
      {props.children}
    </View>
  );
};

const DarkModeDecorator: FC<DarkModeDecoratorProps> = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ColorSchemeProvider mode={darkMode ? 'dark' : 'light'}>
      <DarkModeDecoratorInner>
        {props.children}
      </DarkModeDecoratorInner>

      <SafeAreaView style={{ ...StyleSheet.absoluteFillObject }} pointerEvents="box-none">
        <View
          style={{
            position: 'absolute',
            right: spacing.large,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: color.mono.pale.light,
            padding: spacing.small,
            bottom: spacing.large * 2,
            zIndex: 999,
            ...shadow.regular,
          }}
        >
          <Text style={{ marginRight: spacing.small }}>{darkMode ? 'Dark Mode' : 'Light Mode'}</Text>
          <Switch
            value={darkMode}
            onValueChange={() => setDarkMode(!darkMode)}
            trackColor={{
              true: color.accent.primary,
              false: color.mono.light,
            }}
          />
        </View>
      </SafeAreaView>
    </ColorSchemeProvider>
  );
};

export default memo(DarkModeDecorator);
