/**
 * Add stacks here, so they can be easily imported and used where needed
 */
export enum STACK {
  ONBOARDING = 'ONBOARDING',
  REQUIRE_UDPATE = 'REQUIRE_UDPATE',
  HOME = 'HOME',
  TAB_FEED = 'TAB_FEED',
  CHANNEL = 'CHANNEL',
}


export interface ScreenProps {
  componentId?: string;
  rootTag?: number;
}
