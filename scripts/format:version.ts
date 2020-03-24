
/* eslint-disable func-names, no-void, max-len */
import * as util from 'util';
import * as fs from 'fs-extra';
import * as childProcess from 'child_process';
import p from '../package.json';

const exec = util.promisify(childProcess.exec);

/**
 * Gets the package.json version number and sets for iOS and android
 */
void (async function () {
  // Set android versionName
  await fs.writeFile('./android/fastlane/metadata/versionName', p.version);

  // Set iOS CFBundleShortVersionString
  await exec(`cd ios && fastlane run increment_version_number version_number:${p.version}`);

  process.exit(0);
}());
