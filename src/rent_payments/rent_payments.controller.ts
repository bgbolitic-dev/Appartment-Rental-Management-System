import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { Rent_PaymentsService } from './rent_payments.services';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('rent_payments')
export class Rent_PaymentsController {
  constructor(private Rent_PaymentsService: Rent_PaymentsService) {}

  // Get all users (protected)

@UseGuards(JwtAuthGuard)
@Get()
async getAll() {
  return this.Rent_PaymentsService.getAll();
}

@UseGuards(JwtAuthGuard)
@Get(':id')
async getOne(@Param('id') id: string) {
  return this.Rent_PaymentsService.findById(+id);
}

@Post()
async create(@Body() body: { lease_id: number; tenant_id: number; payment_date: string; amount_paid: number; payment_method: string; payment_status?: string }) {
  return this.Rent_PaymentsService.createRentPayment(body.lease_id, body.tenant_id, body.payment_date, body.amount_paid, body.payment_method, body.payment_status);
}

@UseGuards(JwtAuthGuard)
@Put(':id')
async update(@Param('id') id: string, @Body() body: { lease_id?: number; tenant_id?: number; payment_date?: string; amount_paid?: number; payment_method?: string; payment_status?: string }) {
  return this.Rent_PaymentsService.updateRentPayment(+id, body);
}

@UseGuards(JwtAuthGuard)
@Delete(':id')
async remove(@Param('id') id: string) {
  return this.Rent_PaymentsService.deleteRentPayment(+id);
}
}