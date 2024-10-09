import { EditPetInfoApiReq } from "@/scheme";
import { BaseContent } from "./base";
import { produce } from "immer";

interface PetContentObject {
  attrib: {
    /** 等级 */
    44: number
    /** 武学 */
    79: number
    /** 武学 修改这个属性不好使 */
    // 204: number
  }
}

interface UserContainerDataContentParse {
  pets: {
    [k: string]: [string, PetContentObject];
  };
  guards: {
    [k: string]: [string, object];
  };
}

/**
 * user_container_data content
 */
export class UserContainerDataContent extends BaseContent<UserContainerDataContentParse> {
  constructor(content: string) {
    super(content);
  }

  /** 获取宠物列表 */
  public getPetList(): API.PetInfo[] {
    const pets = this.currentData.pets;
    return Object.keys(pets).map((k) => {
      const [name, data] = pets[k];
      return {
        positionId: parseInt(k),
        name,
        level: data.attrib[44],
        wuxue: data.attrib[79],
        payload: data
      };
    });
  }

  /** 
   * 更新宠物信息
   */
  public putPetInfo(pet: EditPetInfoApiReq) {
    EditPetInfoApiReq.parse(pet);

    const { payload, positionId } = pet;

    const data = this.currentData;

    this.setData(
      produce(data, (draft) => {
        const attrib = draft.pets[positionId][1].attrib;
        // 修改等级
        if (payload.level !== undefined) {
          attrib[44] = payload.level
        }

        // 武学
        if (payload.wuxue !== undefined) {
          attrib[79] = payload.wuxue
        }
      })
    );
  }

  /**
   * 删除宠物信息
   */
  public deletePetInfo(positionId: number) {
    this.setData(
      produce(this.currentData, (draft) => {
        delete draft.pets[positionId];
      })
    );
  }
}