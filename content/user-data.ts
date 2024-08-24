import { BaseContent } from "./base";

interface UserDataContentParse {
  9: number;
  56: 1 | 2;
  19: 1 | 2 | 3 | 4 | 5;
  49: number;
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
      level: this.currentData["9"],
      gender: this.currentData["56"],
      clazz: this.currentData["19"],
      ability: this.currentData["49"],
    };
  }
}
