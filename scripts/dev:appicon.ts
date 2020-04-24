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
  const maingIconPath = path.join(__dirname, '../icons/icon.jpg');
  const mainIcon = await Jimp.read(maingIconPath);


  /**
   * Create pixel densities for use later
   */
  // Save @3x.{png,jpg}
  const clone = mainIcon.clone();
  await clone.write(path.join(__dirname, '../icons/density/icon@3x.jpg'));
  await clone.write(path.join(__dirname, '../icons/density/icon@3x.png'));

  // Generate densities (.{png,jpg} not working for some reason!)
  await exec(`yarn dev:icons dir:${path.join(__dirname, '../icons/density/*@3x.png')}`);
  await exec(`yarn dev:icons dir:${path.join(__dirname, '../icons/density/*@3x.jpg')}`);


  /**
   * Generate adaptive android icon
   * https://medium.com/google-design/designing-adaptive-icons-515af294c783
   */
  await new Promise((res) => {
    const resizedImage = mainIcon
      .clone()
      .resize(mainIcon.bitmap.width * 0.6, mainIcon.bitmap.height * 0.6);

    // Create a new image and blit in the resized image
    // 0x0 = 0 = rgba(0, 0, 0, 0)
    new Jimp(mainIcon.bitmap.width, mainIcon.bitmap.height, 'rgba(255, 255, 255, 1)')
      .blit(resizedImage, mainIcon.bitmap.width * 0.2, mainIcon.bitmap.height * 0.2)
      .write(maingIconPath.replace('icon.', 'icon-android.'), () => res()); // save
  });


  /**
   * Run command to generate all app icons
   */
  await exec('react-native set-icon --platform ios --path icons/icon.jpg');
  await exec('react-native set-icon --platform android --path icons/icon-android.jpg');


  /**
   * Splash screen icons
   * Move the density icons to their destinations for splash screens
   */
  const map = [
    // iOS
    { from: path.join(__dirname, '../icons/density/icon@3x.png'), to: path.join(__dirname, `../ios/${pack.name}/Images.xcassets/SplashIcon.imageset/icon@3x.png`) },
    { from: path.join(__dirname, '../icons/density/icon@2x.png'), to: path.join(__dirname, `../ios/${pack.name}/Images.xcassets/SplashIcon.imageset/icon@2x.png`) },
    { from: path.join(__dirname, '../icons/density/icon.png'), to: path.join(__dirname, `../ios/${pack.name}/Images.xcassets/SplashIcon.imageset/icon.png`) },
    // Android
    { from: path.join(__dirname, '../icons/density/icon.png'), to: path.join(__dirname, '../android/app/src/main/res/mipmap-mdpi/icon.png') },
    { from: path.join(__dirname, '../icons/density/icon@2x.png'), to: path.join(__dirname, '../android/app/src/main/res/mipmap-hdpi/icon.png') },
    { from: path.join(__dirname, '../icons/density/icon@3x.png'), to: path.join(__dirname, '../android/app/src/main/res/mipmap-xhdpi/icon.png') },
    { from: path.join(__dirname, '../icons/density/icon@3x.png'), to: path.join(__dirname, '../android/app/src/main/res/mipmap-xxhdpi/icon.png') },
    { from: path.join(__dirname, '../icons/density/icon@3x.png'), to: path.join(__dirname, '../android/app/src/main/res/mipmap-xxxhdpi/icon.png') },
  ];

  await Promise.all(map.map((x) => (
    exec(`cp ${x.from} ${x.to}`)
  )));
}());
