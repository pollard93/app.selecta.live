export const cancelStream = (_, variables) => ({
  id: variables.id,
  cancelled: new Date(0).toISOString(),
});
