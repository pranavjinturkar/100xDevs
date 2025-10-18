import { z } from "zod";

export const signUpInput = z.object({
  username: z.string(),
  password: z.string(),
});

export type SignUpProp = z.infer<typeof signUpInput>;
