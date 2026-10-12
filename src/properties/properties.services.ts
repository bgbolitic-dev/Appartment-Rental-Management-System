import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PropertiesService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createProperties(property_name: string, address: string, city:string, zip_code:string, id = '?') {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO properties (property_name, address, city, zip_code, id) VALUES (?, ?, ?, ?, ?)',
      [property_name, address, city, zip_code, id],
    );
    return { property_id: result.insertId, property_name, address, city, zip_code};
  }

  // async findByUsername(username: string) {
  //   const [rows] = await this.pool().execute<RowDataPacket[]>(
  //     'SELECT id, username, password, role, refresh_token FROM users WHERE username = ?',
  //     [username],
  //   );
  //   return rows[0];
  // }

  async findById(property_id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM properties WHERE property_id = ?',
      [property_id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM properties',
    );
    return rows;
  }

  async updateProperties(property_id: number, partial: { property_name?: string; address?: string; city?:string; zip_code?:string;}) {
    const fields: string[] = [];
    const values: any[] = [];
    if (partial.property_name) {
      fields.push('property_name = ?');
      values.push(partial.property_name);
    }
    if (partial.address) {
      fields.push('address = ?');
      values.push(partial.address);
    }
    if (partial.city) {
      fields.push('city = ?');
      values.push(partial.city);
    }
    if (partial.zip_code) {
      fields.push('zip_code = ?');
      values.push(partial.zip_code);
    }
    if (fields.length === 0) return await this.findById(property_id);
    values.push(property_id);
    const sql = `UPDATE properties SET ${fields.join(', ')} WHERE property_id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(property_id);
  }

  async deleteProperties(id: number) {
    const [res] = await this.pool().execute<OkPacket>('DELETE FROM properties WHERE property_id = ?', [id]);
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