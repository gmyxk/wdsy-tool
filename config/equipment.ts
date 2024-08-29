import { SendEquipmentItem } from '@/scheme';
import { ATTRIBUTE_ENUM } from './attrs';

type ItemType = Pick<SendEquipmentItem, 'type' | 'level' | 'name'>;

/**
 * 枪
 */
const EQUIPMENT_SPEAR: ItemType[] = [
  {
    name: '暴雨梨花枪',
    level: 70,
    type: 1,
  },
  {
    name: '云龙枪',
    level: 80,
    type: 1,
  },
  {
    name: '蕴雷枪',
    level: 90,
    type: 1,
  },
  {
    name: '风火游龙枪',
    level: 100,
    type: 1,
  },
  {
    name: '九转金刚刃',
    level: 110,
    type: 1,
  },
  {
    name: '混元斩龙戟',
    level: 120,
    type: 1,
  },
  {
    name: '赤眼神龙枪',
    level: 130,
    type: 1,
  },
  {
    name: '九天祥云戟',
    level: 140,
    type: 1,
  },
];

/**
 * 爪
 */
const EQUIPMENT_PAW = [
  {
    name: '幽冥鬼爪',
    level: 70,
    type: 1,
  },
  {
    name: '噬魂魔爪',
    level: 80,
    type: 1,
  },
  {
    name: '拂兰指',
    level: 90,
    type: 1,
  },
  {
    name: '啼血爪',
    level: 100,
    type: 1,
  },
  {
    name: '七巧玲珑爪',
    level: 110,
    type: 1,
  },
  {
    name: '镇魂摄天刺',
    level: 120,
    type: 1,
  },
  {
    name: '红绫火毒爪',
    level: 130,
    type: 1,
  },
  {
    name: '九幽伏魔爪',
    level: 140,
    type: 1,
  },
];

/** 剑 */
const EQUIPMENT_SWORD: ItemType[] = [
  {
    name: '追魂剑',
    level: 70,
    type: 1,
  },
  {
    name: '九黎剑',
    level: 80,
    type: 1,
  },
  {
    name: '轩辕剑',
    level: 90,
    type: 1,
  },
  {
    name: '乙木神剑',
    level: 100,
    type: 1,
  },
  {
    name: '紫青玄魔剑',
    level: 110,
    type: 1,
  },
  {
    name: '封神诛仙剑',
    level: 120,
    type: 1,
  },
  {
    name: '九天玄冥剑',
    level: 130,
    type: 1,
  },
  {
    name: '赤魔遁龙剑',
    level: 140,
    type: 1,
  },
];

/**
 * 扇
 */
const EQUIPMENT_FAN = [
  {
    name: '流云扇',
    level: 70,
    type: 1,
  },
  {
    name: '蔽日扇',
    level: 80,
    type: 1,
  },
  {
    name: '乾坤扇',
    level: 90,
    type: 1,
  },
  {
    name: '五彩神焰扇',
    level: 100,
    type: 1,
  },
  {
    name: '离火七翎扇',
    level: 110,
    type: 1,
  },
  {
    name: '赤霄烈焰扇',
    level: 120,
    type: 1,
  },
  {
    name: '红云火霞扇',
    level: 130,
    type: 1,
  },
  {
    name: '熠焰通灵扇',
    level: 140,
    type: 1,
  },
];

/**
 * 锤
 */
const EQUIPMENT_HAMMER = [
  {
    name: '晃金锤',
    level: 70,
    type: 1,
  },
  {
    name: '撼地锤',
    level: 80,
    type: 1,
  },
  {
    name: '破天锤',
    level: 90,
    type: 1,
  },
  {
    name: '加持杵',
    level: 100,
    type: 1,
  },
  {
    name: '炼狱麒麟杵',
    level: 110,
    type: 1,
  },
  {
    name: '风雷如意杵',
    level: 120,
    type: 1,
  },
  {
    name: '玄黄破坚锤',
    level: 130,
    type: 1,
  },
  {
    name: '玄天火龙锤',
    level: 140,
    type: 1,
  },
];

/**
 * 男头饰
 */
const EQUIPMENT_HAT_MAN = [
  {
    name: '乾坤冠',
    level: 70,
    type: 2,
  },
  {
    name: '龙冠',
    level: 80,
    type: 2,
  },
  {
    name: '蟠龙冠',
    level: 90,
    type: 2,
  },
  {
    name: '九霄烈焰冠',
    level: 100,
    type: 2,
  },
  {
    name: '星耀冠',
    level: 110,
    type: 2,
  },
  {
    name: '七星宝冠',
    level: 120,
    type: 2,
  },
  {
    name: '白玉星冠',
    level: 130,
    type: 2,
  },
  {
    name: '双翼灵枭冠',
    level: 140,
    type: 2,
  },
];

