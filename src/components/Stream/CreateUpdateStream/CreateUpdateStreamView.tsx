import React, { useState, useEffect, useRef, FC, useMemo } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { ReactNativeFile } from 'apollo-upload-client';
import { useToast } from 'mbp-components-rn-toast';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import ImageResizer from 'react-native-image-resizer';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { usePutStreamMutation } from '../../../API/mutation/putStream/putStream';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import { useUpdateStreamMutation } from '../../../API/mutation/updateStream/updateStream';
import { EditableAsyncImage } from '../../UI/EditableAsyncImage/EditableAsyncImage';
import Styles from './CreateUpdateStream.style';
import H2 from '../../UI/Typography/components/H2';
import TextInput from '../../UI/Form/components/TextInput/TextInput';
import TextArea from '../../UI/Form/components/TextArea/TextArea';
import Button from '../../UI/Button/Button';
import Body from '../../UI/Typography/components/Body';
import DurationInput from '../../UI/Form/components/DurationInput/DurationInput';
import DateInput from '../../UI/Form/components/DateInput/DateInput';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import StreamStates from './components/StreamStates/StreamStates';
import { getStreamSelfsVariables, getStreamSelfs } from '../../../API/query/getStreamSelfs/__generated__/getStreamSelfs';
import { GET_STREAM_SELFS_QUERY } from '../../../API/query/getStreamSelfs/getStreamSelfs';
import { getChannelSelf_getChannelSelf } from '../../../API/query/getChannelSelf/__generated__/getChannelSelf';
import Switch from '../../UI/Form/components/Switch/Switch';

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
  channelData: getChannelSelf_getChannelSelf;
  data?: STREAM_SELF_FRAGMENT;
  getStreamSelfsVariables?: getStreamSelfsVariables;
  canPopRef: React.MutableRefObject<boolean>;
  onPop: () => void;
}

