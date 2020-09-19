import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import { useReportStreamMutation } from '../../../API/mutation/reportStream/reportStream';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { pushToast } from '../../../modules/Toast';
import Styles from './ReportStream.style';
import DrawerV2 from '../../UI/DrawerV2/DrawerV2';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import spacing from '../../../styles/definitions/spacing';
import Button from '../../UI/Button/Button';
import TextArea from '../../UI/Form/components/TextArea/TextArea';

interface ReportStreamProps {
  id: string;
  onClosed: () => void;
}

const ReportStream = (props: ReportStreamProps) => {
  const [content, setContent] = useState('');
  const safeAreaInsets = useSafeArea();
  const onCloseRef = useRef<() => void>(null);


  /**
   * Report stream mutation
   */
  const [mutation, { loading }] = useReportStreamMutation({
    variables: {
      id: props.id,
      content,
    },
    onCompleted: () => {
      onCloseRef.current();

      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="SUCCESS"
            content="Thank you, we'll be in touch."
          />
        ),
        dismissible: false,
      });
    },
    onError: (e) => {
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
   * Render button to pay for stream
   */
  return (
    <DrawerV2 onClosed={props.onClosed}>
      {({ onClose }) => {
        onCloseRef.current = onClose;

        return (
          <View style={{ paddingBottom: safeAreaInsets.bottom + spacing.small }}>
            <View style={Styles.wrap}>
              <View style={Styles.input}>
                <TextArea
                  name="message"
                  value={content}
                  onChangeText={setContent}
                  placeholder='Why do you want to report this stream?'
                  blurOnSubmit={true}
                  onSubmitEditing={() => mutation()}
                  returnKeyType="send"
                  editable={!loading}
                />
              </View>

              <View style={Styles.input}>
                <Button
                  title={loading ? 'Submitting' : 'Report Stream'}
                  onPress={() => mutation()}
                  disabled={loading || content.length === 0}
                  loading={loading}
                />
              </View>
            </View>
          </View>
        );
      }}
    </DrawerV2>
  );
};

export default ReportStream;
