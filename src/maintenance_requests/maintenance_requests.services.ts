import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class Maintenance_RequestsService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

async createMaintenanceRequest(unit_id: number, tenant_id: number, request_date: string, descriptionx: string, priority = 'Medium', statusx = 'Pending') {
  const [result] = await this.pool().execute<OkPacket>(
    'INSERT INTO maintenance_requests (unit_id, tenant_id, request_date, descriptionx, priority, statusx) VALUES (?, ?, ?, ?, ?, ?)',
    [unit_id, tenant_id, request_date, descriptionx, priority, statusx],
  );
  return { request_id: result.insertId, unit_id, tenant_id, request_date, descriptionx, priority, statusx };
}

//   // async findByUsername(username: string) {
//   //   const [rows] = await this.pool().execute<RowDataPacket[]>(
//   //     'SELECT id, username, password, role, refresh_token FROM users WHERE username = ?',
//   //     [username],
//   //   );
//   //   return rows[0];
//   // }

async findById(request_id: number) {
  const [rows] = await this.pool().execute<RowDataPacket[]>(
    'SELECT * FROM maintenance_requests WHERE request_id = ?',
    [request_id],
  );
  return rows[0];
}


async getAll() {
  const [rows] = await this.pool().execute<RowDataPacket[]>(
    'SELECT * FROM maintenance_requests',
  );
  return rows;
}

async updateMaintenanceRequest(request_id: number, partial: { unit_id?: number; tenant_id?: number; request_date?: string; descriptionx?: string; priority?: string; statusx?: string }) {
  const fields: string[] = [];
  const values: any[] = [];

  if (partial.unit_id !== undefined) {
    fields.push('unit_id = ?');
    values.push(partial.unit_id);
  }
  if (partial.tenant_id !== undefined) {
    fields.push('tenant_id = ?');
    values.push(partial.tenant_id);
  }
  if (partial.request_date !== undefined) {
    fields.push('request_date = ?');
    values.push(partial.request_date);
  }
  if (partial.descriptionx !== undefined) {
    fields.push('descriptionx = ?');
    values.push(partial.descriptionx);
  }
  if (partial.priority !== undefined) {
    fields.push('priority = ?');
    values.push(partial.priority);
  }
  if (partial.statusx !== undefined) {
    fields.push('statusx = ?');
    values.push(partial.statusx);
  }

  if (fields.length === 0) return await this.findById(request_id);

  values.push(request_id);
  const sql = `UPDATE maintenance_requests SET ${fields.join(', ')} WHERE request_id = ?`;
  await this.pool().execute(sql, values);
  return this.findById(request_id);
}


async deleteMaintenanceRequest(request_id: number) {
  const [res] = await this.pool().execute<OkPacket>(
    'DELETE FROM maintenance_requests WHERE request_id = ?',
    [request_id],
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