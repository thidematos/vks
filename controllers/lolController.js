const catchAsync = require('../utils/catchAsync');
const lolApi = require('./../services/lolApi');

exports.getVersions = ({ endpoint, currentVersion }) => {
  return catchAsync(async (req, res, next) => {
    const versions = await lolApi.getVersions();

    const version = currentVersion ? versions.at(0) : versions;

    if (!endpoint) {
      req.versions = version;
      return next();
    }

    res.status(200).json({
      status: 'success',
      data: {
        version,
      },
    });
  });
};

exports.getChampions = ({ endpoint }) => {
  return catchAsync(async (req, res, next) => {
    const currentVersion = req.versions;

    const champions = await lolApi.getChampions(currentVersion);

    if (!endpoint) {
      req.champions = champions;
      return next();
    }

    res.status(200).json({
      status: 'success',
      data: {
        champions,
      },
    });
  });
};
