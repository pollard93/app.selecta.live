import React from 'react';
import { View } from 'react-native';
import { ReactNativeFile } from 'apollo-upload-client';
import { useToast } from 'mbp-components-rn-toast';
import { useGetSelfQuery } from '../../../API/query/getSelf/getSelf';
import { useUpdateSelfMutation } from '../../../API/mutation/updateSelf/updateSelf';
import EditableImage from '../../UI/EditableImage/EditableImage';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';

const ProfileUpdate = () => {
  const { data: { getSelf } } = useGetSelfQuery();
  const context = useToast();


  /**
   * Update self mutation
   */
  const [updateSelfMutation] = useUpdateSelfMutation({
    onCompleted: () => {
      context.push({
        duration: 1000,
        component: (
          <Toast content='Updated profile' />
        ),
        dismissible: false,
      });
    },
    onError: (e) => {
      context.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * On Submit execute updateSelfMutation with selectedAsset
   */
  const onSubmit = (profilePicture: ReactNativeFile) => updateSelfMutation({
    variables: {
      profilePicture,
    },
  });

  // const test: any = {
  //   here: {
  //     here2: {
  //       here3: 1,
  //     },
  //   },
  // };
  // console.log(test?.here?.here2?.here3);
  // console.log(test?.here?.here3?.here3);


  return (
    <View>
      <EditableImage
        asyncImageProps={{
          splashUrl: getSelf?.profilePicture?.url?.splash,
          fullUrl: getSelf?.profilePicture?.url?.full,
          containerProps: {
            style: {
              width: 250,
              height: 250,
            },
          },
        }}
        onSubmit={onSubmit}
      />
    </View>
  );
};

export default ProfileUpdate;
