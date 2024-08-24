/**
 * 获取道行描述
 * @param points
 * @returns
 */
export function pointsToYearsDaysPoints(points: number) {
  points = points * 1000;

  const pointsPerYear = 360 * 1000; // 每年等于 365,000 点
  const pointsPerDay = 1000; // 每天等于 1,000 点

  let result = "";

  // 计算年数
  const years = Math.floor(points / pointsPerYear);
  points %= pointsPerYear;

  if (years > 0) {
    result += `${years}年`;
  }

  // 计算天数
  const days = Math.floor(points / pointsPerDay);
  points %= pointsPerDay;

  if (days > 0) {
    result += `${days}天`;
  }

  // 剩余点数
  const remainingPoints = points;

  if (remainingPoints > 0 || result === "") {
    // 显示点数，或在 result 为空时显示 0点
    result += `${remainingPoints}点`;
  }

  return result;
}
