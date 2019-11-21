import { APP_BASE_URL } from '../utils/constants';

class BoardApi {
  async getStickers(code, token) {
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
        console.log(error);
      }
    }

    if (response.status === 200 && responseBody.errorCode === 0) {
      return responseBody.stickers;
    }

    return [];
  }
}

export default BoardApi;
