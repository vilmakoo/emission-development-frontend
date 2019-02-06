import axios from 'axios';

const countrysEmissions = async (country) => {
  const response = await axios.get(`/api/emissions/${country}`);
  return response.data.emissions; // muuta tää json fiksummaksi bäkkärin puolella
};

export default { countrysEmissions };