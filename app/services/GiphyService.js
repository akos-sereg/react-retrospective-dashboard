import sampleData from './sample/GiphySampleData.json';
import { APP_BASE_URL } from '../utils/constants';

class GiphyService {
  useMocks = false;

  async search(searchText) {
    console.log(`Searching Giphy: ${searchText}`);

    if (this.useMocks) {
      return sampleData;
    }
    const response = await fetch(`${APP_BASE_URL}/rest/giphy/search?q=${searchText}`, {
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

    if (response.status === 200) {
      return responseBody;
    }

    return null;
  }
}

export default GiphyService;
