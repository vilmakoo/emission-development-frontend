import axios from 'axios';

const countrysEmissions = async (country, perCapita) => {
  const response = await axios.get(`/api/emissions/${country}?percapita=${perCapita}`);
  return response.data;
};

export default { countrysEmissions };