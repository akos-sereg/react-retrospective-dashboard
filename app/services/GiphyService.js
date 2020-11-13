import sampleData from './sample/GiphySampleData.json';

class GiphyService {
  search(searchText) {
    console.log(`Searching Giphy: ${searchText}`);
    return sampleData;
  }
}

export default GiphyService;
