import uuidv4 from 'uuid/v4';
import { feedbackSaved, feedbackDeleted, feedbackUpdated } from './actions';

class LocalStorageOfCommentsService {
  static LOCAL_STORAGE_KEY = 'retro-board-feedbacks';
  dispatch = () => {};
  instance = null;

  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  create(feedback) {
    const persistedFeedbacks = this.getFeedbackList();
    feedback.id = uuidv4();

    persistedFeedbacks.push(feedback);
    localStorage.setItem(LocalStorageOfCommentsService.LOCAL_STORAGE_KEY, JSON.stringify(persistedFeedbacks));

    this.dispatch(feedbackSaved(feedback, this.getFeedbackList()));
    return feedback;
  }

  update(feedback) {
    const comments = this.getFeedbackList();
    const index = comments.findIndex((c) => (c.id === feedback.id));

    if (index === -1) {
      return;
    }

    comments[index] = feedback;
    localStorage.setItem(LocalStorageOfCommentsService.LOCAL_STORAGE_KEY, JSON.stringify(comments));
    this.dispatch(feedbackUpdated(feedback, this.getFeedbackList()));
  }

  delete(feedbackId) {
    const comments = this.getFeedbackList().filter((comment) => comment.id !== feedbackId);
    localStorage.setItem(LocalStorageOfCommentsService.LOCAL_STORAGE_KEY, JSON.stringify(comments));
    this.dispatch(feedbackDeleted(feedbackId, this.getFeedbackList()));
  }

  getFeedbackList() {
    const persistedJson = localStorage.getItem(LocalStorageOfCommentsService.LOCAL_STORAGE_KEY);
    if (!persistedJson) {
      return [];
    }

    return JSON.parse(persistedJson);
  }

  static getInstance(dispatch) {
    if (LocalStorageOfCommentsService.instance == null) {
      if (!dispatch) {
        return null;
      }

      LocalStorageOfCommentsService.instance = new LocalStorageOfCommentsService(dispatch);
    }

    return LocalStorageOfCommentsService.instance;
  }
}

export default LocalStorageOfCommentsService;
