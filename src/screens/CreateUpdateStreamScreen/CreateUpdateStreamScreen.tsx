import React, { FC } from 'react';
import { Options } from 'react-native-navigation';
import CreateUpdateStream, { CreateUpdateStreamProps } from '../../components/Stream/CreateUpdateStream/CreateUpdateStream';

interface CreateUpdateStreamScreenProps extends CreateUpdateStreamProps {}

const CreateUpdateStreamScreen: FC<CreateUpdateStreamScreenProps> = (props) => (
  <CreateUpdateStream {...props} />
);

export default CreateUpdateStreamScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
CreateUpdateStreamScreen.prototype.ScreenName = 'CreateUpdateStreamScreen';

/**
 * Set Screen options or remove to use default
 */
(CreateUpdateStreamScreen.prototype.options as Options) = {
  topBar: {
    visible: false,
  },
  // statusBar: {
  //   style: 'dark',
  //   backgroundColor: 'white',
  // },
  bottomTabs: {
    visible: false,
    animate: true,
  },
};

/**
 * Set screen color options (default white)
 */
CreateUpdateStreamScreen.prototype.fullScreen = true;
// CreateUpdateStreamScreen.prototype.statusBarColor = color.mono.dark;
// CreateUpdateStreamScreen.prototype.backgroundColor = color.mono.dark;

/**
 * Export as const so can be imported without the default
 */
export const CreateUpdateStreamScreenName = CreateUpdateStreamScreen.prototype.ScreenName;
