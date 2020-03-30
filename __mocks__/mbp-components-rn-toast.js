
jest.mock('mbp-components-rn-toast', () => {
  /**
   * Out of scope enabling spying
   */
  const push = ({
    push: jest.fn(),
  });

  return ({
    useToast: () => push,
  });
});
