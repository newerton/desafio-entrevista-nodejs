import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Public } from '@common/decorators/public.decorator';
import { ErrorSchema } from '@common/schemas/Error.schema';

import { AuthService } from './auth.service';
import { AuthLoginInput } from './dto/auth-login.dto';
import { Auth } from './entities/auth.entity';

@ApiTags('auth')
@Controller('auth')
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email' })
  @ApiOkResponse({
    description: 'Login successfully',
    type: Auth,
  })
  async login(@Body() body: AuthLoginInput): Promise<Auth> {
    return this.service.login(body);
  }
}
