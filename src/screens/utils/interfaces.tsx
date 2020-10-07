/**
 * Add stacks here, so they can be easily imported and used where needed
 */
export enum STACK {
  ONBOARDING = 'ONBOARDING',
  RESET_PASSWORD = 'RESET_PASSWORD',
  REQUIRE_UDPATE = 'REQUIRE_UDPATE',
  ROOT = 'ROOT',
  TAB_HOME = 'TAB_HOME',
  TAB_MY_STREAMS = 'TAB_MY_STREAMS',
  TAB_WALLET = 'TAB_WALLET',
  CHANNEL = 'CHANNEL',
}


export interface ScreenProps {
  name: string;
  componentId: string;
  rootTag: number;
}
