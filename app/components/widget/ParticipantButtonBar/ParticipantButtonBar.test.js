import React from 'react';
import { shallow } from 'enzyme';
import ParticipantButtonBar from './ParticipantButtonBar';

describe('<ParticipantButtonBar /> rendering', () => {
  it('join with empty nickname', () => {
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
});
