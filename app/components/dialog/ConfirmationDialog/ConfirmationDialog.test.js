import React from 'react';
import { shallow } from 'enzyme';
import { CONFIRMATION_DIALOG_CLOSING } from '../../../utils/constants';
import ConfirmationDialog from './ConfirmationDialog';
import Button from '../../core/Button/index';
import { findButtonByTestId } from '../../../utils/testUtils';

describe('<ConfirmationDialog /> rendering', () => {
  it('should display title and text', () => {
    // act
    const component = shallow(<ConfirmationDialog title="a" text="b" onConfirmed={() => {}} />);

    // assert
    expect(component.find('h4').first().text()).toEqual('a');
    expect(component.find('div[test-id="confirmation-dialog-text"]').first().text()).toEqual('b');
  });

  it('should act on confirm', () => {
    const state = {
      confirmed: false,
      lastDispatchedAction: null
    };

    const onConfirm = () => { state.confirmed = true; };
    const dispatch = (event) => { state.lastDispatchedAction = event; };

    // act
    const component = shallow(<ConfirmationDialog title="a" text="b" onConfirmed={onConfirm} dispatch={dispatch} />);
    const confirmButton = findButtonByTestId(component.find(Button), 'confirmation-dialog-ok');
    confirmButton.simulate('click');

    // assert
    expect(state.confirmed).toEqual(true);
    expect(state.lastDispatchedAction.type).toEqual(CONFIRMATION_DIALOG_CLOSING);
  });

  it('should act on confirm, dont panic if user code throws error', () => {
    const state = {
      confirmed: false,
      lastDispatchedAction: null
    };

    const onConfirm = () => {
      state.confirmed = true;
      throw Error('panic attack');
    };

    const dispatch = (event) => { state.lastDispatchedAction = event; };

    // act
    const component = shallow(<ConfirmationDialog title="a" text="b" onConfirmed={onConfirm} dispatch={dispatch} />);
    const confirmButton = findButtonByTestId(component.find(Button), 'confirmation-dialog-ok');
    confirmButton.simulate('click');

    // assert
    expect(state.confirmed).toEqual(true);
    expect(state.lastDispatchedAction.type).toEqual(CONFIRMATION_DIALOG_CLOSING);
  });

  it('should act on close', () => {
    const state = {
      confirmed: false,
      lastDispatchedAction: null
    };

    const onConfirm = () => { state.confirmed = true; };
    const dispatch = (event) => { state.lastDispatchedAction = event; };

    // act
    const component = shallow(<ConfirmationDialog title="a" text="b" onConfirmed={onConfirm} dispatch={dispatch} />);
    const closeButton = findButtonByTestId(component.find(Button), 'confirmation-dialog-close');
    closeButton.simulate('click');

    // assert
    expect(state.confirmed).toEqual(false);
    expect(state.lastDispatchedAction.type).toEqual(CONFIRMATION_DIALOG_CLOSING);
  });
});
