import { DBEncoder } from "@/lib/encoding";
import { SendMailApiReq } from "@/scheme";
import dayjs from "dayjs";
import { Pool } from "mysql2/promise";

/**
 * 发送邮件
 * @param pool
 * @param params
 */
export const sendMailService = async (pool: Pool, params: SendMailApiReq) => {
  SendMailApiReq.parse(params);

  const {
    message = "祝道友身体健康, 万事如意！",
    attachment,
    gids,
    title,
  } = params;

  const excuteList = gids.map((gid) => {
    const create_time = dayjs().unix();

    const expired_time = dayjs().add(14, "day").unix();

    let randomNumber = Math.floor(Math.random() * 900) + 100;

    const misc = `(["read_time":${create_time},"log_type":0,"para":([]),"message":"${message}",])`;

    const maid = `${gid.slice(0, -1)}${create_time}${randomNumber}`;

    const status = 0;

    const data = `${maid}${gid}${status}${title}${status}${create_time}${expired_time}${attachment}${misc}`;

    const checksum = DBEncoder.genChecksum(data);

    return [
      maid,
      "",
      gid,
      0,
      DBEncoder.encodeToGb2312(title),
      0,
      0,
      create_time,
      expired_time,
      DBEncoder.encodeToGb2312(attachment),
      "",
      DBEncoder.encodeToGb2312(misc),
      checksum,
    ];
  });

  const placeholders = excuteList
    .map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .join(", ");
  const values = excuteList.flat();

  const res = await pool.execute(
    `INSERT INTO mail (id, sender, to_gid, status, title, type, log_type, create_time, expired_time, attachment, fetch_mark, misc, checksum) VALUES ${placeholders}`,
    values
  );

  return res;
};
