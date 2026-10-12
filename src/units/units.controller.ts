import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UnitsService } from './units.services';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('units')
export class UnitsController {
  constructor(private unitsService: UnitsService) {}

  // Get all users (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.unitsService.getAll();
  }

  // // Get single user by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.unitsService.findById(+id);
  }  

  // Create user (open - for demo)
  @Post()
  async create(@Body() body: {unit_number: string; bedrooms: string; bathrooms:string; rent_amount:string; statusx:string; property_id: string}) {
    return this.unitsService.createUnits(body.unit_number, body.bedrooms, body.bathrooms, body.rent_amount, body.statusx, body.property_id);
  }

  // // Update user (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.unitsService.updateUnits(+id, body);
  }

  // // Delete user (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.unitsService.deleteUnits(+id);
  }
}