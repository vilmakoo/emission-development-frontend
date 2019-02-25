import axios from 'axios';

const searchCountrysEmissions = async (country, perCapita, compare) => {
  try {
    const response = await axios.get(`/api/emissions/${country}?percapita=${perCapita}&compare=${compare}`);
    return response.data;
  } catch (error) {
    return 'error';
  }
};

const updateDatabase = async () => {
  try {
    const response = await axios.get('/api/update_database');
    return response.data;
  } catch (error) {
    return 'error';
  }
};

const searchTopEmitters = async () => {
  try {
    const response = await axios.get('/api/emissions/top_emitters');
    return response.data;
  } catch (error) {
    return 'error';
  }
};

export default { searchCountrysEmissions, updateDatabase, searchTopEmitters };