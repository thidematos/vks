const catchAsync = require('../utils/catchAsync');
const lolApi = require('./../services/lolApi');

exports.getVersions = ({ endpoint, currentVersion }) => {
  return catchAsync(async (req, res, next) => {
    const versions = await lolApi.getVersions();
    const usedVersions = [];

    req.allMatchDetails.forEach((MatchDetails) => {
      const version = currentVersion
        ? versions.at(0)
        : versions.find((version) =>
            version.startsWith(MatchDetails.MatchEvents.version)
          );

      MatchDetails.MatchEvents.definePatch(version);

      usedVersions.push(version);
    });

    if (!endpoint) {
      req.versions = usedVersions;

      return next();
    }

    res.status(200).json({
      status: 'success',
      data: {
        versions,
      },
    });
  });
};

exports.getChampions = ({ endpoint }) => {
  return catchAsync(async (req, res, next) => {
    const promises = req.versions.map(async (version) => {
      const champions = await lolApi.getChampions(version);
      return champions;
    });

    const allChampions = await Promise.all(promises);

    if (!endpoint) {
      req.allMatchDetails.forEach((MatchDetails, ind) => {
        MatchDetails.MatchEvents.defineChampions(allChampions[ind]);
      });

      return next();
    }

    res.status(200).json({
      status: 'success',
      data: {
        allChampions,
      },
    });
  });
};
