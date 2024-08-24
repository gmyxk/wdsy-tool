interface Jewelry {
  level: number;
  /**
   * 首饰类型
   *
   * 4: 项链
   * 5: 玉佩
   * 6: 手镯
   */
  type: 4 | 5 | 6;
  name: string;
}

/**
 * 所有首饰
 */
export const JEWELRY_ENUM: Jewelry[] = [
  { level: 80, type: 6, name: '闭月双环' },
  { level: 80, type: 5, name: '七龙珠' },
  { level: 80, type: 4, name: '天机锁链' },
  { level: 90, type: 6, name: '三清手镯' },
  { level: 90, type: 5, name: '金蝉宝囊' },
  { level: 90, type: 4, name: '秘魔灵珠' },
  { level: 100, type: 6, name: '天星奇光' },
  { level: 100, type: 5, name: '通灵宝玉' },
  { level: 100, type: 4, name: '金碧莲花' },
  { level: 110, type: 6, name: '碎梦涵光' },
  { level: 110, type: 5, name: '寒玉龙勾' },
  { level: 110, type: 4, name: '流光绝影' },
  { level: 120, type: 6, name: '九天霜华' },
  { level: 120, type: 5, name: '八宝如意' },
  { level: 120, type: 4, name: '五蕴悯光' },
  { level: 130, type: 6, name: '岚金火链' },
  { level: 130, type: 5, name: '游火灵焰' },
  { level: 130, type: 4, name: '千彩流光' },
  { level: 140, type: 6, name: '龙御七星' },
  { level: 140, type: 5, name: '炫元玲珑' },
  { level: 140, type: 4, name: '掠虹宝坠' },
  { level: 150, type: 6, name: '贪狼破日' },
  { level: 150, type: 5, name: '七杀固元' },
  { level: 150, type: 4, name: '破军捆灵' },
];

export const ATTRIBUTE_CONFIG = [
  { key: 2, description: '力量' },
  { key: 4, description: '准确' },
  { key: 5, description: '体质' },
  { key: 7, description: '气血' },
  { key: 8, description: '防御' },
  { key: 9, description: '破防' },
  { key: 10, description: '灵力' },
  { key: 13, description: '法力' },
  { key: 14, description: '敏捷' },
  { key: 15, description: '速度' },
  { key: 30, description: '金相性' },
  { key: 31, description: '木相性' },
  { key: 32, description: '水相性' },
  { key: 33, description: '火相性' },
  { key: 34, description: '土相性' },
  { key: 36, description: '金抗性' },
  { key: 37, description: '水抗性' },
  { key: 42, description: '抗中毒' },
  { key: 43, description: '抗冰冻' },
  { key: 45, description: '抗遗忘' },
  { key: 51, description: '物理连击次数' },
  { key: 53, description: '反击次数' },
  { key: 56, description: '反击率' },
  { key: 57, description: '物理连击率' },
  { key: 58, description: '物理必杀率' },
  { key: 59, description: '反震度' },
  { key: 60, description: '反震率' },
  { key: 64, description: '所有属性' },
  { key: 65, description: '所有相性' },
  { key: 66, description: '所有抗性' },
  { key: 67, description: '所有抗异常' },
  { key: 68, description: '所有技能上升' },
  { key: 73, description: '破防率' },
  { key: 85, description: '忽视目标抗金' },
  { key: 86, description: '忽视目标抗木' },
  { key: 87, description: '忽视目标抗水' },
  { key: 88, description: '忽视目标抗火' },
  { key: 89, description: '忽视目标抗土' },
  { key: 90, description: '忽视目标抗遗忘' },
  { key: 91, description: '忽视目标抗中毒' },
  { key: 92, description: '忽视目标抗冰冻' },
  { key: 93, description: '忽视目标抗昏睡' },
  { key: 94, description: '忽视目标抗混乱' },
  { key: 95, description: '强力克金' },
  { key: 96, description: '强力克木' },
  { key: 97, description: '强力克水' },
  { key: 98, description: '强力克火' },
  { key: 99, description: '强力克土' },
  { key: 100, description: '师门攻击技能消耗降低' },
  { key: 101, description: '师门障碍技能消耗降低' },
  { key: 102, description: '师门辅助技能消耗降低' },
  { key: 103, description: '强力中毒' },
  { key: 105, description: '强力遗忘' },
  { key: 107, description: '强力冰冻' },
  { key: 108, description: '强金法伤害' },
  { key: 109, description: '强木法伤害' },
  { key: 110, description: '强水法伤害' },
  { key: 111, description: '强火法伤害' },
  { key: 112, description: '强土法伤害' },
  { key: 113, description: '几率躲避攻击' },
  { key: 119, description: '忽视所有抗性' },
  { key: 200, description: '忽视所有抗异常' },
  { key: 201, description: '几率解除遗忘状态' },
  { key: 202, description: '几率解除中毒状态' },
  { key: 203, description: '几率解除冰冻状态' },
  { key: 204, description: '几率解除昏睡状态' },
  { key: 205, description: '几率解除混乱状态' },
  { key: 252, description: '强物理伤害' },
  { key: 297, description: '伤害' },
  { key: 348, description: '忽视躲避攻击' },
];

