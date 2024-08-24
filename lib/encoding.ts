import crypto from 'crypto';
import iconv from 'iconv-lite';
export class DBEncoder {
  /**
   * 将 GB2312 转换为 UTF-16
   * @param text
   * @returns
   */
  static decodeGb2312(text: string) {
    return iconv.decode(Buffer.from(text, 'binary'), 'gb2312');
  }

  /**
   * 将 UTF-16 转换为 GB2312
   * @param text
   * @returns
   */
  static encodeToGb2312(text: string) {
    return iconv.encode(text, 'gb2312').toString('binary');
  }

  /**
   * 生成 checksum
   * @param data 需要计算校验和的数据，utf-8编码的字符串
   * @param adler 初始的校验和值，通常是先前计算的结果
   */
  static genChecksum(data: string, adler = 1) {
    const bu = iconv.encode(data, 'gbk');

    let s1 = adler & 65535;
    let s2 = (adler >> 16) & 65535;
    const arr = bu.toString('hex').match(/.{1,2}/g);

    arr?.forEach((i) => {
      s1 = (s1 + parseInt(i, 16)) % 65521;
      s2 = (s2 + s1) % 65521;
    });

    let nSeed = (s2 << 16) | s1;

    nSeed = nSeed ^ parseInt('AB7932CF', 16);

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
  }

  /**
   * 生成随机 ID  66AC5D413D2189000101
   * @returns 
   */
  static genRandomId() {
    return crypto.randomBytes(10).toString('hex').toUpperCase();
  }
}
