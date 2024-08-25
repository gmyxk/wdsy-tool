import { SendHorcruxItem } from '@/verification';

export const HORCRUX_TYPE = [
  '魂器·锋芒',
  '魂器·魂灯',
  '魂器·鬼步',
  '魂器·润泽',
  '魂器·薄暮',
  '魂器·轮回',
  '魂器·伏虎',
  '魂器·双极',
  '魂器·灵咒',
];

interface HorcruxAttr {
  label: string;
  value: string;
}

/**
 * 魂器阳属性
 */
export const HORCRUX_ATTR_LIGHT: HorcruxAttr[] = [
  {
    value: 'phy_power',
    label: '物伤',
  },
  {
    value: 'dex',
    label: '敏捷',
  },
  {
    value: 'mag_power',
    label: '法伤',
  },
  {
    value: 'penetrate',
    label: '破防',
  },
  {
    value: 'speed',
    label: '速度',
  },
  {
    value: 'penetrate_rate',
    label: '破防率',
  },
  {
    value: 'str',
    label: '力量',
  },
  {
    value: 'double_hit',
    label: '物理连击次数',
  },
  {
    value: 'wiz',
    label: '灵力',
  },
  {
    value: 'double_hit_rate',
    label: '物理连击率',
  },
  {
    value: 'ignore_resist_metal',
    label: '忽视目标抗金',
  },
  {
    value: 'ignore_resist_wood',
    label: '忽视目标抗木',
  },
  {
    value: 'ignore_resist_water',
    label: '忽视目标抗水',
  },
  {
    value: 'ignore_resist_fire',
    label: '忽视目标抗火',
  },
  {
    value: 'ignore_resist_earth',
    label: '忽视目标抗土',
  },
  {
    value: 'ignore_resist_forgotten',
    label: '忽视目标抗遗忘',
  },
  {
    value: 'ignore_resist_poison',
    label: '忽视目标抗中毒',
  },
  {
    value: 'ignore_resist_frozen',
    label: '忽视目标抗冰冻',
  },
  {
    value: 'ignore_resist_sleep',
    label: '忽视目标抗昏睡',
  },
  {
    value: 'ignore_resist_confusion',
    label: '忽视目标抗混乱',
  },
];

/**
 * 魂器阴属性
 */
export const HORCRUX_ATTR_DARK = [
  {
    value: 'def',
    label: '防御',
  },
  {
    value: 'max_life',
    label: '气血',
  },
  {
    value: 'max_mana',
    label: '法力',
  },
  {
    value: 'con',
    label: '体质',
  },
  {
    value: 'damage_sel',
    label: '反震度',
  },
  {
    value: 'damage_sel_rate',
    label: '反震率',
  },
  {
    value: 'counter_attack',
    label: '反击次数',
  },
  {
    value: 'all_resist_polar',
    label: '所有抗性',
  },
  {
    value: 'all_resist_except',
    label: '所有抗异常',
  },
  {
    value: 'resist_metal',
    label: '金抗性',
  },
  {
    value: 'resist_wood',
    label: '木抗性',
  },
  {
    value: 'resist_water',
    label: '水抗性',
  },
  {
    value: 'resist_fire',
    label: '火抗性',
  },
  {
    value: 'resist_earth',
    label: '土抗性',
  },
  {
    value: 'resist_forgotten',
    label: '抗遗忘',
  },
  {
    value: 'resist_poison',
    label: '抗中毒',
  },
  {
    value: 'resist_frozen',
    label: '抗冰冻',
  },
  {
    value: 'resist_sleep',
    label: '抗昏睡',
  },
  {
    value: 'resist_confusion',
    label: '抗混乱',
  },
];

/**
 * 预设模板
 */
export const HORCRUX_PRE_TPL: Array<{
  templateName: string;
  data: SendHorcruxItem;
}> = [
  {
    templateName: '100级力锋芒',
    data: {
      name: '魂器·锋芒',
      level: 100,
      skillLevel: 5,
      chaosValue: 100,
      lightProportion: 70,
      attributes: [
        {
          lightAttribute: 'phy_power',
          lightAttributeValue: 829,
          darkAttribute: 'def',
          darkAttributeValue: 2295,
        },
        {
          lightAttribute: 'phy_power',
          lightAttributeValue: 829,
          darkAttribute: 'def',
          darkAttributeValue: 2295,
        },
        {
          lightAttribute: 'str',
          lightAttributeValue: 20,
          darkAttribute: 'max_life',
          darkAttributeValue: 3443,
        },
        {
          lightAttribute: 'str',
          lightAttributeValue: 20,
          darkAttribute: 'max_life',
          darkAttributeValue: 3443,
        },
        {
          lightAttribute: 'dex',
          lightAttributeValue: 20,
          darkAttribute: 'all_resist_except',
          darkAttributeValue: 15,
        },
      ],
    },
  },
  {
    templateName: '100级法灵咒',
    data: {
      name: '魂器·灵咒',
      level: 100,
      skillLevel: 5,
      chaosValue: 100,
      lightProportion: 70,
      attributes: [
        {
          lightAttribute: 'mag_power',
          lightAttributeValue: 730,
          darkAttribute: 'def',
          darkAttributeValue: 2295,
        },
        {
          lightAttribute: 'mag_power',
          lightAttributeValue: 730,
          darkAttribute: 'def',
          darkAttributeValue: 2295,
        },
        {
          lightAttribute: 'wiz',
          lightAttributeValue: 20,
          darkAttribute: 'max_life',
          darkAttributeValue: 3443,
        },
        {
          lightAttribute: 'wiz',
          lightAttributeValue: 20,
          darkAttribute: 'max_life',
          darkAttributeValue: 3443,
        },
        {
          lightAttribute: 'dex',
          lightAttributeValue: 20,
          darkAttribute: 'all_resist_except',
          darkAttributeValue: 15,
        },
      ],
    },
  },
];
