import uuidv4 from 'uuid/v4';

class LocalStorageOfCommentsService {

  static LOCAL_STORAGE_KEY = 'retro-board-feedbacks';

  create(feedback) {
    const persistedFeedbacks = this.getFeedbackList();
    feedback.id = uuidv4();

    persistedFeedbacks.push(feedback);
    localStorage.setItem(LocalStorageOfCommentsService.LOCAL_STORAGE_KEY, JSON.stringify(persistedFeedbacks));

    return feedback;
  }

  getFeedbackList() {
    const persistedJson = localStorage.getItem(LocalStorageOfCommentsService.LOCAL_STORAGE_KEY);
    if (!persistedJson) {
      return [];
    }

    return JSON.parse(persistedJson);
  }


}

export default new LocalStorageOfCommentsService();
