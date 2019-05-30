const findButtonByTestId = (buttons, testId) => {
  let result = null;
  buttons.forEach((button) => {
    const buttonWanted = button.shallow().find(`input[test-id="${testId}"]`);
    if (buttonWanted.length === 1) {
      result = buttonWanted;
    }
  });

  return result;
};

export { findButtonByTestId };
