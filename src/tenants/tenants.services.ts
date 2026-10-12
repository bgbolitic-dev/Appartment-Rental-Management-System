import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class TenantsService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createTenants(first_name: string, last_name: string, email: string, phone: string, emergency_contact: string) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO tenants (first_name, last_name, email, phone, emergency_contact) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, email, phone, emergency_contact],
    );
    return { tenant_id: result.insertId, first_name, last_name, email, phone, emergency_contact};
  }

//   async findByUsername(username: string) {
//     const [rows] = await this.pool().execute<RowDataPacket[]>(
//       'SELECT id, username, last_name, role, refresh_token FROM users WHERE username = ?',
//       [username],
//     );
//     return rows[0];
//   }

  async findById(tenant_id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM tenants WHERE tenant_id = ?',
      [tenant_id],
    );
    if (rows.length === 0) {
      throw new NotFoundException('Tenant not found');
    }
    return rows[0];
  }

async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM tenants',
    );
    return rows;
  }

 async updateTenants(tenant_id: number, partial: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    emergency_contact?: string;
  }) {
    const fields: string[] = [];
    const values: any[] = [];

    if (partial.first_name !== undefined) {
      fields.push('first_name = ?');
      values.push(partial.first_name);
    }
    if (partial.last_name !== undefined) {
      fields.push('last_name = ?');
      values.push(partial.last_name);
    }
    if (partial.email !== undefined) {
      fields.push('email = ?');
      values.push(partial.email);
    }
    if (partial.phone !== undefined) {
      fields.push('phone = ?');
      values.push(partial.phone);
    }
    if (partial.emergency_contact !== undefined) {
      fields.push('emergency_contact = ?');
      values.push(partial.emergency_contact);
    }

    if (fields.length === 0) {
      return await this.findById(tenant_id);
    }

    values.push(tenant_id);
    const sql = `UPDATE tenants SET ${fields.join(', ')} WHERE tenant_id = ?`;
    await this.pool().execute(sql, values);

    return this.findById(tenant_id);
  }

  async deleteTenants(tenant_id: number) {
    const [res] = await this.pool().execute<OkPacket>(
      'DELETE FROM tenants WHERE tenant_id = ?',
      [tenant_id],
    );
    return res.affectedRows > 0;
  }


//   async setRefreshToken(id: number, refreshToken: string | null) {
//     await this.pool().execute('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, id]);
//   }

//   async findByRefreshToken(refreshToken: string) {
//     const [rows] = await this.pool().execute<RowDataPacket[]>(
//       'SELECT id, username, role FROM users WHERE refresh_token = ?',
//       [refreshToken],
//     );
//     return rows[0];
//   }
}