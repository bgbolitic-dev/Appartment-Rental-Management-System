import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LeasesService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createLease(unit_id: number, tenant_id: number, start_date: string, end_date: string, monthly_rent: number, security_deposit: number, statusx = 'Active') {
  const [result] = await this.pool().execute<OkPacket>(
    'INSERT INTO leases (unit_id, tenant_id, start_date, end_date, monthly_rent, security_deposit, statusx) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [unit_id, tenant_id, start_date, end_date, monthly_rent, security_deposit, statusx],
  );
  return { lease_id: result.insertId, unit_id, tenant_id, start_date, end_date, monthly_rent, security_deposit, statusx };
}

//   // async findByUsername(username: string) {
//   //   const [rows] = await this.pool().execute<RowDataPacket[]>(
//   //     'SELECT id, username, password, role, refresh_token FROM users WHERE username = ?',
//   //     [username],
//   //   );
//   //   return rows[0];
//   // }

async findById(lease_id: number) {
  const [rows] = await this.pool().execute<RowDataPacket[]>(
    'SELECT * FROM leases WHERE lease_id = ?',
    [lease_id],
  );
  return rows[0];
}


  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM leases',
    );
    return rows;
  }

  async updateLease(lease_id: number, partial: { unit_id?: number; tenant_id?: number; start_date?: string; end_date?: string; monthly_rent?: number; security_deposit?: number; statusx?: string }) {
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
  if (partial.start_date !== undefined) {
    fields.push('start_date = ?');
    values.push(partial.start_date);
  }
  if (partial.end_date !== undefined) {
    fields.push('end_date = ?');
    values.push(partial.end_date);
  }
  if (partial.monthly_rent !== undefined) {
    fields.push('monthly_rent = ?');
    values.push(partial.monthly_rent);
  }
  if (partial.security_deposit !== undefined) {
    fields.push('security_deposit = ?');
    values.push(partial.security_deposit);
  }
  if (partial.statusx !== undefined) {
    fields.push('statusx = ?');
    values.push(partial.statusx);
  }

  if (fields.length === 0) return await this.findById(lease_id);

  values.push(lease_id);
  const sql = `UPDATE leases SET ${fields.join(', ')} WHERE lease_id = ?`;
  await this.pool().execute(sql, values);
  return this.findById(lease_id);
}

async deleteLease(lease_id: number) {
  const [res] = await this.pool().execute<OkPacket>(
    'DELETE FROM leases WHERE lease_id = ?',
    [lease_id],
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