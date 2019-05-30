import React from 'react';
import { shallow } from 'enzyme';
import NicknameProvider from './NicknameProvider';
import Button from '../Button';
import ParticipantApiMock from '../../services/ParticipantApi.Mock';
import { JOIN_CLICKED } from '../../utils/constants';

describe('<NicknameProvider /> rendering', () => {
  it('join with empty nickname', () => {
    // arrange
    const state = { onJoinedCalled: false };
    const onJoined = () => { state.onJoinedCalled = true; };
    const component = shallow(<NicknameProvider onJoined={onJoined} />);
    component.setProps({ code: '123', token: 'abc' });

    // act
    component.find(Button).shallow().simulate('click');

    // assert
    expect(state.onJoinedCalled).toEqual(false);
  });

  it('join with proper nickname', () => {
    // arrange
    const state = { onJoinedCalled: false, lastDispatchedAction: null };
    const onJoined = () => { state.onJoinedCalled = true; };
    const component = shallow(<NicknameProvider onJoined={onJoined} />);
    component.setState({ nickname: 'jeremy' });
    component.setProps({ code: '123', token: 'abc', dispatch: (action) => { state.lastDispatchedAction = action; } });
    component.instance().participantService = new ParticipantApiMock();

    // act
    component.find(Button).shallow().simulate('click');

    // assert
    expect(state.onJoinedCalled).toEqual(true);
    expect(state.lastDispatchedAction.type).toEqual(JOIN_CLICKED);
  });
});
