/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
// setup-tests.js

import 'react-native';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import 'isomorphic-fetch';
import fs from 'fs';
import path from 'path';


/**
 * Include all mocks in __mocks__
 */
const isDirectory = (dir, file) => fs.statSync(path.join(dir, file)).isDirectory();
const mockExists = (dir, file) => fs.existsSync(path.join(dir, file));
const initMocks = (dir) => {
  fs.readdirSync(dir)
    .forEach((file) => {
      if (isDirectory(dir, file)) {
        initMocks(path.join(dir, file));
      } else if (mockExists(dir, file)) {
        jest.requireActual(path.join(dir, file));
      }
    });
};
initMocks(path.join(__dirname, '__mocks__'));


/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
Enzyme.configure({ adapter: new Adapter() });

/**
 * Ignore some expected warnings
 * see: https://jestjs.io/docs/en/tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16
 * see https://github.com/Root-App/react-native-mock-render/issues/6
 */
const originalConsoleError = console.error;
console.error = (message) => {
  if (message.startsWith('Warning:')) {
    return;
  }

  originalConsoleError(message);
};