/**
 * 女头饰
 */
const EQUIPMENT_HAT_WOMAN = [
  {
    name: '鱼尾冠',
    level: 70,
    type: 2,
  },
  {
    name: '凤冠',
    level: 80,
    type: 2,
  },
  {
    name: '金霞冠',
    level: 90,
    type: 2,
  },
  {
    name: '九霄凤鸣冠',
    level: 100,
    type: 2,
  },
  {
    name: '凌波霞冠',
    level: 110,
    type: 2,
  },
  {
    name: '天灵宝冠',
    level: 120,
    type: 2,
  },
  {
    name: '九彩玲珠冠',
    level: 130,
    type: 2,
  },
  {
    name: '赤鸾翎羽冠',
    level: 140,
    type: 2,
  },
];

/**
 * 男衣
 */
const EQUIPMENT_CLOTHES_MAN = [
  {
    name: '八卦衣',
    level: 70,
    type: 3,
  },
  {
    name: '连环甲',
    level: 80,
    type: 3,
  },
  {
    name: '金缕衣',
    level: 90,
    type: 3,
  },
  {
    name: '天衣',
    level: 100,
    type: 3,
  },
  {
    name: '瀚宇法袍',
    level: 110,
    type: 3,
  },
  {
    name: '诸天法袍',
    level: 120,
    type: 3,
  },
  {
    name: '天玄真神甲',
    level: 130,
    type: 3,
  },
  {
    name: '赤金磐龙甲',
    level: 140,
    type: 3,
  },
];

/**
 * 女衣
 */
const EQUIPMENT_CLOTHES_WOMAN = [
  {
    name: '狐皮袄',
    level: 70,
    type: 3,
  },
  {
    name: '蛟皮袄',
    level: 80,
    type: 3,
  },
  {
    name: '天蚕衣',
    level: 90,
    type: 3,
  },
  {
    name: '霓裳羽衣',
    level: 100,
    type: 3,
  },
  {
    name: '星晶法衣',
    level: 110,
    type: 3,
  },
  {
    name: '神鸢凤裘',
    level: 120,
    type: 3,
  },
  {
    name: '万霞霓罗裳',
    level: 130,
    type: 3,
  },
  {
    name: '玄女绛绡衣',
    level: 140,
    type: 3,
  },
];

/**
 * 鞋
 */
const EQUIPMENT_SHOES = [
  {
    name: '疾风履',
    level: 70,
    type: 10,
  },
  {
    name: '无影靴',
    level: 80,
    type: 10,
  },
  {
    name: '天行履',
    level: 90,
    type: 10,
  },
  {
    name: '踏云靴',
    level: 100,
    type: 10,
  },
  {
    name: '御风履',
    level: 110,
    type: 10,
  },
  {
    name: '钧天履',
    level: 120,
    type: 10,
  },
  {
    name: '雷弧闪',
    level: 130,
    type: 10,
  },
  {
    name: '惊虹战靴',
    level: 140,
    type: 10,
  },
];

/**
 * 所有装备
 */
export const EQUIPMENT_LIST = [
  ...EQUIPMENT_SPEAR,
  ...EQUIPMENT_PAW,
  ...EQUIPMENT_SWORD,
  ...EQUIPMENT_FAN,
  ...EQUIPMENT_HAMMER,
  ...EQUIPMENT_HAT_MAN,
  ...EQUIPMENT_HAT_WOMAN,
  ...EQUIPMENT_CLOTHES_MAN,
  ...EQUIPMENT_CLOTHES_WOMAN,
  ...EQUIPMENT_SHOES,
];

export const EQUI_TPLS: Array<{
  templateName: string;
  data: SendEquipmentItem;
}> = [
  {
    templateName: '130级金套枪',
    data: {
      level: 130,
      type: 1,
      name: '赤眼神龙枪',
      anis: 1,
      transLevel: 12,
      resonanceAttr: ATTRIBUTE_ENUM[11][0],
      blueAttrs: [
        {
          attribute: 65,
          value: 5,
        },
        {
          attribute: 30,
          value: 5,
        },
        {
          attribute: 297,
          value: 3800,
        },
      ],
      pinkAttrs: [
        {
          attribute: 65,
          value: 5,
        },
      ],
      yellowAttrs: [
        {
          attribute: 297,
          value: 3800,
        },
      ],
      greenAttrs: [
        {
          attribute: 108,
          value: 10,
        },
      ],
      greenDarkAttrs: [
        {
          attribute: 11,
          value: 984,
        },
      ],
      transAttrs: [
        {
          attribute: 3,
          value: 13296,
        },
        {
          attribute: 64,
          value: 24,
        },
      ],
    },
  },
];
