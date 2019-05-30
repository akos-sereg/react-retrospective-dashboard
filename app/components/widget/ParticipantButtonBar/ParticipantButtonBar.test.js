import React from 'react';
import { shallow } from 'enzyme';
import ParticipantButtonBar from './ParticipantButtonBar';
import { CREATE_FEEDBACK_CLICKED, READY_STATE_CHANGED } from '../../../utils/constants';

describe('<ParticipantButtonBar /> rendering', () => {
  it('publish all clicked', () => {
    // arrange
    const state = { publishAllClicked: false };
    const onPublishAll = () => { state.publishAllClicked = true; };
    const component = shallow(<ParticipantButtonBar onPublishAll={onPublishAll} />);

    const publishAllButton = component.find('button[test-id="publish-all"]').first();

    // act
    publishAllButton.simulate('click');

    // assert
    expect(state.publishAllClicked).toEqual(true);
  });

  it('create triggers action', () => {
    // arrange
    const state = { publishAllClicked: false, lastDispatchedAction: null };
    const onPublishAll = () => { state.publishAllClicked = true; };
    const dispatch = (action) => { state.lastDispatchedAction = action; };
    const component = shallow(<ParticipantButtonBar onPublishAll={onPublishAll} dispatch={dispatch} />);

    const publishAllButton = component.find('button[test-id="pbb-create"]').first();

    // act
    publishAllButton.simulate('click');

    // assert
    expect(state.publishAllClicked).toEqual(false);
    expect(state.lastDispatchedAction.type).toEqual(CREATE_FEEDBACK_CLICKED);
  });

  it('toggle state not allowed until joined', () => {
    // arrange
    const state = { publishAllClicked: false, lastDispatchedAction: null };
    const onPublishAll = () => { state.publishAllClicked = true; };
    const dispatch = (action) => { state.lastDispatchedAction = action; };
    const component = shallow(<ParticipantButtonBar onPublishAll={onPublishAll} dispatch={dispatch} />);
    component.setProps({ isJoinClicked: false });

    const publishAllButton = component.find('button[test-id="pbb-toggle-state"]').first();

    // act
    publishAllButton.simulate('click');

    // assert
    expect(state.publishAllClicked).toEqual(false);
    expect(state.lastDispatchedAction).toEqual(null);
  });

  it('toggle state', () => {
    // arrange
    const state = { publishAllClicked: false, lastDispatchedAction: null };
    const onPublishAll = () => { state.publishAllClicked = true; };
    const dispatch = (action) => { state.lastDispatchedAction = action; };
    const component = shallow(<ParticipantButtonBar onPublishAll={onPublishAll} dispatch={dispatch} />);
    component.setProps({ isJoinClicked: true });

    const publishAllButton = component.find('button[test-id="pbb-toggle-state"]').first();

    // act
    publishAllButton.simulate('click');

    // assert
    expect(state.publishAllClicked).toEqual(false);
    expect(state.lastDispatchedAction.type).toEqual(READY_STATE_CHANGED);
    expect(state.lastDispatchedAction.payload.isUserReady).toEqual(true);

    // act II
    publishAllButton.simulate('click');

    // assert II
    expect(state.lastDispatchedAction.type).toEqual(READY_STATE_CHANGED);
    expect(state.lastDispatchedAction.payload.isUserReady).toEqual(false);
  });
});
