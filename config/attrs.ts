/**
 * 所有属性枚举
 */
export const ATTRIBUTE_ENUM = {
  2: ['str', '力量'],
  3: ['phy_power', '物伤'],
  4: ['accurate', '准确'],
  5: ['con', '体质'],
  7: ['max_life', '气血'],
  8: ['def', '防御'],
  9: ['penetrate', '破防'],
  10: ['wiz', '灵力'],
  11: ['mag_power', '法伤'],
  13: ['max_mana', '法力'],
  14: ['dex', '敏捷'],
  15: ['speed', '速度'],
  30: [null, '金相性'],
  31: [null, '木相性'],
  32: [null, '水相性'],
  33: [null, '火相性'],
  34: [null, '土相性'],
  36: ['resist_metal', '金抗性'],
  37: ['resist_water', '水抗性'],
  38: ['resist_wood', '木抗性'],
  39: ['resist_fire', '火抗性'],
  41: ['resist_earth', '土抗性'],
  42: ['resist_poison', '抗中毒'],
  43: ['resist_frozen', '抗冰冻'],
  44: ['resist_sleep', '抗昏睡'],
  45: ['resist_forgotten', '抗遗忘'],
  46: ['resist_confusion', '抗混乱'],
  51: ['double_hit', '物理连击次数'],
  53: ['counter_attack', '反击次数'],
  56: ['counter_attack_rate', '反击率'],
  57: ['double_hit_rate', '物理连击率'],
  58: ['stunt_rate', '物理必杀率'],
  59: ['damage_sel', '反震度'],
  60: ['damage_sel_rate', '反震率'],
  64: [null, '所有属性'],
  65: [null, '所有相性'],
  66: ['all_resist_polar', '所有抗性'],
  67: ['all_resist_except', '所有抗异常'],
  68: [null, '所有技能上升'],
  73: ['penetrate_rate', '破防率'],
  85: ['ignore_resist_metal', '忽视目标抗金'],
  86: ['ignore_resist_wood', '忽视目标抗木'],
  87: ['ignore_resist_water', '忽视目标抗水'],
  88: ['ignore_resist_fire', '忽视目标抗火'],
  89: ['ignore_resist_earth', '忽视目标抗土'],
  90: ['ignore_resist_forgotten', '忽视目标抗遗忘'],
  91: ['ignore_resist_poison', '忽视目标抗中毒'],
  92: ['ignore_resist_frozen', '忽视目标抗冰冻'],
  93: ['ignore_resist_sleep', '忽视目标抗昏睡'],
  94: ['ignore_resist_confusion', '忽视目标抗混乱'],
  95: ['super_excluse_metal', '强力克金'],
  96: ['super_excluse_wood', '强力克木'],
  97: ['super_excluse_water', '强力克水'],
  98: ['super_excluse_fire', '强力克火'],
  99: ['super_excluse_earth', '强力克土'],
  100: ['B_skill_low_cost', '师门攻击技能消耗降低'],
  101: ['C_skill_low_cost', '师门障碍技能消耗降低'],
  102: ['D_skill_low_cost', '师门辅助技能消耗降低'],
  103: [null, '强力中毒'],
  104: [null, '强力昏睡'],
  105: [null, '强力遗忘'],
  106: [null, '强力混乱'],
  107: [null, '强力冰冻'],
  108: [null, '强金法伤害'],
  109: [null, '强木法伤害'],
  110: [null, '强水法伤害'],
  111: [null, '强火法伤害'],
  112: [null, '强土法伤害'],
  113: [null, '几率躲避攻击'],
  119: ['ignore_all_resist_polar', '忽视所有抗性'],
  200: [null, '忽视所有抗异常'],
  201: ['release_forgotten', '几率解除遗忘状态'],
  202: ['release_poison', '几率解除中毒状态'],
  203: ['release_frozen', '几率解除冰冻状态'],
  204: ['release_sleep', '几率解除昏睡状态'],
  205: ['release_confusion', '几率解除混乱状态'],
  252: [null, '强物理伤害'],
  297: [null, '伤害'],
  348: [null, '忽视躲避攻击'],
} as const;

export const getAttrEnumList = <T extends keyof typeof ATTRIBUTE_ENUM>(
  ...key: T[]
) => {
  const list: {
    lebel: (typeof ATTRIBUTE_ENUM)[T][1];
    value: T;
  }[] = [];

  key.forEach((k) => {
    if (ATTRIBUTE_ENUM[k]?.[1]) {
      list.push({ lebel: ATTRIBUTE_ENUM[k][1], value: k });
    }
  });
  return list;
};

export const ATTRIBUTE_NAME_ENUM = Object.values(ATTRIBUTE_ENUM).reduce(
  (acc, cur) => {
    if (cur && cur[0]) {
      acc[cur[0]] = cur[1];
    }
    return acc;
  },
  {} as Record<string, string>
);
