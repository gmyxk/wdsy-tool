import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import isLeapYear from "dayjs/plugin/isLeapYear";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(isLeapYear);
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

export default dayjs;
