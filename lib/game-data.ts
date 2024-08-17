import iconv from "iconv-lite";

/**
 * 获取道行描述
 * @param points
 * @returns
 */
export function pointsToYearsDaysPoints(points: number) {
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

/**
 * 获取 checksum
 * @param data 需要计算校验和的数据，utf-8编码的字符串
 * @param adler 初始的校验和值，通常是先前计算的结果
 */
export const genChecksum = (data: string, adler = 1) => {
  const bu = iconv.encode(data, "gbk");

  let s1 = adler & 65535;
  let s2 = (adler >> 16) & 65535;
  const arr = bu.toString("hex").match(/.{1,2}/g);

  arr?.forEach((i) => {
    s1 = (s1 + parseInt(i, 16)) % 65521;
    s2 = (s2 + s1) % 65521;
  });

  let nSeed = (s2 << 16) | s1;

  nSeed = nSeed ^ parseInt("AB7932CF", 16);

  let $num = nSeed & 0xffffffff;
  const $p = $num >> 31;

  if ($p == 1) {
    $num = $num - 1;
    $num = ~$num;
    $num = $num & 0xffffffff;
    return $num * -1;
  } else {
    return $num;
  }
};
