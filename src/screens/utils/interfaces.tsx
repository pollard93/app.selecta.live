/**
 * Add stacks here, so they can be easily imported and used where needed
 */
export enum STACK {
  LOGIN = 'LOGIN',
  REQUIRE_UDPATE = 'REQUIRE_UDPATE',
  HOME = 'HOME',
}


export interface ScreenProps {
  componentId?: string;
  rootTag?: number;
}
