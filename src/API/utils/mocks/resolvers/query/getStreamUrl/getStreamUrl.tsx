import Config from 'react-native-config';

export const getStreamUrl = (_, args) => {
  if (args.id === 'LIVE') {
    return ({
      video: Config.REACT_APP_LIVE_VIDEO_URL,
      audio: Config.REACT_APP_LIVE_AUDIO_URL,
    });
  }

  return ({
    audio: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa-audio-only.m3u8',
    video: 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8',
  }
  );
};
