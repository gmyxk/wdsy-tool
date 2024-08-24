import { BaseContent } from "./base";

interface LoginDataContentParse {
  chars: string[];
}

/**
 * user_data content
 */
export class LoginDataContent extends BaseContent<LoginDataContentParse> {
  constructor(content: string) {
    super(content);
  }

  /**
   * 角色id集合
   */
  public get gids() {
    return this.currentData.chars;
  }
}
