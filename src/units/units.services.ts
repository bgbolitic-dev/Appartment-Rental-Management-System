import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UnitsService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createUnits(unit_number: string, bedrooms: string, bathrooms:string, rent_amount:string, statusx:string, property_id = '?') {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO units (unit_number, bedrooms, bathrooms, rent_amount, statusx, property_id) VALUES (?, ?, ?, ?, ?, ?)',
      [unit_number, bedrooms, bathrooms, rent_amount, statusx, property_id],
    );
    return { unit_id: result.insertId, unit_number, bedrooms, bathrooms, rent_amount, statusx};
  }

//   // async findByUsername(username: string) {
//   //   const [rows] = await this.pool().execute<RowDataPacket[]>(
//   //     'SELECT id, username, password, role, refresh_token FROM users WHERE username = ?',
//   //     [username],
//   //   );
//   //   return rows[0];
//   // }

  async findById(unit_id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM units WHERE unit_id = ?',
      [unit_id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM units',
    );
    return rows;
  }

  async updateUnits(unit_id: number, partial: { unit_number?: string;bedrooms?: string; bathrooms?:string; rent_amount?:string; statusx?:string}) {
    const fields: string[] = [];
    const values: any[] = [];
    if (partial.unit_number) {
      fields.push('unit_number = ?');
      values.push(partial.unit_number);
    }
    if (partial.bedrooms) {
      fields.push('bedrooms = ?');
      values.push(partial.bedrooms);
    }
    if (partial.bathrooms) {
      fields.push('bathrooms = ?');
      values.push(partial.bathrooms);
    }
    if (partial.rent_amount) {
      fields.push('rent_amount = ?');
      values.push(partial.rent_amount);
    }
    if (partial.statusx) {
      fields.push('statusx = ?');
      values.push(partial.statusx);
    }
    if (fields.length === 0) return await this.findById(unit_id);
    values.push(unit_id);
    const sql = `UPDATE units SET ${fields.join(', ')} WHERE unit_id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(unit_id);
  }

  async deleteUnits(id: number) {
    const [res] = await this.pool().execute<OkPacket>('DELETE FROM units WHERE unit_id = ?', [id]);
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