import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { IbgeStateService } from './ibge-state.service';

@Controller('ibge/states')
export class IbgeStateController {
  constructor(private readonly ibgeService: IbgeStateService) {}

  @Get()
  findAll() {
    return this.ibgeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ibgeService.findOne(+id);
  }
}
