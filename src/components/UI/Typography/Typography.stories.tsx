import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../../storybook/Decorators/CenterView/CenterView';
import H1 from './components/H1';
import H2 from './components/H2';
import H3 from './components/H3';
import H4 from './components/H4';
import Body from './components/Body';
import Small from './components/Small';

storiesOf('UI/Typography', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Typography', () => (
    <>
      <H1>H1: Selecta Live</H1>
      <H2>H2: Selecta Live</H2>
      <H3>H3: Selecta Live</H3>
      <H4>H4: Selecta Live</H4>
      <Body>Body: Selecta Live</Body>
      <Small>Small: Selecta Live</Small>
    </>
  ));
