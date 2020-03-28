import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { useGetSelfQuery } from '../../../API/query/getSelf/getSelf';
import { useUpdateSelfMutation } from '../../../API/mutation/updateSelf/updateSelf';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import Form from '../../hoc/Form/Form';
import { updateSelfVariables } from '../../../API/mutation/updateSelf/__generated__/updateSelf';
import { InitialConfig } from '../../hoc/Form/FormInterfaces';

class UpdateProfileForm extends Form<updateSelfVariables> {}

const ProfileUpdate = () => {
  const { data: { getSelf } } = useGetSelfQuery();
  const context = useToast();

  /**
   * Form config
   */
  const [config] = useState<InitialConfig>({
    Name: {
      type: 'text',
      name: 'name',
      value: getSelf?.name,
      required: false,
      textInputProps: {
        placeholder: 'Name',
      },
    },
    ProfilePicture: {
      type: 'image',
      name: 'profilePicture',
      value: null,
      required: false,
      imageProps: {
        asyncImageProps: {
          splashUrl: getSelf?.profilePicture?.url?.splash,
          fullUrl: getSelf?.profilePicture?.url?.full,
          containerProps: {
            style: {
              width: 250,
              height: 250,
            },
          },
        },
      },
    },
  });


  /**
   * Update self mutation
   */
  const [updateSelfMutation, { loading }] = useUpdateSelfMutation({
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
   * On Submit execute updateSelfMutation with form data
   * Reset form
   */
  const onSubmit = (variables: updateSelfVariables, form: Form<updateSelfVariables>) => {
    try {
      updateSelfMutation({
        variables,
      });

      form.reset({ resetAll: true });
    // eslint-disable-next-line no-empty
    } catch (e) {}
  };


  return (
    <View>
      <UpdateProfileForm
        config={config}
        onSubmit={onSubmit}
        validateForm={(c, form) => {
          const anyInvalid = form.anyInvalid(c);
          const anyValidAndChanged = form.anyValidAndChanged(c);
          return !anyInvalid && anyValidAndChanged;
        }}
      >
        {({ fields: { Name, ProfilePicture }, valid, triggerSubmit }) => (
          <>
            {Name}
            {ProfilePicture}
            <Button
              title="Submit"
              disabled={!valid || loading}
              onPress={triggerSubmit}
            />
          </>
        )}
      </UpdateProfileForm>
    </View>
  );
};

export default ProfileUpdate;
