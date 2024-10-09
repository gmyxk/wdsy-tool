import { z } from "zod";

export const EditPetInfoPayload = z.object({
  level: z.number().int().min(1).optional(),
  wuxue: z.number().int().min(1).optional(),
});

export type EditPetInfoPayload = z.infer<typeof EditPetInfoPayload>;

export const EditPetInfoApiReq = z.object({
  gid: z.string(),
  positionId: z.number(),
  payload: EditPetInfoPayload,
});


export type EditPetInfoApiReq = z.infer<typeof EditPetInfoApiReq>;