/**
 *
 * key 类型: string | number | :string:
 *
 * value 类型: string | number | U | :string: | ([]) | ({})
 *
 * ([]) 表示对象 等同于 {}
 *
 * ({}) 表示数组 等同于 []
 *
 * 其核心算法在于键值对的转换
 *
 */

import { cloneDeep } from "lodash-es";

export class ContetFactory {
  static parse<T extends Record<string, any>>(content: string) {
    // 替换所有 :key: 为 ":key:":
    let text = content.replace(/:([A-Z0-9]{1,}):/g, (_match, p1) => {
      return `':${p1}:'`;
    });

    // 替换所有 U 为 "VAR_U":
    text = text.replace(/U,/g, '"VAR_U",');
    // text = text.replace(/(?<=[{\[:,])[A-Z]{1,},/g, (_match, p1) => {
    //   return `"VAR_${p1}",`;
    // });

    text = text.replace(/\(\[/g, "{");
    text = text.replace(/\]\)/g, "}");
    text = text.replace(/\(\{/g, "[");
    text = text.replace(/\}\)/g, "]");

    const decodeSpecialValue = (value: Record<string | number, any>) => {
      for (const key in value) {
        if (typeof value[key] === "object") {
          decodeSpecialValue(value[key]);
          continue;
        }
        if (typeof value[key] === "string" && value[key].includes(":{")) {
          const spIndex = value[key].indexOf(":");
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
      console.log("解析错误");
      console.log(content);
      throw error;
    }
  }

  static stringify(obj: Record<string | number, any>) {
    const clonedObj = cloneDeep(obj);
    const encodeSpecialValue = (value: Record<string | number, any>) => {
      for (const key in value) {
        if (
          Array.isArray(value[key]) &&
          value[key].length === 2 &&
          typeof value[key][0] === "string" &&
          typeof value[key][1] === "object"
        ) {
          const k = value[key][0];
          const v = JSON.stringify(value[key][1]);
          value[key] = `${k}:${v}`;
          continue;
        }

        if (typeof value[key] === "object") {
          encodeSpecialValue(value[key]);
        }
      }
    };

    encodeSpecialValue(clonedObj);

    let content = JSON.stringify(clonedObj);

    // } 前面加 ,
    content = content.replace(/(?<!\{)\}/g, ",}");
    // ] 前面加 ,
    content = content.replace(/(?<!\[)\]/g, ",]");

    content = content.replace(/\[/g, "({");
    content = content.replace(/\]/g, "})");
    content = content.replace(/(?<!\()\{/g, "([");
    content = content.replace(/\}(?!\))/g, "])");

    content = content.replace(/\\"([0-9]{1,})\\"/g, (_match, p1) => {
      return p1;
    });

    content = content.replace(/"([0-9]{1,})"/g, (_match, p1) => {
      return p1;
    });

    content = content.replace(/\\"VAR_([A-Z]{1,})\\"/g, (_match, p1) => {
      return p1;
    });

    content = content.replace(/"VAR_([A-Z]{1,})"/g, (_match, p1) => {
      return p1;
    });

    content = content.replace(/\\":([A-Za-z0-9]{1,}):\\"/g, (_match, p1) => {
      return `:${p1}:`;
    });

    content = content.replace(/":([A-Za-z0-9]{1,}):"/g, (_match, p1) => {
      return `:${p1}:`;
    });

    return content;
  }

  /**
   * 美化 content 文本
   * @param content content 文本
   * @param indent 缩进行数
   * @returns
   */
  static deformat(content: string, indent: number = 4) {
    let str = content.replace(/\(\[/g, "([\n");
    str = str.replace(/\({/g, "({\n");
    str = str.replace(/,/g, ",\n");
    str = str.replace(/:([A-Z0-1]{1,}):/g, (_match, p1) => {
      return `AAA_${p1}_AAA`;
    });
    str = str.replace(/:/g, ": ");
    str = str.replace(/AAA_([A-Z0-1]{1,})_AAA/g, (_match, p1) => {
      return `:${p1}:`;
    });

    const lineArr = str.split("\n");

    const newLineArr: string[] = [];

    let curIndentLevel = 0;

    lineArr.forEach((v) => {
      if (
        v.endsWith('])",') ||
        v.endsWith("]),") ||
        v.endsWith("])") ||
        v.endsWith('})",') ||
        v.endsWith("}),") ||
        v.endsWith("})")
      ) {
        curIndentLevel--;
      }

      const indentStr =
        curIndentLevel > 0 ? " ".repeat(curIndentLevel * indent) : "";
      let r = `${indentStr}${v}`;

      if (v.endsWith("([") || v.endsWith("({")) {
        curIndentLevel++;
      }

      newLineArr.push(r);
    });

    return newLineArr.join("\n");
  }

  /**
   * 还原 content 文本
   * @param content
   * @returns
   */
  static enformat(content: string) {
    let text = content.replaceAll("\n", "");
    text = text.replaceAll(" ", "");

    return text;
  }
}
