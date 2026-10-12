import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { Maintenance_RequestsService } from './maintenance_requests.services';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('maintenance_requests')
export class Maintenance_RequestsController {
  constructor(private maintenance_requestsService: Maintenance_RequestsService) {}

  // Get all users (protected)

@UseGuards(JwtAuthGuard)
@Get()
async getAll() {
  return this.maintenance_requestsService.getAll();
}

@UseGuards(JwtAuthGuard)
@Get(':id')
async getOne(@Param('id') id: string) {
  return this.maintenance_requestsService.findById(+id);
}

@Post()
async create(@Body() body: { unit_id: number; tenant_id: number; request_date: string; descriptionx: string; priority?: string; statusx?: string }) {
  return this.maintenance_requestsService.createMaintenanceRequest(body.unit_id, body.tenant_id, body.request_date, body.descriptionx, body.priority, body.statusx);
}

@UseGuards(JwtAuthGuard)
@Put(':id')
async update(@Param('id') id: string, @Body() body: { unit_id?: number; tenant_id?: number; request_date?: string; descriptionx?: string; priority?: string; statusx?: string }) {
  return this.maintenance_requestsService.updateMaintenanceRequest(+id, body);
}

@UseGuards(JwtAuthGuard)
@Delete(':id')
async remove(@Param('id') id: string) {
  return this.maintenance_requestsService.deleteMaintenanceRequest(+id);
}

}