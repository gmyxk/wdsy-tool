import { cloneDeep } from 'lodash-es';

export class BaseContent<Data extends Record<string | number, any>> {
  public originalContent: string;

  private data: Data;

  constructor(content: string) {
    this.originalContent = content;

    this.data = BaseContent.parse(content);
  }

  /**
   * 获取当前 content
   */
  public get currentContent() {
    return BaseContent.stringify(this.data);
  }

  /**
   * 获取原始
   */
  public get currentData() {
    return this.data;
  }

  public setData(data: Data) {
    this.data = data;
  }

  /**
   * 将 content 序列化为 js 对象
   * @param content
   * @returns
   */
  static parse<T extends Record<string, any>>(content: string) {
    let text = content;

    // 替换所有 \n 为 SYB_N
    text = text.replace(/\n/g, 'SYB_N');

    // 替换所有 前面不为 '(' 的 '['
    text = text.replace(/(?<!\()\[/g, 'SYB_BS');
    // 替换所有 后面不为 ')' 的 ']'
    text = text.replace(/\](?!\))/g, 'SYB_BE');
    // 替换所有 前面不为 '(' 的 '{'
    text = text.replace(/(?<!\()\{/g, 'SYB_BLS');
    // 替换所有 后面不为 ')' 的 '}'
    text = text.replace(/\}(?!\))/g, 'SYB_BLE');

    text = text.replace(/:([0-9]):([0-9])/g, (_match, p1, p2) => {
      return `_${p1}_${p2}`;
    });

    // 替换所有 :key: 为 ':key:':
    text = text.replace(/:([A-Z0-9]{5,}):/g, (_match, p1) => {
      return `':${p1}:'`;
    });

    // 替换所有 U 为 'VAR_U':
    text = text.replace(/U,/g, "'VAR_U',");

    // 替换所有双转义符
    // text = text.replace(/\\\\"/g, '\\"');

    text = text.replace(/\(\[/g, '{');
    text = text.replace(/\]\)/g, '}');
    text = text.replace(/\(\{/g, '[');
    text = text.replace(/\}\)/g, ']');

    /**
     * 转换对象中的特殊值
     * @param value
     */
    const decodeSpecialValue = (value: Record<string | number, any>) => {
      for (const key in value) {
        if (typeof value[key] === 'object') {
          decodeSpecialValue(value[key]);
          continue;
        }
        // 转换包含类元组对象的字符串
        // 转换前: "通灵宝玉:([243:100,240:8,244:5,232:41,229:([65:5,68:10,]),231:([68:10,]),233::6ACACACACAAC17862:,49:320000,47:1,274:1,])"
        // 转换后: ["通灵宝玉", { "47": 1, "49": 320000, "229": { "64": 22, "65": 5, "68": 10 }, "231": { "68": 10 }, "232": 41, "233": ":6ERGERGERG:", "240": 8, "243": 110, "244": 5, "274": 1 }]
        if (typeof value[key] === 'string' && value[key].includes(':{')) {
          const spIndex = value[key].indexOf(':');
          const k = value[key].slice(0, spIndex);
          const v = value[key].slice(spIndex + 1, value[key].length);
          const tuple = [k, eval(`(${v})`)];

          value[key] = tuple;
        }
      }
    };

    try {
      const obj = eval(`(${text})`);

      decodeSpecialValue(obj);

      return obj as T;
    } catch (error) {
      const originMesssage = (error as Error).message;
      (error as Error).message =
        `Content Serialization Error, ${originMesssage}, the content is:\n ${content}`;
      throw error;
    }
  }

