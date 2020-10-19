import React, { FC, useContext } from 'react';
import { ScreenProps } from '../../screens/utils/interfaces';

const ScreenContext = React.createContext<ScreenProps>(null);

const ScreenPropsProvider: FC<ScreenProps> = (props) => {
  const { children, ...p } = props;
  return (
    <ScreenContext.Provider value={p}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreenProps = () => useContext(ScreenContext);

export default ScreenPropsProvider;
