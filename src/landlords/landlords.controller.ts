
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { LandlordsService } from './landlords.services';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('landlords')
export class LandlordsController {
  constructor(private LandlordsService: LandlordsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.LandlordsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.LandlordsService.findById(+id);
  }

  @Post()
  async create(@Body() body: { first_name: string; last_name: string; email: string; phone: string; id: number }) {
    return this.LandlordsService.createLandlord(body.first_name, body.last_name, body.email, body.phone, body.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { first_name?: string; last_name?: string; email?: string; phone?: string; id?: number }) {
    return this.LandlordsService.updateLandlord(+id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.LandlordsService.deleteLandlord(+id);
  }
}
