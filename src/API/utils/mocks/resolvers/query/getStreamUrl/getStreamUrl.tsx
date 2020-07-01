import Config from 'react-native-config';

export const getStreamUrl = (_, args) => {
  if (args.id === 'LIVE') {
    return ({
      video: Config.REACT_APP_API_URL,
      audio: Config.REACT_APP_API_URL,
    });
  }

  return ({
    audio: 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8',
    video: 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8',
  }
  );
};
