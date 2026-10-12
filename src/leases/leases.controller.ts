import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { LeasesService } from './leases.services';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('leases')
export class leasesController {
  constructor(private leasesService: LeasesService) {}

  // Get all users (protected)

@UseGuards(JwtAuthGuard)
@Get()
async getAll() {
  return this.leasesService.getAll();
}

@UseGuards(JwtAuthGuard)
@Get(':id')
async getOne(@Param('id') id: string) {
  return this.leasesService.findById(+id);
}

@Post()
async create(@Body() body: { unit_id: number; tenant_id: number; start_date: string; end_date: string; monthly_rent: number; security_deposit: number; statusx?: string }) {
  return this.leasesService.createLease(body.unit_id, body.tenant_id, body.start_date, body.end_date, body.monthly_rent, body.security_deposit, body.statusx);
}

@UseGuards(JwtAuthGuard)
@Put(':id')
async update(@Param('id') id: string, @Body() body: { unit_id?: number; tenant_id?: number; start_date?: string; end_date?: string; monthly_rent?: number; security_deposit?: number; statusx?: string }) {
  return this.leasesService.updateLease(+id, body);
}

@UseGuards(JwtAuthGuard)
@Delete(':id')
async remove(@Param('id') id: string) {
  return this.leasesService.deleteLease(+id);
}
}