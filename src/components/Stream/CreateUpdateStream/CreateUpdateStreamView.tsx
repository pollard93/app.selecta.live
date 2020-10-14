import React, { useState, useEffect, useRef, FC, useMemo, MutableRefObject } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { ReactNativeFile } from 'apollo-upload-client';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import ImageResizer from 'react-native-image-resizer';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useDynamicValue } from 'react-native-dynamic';
import { useApolloClient } from 'react-apollo';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage, parseCurrency } from '../../../utils/functions';
import { usePutStreamMutation } from '../../../API/mutation/putStream/putStream';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import { useUpdateStreamMutation } from '../../../API/mutation/updateStream/updateStream';
import { EditableAsyncImage } from '../../UI/EditableAsyncImage/EditableAsyncImage';
import Styles, { DynamicStyles } from './CreateUpdateStream.style';
import H3 from '../../UI/Typography/components/H3';
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
import { getChannelSelf_getChannelSelf, getChannelSelf } from '../../../API/query/getChannelSelf/__generated__/getChannelSelf';
import Switch from '../../UI/Form/components/Switch/Switch';
import { GET_STREAM_SELF_QUERY } from '../../../API/query/getStreamSelf/getStreamSelf';
import { getStreamSelf, getStreamSelfVariables } from '../../../API/query/getStreamSelf/__generated__/getStreamSelf';
import { pushToast } from '../../../modules/Toast';
import { GET_CHANNEL_SELF_QUERY } from '../../../API/query/getChannelSelf/getChannelSelf';
import { getChannelSelfsVariables } from '../../../API/query/getChannelSelfs/__generated__/getChannelSelfs';
import spacing from '../../../styles/definitions/spacing';
import Icon, { ICON } from '../../UI/Icon/Icon';
import { openModalScreen } from '../../../screens/utils';
import Tags from '../../Tag/Tags/Tags';
import TagsPreview from '../../Tag/TagsPreview/TagsPreview';

type FormData = {
  image: PhotoIdentifier['node'];
  name: string;
  info: string;
  tags: string[];
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
  onCreated: (id: string) => void;
  getStreamSelfsVariables?: getStreamSelfsVariables;
  canPopRef: React.MutableRefObject<boolean>;
  onPop: () => void;
  innerRef?: MutableRefObject<ScrollView>;
}

