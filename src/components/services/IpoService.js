import axios from 'axios';

const API_KEY = 'sk_5caf1b4a7f46406ea95e99901bb5f5d0';


const IpoService = {
  getIpoList: async () => {
    try {
      const response = await axios.get(`https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=${API_TOKEN}`);
      return response.data;
    } catch (error) {
      console.error('Error occured while fetching stock list:', error);
      throw error;
    }
  },
};

export default IpoService;