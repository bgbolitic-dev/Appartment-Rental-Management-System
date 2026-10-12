import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PropertiesService } from './properties.services';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  // Get all users (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.propertiesService.getAll();
  }

  // // Get single user by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.propertiesService.findById(+id);
  }  

  // Create user (open - for demo)
  @Post()
  async create(@Body() body: {property_name: string; address: string; city:string; zip_code:string; id: string}) {
    return this.propertiesService.createProperties(body.property_name, body.address, body.city, body.zip_code, body.id);
  }

  // // Update user (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.propertiesService.updateProperties(+id, body);
  }

  // // Delete user (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.propertiesService.deleteProperties(+id);
  }
}