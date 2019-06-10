import React from 'react';
import { shallow } from 'enzyme';
import UnpublishedFeedbackList from './UnpublishedFeedbackList';
import UnpublishedFeedback from '../UnpublishedFeedback';

describe('<UnpublishedFeedbackList /> rendering', () => {
  it('display one feedback', () => {
    // arrange
    const state = { deleteCalled: false, publishCalled: false, lastDispatchedAction: null };
    const onDelete = () => { state.deleteCalled = true; };
    const onPublish = () => { state.publishCalled = true; };
    const dispatch = (action) => { state.lastDispatchedAction = action; };
    const feedbacks = [{ id: '1234', comment: 'hello world', glad: 1.0 }];
    const component = shallow(<UnpublishedFeedbackList getMoodInficatorAsset={() => {}} onDelete={onDelete} onPublish={onPublish} feedbacks={feedbacks} dispatch={dispatch} />);
    component.setProps({ feedbacks });

    const feedbackComponents = component.find(UnpublishedFeedback);

    // assert
    expect(feedbackComponents.length).toEqual(1);
    expect(component.find('div[className="nothing-to-publish"]').length).toEqual(0);
  });

  it('display no feedback', () => {
    // arrange
    const state = { deleteCalled: false, publishCalled: false, lastDispatchedAction: null };
    const onDelete = () => { state.deleteCalled = true; };
    const onPublish = () => { state.publishCalled = true; };
    const dispatch = (action) => { state.lastDispatchedAction = action; };
    const feedbacks = [];
    const component = shallow(<UnpublishedFeedbackList getMoodInficatorAsset={() => {}} onDelete={onDelete} onPublish={onPublish} feedbacks={feedbacks} dispatch={dispatch} />);
    component.setProps({ feedbacks });

    const feedbackComponents = component.find(UnpublishedFeedback);

    // assert
    expect(feedbackComponents.length).toEqual(0);
    expect(component.find('div[className="nothing-to-publish"]').length).toEqual(1);
  });
});
