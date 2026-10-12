import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class Rent_PaymentsService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();


async createRentPayment(lease_id: number, tenant_id: number, payment_date: string, amount_paid: number, payment_method: string, payment_status = 'Paid') {
  const [result] = await this.pool().execute<OkPacket>(
    'INSERT INTO rent_payments (lease_id, tenant_id, payment_date, amount_paid, payment_method, payment_status) VALUES (?, ?, ?, ?, ?, ?)',
    [lease_id, tenant_id, payment_date, amount_paid, payment_method, payment_status],
  );
  return { payment_id: result.insertId, lease_id, tenant_id, payment_date, amount_paid, payment_method, payment_status };
}

//   // async findByUsername(username: string) {
//   //   const [rows] = await this.pool().execute<RowDataPacket[]>(
//   //     'SELECT id, username, password, role, refresh_token FROM users WHERE username = ?',
//   //     [username],
//   //   );
//   //   return rows[0];
//   // }

async findById(payment_id: number) {
  const [rows] = await this.pool().execute<RowDataPacket[]>(
    'SELECT * FROM rent_payments WHERE payment_id = ?',
    [payment_id],
  );
  return rows[0];
}


async getAll() {
  const [rows] = await this.pool().execute<RowDataPacket[]>(
    'SELECT * FROM rent_payments',
  );
  return rows;
}


 async updateRentPayment(payment_id: number, partial: { lease_id?: number; tenant_id?: number; payment_date?: string; amount_paid?: number; payment_method?: string; payment_status?: string }) {
  const fields: string[] = [];
  const values: any[] = [];

  if (partial.lease_id !== undefined) {
    fields.push('lease_id = ?');
    values.push(partial.lease_id);
  }
  if (partial.tenant_id !== undefined) {
    fields.push('tenant_id = ?');
    values.push(partial.tenant_id);
  }
  if (partial.payment_date !== undefined) {
    fields.push('payment_date = ?');
    values.push(partial.payment_date);
  }
  if (partial.amount_paid !== undefined) {
    fields.push('amount_paid = ?');
    values.push(partial.amount_paid);
  }
  if (partial.payment_method !== undefined) {
    fields.push('payment_method = ?');
    values.push(partial.payment_method);
  }
  if (partial.payment_status !== undefined) {
    fields.push('payment_status = ?');
    values.push(partial.payment_status);
  }

  if (fields.length === 0) return await this.findById(payment_id);

  values.push(payment_id);
  const sql = `UPDATE rent_payments SET ${fields.join(', ')} WHERE payment_id = ?`;
  await this.pool().execute(sql, values);
  return this.findById(payment_id);
}
async deleteRentPayment(payment_id: number) {
  const [res] = await this.pool().execute<OkPacket>(
    'DELETE FROM rent_payments WHERE payment_id = ?',
    [payment_id],
  );
  return res.affectedRows > 0;
}

// //   async setRefreshToken(id: number, refreshToken: string | null) {
// //     await this.pool().execute('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, id]);
// //   }

// //   async findByRefreshToken(refreshToken: string) {
// //     const [rows] = await this.pool().execute<RowDataPacket[]>(
// //       'SELECT id, username, role FROM users WHERE refresh_token = ?',
// //       [refreshToken],
// //     );
// //     return rows[0];
// //   }
}