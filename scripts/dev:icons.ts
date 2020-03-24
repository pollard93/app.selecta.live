/* eslint-disable func-names, no-void, max-len, no-console */
import glob from 'glob';
import Jimp from 'jimp';

/**
 * Searches src/assets/images recursively for any files with @3x.png appendix
 * It will then generate a @2x and a @1x version
 * For example, icon@3x.png will generate icon@2x.png and icon.png (@1x)
 */
void (async function () {
  glob('src/assets/images/**/*@3x.png', null, async (err, files) => {
    if (err) {
      console.error(err);
      process.exit(0);
    }

    for (const file of files) {
      try {
        const image = await Jimp.read(file);

        await new Promise((res) => {
          image
            .clone()
            .resize((image.bitmap.width / 3) * 2, (image.bitmap.height / 3) * 2) // resize
            .write(file.replace('3x', '2x'), () => res()); // save
        });

        await new Promise((res) => {
          image
            .clone()
            .resize(image.bitmap.width / 3, image.bitmap.height / 3) // resize
            .write(file.replace('@3x', ''), () => res()); // save
        });
      } catch (e) {
        console.log(e);
      }
    }

    process.exit(0);
  });
}());
