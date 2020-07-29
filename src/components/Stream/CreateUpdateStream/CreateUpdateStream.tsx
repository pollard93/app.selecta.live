import React, { useState, useEffect } from 'react';
import { ScrollView, Switch, View, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { ReactNativeFile } from 'apollo-upload-client';
import { useToast } from 'mbp-components-rn-toast';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { usePutStreamMutation } from '../../../API/mutation/putStream/putStream';
import DateTimePickerInput from '../../UI/DateTimePicker/components/DateTimePickerInput/DateTimePickerInput';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import { useUpdateStreamMutation } from '../../../API/mutation/updateStream/updateStream';
import { CHANNEL_SELF_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_SELF_FRAGMENT';
import { EditableAsyncImage } from '../../UI/EditableAsyncImage/EditableAsyncImage';
import Styles from './CreateUpdateStream.style';
import H2 from '../../UI/Typography/components/H2';
import TextInput from '../../UI/Form/components/TextInput';
import TextArea from '../../UI/Form/components/TextArea';
import Button from '../../UI/Button/Button';
import Body from '../../UI/Typography/components/Body';
import TimeInput from '../../UI/Form/components/TimeInput';
import DateInput from '../../UI/Form/components/DateInput';

type FormData = {
  name: string;
  info: string;
  timeFrom: string;
  timeTo: string;
  isFree: boolean;
  cost: string;
  image: ReactNativeFile;
  audioOnly: boolean;
};

interface CreateUpdateStreamProps {
  channel: CHANNEL_SELF_FRAGMENT;
  data?: STREAM_SELF_FRAGMENT;
}

const CreateUpdateStream = (props: CreateUpdateStreamProps) => {
  const { register, setValue, handleSubmit, getValues, watch, errors, formState: { isValid, dirty, dirtyFields } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: props.data
      ? {
        name: props.data.name,
        info: props.data.info,
        timeFrom: props.data.timeFrom,
        timeTo: props.data.timeTo,
        isFree: props.data.cost === 0,
        cost: `${props.data.cost}`,
        image: undefined,
        audioOnly: props.data.audioOnly,
      }
      : {
        name: '',
        info: '',
        timeFrom: new Date().toISOString(), // now
        timeTo: new Date(Date.now() + 3600000).toISOString(), // 1 hour
        isFree: false,
        cost: `${props.channel.creditMinimumStreamCost}`,
        image: undefined,
        audioOnly: false,
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
   * On Submit execute putStreamMutation/updateStreamMutation with form data
   */
  const onSubmit = (variables: FormData) => {
    if (props.data) {
      /**
       * Map over the form variables and only return
       * varibales the appear in the dirty fields list
       * so we only send up changed fields
      */
      const changed: Partial<FormData> = Object.entries(variables).reduce((p, [key, value]) => {
        if (dirtyFields.has(key)) {
          return {
            ...p,
            [key]: value,
          };
        }

        return p;
      }, {});

      updateStreamMutation({
        variables: {
          ...changed,
          cost: changed.cost ? parseInt(variables.cost, 10) : undefined,
          image: changed.image ? new ReactNativeFile({
            uri: changed.image.image.uri,
            name: changed.image.image.filename,
            type: changed.image.type,
          }) : undefined,
          id: props.data.id,
        },
      });
    } else {
      putStreamMutation({
        variables: {
          name: variables.name,
          info: variables.info,
          timeFrom: variables.timeFrom,
          timeTo: variables.timeTo,
          cost: parseInt(variables.cost, 10),
          audioOnly: variables.audioOnly,
          image: variables.image ? new ReactNativeFile({
            uri: variables.image.image.uri,
            name: variables.image.image.filename,
            type: variables.image.type,
          }) : undefined,
        },
      });
    }
  };


  /**
   * Watch times so they can be validated against eachother
   */
  const timeFrom = watch('timeFrom');
  const timeTo = watch('timeTo');
  const isFree = watch('isFree');
  const cost = watch('cost');
  const duration = watch('duration');


  /**
   * Register form
   */
  useEffect(() => {
    register(
      { name: 'name' },
      { required: true, validate: (v) => v && v.length },
    );

    register(
      { name: 'info' },
      { required: true, validate: (v) => v && v.length },
    );

    register({ name: 'timeFrom' }, { required: true });
    register({ name: 'duration' }, { required: true });
    register({ name: 'isFree' }, { required: false });
    register({ name: 'cost' }, {
      required: true,
      validate: (v) => {
        /**
         * If isFree is false, cost must be greater than creditMinimumStreamCost
         */
        if (!watch('isFree')) {
          const n = parseInt(v, 10);
          // eslint-disable-next-line no-restricted-globals
          return !isNaN(n) && n >= props.channel.creditMinimumStreamCost;
        }

        /**
         * If free is true, this value will be set to 0, and is valid
         */
        return true;
      },
    });

    register({ name: 'image' }, { required: false });

    register({ name: 'audioOnly' }, { required: false });
  }, []);


  /**
   * Watch for duration change
   */
  useEffect(() => {
    if (duration) {
      /** Add duration to the timeFrom to calculate timeTo */
      const value = 0;

      setValue('timeFrom', value, true);
    }
  }, [duration]);


  return (
    <ScrollView style={GlobalStyles.PageFill}>
      <EditableAsyncImage
        asyncImageProps={{
          /**
           * TODO - add placeholder images
           */
          splashUrl: props.data?.image?.url?.full ?? 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=5&q=80',
          fullUrl: props.data?.image?.url?.full ?? 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
          containerProps: {
            style: {
              flex: 1,
              height: 250,
            },
          },
        }}
        onChange={(file) => setValue('image', file, true)}
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

      <View style={Styles.form}>
        <View style={Styles.section}>
          <H2>Description</H2>

          <TextInput
            name="name"
            onChangeText={(text) => setValue('name', text, true)}
            placeholder="Name"
            returnKeyType="next"
            defaultValue={defaultValues.name}
            style={[Styles.input, Styles.inputWrap]}
          />

          <TextArea
            onChangeText={(text) => setValue('info', text, true)}
            placeholder="Info"
            returnKeyType="next"
            defaultValue={defaultValues.info}
            style={[Styles.infoArea, Styles.inputWrap]}
          />
        </View>

        <View style={Styles.section}>
          <H2>Schedule</H2>

          <DateInput
            defaultValue={defaultValues.timeFrom}
            onChange={(value) => {
              setValue('timeFrom', value, true);

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

          <TimeInput
            value={timeFrom}
            defaultValue={timeFrom ?? defaultValues.timeFrom}
            onChange={(value) => {
              setValue('timeFrom', value, true);

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
        </View>

        <View style={Styles.section}>
          <H2>Price</H2>

          {props.channel.freeStreamAllowance > 0 && (
            <View style={[Styles.toggleInput, Styles.inputWrap]}>
              <Body style={Styles.toggleInputLabel}>Free Stream?</Body>
              <Switch
                onValueChange={(value) => {
                  setValue('isFree', value);
                  setValue('cost', value ? '0' : defaultValues.cost, true);
                }}
                value={isFree}
              />
            </View>
          )}

          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <View style={{ display: isFree ? 'none' : 'flex' }}>
            <TextInput
              name="cost"
              onChangeText={(value) => setValue('cost', value, true)}
              placeholder="Cost"
              returnKeyType="next"
              keyboardType='numeric'
              defaultValue={defaultValues.cost}
              style={[Styles.input, Styles.inputWrap]}
              errors={errors}
            />
          </View>
        </View>

        <View style={[Styles.section, Styles.settings]}>
          <H2>Settings</H2>
          <View style={[Styles.toggleInput, Styles.inputWrap]}>
            <Body style={Styles.toggleInputLabel}>Audio Only</Body>
            <Switch
              onValueChange={(value) => setValue('audioOnly', value, true)}
              value={watch('audioOnly')}
            />
          </View>
        </View>

        <Button
          title="Submit"
          type="SECONDARY"
          onPress={handleSubmit(onSubmit)}
          disabled={putLoading || updateLoading || !isValid || !dirty}
        />
      </View>
    </ScrollView>
  );
};

export default CreateUpdateStream;
