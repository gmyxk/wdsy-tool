import { produce } from 'immer';
import { BaseContent } from './base';

interface UserDataContentParse {
  9: number;
  56: 1 | 2;
  19: 1 | 2 | 3 | 4 | 5;
  49: number;
  /** 积分信息 */
  363: {
    left_amount: number;
    score: number;
    deadline: number;
    last_time: number;
    total_score: number;
    used_quota: {};
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
    };
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
