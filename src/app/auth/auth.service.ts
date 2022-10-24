import { randomUUID } from 'crypto';

import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { CompanyService } from '@app/company/company.service';
import { Company } from '@app/company/entities/company.entity';

import { AuthLoginInput } from './dto/auth-login.dto';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly companyService: CompanyService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(id: string): Promise<Company | undefined> {
    return this.companyService.findOne(id);
  }

  async login({ email, password }: AuthLoginInput): Promise<Auth> {
    const user = await this.companyService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('E-mail or password invalid');
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new BadRequestException('E-mail or password invalid');
    }

    if (!user.is_active) {
      throw new BadRequestException('E-mail or password invalid');
    }

    const payload = {
      jti: randomUUID(),
      sub: user.id,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.secret'),
      header: {
        alg: 'HS256',
        kid: randomUUID(),
      },
    });

    return {
      access_token,
    };
  }
}
