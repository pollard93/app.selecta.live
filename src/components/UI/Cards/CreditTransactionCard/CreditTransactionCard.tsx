import React, { FC } from 'react';
import { View } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import H4 from '../../Typography/components/H4';
import Styles, { DynamicStyles } from './CreditTransactionCard.style';
import { CREDIT_TRANSACTION_PROFILE_FRAGMENT } from '../../../../API/fragments/__generated__/CREDIT_TRANSACTION_PROFILE_FRAGMENT';
import Chip from '../../Chip/Chip';
import { formatForTimezone } from '../../../../utils/functions';
import Gradient from '../../Gradient/Gradient';
import Small from '../../Typography/components/Small';

interface CreditTransactionCardProps {
  data: CREDIT_TRANSACTION_PROFILE_FRAGMENT;
}

const CreditTransactionCard: FC<CreditTransactionCardProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);

  return (
    <>
      <Small bold style={Styles.createdAt}>{formatForTimezone(props.data.createdAt, 'calendar')}</Small>
      <View style={[Styles.wrap, dynamicStyles.wrap]}>
        <View style={Styles.contentWrap}>
          <H4 style={Styles.heading}>{props.data.stream.name}</H4>
          <Chip type="SECONDARY" style={Styles.channelName}>{props.data.channel.name}</Chip>
        </View>

        <Gradient style={Styles.right}>
          <H4 forceLight>
            © {props.data.credit}
          </H4>
        </Gradient>
      </View>
    </>
  );
};

export default CreditTransactionCard;
