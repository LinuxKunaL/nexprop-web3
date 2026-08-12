import type { JwtPayload } from "jsonwebtoken";

export type TUserJWT = JwtPayload & { userid: string; address: string };
