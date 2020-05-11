/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
/* eslint-disable no-void */
/* eslint-disable no-console */
import * as util from 'util';
import * as childProcess from 'child_process';
import { reduceArgs } from './utils';

const exec = util.promisify(childProcess.exec);

/**
 * Androids do not accept deep linking via entering the url in a browser
 * The links must be opened in a web page
 * Use this script to simulate the link click
 */
void (async function () {
  const { url } = reduceArgs<{url: string}>();
  if (!url) {
    console.log('Provide URI');
    process.exit(0);
  }

  await exec(`adb shell am start -W -a android.intent.action.VIEW -d "${url}" live.selecta.app.debug`);
}());
