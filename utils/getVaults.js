const axios = require("axios");
const vaultURL = process.env.VAULTURL;

module.exports = async function getVaults() {
  let responseData = { calls: [], puts: [] };
  await axios.get(vaultURL).then((response) => {
    responseData.calls.push(Object.keys(response.data.call));
    responseData.puts.push(Object.keys(response.data.put));
  });
  return responseData;
};
