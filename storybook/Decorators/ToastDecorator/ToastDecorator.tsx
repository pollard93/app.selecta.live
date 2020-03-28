import React from 'react';
import { ToastProvider } from 'mbp-components-rn-toast';

const ToastDecorator = (props) => (
  <ToastProvider position="top">
    {props.children}
  </ToastProvider>
);

export default ToastDecorator;
