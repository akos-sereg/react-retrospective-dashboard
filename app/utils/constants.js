// ParticipantApi
export const BROKEN_PIPE = 'retrospective/ParticipantApi/BROKEN_PIPE';
export const CONNECTING = 'retrospective/ParticipantApi/CONNECTING';
export const CONNECTED = 'retrospective/ParticipantApi/CONNECTED';

// Application
export const READY_STATE_CHANGED = 'retrospective/ParticipantButtonBar/READY_STATE_CHANGED';
export const CREATE_FEEDBACK_CLICKED = 'retrospective/ParticipantButtonBar/CREATE_FEEDBACK_CLICKED';
export const FEEDBACK_DIALOG_CLOSING = 'retrospective/FeedbackDialog/FEEDBACK_DIALOG_CLOSING';
export const MOOD_SELECTED = 'retrospective/FeedbackDialog/GladSadMad/MOOD_SELECTED';

// core
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

// websocket
export const APP_WEBSOCKET_URL = 'http://local.retrospective-dashboard:8080/ws';
