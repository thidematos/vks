const { default: axios } = require('axios');

exports.getVersions = async function () {
  const res = await axios.get(
    'https://ddragon.leagueoflegends.com/api/versions.json'
  );

  return res.data;
};

exports.getChampions = async function (version) {
  const res = await axios.get(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  );

  return res.data.data;
};

exports.getSplashLink = function (championName) {
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`;
};
