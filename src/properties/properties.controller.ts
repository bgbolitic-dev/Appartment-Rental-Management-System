import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PropertiesService } from './properties.services';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  // Get all properties (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.propertiesService.getAll();
  }

  // Get single property by property_id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':property_id')
  async getOne(@Param('property_id') property_id: string) {
    return this.propertiesService.findById(+property_id);
  }

  // Create property (open - for demo)
  @Post()
  async create(@Body() body: { property_name: string; address: string; city: string; zip_code: string; landlord_id: number }) {
    return this.propertiesService.createProperties(body.property_name, body.address, body.city, body.zip_code, body.landlord_id);
  }

  // Update property (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':property_id')
  async update(@Param('property_id') property_id: string, @Body() body: any) {
    return this.propertiesService.updateProperties(+property_id, body);
  }

  // Delete property (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':property_id')
  async remove(@Param('property_id') property_id: string) {
    return this.propertiesService.deleteProperties(+property_id);
  }
}