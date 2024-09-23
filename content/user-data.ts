import { EditRoleInfoPayload } from '@/scheme';
import { produce } from 'immer';
import { BaseContent } from './base';

interface UserDataContentParse {
  /** 等级 */
  9: number;
  /** 性别 */
  56: 1 | 2;
  /** 门派 */
  19: 1 | 2 | 3 | 4 | 5;
  /** 等级 */
  44: number;
  /** 等级 */
  45: number;
  /** 道行 */
  49: number;
  /** 积分信息 */
  363: {
    left_amount: number;
    /** 积分值 */
    score: number;
    deadline: number;
    last_time: number;
    /** 总积分值 */
    total_score: number;
    used_quota: {};
  };
  /** 飞升信息 */
  340: {
    max_polar_extra: 20;
    attrib_point: 34;
    /** 类型  4: 魔    3: 仙 */
    type: 4 | 3;
    /** 元婴等级 */
    level: number;
    exp_to_next_level: 0;
    state: 0;
    exp: -1;
    total: 16;
    level_up_time: 1709137182;
  };
}

/**
 * user_data content
 */
export class UserDataContent extends BaseContent<UserDataContentParse> {
  constructor(content: string) {
    super(content);
  }

  /**
   * 角色信息
   */
  public get roleInfo() {
    return {
      level: this.currentData['9'],
      gender: this.currentData['56'],
      clazz: this.currentData['19'],
      ability: this.currentData['49'],
      consumptions: this.currentData['363']?.score,
      riseType: this.currentData['340']?.type,
      yuanBabyLevel: this.currentData['340']?.level,
    };
  }

  /**
   * 修改角色信息
   * @param patch
   */
  public patchRoleInfo(patch: EditRoleInfoPayload) {
    EditRoleInfoPayload.parse(patch);
    const data = this.currentData;

    this.setData(
      produce(data, (draft) => {
        // 修改等级
        if (patch.level !== undefined) {
          draft['9'] = patch.level;
          draft['44'] = 4 * (patch.level - 1);
          draft['45'] = patch.level;
        }

        // 道行
        if (patch.ability !== undefined) {
          draft['49'] = patch.ability;
        }

        // 修改性别
        if (patch.gender !== undefined) {
          draft['56'] = patch.gender;
        }

        // 修改门派
        if (patch.clazz !== undefined) {
          draft['19'] = patch.clazz;
        }

        // 修改仙魔类型
        if (patch.riseType !== undefined && draft['340']) {
          draft['340'].type = patch.riseType;
        }

        // 修改元婴等级
        if (patch.yuanBabyLevel !== undefined && draft['340']) {
          draft['340'].level = patch.yuanBabyLevel;
        }

        // 修改消费积分
        if (patch.consumptions !== undefined && draft['363']) {
          draft['363'].score = patch.consumptions;
          draft['363'].total_score = patch.consumptions;
        }
      })
    );
  }

  /**
   * 修改消费积分
   * @param points
   */
  public setConsumptionPoints(points: number) {
    const data = this.currentData;

    this.setData(
      produce(data, (draft) => {
        draft['363'].score = points;
        draft['363'].total_score = points;
      })
    );
  }
}
