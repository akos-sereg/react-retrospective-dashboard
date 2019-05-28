import React from 'react';
import { render, shallow } from 'enzyme';
import { MOOD_SELECTED } from '../../../utils/constants';
import GladSadMad from './GladSadMad';

describe('<GladSadMad /> rendering', () => {
  it('should default to Glad when empty feedback is passed', () => {
    // arrange
    const mockDispatch = () => { };
    const feedback = {};

    // act
    const component = render(<GladSadMad dispatch={mockDispatch} feedback={feedback} />);

    // assert
    expect(component.find('div[test-id="glad-selector"][class="feedback-mood-highlight"]')).toHaveLength(1);
    expect(component.find('div[test-id="sad-selector"][class="feedback-mood-highlight"]')).toHaveLength(0);
    expect(component.find('div[test-id="mad-selector"][class="feedback-mood-highlight"]')).toHaveLength(0);
  });

  it('should default to Glad when null feedback is passed', () => {
    // arrange
    const mockDispatch = () => { };
    const feedback = null;

    // act
    const component = render(<GladSadMad dispatch={mockDispatch} feedback={feedback} />);

    // assert
    expect(component.find('div[test-id="glad-selector"][class="feedback-mood-highlight"]')).toHaveLength(1);
    expect(component.find('div[test-id="sad-selector"][class="feedback-mood-highlight"]')).toHaveLength(0);
    expect(component.find('div[test-id="mad-selector"][class="feedback-mood-highlight"]')).toHaveLength(0);
  });

  it('should default to Glad when invalid feedback data is passed', () => {
    // arrange
    const mockDispatch = () => { };
    const feedback = { mood: 'invalid' };

    // act
    const component = render(<GladSadMad dispatch={mockDispatch} feedback={feedback} />);

    // assert
    expect(component.find('div[test-id="glad-selector"][class="feedback-mood-highlight"]')).toHaveLength(1);
    expect(component.find('div[test-id="sad-selector"][class="feedback-mood-highlight"]')).toHaveLength(0);
    expect(component.find('div[test-id="mad-selector"][class="feedback-mood-highlight"]')).toHaveLength(0);
  });

  it('should default to Glad when Glad feedback data is passed', () => {
    // arrange
    const mockDispatch = () => { };
    const feedback = { mood: 'glad' };

    // act
    const component = render(<GladSadMad dispatch={mockDispatch} feedback={feedback} />);

    // assert
    expect(component.find('div[test-id="glad-selector"][class="feedback-mood-highlight"]')).toHaveLength(1);
    expect(component.find('div[test-id="sad-selector"][class="feedback-mood-highlight"]')).toHaveLength(0);
    expect(component.find('div[test-id="mad-selector"][class="feedback-mood-highlight"]')).toHaveLength(0);
  });

  it('should default to Sad when Sad feedback data is passed', () => {
    // arrange
    const mockDispatch = () => { };
    const feedback = { mood: 'sad' };

    // act
    const component = render(<GladSadMad dispatch={mockDispatch} feedback={feedback} />);

    // assert
    expect(component.find('div[test-id="glad-selector"][class="feedback-mood-highlight"]')).toHaveLength(0);
    expect(component.find('div[test-id="sad-selector"][class="feedback-mood-highlight"]')).toHaveLength(1);
    expect(component.find('div[test-id="mad-selector"][class="feedback-mood-highlight"]')).toHaveLength(0);
  });

  it('should default to Mad when Mad feedback data is passed', () => {
    // arrange
    const mockDispatch = () => { };
    const feedback = { mood: 'mad' };

    // act
    const component = render(<GladSadMad dispatch={mockDispatch} feedback={feedback} />);

    // assert
    expect(component.find('div[test-id="glad-selector"][class="feedback-mood-highlight"]')).toHaveLength(0);
    expect(component.find('div[test-id="sad-selector"][class="feedback-mood-highlight"]')).toHaveLength(0);
    expect(component.find('div[test-id="mad-selector"][class="feedback-mood-highlight"]')).toHaveLength(1);
  });

  it('should emit action from Mad => Glad', () => {
    // arrange
    const actionsTriggered = [];
    const mockDispatch = (action) => { actionsTriggered.push(action); };
    const feedback = { mood: 'mad' };

    const component = shallow(<GladSadMad />);
    component.setProps({ feedback, dispatch: mockDispatch });

    // act
    component.find('div[test-id="glad-selector"]').simulate('click');

    // assert
    expect(actionsTriggered.length).toBe(1);
    expect(actionsTriggered[0].type).toBe(MOOD_SELECTED);
    expect(actionsTriggered[0].payload.mood).toBe('glad');
  });
});
