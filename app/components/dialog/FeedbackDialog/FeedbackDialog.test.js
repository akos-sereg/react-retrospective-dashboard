import React from 'react';
import { shallow } from 'enzyme';
import { FEEDBACK_DIALOG_CLOSING, MOOD_SELECTED } from '../../../utils/constants';
import FeedbackDialog from './FeedbackDialog';
import GladSadMad from './variations/GladSadMad';
import Button from '../../core/Button/index';
import { findButtonByTestId } from '../../../utils/testUtils';

describe('<FeedbackDialog /> rendering', () => {
  it('create mode, textarea is empty by default', () => {
    // act
    const component = shallow(<FeedbackDialog />);
    component.setProps({ mode: 'create' });

    // assert
    expect(component.find('textarea[test-id="feedback-comment"]').text()).toEqual('');
  });

  it('update mode, textarea is populated', () => {
    // arrange
    const feedback = { comment: 'hello world', glad: 1.0 };

    // act
    const component = shallow(<FeedbackDialog feedback={feedback} />);
    component.setProps({ feedback, mode: 'update' });

    // assert
    expect(component.find('textarea[test-id="feedback-comment"]').props().defaultValue).toEqual('hello world');
  });

  it('create mode, create button action', () => {
    // arrange
    const state = {
      saveCalled: false,
      updateCalled: false,
      feedback: null,
      lastDispatchedAction: null
    };

    const onSave = (feedback) => { state.saveCalled = true; state.feedback = feedback; };
    const onUpdate = (feedback) => { state.updateCalled = true; state.feedback = feedback; };
    const mockDispatch = (action) => { state.lastDispatchedAction = action; };
    const component = shallow(<FeedbackDialog onSave={onSave} onUpdate={onUpdate} dispatch={mockDispatch} />);
    component.setProps({ mode: 'create', feedback: { glad: 1.0 } });
    component.setState({ commentText: 'hello world' });

    // act
    const saveButton = findButtonByTestId(component.find(Button), 'feedback-dialog-create');
    saveButton.simulate('click');

    // assert
    expect(state.saveCalled).toEqual(true);
    expect(state.updateCalled).toEqual(false);
    expect(state.lastDispatchedAction.type).toEqual(FEEDBACK_DIALOG_CLOSING);
    expect(state.feedback.comment).toEqual('hello world');
    expect(state.feedback.glad).toEqual(1.0);
  });

  it('update mode, update button action', () => {
    // arrange
    const state = {
      saveCalled: false,
      updateCalled: false,
      feedback: null,
      lastDispatchedAction: null
    };

    const onSave = (feedback) => { state.saveCalled = true; state.feedback = feedback; };
    const onUpdate = (feedback) => { state.updateCalled = true; state.feedback = feedback; };
    const mockDispatch = (action) => { state.lastDispatchedAction = action; };
    const component = shallow(<FeedbackDialog onSave={onSave} onUpdate={onUpdate} dispatch={mockDispatch} boardType="gsm" />);

    const gsmComponent = component.find(GladSadMad).shallow();
    gsmComponent.find('div[test-id="glad-selector"]').simulate('click');
    expect(state.lastDispatchedAction.type).toEqual(MOOD_SELECTED);
    expect(state.lastDispatchedAction.payload.glad).toEqual(1.0);
    component.setState({ commentText: 'abcdefghij' });
    component.setProps({ mode: 'update', feedback: { glad: 1.0, comment: 'abcdef' } });

    // act
    const saveButton = findButtonByTestId(component.find(Button), 'feedback-dialog-update');
    saveButton.simulate('click');

    // assert
    expect(state.saveCalled).toEqual(false);
    expect(state.updateCalled).toEqual(true);
    expect(state.lastDispatchedAction.type).toEqual(FEEDBACK_DIALOG_CLOSING);
    expect(state.feedback.comment).toEqual('abcdefghij');
    expect(state.feedback.glad).toEqual(1.0);
  });

  it('create mode, close works', () => {
    // arrange
    const state = {
      saveCalled: false,
      updateCalled: false,
      feedback: null,
      lastDispatchedAction: null
    };

    const onSave = (feedback) => { state.saveCalled = true; state.feedback = feedback; };
    const onUpdate = (feedback) => { state.updateCalled = true; state.feedback = feedback; };
    const mockDispatch = (action) => { state.lastDispatchedAction = action; };
    const component = shallow(<FeedbackDialog onSave={onSave} onUpdate={onUpdate} dispatch={mockDispatch} boardType="gsm" />);
    component.setProps({ mode: 'create', feedback: null });

    // act
    const saveButton = findButtonByTestId(component.find(Button), 'feedback-dialog-close');
    saveButton.simulate('click');

    // assert
    expect(state.saveCalled).toEqual(false);
    expect(state.updateCalled).toEqual(false);
    expect(state.lastDispatchedAction.type).toEqual(FEEDBACK_DIALOG_CLOSING);
    expect(state.feedback).toEqual(null);
  });
});