  /**
   * 反序列化对象到 content 字符串
   * @param obj
   * @returns
   */
  static stringify(obj: Record<string | number, any>) {
    const clonedObj = cloneDeep(obj);

    const encodeSpecialValue = (value: Record<string | number, any>) => {
      for (const key in value) {
        if (
          Array.isArray(value[key]) &&
          value[key].length === 2 &&
          typeof value[key][0] === 'string' &&
          typeof value[key][1] === 'object'
        ) {
          const k = value[key][0];
          const v = JSON.stringify(value[key][1]);
          value[key] = `${k}:${v}`;
          continue;
        }

        if (typeof value[key] === 'object') {
          encodeSpecialValue(value[key]);
        }
      }
    };

    encodeSpecialValue(clonedObj);

    let content = JSON.stringify(clonedObj);

    // } 前面加 ,
    content = content.replace(/(?<!\{)\}/g, ',}');
    // ] 前面加 ,
    content = content.replace(/(?<!\[)\]/g, ',]');

    content = content.replace(/\[/g, '({');
    content = content.replace(/\]/g, '})');
    content = content.replace(/(?<!\()\{/g, '([');
    content = content.replace(/\}(?!\))/g, '])');

    // 将 \"2678\": 转换成 2678: 即将纯数字的字符串转换成数字
    content = content.replace(/\\"([0-9]{1,})\\":/g, (_match, p1) => {
      return `${p1}:`;
    });

    // 将 "2678": 转换成 2678: 即将纯数字的字符串转换成数字
    content = content.replace(/"([0-9]{1,})":/g, (_match, p1) => {
      return `${p1}:`;
    });

    // 将 \"VAR_U\" 转换成 U
    content = content.replace(/\\"VAR_([A-Z]{1,})\\"/g, (_match, p1) => {
      return p1;
    });

    // 将 "VAR_U" 转换成 U
    content = content.replace(/"VAR_([A-Z]{1,})"/g, (_match, p1) => {
      return p1;
    });

    // 将 \":6ACAC234234:\" 转换为 :6ACAC234234:
    content = content.replace(/\\":([A-Z0-9]{5,}):\\"/g, (_match, p1) => {
      return `:${p1}:`;
    });

    // 将 ":6ACAC234234:" 转换为 :6ACAC234234:
    content = content.replace(/":([A-Z0-9]{5,}):"/g, (_match, p1) => {
      return `:${p1}:`;
    });

    content = content.replace(/_([0-9])_([0-9])/g, (_match, p1, p2) => {
      return `:${p1}:${p2}`;
    });

    // 替换所有 SYB_BLE 为 ]
    content = content.replace(/SYB_BLE/g, '}');
    // 替换所有 SYB_BLS 为 [
    content = content.replace(/SYB_BLS/g, '{');
    // 替换所有 SYB_BE 为 ]
    content = content.replace(/SYB_BE/g, ']');
    // 替换所有 SYB_BS 为 [
    content = content.replace(/SYB_BS/g, '[');

    // 替换所有 SYB_N 为 \n
    content = content.replace(/SYB_N/g, '\n');

    try {
      BaseContent.parse(content);
    } catch (error) {
      const originMesssage = (error as Error).message;
      (error as Error).message =
        `Content Stringify Error, ${originMesssage}, the content is:\n ${content}`;
      throw error;
    }

    return content;
  }

  /**
   * 美化 content 文本
   * @param content content 文本
   * @param indent 缩进行数
   * @returns
   */
  static deformat(content: string, indent = 4) {
    let str = content.replace(/\(\[/g, '([\n');
    str = str.replace(/\({/g, '({\n');
    str = str.replace(/,/g, ',\n');
    // 对 :60ACDE123123: 的字符串进行特殊处理
    str = str.replace(/:([A-Z0-9]{5,}):/g, (_match, p1) => {
      return `AAA_${p1}_AAA`;
    });
    str = str.replace(/:/g, ': ');
    str = str.replace(/AAA_([A-Z0-9]{5,})_AAA/g, (_match, p1) => {
      return `:${p1}:`;
    });

    const lineArr = str.split('\n');

    const newLineArr: string[] = [];

    let curIndentLevel = 0;

    lineArr.forEach((v) => {
      if (
        v.endsWith('])",') ||
        v.endsWith(']),') ||
        v.endsWith('])') ||
        v.endsWith('})",') ||
        v.endsWith('}),') ||
        v.endsWith('})')
      ) {
        curIndentLevel--;
      }

      const indentStr =
        curIndentLevel > 0 ? ' '.repeat(curIndentLevel * indent) : '';
      let r = `${indentStr}${v}`;

      if (v.endsWith('([') || v.endsWith('({')) {
        curIndentLevel++;
      }

      newLineArr.push(r);
    });

    return newLineArr.join('\n');
  }

  /**
   * 还原 content 文本
   * @param content
   * @returns
   */
  static enformat(content: string) {
    let text = content.replaceAll(' ', '');
    text = text.replace(/\r\n/g, '\n');
    text = text.replace(/\n/g, '');
    // let text = content.replace(/\r\n/g, '\n');
    // text = text.replace(/\r/g, '');
    // text = text.replaceAll(' ', '');


    return text;
  }
}