interface JewelryHistory {
  title: string;
  /**
   * 首饰类型 id
   *
   * "80_6_闭月双环"
   */
  key: string;
  attributes: { attribute: number; value: number }[];
  /** 是否可删除 */
  deleteble?: true;
}

/**
 * 初始化的首饰模板
 */
export const INITIAL_JEWELRY: JewelryHistory[] = [
  {
    title: '80级相五玉佩',
    key: '80_5_七龙珠',
    attributes: [{ attribute: 65, value: 5 }],
  },
  {
    title: '90级相五技能玉佩',
    key: '90_5_金蝉宝囊',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
    ],
  },
  {
    title: '90级相五力玉佩',
    key: '90_5_金蝉宝囊',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 22 },
    ],
  },
  {
    title: '90级相五法玉佩',
    key: '90_5_金蝉宝囊',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 22 },
    ],
  },
  {
    title: '90级相五敏玉佩',
    key: '90_5_金蝉宝囊',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 22 },
    ],
  },
  {
    title: '100级相五技能玉佩',
    key: '100_5_通灵宝玉',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
      { attribute: 68, value: 10 },
    ],
  },
  {
    title: '100级相五力玉佩',
    key: '100_5_通灵宝玉',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 25 },
      { attribute: 2, value: 25 },
    ],
  },
  {
    title: '100级相五法玉佩',
    key: '100_5_通灵宝玉',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 25 },
      { attribute: 10, value: 25 },
    ],
  },
  {
    title: '100级相五敏玉佩',
    key: '100_5_通灵宝玉',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 25 },
      { attribute: 14, value: 25 },
    ],
  },
  {
    title: '110级相五技能玉佩',
    key: '110_5_寒玉龙勾',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 22 },
      { attribute: 68, value: 10 },
    ],
  },
  {
    title: '110级相五力玉佩',
    key: '110_5_寒玉龙勾',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 27 },
      { attribute: 64, value: 22 },
      { attribute: 2, value: 27 },
    ],
  },
  {
    title: '110级相五法玉佩',
    key: '110_5_寒玉龙勾',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 27 },
      { attribute: 64, value: 22 },
      { attribute: 10, value: 27 },
    ],
  },
  {
    title: '110级相五敏玉佩',
    key: '110_5_寒玉龙勾',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 27 },
      { attribute: 64, value: 22 },
      { attribute: 14, value: 27 },
    ],
  },
  {
    title: '120级相五技能玉佩',
    key: '120_5_八宝如意',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 24 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 24 },
    ],
  },
  {
    title: '120级相五力玉佩',
    key: '120_5_八宝如意',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 30 },
      { attribute: 64, value: 24 },
      { attribute: 2, value: 30 },
      { attribute: 64, value: 24 },
    ],
  },
  {
    title: '120级相五法玉佩',
    key: '120_5_八宝如意',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 30 },
      { attribute: 64, value: 24 },
      { attribute: 10, value: 30 },
      { attribute: 64, value: 24 },
    ],
  },
  {
    title: '120级相五敏玉佩',
    key: '120_5_八宝如意',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 30 },
      { attribute: 64, value: 24 },
      { attribute: 14, value: 30 },
      { attribute: 64, value: 24 },
    ],
  },
  {
    title: '130级相五技能玉佩',
    key: '130_5_游火灵焰',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 26 },
      { attribute: 67, value: 15 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 26 },
    ],
  },
  {
    title: '130级相五力玉佩',
    key: '130_5_游火灵焰',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 32 },
      { attribute: 64, value: 26 },
      { attribute: 67, value: 15 },
      { attribute: 2, value: 32 },
      { attribute: 64, value: 26 },
    ],
  },
  {
    title: '130级相五法玉佩',
    key: '130_5_游火灵焰',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 32 },
      { attribute: 64, value: 26 },
      { attribute: 67, value: 15 },
      { attribute: 10, value: 32 },
      { attribute: 64, value: 26 },
    ],
  },
  {
    title: '130级相五敏玉佩',
    key: '130_5_游火灵焰',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 32 },
      { attribute: 64, value: 26 },
      { attribute: 67, value: 15 },
      { attribute: 14, value: 32 },
      { attribute: 64, value: 26 },
    ],
  },
  {
    title: '80级相五项链',
    key: '80_4_天机锁链',
    attributes: [{ attribute: 65, value: 5 }],
  },
  {
    title: '90级相五技能项链',
    key: '90_4_秘魔灵珠',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
    ],
  },
  {
    title: '90级相五力项链',
    key: '90_4_秘魔灵珠',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 22 },
    ],
  },
  {
    title: '90级相五法项链',
    key: '90_4_秘魔灵珠',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 22 },
    ],
  },
  {
    title: '90级相五敏项链',
    key: '90_4_秘魔灵珠',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 22 },
    ],
  },
  {
    title: '100级相五技能项链',
    key: '100_4_金碧莲花',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 24 },
    ],
  },
  {
    title: '100级相五力项链',
    key: '100_4_金碧莲花',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 25 },
      { attribute: 2, value: 25 },
    ],
  },
  {
    title: '100级相五法项链',
    key: '100_4_金碧莲花',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 25 },
      { attribute: 10, value: 25 },
    ],
  },
  {
    title: '100级相五敏项链',
    key: '100_4_金碧莲花',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 25 },
      { attribute: 14, value: 25 },
    ],
  },
  {
    title: '110级相五技能项链',
    key: '110_4_流光绝影',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 22 },
      { attribute: 68, value: 10 },
    ],
  },
  {
    title: '110级相五力项链',
    key: '110_4_流光绝影',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 27 },
      { attribute: 64, value: 22 },
      { attribute: 2, value: 27 },
    ],
  },
  {
    title: '110级相五法项链',
    key: '110_4_流光绝影',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 27 },
      { attribute: 64, value: 22 },
      { attribute: 10, value: 27 },
    ],
  },
  {
    title: '110级相五敏项链',
    key: '110_4_流光绝影',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 27 },
      { attribute: 64, value: 22 },
      { attribute: 14, value: 27 },
    ],
  },
  {
    title: '120级相五技能项链',
    key: '120_4_五蕴悯光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 24 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 24 },
    ],
  },
  {
    title: '120级相五力项链',
    key: '120_4_五蕴悯光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 30 },
      { attribute: 64, value: 24 },
      { attribute: 2, value: 30 },
      { attribute: 64, value: 24 },
    ],
  },
  {
    title: '120级相五法项链',
    key: '120_4_五蕴悯光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 30 },
      { attribute: 64, value: 24 },
      { attribute: 10, value: 30 },
      { attribute: 64, value: 24 },
    ],
  },
  {
    title: '120级相五敏项链',
    key: '120_4_五蕴悯光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 30 },
      { attribute: 64, value: 24 },
      { attribute: 14, value: 30 },
      { attribute: 64, value: 24 },
    ],
  },
  {
    title: '130级相五技能项链',
    key: '130_4_千彩流光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 26 },
      { attribute: 67, value: 15 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 26 },
    ],
  },
  {
    title: '130级相五力项链',
    key: '130_4_千彩流光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 32 },
      { attribute: 64, value: 26 },
      { attribute: 67, value: 15 },
      { attribute: 2, value: 32 },
      { attribute: 64, value: 26 },
    ],
  },
  {
    title: '130级相五法项链',
    key: '130_4_千彩流光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 32 },
      { attribute: 64, value: 26 },
      { attribute: 67, value: 15 },
      { attribute: 10, value: 32 },
      { attribute: 64, value: 26 },
    ],
  },
  {
    title: '130级相五敏项链',
    key: '130_4_千彩流光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 32 },
      { attribute: 64, value: 26 },
      { attribute: 67, value: 15 },
      { attribute: 14, value: 32 },
      { attribute: 64, value: 26 },
    ],
  },
  {
    title: '80级相五手镯',
    key: '80_6_闭月双环',
    attributes: [{ attribute: 65, value: 5 }],
  },
  {
    title: '90级相五技能手镯',
    key: '90_6_三清手镯',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
    ],
  },
  {
    title: '90级相五力手镯',
    key: '90_6_三清手镯',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 22 },
    ],
  },
  {
    title: '90级相五法手镯',
    key: '90_6_三清手镯',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 22 },
    ],
  },
  {
    title: '90级相五敏手镯',
    key: '90_6_三清手镯',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 22 },
    ],
  },
  {
    title: '100级相五技能手镯',
    key: '100_6_天星奇光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
      { attribute: 68, value: 10 },
    ],
  },
  {
    title: '100级相五力手镯',
    key: '100_6_天星奇光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 25 },
      { attribute: 2, value: 25 },
    ],
  },
  {
    title: '100级相五法手镯',
    key: '100_6_天星奇光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 25 },
      { attribute: 10, value: 25 },
    ],
  },
  {
    title: '100级相五敏手镯',
    key: '100_6_天星奇光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 25 },
      { attribute: 14, value: 25 },
    ],
  },
  {
    title: '110级相五技能手镯',
    key: '110_6_碎梦涵光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 22 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 22 },
    ],
  },
  {
    title: '110级相五力手镯',
    key: '110_6_碎梦涵光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 27 },
      { attribute: 64, value: 22 },
      { attribute: 2, value: 27 },
    ],
  },
  {
    title: '110级相五法手镯',
    key: '110_6_碎梦涵光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 27 },
      { attribute: 64, value: 22 },
      { attribute: 10, value: 27 },
    ],
  },
  {
    title: '110级相五敏手镯',
    key: '110_6_碎梦涵光',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 27 },
      { attribute: 64, value: 22 },
      { attribute: 14, value: 27 },
    ],
  },
  {
    title: '120级相五技能手镯',
    key: '120_6_九天霜华',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 24 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 24 },
    ],
  },
  {
    title: '120级相五力手镯',
    key: '120_6_九天霜华',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 30 },
      { attribute: 64, value: 24 },
      { attribute: 2, value: 30 },
      { attribute: 64, value: 24 },
    ],
  },
  {
    title: '120级相五法手镯',
    key: '120_6_九天霜华',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 30 },
      { attribute: 64, value: 24 },
      { attribute: 10, value: 30 },
      { attribute: 64, value: 24 },
    ],
  },
  {
    title: '120级相五敏手镯',
    key: '120_6_九天霜华',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 30 },
      { attribute: 64, value: 24 },
      { attribute: 14, value: 30 },
      { attribute: 64, value: 24 },
    ],
  },
  {
    title: '130级相五技能手镯',
    key: '130_6_岚金火链',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 26 },
      { attribute: 67, value: 15 },
      { attribute: 68, value: 10 },
      { attribute: 64, value: 26 },
    ],
  },
  {
    title: '130级相五力手镯',
    key: '130_6_岚金火链',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 2, value: 32 },
      { attribute: 64, value: 26 },
      { attribute: 67, value: 15 },
      { attribute: 2, value: 32 },
      { attribute: 64, value: 26 },
    ],
  },
  {
    title: '130级相五法手镯',
    key: '130_6_岚金火链',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 10, value: 32 },
      { attribute: 64, value: 26 },
      { attribute: 67, value: 15 },
      { attribute: 10, value: 32 },
      { attribute: 64, value: 26 },
    ],
  },
  {
    title: '130级相五敏手镯',
    key: '130_6_岚金火链',
    attributes: [
      { attribute: 65, value: 5 },
      { attribute: 14, value: 32 },
      { attribute: 64, value: 26 },
      { attribute: 67, value: 15 },
      { attribute: 14, value: 32 },
      { attribute: 64, value: 26 },
    ],
  },
];