const CreateUpdateStreamView: FC<CreateUpdateStreamViewProps> = (props) => {
  const [data, setData] = useState(props.data);


  /**
   * Form
   */
  const { register, setValue, handleSubmit, getValues, watch, errors, formState: { isValid, dirty, dirtyFields }, triggerValidation, reset } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: data
      ? {
        name: data.name,
        info: data.info,
        timeFrom: data.timeFrom,
        timeTo: data.timeTo,
        duration: new Date(data.timeTo).getTime() - new Date(data.timeFrom).getTime(),
        isFree: data.cost === 0,
        cost: `${data.cost}`,
        image: undefined,
        audioOnly: data.audioOnly,
      }
      : (() => {
        // Get now rounded to next hour
        const timeFrom = new Date();
        timeFrom.setHours(timeFrom.getHours() + Math.round(timeFrom.getMinutes() / 60) + 1);
        timeFrom.setMinutes(0, 0, 0);

        return {
          name: '',
          info: '',
          timeFrom: timeFrom.toISOString(),
          timeTo: new Date(timeFrom.getTime() + 3.6e+6).toISOString(), // 1 hour duration
          duration: 3.6e+6, // 1 hour
          isFree: false,
          cost: `${props.channelData.creditMinimumStreamCost}`,
          image: undefined,
          audioOnly: false,
        };
      })(),
  });
  const [defaultValues] = useState(getValues());


  /**
   * When field becomes dirty, set canPopRef to false to alert user there are changes
   */
  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    props.canPopRef.current = !dirty;
  }, [dirty]);


  /**
   * Refs
   */
  const infoRef = useRef(null);
  const startDateRef = useRef(null);
  const startTimeRef = useRef(null);
  const durationRef = useRef(null);
  const imageResetRef = useRef(null);


  /**
   * Misc
   */
  const toast = useToast();
  const safeAreaInsets = useSafeArea();
  const [loading, setLoading] = useState(false);


  /**
   * Form is not editable if stream is cancelled
   */
  const editable = useMemo(() => !props.data?.cancelled, [props.data?.cancelled]);


  /**
   * Put stream mutation
   */
  const [putStreamMutation, { client }] = usePutStreamMutation({
    onCompleted: ({ putStream }) => {
      setLoading(false);

      // Set data in state so the form becomes update form
      setData(putStream);

      // Reset form
      reset({
        name: putStream.name,
        info: putStream.info,
        image: undefined,
        timeFrom: putStream.timeFrom,
        timeTo: putStream.timeTo,
        duration: new Date(putStream.timeTo).getTime() - new Date(putStream.timeFrom).getTime(),
        isFree: putStream.cost === 0,
        cost: `${putStream.cost}`,
        audioOnly: putStream.audioOnly,
      });

      // Reset image
      // eslint-disable-next-line no-unused-expressions
      imageResetRef.current?.();


      /**
       * Prepend stream in GET_STREAM_SELFS_QUERY
       */
      try {
        const queryData = client.readQuery<getStreamSelfs, getStreamSelfsVariables>({
          query: GET_STREAM_SELFS_QUERY,
          variables: props.getStreamSelfsVariables,
        });

        client.writeQuery<getStreamSelfs, getStreamSelfsVariables>({
          query: GET_STREAM_SELFS_QUERY,
          variables: props.getStreamSelfsVariables,
          data: {
            ...queryData,
            getStreamSelfs: {
              ...queryData.getStreamSelfs,
              streams: [putStream, ...queryData.getStreamSelfs.streams],
              count: queryData.getStreamSelfs.count + 1,
            },
          },
        });
      // eslint-disable-next-line no-empty
      } catch {}


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
    onCompleted: ({ updateStream }) => {
      setLoading(false);

      // Update data as it's in state
      setData(updateStream);

      // Reset form
      reset({
        name: updateStream.name,
        info: updateStream.info,
        image: undefined,
        timeFrom: updateStream.timeFrom,
        timeTo: updateStream.timeTo,
        isFree: updateStream.cost === 0,
        cost: `${updateStream.cost}`,
        audioOnly: updateStream.audioOnly,
      });

      // Reset image
      // eslint-disable-next-line no-unused-expressions
      imageResetRef.current?.();

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

    if (data) {
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
            id: data.id,
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
  const isFree = watch('isFree');
  const duration = watch('duration');


  /**
   * Register form
   * Inputs are required if create form (no data)
   */
  useEffect(() => {
    register({ name: 'image' }, { required: !data });

    register(
      { name: 'name' },
      {
        required: !data,
        validate: (v) => {
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
        // If required, provide error message
        required: !data ? 'Please enter some information' : false,
        validate: (v) => {
          if (v.length < 3) {
            return 'Minimum 3 characters';
          }

          return true;
        },
      },
    );

    register({ name: 'timeFrom' }, { required: !data });
    register({ name: 'timeTo' }, { required: !data });
    register({ name: 'duration' }, { required: !data });
    register({ name: 'isFree' }, { required: false });
    register({ name: 'cost' }, {
      required: !data,
      validate: (v) => {
        /**
         * If isFree is false, cost must be greater than creditMinimumStreamCost
         */
        if (!watch('isFree')) {
          const n = parseInt(v, 10);

          if (n < props.channelData.creditMinimumStreamCost) {
            return 'Value does not meet minimum cost';
          }

          // eslint-disable-next-line no-restricted-globals
          return !isNaN(n) && n >= props.channelData.creditMinimumStreamCost;
        }

        /**
         * If free is true, this value will be set to 0, and is valid
         */
        return true;
      },
    });

    register({ name: 'audioOnly' }, { required: false });
  }, [register]);


  return (
    <View style={GlobalStyles.PageFill}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={GlobalStyles.PageFill}
      >
        <ScrollView style={GlobalStyles.PageFill}>
          {
            editable
              ? (
                <EditableAsyncImage
                  resetRef={imageResetRef}
                  asyncImageProps={{
                    splashUrl: data?.image?.url?.splash,
                    fullUrl: data?.image?.url?.full,
                    containerProps: {
                      style: Styles.image,
                    },
                  }}
                  onChange={(file) => setValue('image', file, true)}
                  loading={loading}
                />
              )
              : (
                <AsyncImage
                  splashUrl={data?.image?.url?.splash}
                  fullUrl={data?.image?.url?.full}
                  containerProps={{
                    style: Styles.image,
                  }}
                />
              )
          }

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
                editable={editable}
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
                editable={editable}
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
                editable={editable}
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
                editable={editable}
              />

              <DurationInput
                value={duration}
                inputRef={durationRef}
                onChange={(value) => {
                  setValue('duration', value, true);
                  setValue('timeTo', new Date(new Date(timeFrom).getTime() + value).toISOString(), true);
                }}
                wrapStyle={Styles.inputWrap}
                editable={editable}
              />
            </View>

            <View style={Styles.section}>
              <H2>Price &copy;</H2>

              {/* eslint-disable-next-line react-native/no-inline-styles */}
              <View style={{ display: isFree ? 'none' : 'flex' }}>
                {editable && <Body>Minimum Price: &copy; {props.channelData.creditMinimumStreamCost}</Body>}
                <TextInput
                  name="cost"
                  onChangeText={(value) => setValue('cost', value, true)}
                  placeholder="Cost"
                  returnKeyType="next"
                  keyboardType='numeric'
                  defaultValue={defaultValues.cost}
                  wrapStyle={Styles.inputWrap}
                  errors={errors}
                  editable={editable}
                />
              </View>

              {editable && props.channelData.freeStreamAllowance > 0 && (
                <View style={Styles.inputWrap}>
                  <View style={Styles.toggleInput}>
                    <Body bold style={Styles.toggleInputLabel}>Free Stream?</Body>
                    <Switch
                      onValueChange={(value) => {
                        setValue('isFree', value);
                        setValue('cost', value ? '0' : defaultValues.cost, true);
                      }}
                      value={isFree}
                    />
                  </View>
                  <View style={Styles.inputWrap}>
                    <Body>Free allowance: {props.channelData.freeStreamAllowance}</Body>
                  </View>
                </View>
              )}
            </View>
          </View>

          <View style={[Styles.section, Styles.settings]}>
            <H2>Settings</H2>
            <View style={[Styles.toggleInput, Styles.inputWrap, !editable && Styles.disabled]}>
              <Body bold style={Styles.toggleInputLabel}>Audio Only</Body>
              <Switch
                onValueChange={(value) => setValue('audioOnly', value, true)}
                value={watch('audioOnly')}
              />
            </View>

            {data && (
              <View style={Styles.inputWrap}>
                <StreamStates
                  data={data}
                  getStreamSelfsVariables={props.getStreamSelfsVariables}
                  onPop={props.onPop}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {editable && (
        <View
          style={{
            paddingBottom: safeAreaInsets.bottom,
          }}
        >
          <Button
            title={loading ? `${data ? 'Updating' : 'Creating'}` : `${data ? 'Update' : 'Create'} Stream`}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || !dirty}
            loading={loading}
            style={Styles.button}
          />
        </View>
      )}
    </View>
  );
};

export default CreateUpdateStreamView;
