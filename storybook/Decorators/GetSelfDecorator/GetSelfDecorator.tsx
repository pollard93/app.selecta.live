import { useGetSelfQuery } from '../../../src/API/query/getSelf/getSelf';

export const GetSelfDecorator = (props) => {
  const { loading } = useGetSelfQuery();
  if (loading) return null;
  return props.children;
};