const CreateUpdateStreamView: FC<CreateUpdateStreamViewProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);
  const client = useApolloClient();


  /**
   * Form
   */
  const { register, setValue, handleSubmit, getValues, watch, errors, formState: { dirty, dirtyFields }, triggerValidation, reset } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: props.data
      ? {
        name: props.data.name,
        info: props.data.info,
        tags: props.data.tags.map((t) => t.title),
        timeFrom: props.data.timeFrom,
        timeTo: props.data.timeTo,
        duration: new Date(props.data.timeTo).getTime() - new Date(props.data.timeFrom).getTime(),
        isFree: props.data.cost === 0,
        cost: `${Math.max(props.data.cost, props.channelData.creditMinimumStreamCost)}`,
        image: undefined,
        audioOnly: props.data.audioOnly,
      }
      : (() => {
        // Get now rounded to next hour
        const timeFrom = new Date();
        timeFrom.setHours(timeFrom.getHours() + Math.round(timeFrom.getMinutes() / 60) + 1);
        timeFrom.setMinutes(0, 0, 0);

        return {
          name: '',
          info: '',
          tags: undefined,
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


  /**
   * Get default values and update them when register changes (form switched to update form)
   */
  const defaultValues = useMemo(() => getValues(), [register]);


  /**
   * When field becomes dirty, set canPopRef to false to alert user there are changes
   */
  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    props.canPopRef.current = !dirty;
  }, [dirty]);


  /**
   * When stream is cancelled, allow pop without alert
   */
  useEffect(() => {
    if (props.data?.cancelled) {
      // eslint-disable-next-line no-param-reassign
      props.canPopRef.current = true;
    }
  }, [props.data?.cancelled]);


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
  const safeAreaInsets = useSafeArea();
  const [loading, setLoading] = useState(false);


  /**
   * Form is not editable if stream is cancelled
   */
  const editable = useMemo(() => !props.data?.cancelled, [props.data?.cancelled]);


  /**
   * Update channel self cache
   */
  const updateChannelSelf = (dataToUpdate: Partial<getChannelSelf_getChannelSelf>) => {
    try {
      client.writeQuery<getChannelSelf, getChannelSelfsVariables>({
        query: GET_CHANNEL_SELF_QUERY,
        data: {
          getChannelSelf: {
            ...props.channelData,
            ...dataToUpdate,
          },
        },
      });
    // eslint-disable-next-line no-empty
    } catch {}
  };


  /**
   * Put stream mutation
   */
  const [putStreamMutation] = usePutStreamMutation({
    onCompleted: async ({ putStream }) => {
      setLoading(false);

      /**
       * When stream has been created
       * Execute getStreamSelf query to cache it
       * Execute props.onCreated to set the id in parent
       * Then this component will receive props.data and begin to listen for changes in cache
       */
      try {
        await client.query<getStreamSelf, getStreamSelfVariables>({
          query: GET_STREAM_SELF_QUERY,
          variables: {
            id: putStream.id,
          },
        });
      // eslint-disable-next-line no-empty
      } catch {}

      // Set id in parent so this form becomes an update form
      props.onCreated(putStream.id);

      // Reset form
      reset({
        name: putStream.name,
        info: putStream.info,
        tags: putStream.tags.map((t) => t.title),
        image: undefined,
        timeFrom: putStream.timeFrom,
        timeTo: putStream.timeTo,
        duration: new Date(putStream.timeTo).getTime() - new Date(putStream.timeFrom).getTime(),
        isFree: putStream.cost === 0,
        cost: `${Math.max(putStream.cost, props.channelData.creditMinimumStreamCost)}`,
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
       * Reduce freeStreamAllowance
       */
      if (putStream.cost === 0) {
        updateChannelSelf({
          freeStreamAllowance: Math.max(props.channelData.freeStreamAllowance - 1, 0),
        });
      }


      /**
       * Success toast
       */
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="SUCCESS"
            content='Created stream'
          />
        ),
        dismissible: false,
      });
    },
    onError: (e) => {
      setLoading(false);

      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
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

      // Reset form
      reset({
        name: updateStream.name,
        info: updateStream.info,
        tags: updateStream.tags.map((t) => t.title),
        image: undefined,
        timeFrom: updateStream.timeFrom,
        timeTo: updateStream.timeTo,
        isFree: updateStream.cost === 0,
        cost: `${Math.max(updateStream.cost, props.channelData.creditMinimumStreamCost)}`,
        audioOnly: updateStream.audioOnly,
      });

      // Reset image
      // eslint-disable-next-line no-unused-expressions
      imageResetRef.current?.();


      /**
       * Reduce freeStreamAllowance
       */
      if (!defaultValues.isFree && updateStream.cost === 0) {
        updateChannelSelf({
          freeStreamAllowance: Math.max(props.channelData.freeStreamAllowance - 1, 0),
        });
      }

      /**
       * Increase freeStreamAllowance
       */
      if (defaultValues.isFree && updateStream.cost !== 0) {
        updateChannelSelf({
          freeStreamAllowance: Math.max(props.channelData.freeStreamAllowance + 1, 0),
        });
      }


      /**
       * Success toast
       */
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="SUCCESS"
            content='Updated stream'
          />
        ),
        dismissible: false,
      });
    },
    onError: (e) => {
      setLoading(false);

      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
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


    /**
     * zeros cost if isFree
     */
    const getCost = () => (variables.isFree ? 0 : parseInt(variables.cost, 10));


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
            cost: changed.cost != null || changed.isFree != null ? getCost() : undefined,
            image: changed.image != null ? await processImage(changed.image) : undefined,
            id: props.data.id,
          },
        });
      } catch {
        setLoading(false);

        pushToast({
          duration: 1000,
          component: (
            <Toast
              type="ERROR"
              content='Something went wrong'
            />
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
            tags: variables.tags,
            timeFrom: variables.timeFrom,
            timeTo: variables.timeTo,
            cost: getCost(),
            audioOnly: variables.audioOnly,
            image: await processImage(variables.image),
          },
        });
      } catch {
        setLoading(false);

        pushToast({
          duration: 1000,
          component: (
            <Toast
              type="ERROR"
              content='Something went wrong'
            />
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
  const cost = watch('cost');
  const tags = watch('tags');


  /**
   * Free stream allowance to display
   */
  const freeStreamAllowance = useMemo(() => {
    if (!defaultValues.isFree && isFree) {
      return props.channelData.freeStreamAllowance - 1;
    }

    if (defaultValues.isFree && !isFree) {
      return props.channelData.freeStreamAllowance + 1;
    }

    return props.channelData.freeStreamAllowance;
  }, [isFree, props.channelData.freeStreamAllowance]);


  /**
   * User can only edit free stream if they have allowance, or the stream is free
   */
  const canEditFreeStream = useMemo(() => {
    if (props.channelData.freeStreamAllowance > 0 || defaultValues.isFree) {
      return true;
    }

    return false;
  }, [isFree, props.channelData.freeStreamAllowance]);


  /**
   * Register form
   * Inputs are required if create form (no data)
   */
  useEffect(() => {
    register({ name: 'image' }, { required: !props.data });

    register(
      { name: 'name' },
      {
        required: !props.data,
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
        required: !props.data ? 'Please enter some information' : false,
        validate: (v) => {
          if (v.length < 3) {
            return 'Minimum 3 characters';
          }

          return true;
        },
      },
    );

    register({ name: 'tags' }, { required: false });
    register({ name: 'timeFrom' }, { required: !props.data });
    register({ name: 'timeTo' }, { required: !props.data });
    register({ name: 'duration' }, { required: !props.data });
    register({ name: 'isFree' }, { required: false });
    register({ name: 'cost' }, {
      required: !props.data,
      validate: (v) => {
        const n = parseInt(v, 10);

        if (n < props.channelData.creditMinimumStreamCost) {
          return 'Value does not meet minimum price';
        }

        // eslint-disable-next-line no-restricted-globals
        return !isNaN(n) && n >= props.channelData.creditMinimumStreamCost;
      },
    });

    register({ name: 'audioOnly' }, { required: false });
  }, [register]);


  /**
   * Toast if image error
   */
  useEffect(() => {
    if (errors.image) {
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content='Please add an image'
          />
        ),
        dismissible: false,
      });
    }
  }, [errors.image]);


  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={GlobalStyles.PageFill}
      >
        <ScrollView
          bounces={false}
          contentContainerStyle={{ paddingBottom: spacing.small }}
          ref={props.innerRef}
          style={GlobalStyles.PageFill}
        >
          {
            editable
              ? (
                <EditableAsyncImage
                  resetRef={imageResetRef}
                  asyncImageProps={{
                    splashUrl: props.data?.image?.url?.splash,
                    fullUrl: props.data?.image?.url?.full,
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
                  splashUrl={props.data?.image?.url?.splash}
                  fullUrl={props.data?.image?.url?.full}
                  containerProps={{
                    style: Styles.image,
                  }}
                />
              )
          }

          {props.data && (
            <View style={[Styles.settings, dynamicStyles.settings]}>
              <H3>Settings</H3>

              {/* <View style={[Styles.toggleInput, Styles.inputWrap, !editable && Styles.disabled]}>
                <Body bold style={Styles.toggleInputLabel}>Audio Only</Body>
                <Switch
                  onValueChange={(value) => setValue('audioOnly', value, true)}
                  value={watch('audioOnly')}
                />
              </View> */}

              {props.data && (
                <View style={Styles.inputWrap}>
                  <StreamStates
                    data={props.data}
                    getStreamSelfsVariables={props.getStreamSelfsVariables}
                    onPop={props.onPop}
                  />
                </View>
              )}
            </View>
          )}

          <View style={Styles.form}>
            <View style={Styles.section}>
              <H3>Description</H3>

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
                setRef={infoRef}
                placeholder="Enter your stream's info"
                defaultValue={defaultValues.info}
                errors={errors}
                onBlur={() => triggerValidation('info', true)}
                wrapStyle={Styles.inputWrap}
                editable={editable}
              />
            </View>

            {/* If form is not editable, only show if there is tags */}
            {(editable || props.data?.tags.length > 0) && (
              <View style={Styles.section}>
                <View style={Styles.tagsHeading}>
                  <H3>Tags</H3>

                  {editable && (
                    <Button
                      type="SECONDARY"
                      size="small"
                      title={!tags || tags.length === 0 ? 'Create' : 'Edit'}
                      onPress={() => {
                        openModalScreen({
                          component: (
                            <Tags
                              defaultValue={tags}
                              onDone={(value) => {
                                setValue('tags', value, true);
                              }}
                            />
                          ),
                        });
                      }}
                      style={Styles.tagsButton}
                    />
                  )}
                </View>

                <View style={Styles.tags}>
                  <TagsPreview
                    tags={tags}
                  />
                </View>
              </View>
            )}

            <View style={[Styles.section, Styles.afterTags]}>
              <H3>Schedule</H3>

              <DateInput
                defaultValue={timeFrom}
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
                defaultValue={timeFrom}
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
                defaultValue={duration}
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
              <View style={GlobalStyles.CostText}>
                <H3>Price </H3>
                <Icon name={ICON.CREDIT} size="xsmall" />
              </View>

              {/* eslint-disable-next-line react-native/no-inline-styles */}
              <View pointerEvents={isFree ? 'none' : 'auto'} style={{ opacity: isFree ? 0.5 : 1 }}>
                {editable && (
                  <>
                    <Body>Value per credit: <Body bold>{parseCurrency(props.channelData.creditWithdrawalValue)}</Body></Body>
                    <Body>Value per purchase: <Body bold>{parseCurrency(cost ? parseInt(cost, 10) * props.channelData.creditWithdrawalValue : 0)}</Body></Body>
                    <View style={GlobalStyles.CostText}>
                      <Body>Minimum Price: </Body>
                      <Icon name={ICON.CREDIT} size="xsmall" />
                      <Body bold> {props.channelData.creditMinimumStreamCost}</Body>
                    </View>
                  </>
                )}
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

              {canEditFreeStream && (
                <View style={Styles.inputWrap}>
                  <View style={Styles.toggleInput}>
                    <Body bold style={Styles.toggleInputLabel}>Free Stream?</Body>
                    <Switch
                      onValueChange={(value) => {
                        setValue('isFree', value);
                      }}
                      value={isFree}
                      disabled={!editable}
                    />
                  </View>
                  <View style={Styles.inputWrap}>
                    <Body>Free allowance: {freeStreamAllowance}</Body>
                  </View>
                </View>
              )}
            </View>
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
            title={loading ? `${props.data ? 'Updating' : 'Creating'}` : `${props.data ? 'Update' : 'Create'} Stream`}
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            style={Styles.button}
          />
        </View>
      )}
    </>
  );
};

export default CreateUpdateStreamView;
