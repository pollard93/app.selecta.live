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
  /**
   * Create pixel densities for jpg and png icons
   */
  for (const ext of ['png', 'jpg']) {
    const mainIconPath = path.join(__dirname, `../icons/icon.${ext}`);
    const mainIcon = await Jimp.read(mainIconPath);
    const clone = mainIcon.clone();

    // Save @3x
    await clone.write(path.join(__dirname, `../icons/density/icon@3x.${ext}`));

    // Generate densities
    await exec(`yarn dev:icons dir:${path.join(__dirname, `../icons/density/*@3x.${ext}`)}`);
  }


  /**
   * Generate adaptive android icon
   * https://medium.com/google-design/designing-adaptive-icons-515af294c783
   */
  const jpgIconPath = path.join(__dirname, '../icons/icon.jpg');
  const jpgIcon = await Jimp.read(jpgIconPath);
  await new Promise((res) => {
    const resizedImage = jpgIcon
      .clone()
      .resize(jpgIcon.bitmap.width * 0.6, jpgIcon.bitmap.height * 0.6);

    // Create a new image and blit in the resized image
    // 0x0 = 0 = rgba(0, 0, 0, 0)
    new Jimp(jpgIcon.bitmap.width, jpgIcon.bitmap.height, 'rgba(255, 255, 255, 1)')
      .blit(resizedImage, jpgIcon.bitmap.width * 0.2, jpgIcon.bitmap.height * 0.2)
      .write(jpgIconPath.replace('icon.', 'icon-android.'), () => res()); // save
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
