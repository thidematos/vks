function distanceBetweenTwoPoints(pointP, pointQ) {
  return Math.sqrt(
    (pointP.x - pointQ.x) * (pointP.x - pointQ.x) +
      (pointP.z - pointQ.z) * (pointP.z - pointQ.z)
  );
}

module.exports = distanceBetweenTwoPoints;
