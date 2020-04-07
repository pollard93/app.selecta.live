import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from 'react-apollo';
import { reportStream, reportStreamVariables } from './__generated__/reportStream';
import { STREAM_MESSAGE_FRAGMENT } from '../../fragments/StreamMessage';

export const REPORT_STREAM_MUTATION = gql`
  mutation reportStream($id: String!, $content: String!){
    reportStream(id: $id, content: $content)
  },
  ${STREAM_MESSAGE_FRAGMENT}
`;

export const useReportStreamMutation = (options?: MutationHookOptions<reportStream, reportStreamVariables>) => useMutation(REPORT_STREAM_MUTATION, options);
