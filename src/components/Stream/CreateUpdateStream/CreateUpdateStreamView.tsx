import React, { useState, useEffect, useRef, FC } from 'react';
import { ScrollView, Switch, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { ReactNativeFile } from 'apollo-upload-client';
import { useToast } from 'mbp-components-rn-toast';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import ImageResizer from 'react-native-image-resizer';
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
import DurationInput from '../../UI/Form/components/DurationInput';
import DateInput from '../../UI/Form/components/DateInput';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import StreamStates from './components/StreamStates/StreamStates';

type FormData = {
  image: PhotoIdentifier['node'];
  name: string;
  info: string;
  timeFrom: string;
  timeTo: string;
  duration: number;
  isFree: boolean;
  cost: string;
  audioOnly: boolean;
};

interface CreateUpdateStreamViewProps {
  data?: STREAM_SELF_FRAGMENT;
}

const CreateUpdateStreamView: FC<CreateUpdateStreamViewProps> = (props) => {
  const { data: { getChannelSelf } } = useGetChannelSelfQuery();


  /**
   * Form
   */
  const { register, setValue, handleSubmit, getValues, watch, errors, formState: { isValid, dirty, dirtyFields }, triggerValidation } = useForm<FormData>({
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
        timeFrom: new Date(Date.now() + 3600000).toISOString(), // 1 hour
        timeTo: new Date(Date.now() + 7200000).toISOString(), // 2 hours (1 hour duration)
        duration: 3.6e+6, // 1 hour
        isFree: false,
        cost: `${getChannelSelf.creditMinimumStreamCost}`,
        image: undefined,
        audioOnly: false,
      },
  });
  const [defaultValues] = useState(getValues());


  /**
   * Refs
   */
  const infoRef = useRef(null);
  const startDateRef = useRef(null);
  const startTimeRef = useRef(null);
  const durationRef = useRef(null);


  /**
   * Misc
   */
  const toast = useToast();
  const safeAreaInsets = useSafeArea();
  const [loading, setLoading] = useState(false);


  /**
   * Put stream mutation
   */
  const [putStreamMutation] = usePutStreamMutation({
    onCompleted: () => {
      setLoading(false);

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
      setLoading(false);

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
  const [updateStreamMutation] = useUpdateStreamMutation({
    onCompleted: () => {
      setLoading(false);

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
      setLoading(false);

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
   * Resize image and return ReactNativeFile
   */
  const processImage = async (asset: PhotoIdentifier['node']) => {
    const image = await ImageResizer.createResizedImage(asset.image.uri, 800, 800, 'JPEG', 100);
    return new ReactNativeFile({
      uri: image.uri,
      name: image.name,
      type: 'image/jpeg',
    });
  };


  /**
   * On Submit execute putStreamMutation/updateStreamMutation with form data
   */
  const onSubmit = async (variables: FormData) => {
    setLoading(true);

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


      /**
       * Catch processImage errors
       */
      try {
        updateStreamMutation({
          variables: {
            ...changed,
            cost: changed.cost ? parseInt(variables.cost, 10) : undefined,
            image: changed.image ? await processImage(changed.image) : undefined,
            id: props.data.id,
          },
        });
      } catch {
        setLoading(false);

        toast.push({
          duration: 1000,
          component: (
            <Toast type="ERROR" content='Something went wrong' />
          ),
          dismissible: false,
        });
      }
    } else {
      /**
       * Catch processImage errors
       */
      try {
        putStreamMutation({
          variables: {
            name: variables.name,
            info: variables.info,
            timeFrom: variables.timeFrom,
            timeTo: variables.timeTo,
            cost: parseInt(variables.cost, 10),
            audioOnly: variables.audioOnly,
            image: await processImage(variables.image),
          },
        });
      } catch {
        setLoading(false);

        toast.push({
          duration: 1000,
          component: (
            <Toast type="ERROR" content='Something went wrong' />
          ),
          dismissible: false,
        });
      }
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
    register({ name: 'image' }, { required: true });

    register(
      { name: 'name' },
      {
        required: true,
        validate: (v) => {
          if (!v) return false;

          if (v.length < 3) {
            return 'Minimum 3 characters';
          }

          return true;
        },
      },
    );

    register(
      { name: 'info' },
      {
        required: true,
        validate: (v) => {
          if (!v) return 'Please enter some information';

          if (v.length < 3) {
            return 'Minimum 3 characters';
          }

          return true;
        },
      },
    );

    register({ name: 'timeFrom' }, { required: true });
    register({ name: 'timeTo' }, { required: true });
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
          return !isNaN(n) && n >= getChannelSelf.creditMinimumStreamCost;
        }

        /**
         * If free is true, this value will be set to 0, and is valid
         */
        return true;
      },
    });

    register({ name: 'audioOnly' }, { required: false });
  }, []);


  return (
    <View style={GlobalStyles.PageFill}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={GlobalStyles.PageFill}
      >
        <ScrollView style={GlobalStyles.PageFill}>
          <EditableAsyncImage
            asyncImageProps={{
              splashUrl: props.data?.image?.url?.splash,
              fullUrl: props.data?.image?.url?.full,
              containerProps: {
                style: Styles.image,
              },
            }}
            onChange={(file) => setValue('image', file, true)}
          />

          <View style={Styles.form}>
            <View style={Styles.section}>
              <H2>Description</H2>

              <TextInput
                  name="name"
                  onChangeText={(text) => {
                    // Validate on change if there's an error, otherwise validate onBlur
                    setValue('name', text, !!errors.name);
                  }}
                  placeholder="Enter your stream's name"
                  defaultValue={defaultValues.name}
                  returnKeyType="next"
                  errors={errors}
                  onBlur={() => triggerValidation('name', true)}
                  onSubmitEditing={() => {
                    // eslint-disable-next-line no-unused-expressions
                    infoRef.current?.focus();
                  }}
                  wrapStyle={Styles.inputWrap}
              />

              <TextArea
                name="info"
                onChangeText={(text) => {
                  // Validate on change if there's an error, otherwise validate onBlur
                  setValue('info', text, !!errors.info);
                }}
                setRef={(e) => {
                  infoRef.current = e;
                }}
                placeholder="Enter your stream's info"
                defaultValue={defaultValues.info}
                errors={errors}
                onBlur={() => triggerValidation('info', true)}
                onSubmitEditing={() => {
                  // eslint-disable-next-line no-unused-expressions
                  startDateRef.current?.focus();
                }}
                wrapStyle={Styles.inputWrap}
              />
            </View>

            <View style={Styles.section}>
              <H2>Schedule</H2>

              <DateInput
                value={timeFrom}
                inputRef={startDateRef}
                mode="date"
                onChange={(value) => {
                  setValue('timeFrom', value, true);
                  setValue('timeTo', new Date(new Date(value).getTime() + duration).toISOString(), true);
                }}
                minimumDate={new Date()}
                wrapStyle={Styles.inputWrap}
              />

              <DateInput
                value={timeFrom}
                inputRef={startTimeRef}
                mode="time"
                onChange={(value) => {
                  setValue('timeFrom', value, true);
                  setValue('timeTo', new Date(new Date(value).getTime() + duration).toISOString(), true);
                }}
                minimumDate={new Date()}
                wrapStyle={Styles.inputWrap}
              />

              <DurationInput
                hoursValue={(new Date(timeTo).getTime() - new Date(timeFrom).getTime()) / 3.6e+6}
                minutesValue={(new Date(timeTo).getTime() - new Date(timeFrom).getTime()) / 60000}
                inputRef={durationRef}
                onChange={(value) => {
                  setValue('duration', value, true);
                  setValue('timeTo', new Date(new Date(timeFrom).getTime() + value).toISOString(), true);
                }}
                wrapStyle={Styles.inputWrap}
              />
            </View>

            <View style={Styles.section}>
              <H2>Price</H2>

              {getChannelSelf.freeStreamAllowance > 0 && (
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
              <View style={[{ display: isFree ? 'none' : 'flex' }, Styles.inputWrap]}>
                <TextInput
                  name="cost"
                  onChangeText={(value) => setValue('cost', value, true)}
                  placeholder="Cost"
                  returnKeyType="next"
                  keyboardType='numeric'
                  defaultValue={defaultValues.cost}
                  wrapStyle={Styles.inputWrap}
                  errors={errors}
                />
              </View>
            </View>

            <View style={Styles.section}>
              <H2>Settings</H2>
              <View style={[Styles.toggleInput, Styles.inputWrap]}>
                <Body style={Styles.toggleInputLabel}>Audio Only</Body>
                <Switch
                  onValueChange={(value) => setValue('audioOnly', value, true)}
                  value={watch('audioOnly')}
                />
              </View>

              {props.data && (
                <View style={Styles.inputWrap}>
                  <StreamStates data={props.data} />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View
        style={{
          paddingBottom: safeAreaInsets.bottom,
        }}
      >
        <Button
          title={loading ? `${props.data ? 'Updating' : 'Creating'}` : `${props.data ? 'Update' : 'Create'} Stream`}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || !dirty}
          loading={loading}
          style={Styles.button}
        />
      </View>
    </View>
  );
};

export default CreateUpdateStreamView;
