import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import H4 from '../../Typography/components/H4';
import Styles, { DynamicStyles } from './WalletCard.style';
import { formatForTimezone } from '../../../../utils/functions';
import { useGetSelf } from '../../../../API/query/getSelf/getSelf';
import H3 from '../../Typography/components/H3';
import Button from '../../Button/Button';
import Small from '../../Typography/components/Small';
import { openTopUpModal } from '../../../../screens/utils';

interface WalletCardProps {}

const WalletCard: FC<WalletCardProps> = () => {
  const self = useGetSelf();
  const dynamicStyles = useDynamicValue(DynamicStyles);

  return (
    <View style={[Styles.wrap, dynamicStyles.wrap]}>
      <View style={Styles.backgroundImageWrap}>
        <Image
          source={require('../../../../assets/images/logo-icon.png')}
          style={Styles.backgroundImage}
          resizeMode="contain"
        />
      </View>

      <View>
        <H3>Your wallet</H3>
        <Small>Joining date: {formatForTimezone(self.createdAt, 'calendar')}</Small>
      </View>

      <View style={Styles.bottom}>
        <View>
          <H4 style={Styles.username}>{self.username}</H4>
          <H4>Balance © {self.credit}</H4>
        </View>
        <View>
          <Button
            title="Top Up"
            onPress={openTopUpModal}
            size="small"
          />
        </View>
      </View>
    </View>
  );
};

export default WalletCard;
