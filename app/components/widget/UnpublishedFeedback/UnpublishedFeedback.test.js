import React from 'react';
import { shallow } from 'enzyme';
import UnpublishedFeedback from './UnpublishedFeedback';
import { CONFIRMATION_DIALOG_OPENING, EDIT_FEEDBACK_CLICKED } from '../../../utils/constants';

describe('<UnpublishedFeedback /> rendering', () => {
  it('delete clicked', () => {
    // arrange
    const state = { deleteCalled: false, publishCalled: false, lastDispatchedAction: null };
    const onDelete = () => { state.deleteCalled = true; };
    const onPublish = () => { state.publishCalled = true; };
    const dispatch = (action) => { state.lastDispatchedAction = action; };
    const feedback = { comment: 'hello world', glad: 1.0 };
    const component = shallow(<UnpublishedFeedback onDelete={onDelete} onPublish={onPublish} feedback={feedback} dispatch={dispatch} />);

    const deleteButton = component.find('a[test-id="uf-delete"]').first();

    // act
    deleteButton.simulate('click');

    // assert
    expect(state.deleteCalled).toEqual(false);
    expect(state.lastDispatchedAction.type).toEqual(CONFIRMATION_DIALOG_OPENING);

    // act - continue by confirming
    state.lastDispatchedAction.payload.onConfirmed();
    expect(state.deleteCalled).toEqual(true);
  });

  it('publish clicked', () => {
    // arrange
    const state = { deleteCalled: false, publishCalled: false, lastDispatchedAction: null };
    const onDelete = () => { state.deleteCalled = true; };
    const onPublish = () => { state.publishCalled = true; };
    const dispatch = (action) => { state.lastDispatchedAction = action; };
    const feedback = { comment: 'hello world', glad: 1.0 };
    const component = shallow(<UnpublishedFeedback onDelete={onDelete} onPublish={onPublish} feedback={feedback} dispatch={dispatch} />);

    const publishButton = component.find('a[test-id="uf-publish"]').first();

    // act
    publishButton.simulate('click');

    // assert
    expect(state.publishCalled).toEqual(false);
    expect(state.lastDispatchedAction.type).toEqual(CONFIRMATION_DIALOG_OPENING);

    // act - continue by confirming
    state.lastDispatchedAction.payload.onConfirmed();
    expect(state.publishCalled).toEqual(true);
  });

  it('edit clicked', () => {
    // arrange
    const state = { deleteCalled: false, publishCalled: false, lastDispatchedAction: null };
    const onDelete = () => { state.deleteCalled = true; };
    const onPublish = () => { state.publishCalled = true; };
    const dispatch = (action) => { state.lastDispatchedAction = action; };
    const feedback = { comment: 'hello world', glad: 1.0 };
    const component = shallow(<UnpublishedFeedback onDelete={onDelete} onPublish={onPublish} feedback={feedback} dispatch={dispatch} />);

    const editButton = component.find('a[test-id="uf-edit"]').first();

    // act
    editButton.simulate('click');

    // assert
    expect(state.lastDispatchedAction.type).toEqual(EDIT_FEEDBACK_CLICKED);
    expect(state.lastDispatchedAction.payload.feedback.comment).toEqual('hello world');
    expect(state.lastDispatchedAction.payload.feedback.glad).toEqual(1.0);
  });
});
