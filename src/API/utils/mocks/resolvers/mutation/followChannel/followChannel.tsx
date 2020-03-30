export const followChannel = (_, variables) => ({
  id: variables.id,
  following: !variables.unfollow,
});
