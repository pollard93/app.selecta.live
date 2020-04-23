/* eslint-disable func-names, no-void, max-len, no-console */
import path from 'path';
import Jimp from 'jimp';
import * as util from 'util';
import * as childProcess from 'child_process';
import pack from '../package.json';

const exec = util.promisify(childProcess.exec);

/**
 * Creates app icons and splash icons from icon.jpg in root
 */
void (async function () {
  const file = path.join(__dirname, '../icon.jpg');
  const mainLogo = await Jimp.read(file);


  /**
   * Generate adaptive android icon
   * https://medium.com/google-design/designing-adaptive-icons-515af294c783
   */
  await new Promise((res) => {
    const resizedImage = mainLogo
      .clone()
      .resize(mainLogo.bitmap.width * 0.6, mainLogo.bitmap.height * 0.6);

    // Create a new image and blit in the resized image
    // 0x0 = 0 = rgba(0, 0, 0, 0)
    new Jimp(mainLogo.bitmap.width, mainLogo.bitmap.height, 'rgba(255, 255, 255, 1)')
      .blit(resizedImage, mainLogo.bitmap.width * 0.2, mainLogo.bitmap.height * 0.2)
      .write(file.replace('icon', 'icon-android'), () => res()); // save
  });


  /**
   * Run command to generate all app icons
   */
  await exec('react-native set-icon --platform ios --path icon.jpg');
  await exec('react-native set-icon --platform android --path icon-android.jpg');


  /**
   * Create paths for all splash icons
   * Paths are .png
   */
  const splashIconPathIOS = path.join(__dirname, `../ios/${pack.name}/Images.xcassets/SplashIcon.imageset/icon@3x.png`);
  const splashIconsPaths = [
    splashIconPathIOS,
    path.join(__dirname, '../android/app/src/main/res/mipmap-hdpi/icon.png'),
    path.join(__dirname, '../android/app/src/main/res/mipmap-ldpi/icon.png'),
    path.join(__dirname, '../android/app/src/main/res/mipmap-mdpi/icon.png'),
    path.join(__dirname, '../android/app/src/main/res/mipmap-xhdpi/icon.png'),
    path.join(__dirname, '../android/app/src/main/res/mipmap-xxhdpi/icon.png'),
    path.join(__dirname, '../android/app/src/main/res/mipmap-xxxhdpi/icon.png'),
  ];


  /**
   * Save main image in above paths as pngs
   */
  const splashIcon = mainLogo.clone();
  await Promise.all(splashIconsPaths.map((p) => splashIcon.write(p)));


  /**
   * Run dev:icons on iOS splashIcon
   */
  await exec(`yarn dev:icons dir:${splashIconPathIOS}`);
}());
