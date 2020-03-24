
/**
 * Hoc to allow wrapper.setProps to be called on an element that is wrapped in hocs
 * setProps may only be called on a root component, so this solves the issue
 */
export const PropsProxy = (props) => props.children({
  props,
});
