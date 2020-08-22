import React, { FC, useContext } from 'react';
import { ScreenProps } from '../../screens/utils/interfaces';

const ScreenContext = React.createContext<ScreenProps>(null);

const ScreenPropsProvider: FC<ScreenProps> = (props) => (
  <ScreenContext.Provider value={{ componentId: props.componentId, rootTag: props.rootTag }}>
    {props.children}
  </ScreenContext.Provider>
);

export const useScreenProps = () => useContext(ScreenContext);

export default ScreenPropsProvider;
