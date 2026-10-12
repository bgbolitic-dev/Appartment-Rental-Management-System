import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TenantsService } from './tenants.services';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tenants')
export class TenantsController {
  constructor(private tenantsService: TenantsService) {}

 // Get all tenants (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.tenantsService.getAll();
  }

  // Get single tenant by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.tenantsService.findById(+id);
  }

  // Create user (open - for demo)
  @Post()
  async create(@Body() body: { first_name: string; last_name: string; email: string; phone: string; emergency_contact: string }) {
    return this.tenantsService.createTenants(body.first_name, body.last_name, body.email, body.phone, body.emergency_contact);
  }

// Update tenant (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    emergency_contact?: string;
  }) {
    return this.tenantsService.updateTenants(+id, body);
  }

  // Delete tenant (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tenantsService.deleteTenants(+id);
  }
}