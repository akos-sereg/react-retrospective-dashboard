// ParticipantApi
export const BROKEN_PIPE = 'retrospective/ParticipantApi/BROKEN_PIPE';
export const CONNECTING = 'retrospective/ParticipantApi/CONNECTING';
export const CONNECTED = 'retrospective/ParticipantApi/CONNECTED';

// Application
export const READY_STATE_CHANGED = 'retrospective/ParticipantButtonBar/READY_STATE_CHANGED';
export const CREATE_FEEDBACK_CLICKED = 'retrospective/ParticipantButtonBar/CREATE_FEEDBACK_CLICKED';
export const FEEDBACK_DIALOG_CLOSING = 'retrospective/FeedbackDialog/FEEDBACK_DIALOG_CLOSING';
export const MOOD_SELECTED = 'retrospective/FeedbackDialog/GladSadMad/MOOD_SELECTED';
export const FEEDBACK_SAVED = 'retrospective/LocalStorageOfCommentsService/FEEDBACK_SAVED';
export const FEEDBACK_DELETED = 'retrospective/LocalStorageOfCommentsService/FEEDBACK_DELETED';
export const FEEDBACK_UPDATED = 'retrospective/LocalStorageOfCommentsService/FEEDBACK_UPDATED';
export const PAGE_LOADING = 'retrospective/ParticipantPage/PAGE_LOADING';
export const EDIT_FEEDBACK_CLICKED = 'retrospective/UnpublishedFeedback/EDIT_FEEDBACK_CLICKED';
export const CONFIRMATION_DIALOG_CLOSING = 'retrospective/ConfirmationDialog/CONFIRMATION_DIALOG_CLOSING';
export const CONFIRMATION_DIALOG_OPENING = 'retrospective/ConfirmationDialog/CONFIRMATION_DIALOG_OPENING';
export const PUBLISHING_FEEDBACKS = 'retrospective/ParticipantApi/PUBLISHING_FEEDBACKS';
export const JOIN_CLICKED = 'retrospective/NicknameProvider/JOIN_CLICKED';

// core
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

// backend
export const APP_WEBSOCKET_URL = 'http://local.retrospective-dashboard:8080/ws';
export const APP_BASE_URL = 'http://local.retrospective-dashboard:8080';

// export const APP_WEBSOCKET_URL = 'https://www.retrospective-dashboard.org/ws';
// export const APP_BASE_URL = 'https://www.retrospective-dashboard.org';
