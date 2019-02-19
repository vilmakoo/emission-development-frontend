import axios from 'axios';

const countrysEmissions = async (country, perCapita, compare) => {
  const response = await axios.get(`/api/emissions/${country}?percapita=${perCapita}&compare=${compare}`);
  return response.data;
};

export default { countrysEmissions };