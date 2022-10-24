import { JwtData } from '@common/auth/jwt/jwt.strategy';

declare namespace Express {
  export interface Request {
    user: JwtData;
  }
}
