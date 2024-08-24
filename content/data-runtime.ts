import { BaseContent } from "./base";

interface DataRuntimeContentParse {
  create_time: string;
  active_char: string;
  startup_id: number;
  game_server: string;
  locked_gid: string;
  time: number;
  user_cache_uid: string;
}

/**
 * user_data content
 */
export class DataRuntimeContent extends BaseContent<DataRuntimeContentParse> {
  constructor(content: string) {
    super(content);
  }

  /**
   * 角在线的角色 id
   */
  public get inLineGid() {
    return this.currentData.locked_gid;
  }
}
