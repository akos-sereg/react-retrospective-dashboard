import { APP_BASE_URL } from '../utils/constants';

class BoardApi {
  async getStickers(code, token) {
    const sessionDetails = await this.getBoardDetails(code, token);
    if (sessionDetails != null) {
      return sessionDetails.stickers;
    }

    return [];
  }

  async getBoardState(code, token) {
    const sessionDetails = await this.getBoardDetails(code, token);
    if (sessionDetails != null) {
      return sessionDetails.sessionParameters ? sessionDetails.sessionParameters.boardState : null;
    }

    return null;
  }

  async getBoardDetails(code, token) {
    const response = await fetch(`${APP_BASE_URL}/rest/host/session/${code}?token=${token}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });

    let responseBody = null;
    try {
      responseBody = JSON.parse(await response.text());
    } catch (error) {
      if (response.status !== 200) {
        console.error(error);
        console.error(response);
      }
    }

    if (response.status === 200 && responseBody.errorCode === 0) {
      return responseBody;
    }

    return null;
  }
}

export default BoardApi;
