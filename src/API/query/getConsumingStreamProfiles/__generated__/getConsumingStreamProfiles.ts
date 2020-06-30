/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { StreamWhereInput, StreamOrderByInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getConsumingStreamProfiles
// ====================================================

export interface getConsumingStreamProfiles_getConsumingStreamProfiles_streams_channel {
  __typename: "ChannelProfile";
  name: string | null;
}

export interface getConsumingStreamProfiles_getConsumingStreamProfiles_streams_image_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface getConsumingStreamProfiles_getConsumingStreamProfiles_streams_image {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getConsumingStreamProfiles_getConsumingStreamProfiles_streams_image_url | null;
}

export interface getConsumingStreamProfiles_getConsumingStreamProfiles_streams_tags {
  __typename: "TagProfile";
  title: string | null;
}

export interface getConsumingStreamProfiles_getConsumingStreamProfiles_streams {
  __typename: "StreamProfile";
  id: string;
  name: string | null;
  channel: getConsumingStreamProfiles_getConsumingStreamProfiles_streams_channel | null;
  image: getConsumingStreamProfiles_getConsumingStreamProfiles_streams_image | null;
  timeFrom: any | null;
  timeTo: any | null;
  tags: (getConsumingStreamProfiles_getConsumingStreamProfiles_streams_tags | null)[] | null;
  isConsumer: boolean | null;
  audioOnly: boolean | null;
  position: number | null;
}

export interface getConsumingStreamProfiles_getConsumingStreamProfiles {
  __typename: "StreamProfilesPayLoad";
  streams: getConsumingStreamProfiles_getConsumingStreamProfiles_streams[];
  count: number;
}

export interface getConsumingStreamProfiles {
  getConsumingStreamProfiles: getConsumingStreamProfiles_getConsumingStreamProfiles;
}

export interface getConsumingStreamProfilesVariables {
  where?: StreamWhereInput | null;
  first?: number | null;
  after?: string | null;
  orderBy?: StreamOrderByInput | null;
}
