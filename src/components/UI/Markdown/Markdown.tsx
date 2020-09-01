/* eslint-disable arrow-body-style */
import React, { FC } from 'react';
import { View, Text } from 'react-native';
import MarkdownPackage from 'react-native-markdown-renderer';
import H1 from '../Typography/components/H1';
import H2 from '../Typography/components/H2';
import H3 from '../Typography/components/H3';
import H4 from '../Typography/components/H4';
import Body from '../Typography/components/Body';

const rules = {
  unknown: (node) => {
    return (
      <View key={node.key}>
        <Body>{node.type}</Body>
      </View>
    );
  },

  textgroup: (node, children, parent, styles) => {
    return (
      <Body key={node.key} style={styles.text}>
        {children}
      </Body>
    );
  },

  text: (node) => {
    return <Text key={node.key}>{node.content}</Text>;
  },

  strong: (node, children) => {
    return (
      <Body key={node.key} bold>
        {children}
      </Body>
    );
  },

  bold: (node, children) => {
    return (
      <Body key={node.key} bold>
        {children}
      </Body>
    );
  },

  heading1: (node, children) => {
    return (
      <H1 key={node.key}>
        {children}
      </H1>
    );
  },

  heading2: (node, children) => {
    return (
      <H2 key={node.key}>
        {children}
      </H2>
    );
  },

  heading3: (node, children) => {
    return (
      <H3 key={node.key}>
        {children}
      </H3>
    );
  },

  heading4: (node, children) => {
    return (
      <H4 key={node.key}>
        {children}
      </H4>
    );
  },
};

interface MarkdownProps {}

const Markdown: FC<MarkdownProps> = (props) => (
  <MarkdownPackage rules={rules}>{props.children}</MarkdownPackage>
);

export default Markdown;
