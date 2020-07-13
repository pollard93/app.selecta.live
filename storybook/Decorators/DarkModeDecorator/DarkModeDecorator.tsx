/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from 'react';
import { ColorSchemeProvider } from 'react-native-dynamic';
import { Switch, View, SafeAreaView, StyleSheet, Text } from 'react-native';
import color from '../../../src/styles/definitions/color';
import spacing from '../../../src/styles/definitions/spacing';
import shadow from '../../../src/styles/definitions/shadow';

interface DarkModeDecoratorProps {}

const DarkModeDecorator: FC = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ColorSchemeProvider mode={darkMode ? 'dark' : 'light'}>
      {props.children}

      <SafeAreaView style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
        <View
          style={{
            position: 'absolute',
            right: spacing.large,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: color.mono.pale.light,
            padding: spacing.small,
            bottom: spacing.large * 2,
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

export default DarkModeDecorator;
