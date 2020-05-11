import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, Button, Switch, View, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { ReactNativeFile } from 'apollo-upload-client';
import { useToast } from 'mbp-components-rn-toast';
import { EditableAsyncImage } from 'mbp-components-rn-asyncimage';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { putStreamVariables } from '../../../API/mutation/putStream/__generated__/putStream';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { usePutStreamMutation } from '../../../API/mutation/putStream/putStream';
import DateTimePickerInput from '../../UI/DateTimePicker/components/DateTimePickerInput/DateTimePickerInput';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import { useUpdateStreamMutation } from '../../../API/mutation/updateStream/updateStream';
import { CHANNEL_SELF_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_SELF_FRAGMENT';

type FormData = {
  name: string;
  info: string;
  timeFrom: string;
  timeTo: string;
  cost: number;
  image: ReactNativeFile;
};

interface CreateUpdateStreamProps {
  channel: CHANNEL_SELF_FRAGMENT;
  data?: STREAM_SELF_FRAGMENT;
}

const CreateUpdateStream = (props: CreateUpdateStreamProps) => {
  const [isFree, setIsFree] = useState(false);
  const { register, setValue, handleSubmit, getValues, watch, formState: { isValid, dirty, dirtyFields } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: props.data
      ? {
        name: props.data.name,
        info: props.data.info,
        timeFrom: props.data.timeFrom,
        timeTo: props.data.timeTo,
        cost: props.data.cost,
        image: undefined,
      }
      : {
        name: '',
        info: '',
        timeFrom: new Date().toISOString(), // now
        timeTo: new Date(Date.now() + 3600000).toISOString(), // 1 hour
        cost: undefined,
        image: undefined,
      },
  });
  const [defaultValues] = useState(getValues());
  const toast = useToast();


  /**
   * Put stream mutation
   */
  const [putStreamMutation, { loading: putLoading }] = usePutStreamMutation({
    onCompleted: () => {
      /**
       * Success toast
       */
      toast.push({
        duration: 1000,
        component: (
          <Toast content='Created stream' />
        ),
        dismissible: false,
      });
    },
    onError: (e) => {
      toast.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * Update stream mutation
   */
  const [updateStreamMutation, { loading: updateLoading }] = useUpdateStreamMutation({
    onCompleted: () => {
      /**
       * Success toast
       */
      toast.push({
        duration: 1000,
        component: (
          <Toast content='Updated stream' />
        ),
        dismissible: false,
      });
    },
    onError: (e) => {
      toast.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * On Submit execute putStreamMutation with form data
   */
  const onSubmit = (variables: putStreamVariables) => {
    if (props.data) {
      /**
       * Map over the form variables and only return
       * varibales the appear in the dirty fields list
       * so we only send up changed fields
      */
      const changed = Object.entries(variables).reduce((p, [key, value]) => {
        if (dirtyFields.has(key)) {
          return {
            ...p,
            [key]: value,
          };
        }

        return p;
      }, {});

      const data = {
        ...changed,
        id: props.data.id,
        cost: isFree ? 0 : variables.cost,
      };

      updateStreamMutation({
        variables: data,
      });
    } else {
      putStreamMutation({
        variables: {
          ...variables,
          cost: isFree ? 0 : variables.cost,
        },
      });
    }
  };


  /**
   * Watch times so they can be validated against eachother
   */
  const timeFrom = watch('timeFrom');
  const timeTo = watch('timeTo');

  useEffect(() => {
    if (props.data) {
      // If the cost is 0 then the stream is free
      setIsFree(props.data.cost === 0);
    }
  }, [props]);


  return (
    <ScrollView style={GlobalStyles.PageFill}>
      <TextInput
        ref={() => register(
          { name: 'name' },
          { required: true, validate: (v) => v && v.length },
        )}
        onChangeText={(text) => setValue('name', text, true)}
        placeholder="Name"
        returnKeyType="next"
        defaultValue={defaultValues.name}
      />

      <TextInput
        ref={() => register(
          { name: 'info' },
          { required: true, validate: (v) => v && v.length },
        )}
        onChangeText={(text) => setValue('info', text, true)}
        placeholder="Info"
        returnKeyType="next"
        defaultValue={defaultValues.info}
      />

      <DateTimePickerInput
        setRef={() => register({ name: 'timeFrom' }, {
          required: true,
          /**
           * timeFrom must be smaller than timeTo
          */
          validate: () => new Date(timeFrom) < new Date(timeTo),
        })}
        defaultValue={defaultValues.timeFrom}
        onChange={(value) => {
          // Set timeFrom
          setValue('timeFrom', value, true);

          //
          // also set timeTo
          /**
           * If this value is greater than timeTo
           * Set timeTo an hour ahead of timeFrom
           */
          if (new Date(value) > new Date(timeTo)) {
            setValue('timeTo', new Date(new Date(value).getTime() + 3600000).toISOString(), true);
          }
        }}
        minimumDate={new Date()}
      />

      <DateTimePickerInput
        setRef={() => register({ name: 'timeTo' }, {
          required: true,
          /**
           * timeTo must be greater than timeFrom
          */
          validate: () => new Date(timeTo) > new Date(timeFrom),
        })}
        defaultValue={defaultValues.timeTo}
        value={timeTo}
        onChange={(value) => setValue('timeTo', value, true)}
        minimumDate={new Date(timeFrom)}
      />

      {props.channel.freeStreamAllowance > 0 && (
        <View>
          <Text>Free Stream?</Text>
          <Switch
            onValueChange={setIsFree}
            value={isFree}
          />
        </View>
      )}

      {!isFree && (
        <TextInput
          ref={() => register({ name: 'cost' }, {
            required: true,
            validate: (v) => v && parseInt(v, 10) > 0,
          })}
          onChangeText={(text) => setValue('cost', parseInt(text, 10), true)}
          placeholder="Cost"
          returnKeyType="next"
          keyboardType='numeric'
          defaultValue={defaultValues.cost ? `${defaultValues.cost}` : undefined}
        />
      )}

      <EditableAsyncImage
        setRef={
          register(
            { name: 'image' },
            { required: false },
          )
        }
        asyncImageProps={{
          /**
           * TODO - add placeholder images
           */
          splashUrl: props.data?.image?.url?.full ?? 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=5&q=80',
          fullUrl: props.data?.image?.url?.full ?? 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
          containerProps: {
            style: {
              width: 250,
              height: 250,
            },
          },
        }}
        onChange={async (file) => setValue('image', file, true)}
      >
        {({ selectedAsset, openPicker, onCancel }) => (
          <>
            <Button
              title="Change"
              onPress={openPicker}
            />

            <Button
              title="Cancel"
              disabled={!selectedAsset}
              onPress={onCancel}
            />
          </>
        )}
      </EditableAsyncImage>

      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        disabled={putLoading || updateLoading || !isValid || !dirty}
      />
    </ScrollView>
  );
};

export default CreateUpdateStream;
