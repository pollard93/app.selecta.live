import { useGetChannelSelfQuery } from '../../../src/API/query/getChannelSelf/getChannelSelf';

const GetChannelSelfDecorator = (props) => {
  const { loading } = useGetChannelSelfQuery();
  if (loading) return null;
  return props.children;
};

export default GetChannelSelfDecorator;
