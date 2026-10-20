
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class LandlordsService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createLandlord(first_name: string, last_name: string, email: string, phone: string, id: number) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO landlords (first_name, last_name, email, phone, id) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, email, phone, id],
    );
    return { landlord_id: result.insertId, first_name, last_name, email, phone, id };
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM landlords',
    );
    return rows;
  }

  async findById(landlord_id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM landlords WHERE landlord_id = ?',
      [landlord_id],
    );
    return rows[0];
  }

  async updateLandlord(landlord_id: number, partial: { first_name?: string; last_name?: string; email?: string; phone?: string; id?: number }) {
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
    if (partial.id !== undefined) {
      fields.push('id = ?');
      values.push(partial.id);
    }

    if (fields.length === 0) return await this.findById(landlord_id);

    values.push(landlord_id);
    const sql = `UPDATE landlords SET ${fields.join(', ')} WHERE landlord_id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(landlord_id);
  }

  async deleteLandlord(landlord_id: number) {
    const [res] = await this.pool().execute<OkPacket>(
      'DELETE FROM landlords WHERE landlord_id = ?',
      [landlord_id],
    );
    return res.affectedRows > 0;
  }
}
