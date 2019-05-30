import React from 'react';
import { shallow } from 'enzyme';
import { FEEDBACK_DIALOG_CLOSING } from '../../../utils/constants';
import FeedbackDialog from './FeedbackDialog';
import Button from '../../core/Button/index';

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
    const feedback = { comment: 'hello world' };

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
    component.setProps({ mode: 'create', feedback: { mood: 'glad' } });
    component.setState({ commentText: 'hello world' });

    // act
    const buttons = component.find(Button);
    buttons.forEach((button) => {
      const saveButton = button.shallow().find('input[test-id="feedback-dialog-create"]');
      if (saveButton.length === 1) {
        saveButton.simulate('click');
      }
    });

    // assert
    expect(state.saveCalled).toEqual(true);
    expect(state.updateCalled).toEqual(false);
    expect(state.lastDispatchedAction.type).toEqual(FEEDBACK_DIALOG_CLOSING);
    expect(state.feedback.comment).toEqual('hello world');
    expect(state.feedback.mood).toEqual('glad');
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
    const component = shallow(<FeedbackDialog onSave={onSave} onUpdate={onUpdate} dispatch={mockDispatch} />);
    component.setProps({ mode: 'update', feedback: { mood: 'sad', comment: 'abcdef' } });
    component.setState({ commentText: 'abcdefghij' });

    // act
    const buttons = component.find(Button);
    buttons.forEach((button) => {
      const saveButton = button.shallow().find('input[test-id="feedback-dialog-update"]');
      if (saveButton.length === 1) {
        saveButton.simulate('click');
      }
    });

    // assert
    expect(state.saveCalled).toEqual(false);
    expect(state.updateCalled).toEqual(true);
    expect(state.lastDispatchedAction.type).toEqual(FEEDBACK_DIALOG_CLOSING);
    expect(state.feedback.comment).toEqual('abcdefghij');
    expect(state.feedback.mood).toEqual('sad');
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
    const component = shallow(<FeedbackDialog onSave={onSave} onUpdate={onUpdate} dispatch={mockDispatch} />);
    component.setProps({ mode: 'create', feedback: null });

    // act
    const buttons = component.find(Button);
    buttons.forEach((button) => {
      const saveButton = button.shallow().find('input[test-id="feedback-dialog-close"]');
      if (saveButton.length === 1) {
        saveButton.simulate('click');
      }
    });

    // assert
    expect(state.saveCalled).toEqual(false);
    expect(state.updateCalled).toEqual(false);
    expect(state.lastDispatchedAction.type).toEqual(FEEDBACK_DIALOG_CLOSING);
    expect(state.feedback).toEqual(null);
  });
});
