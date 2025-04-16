const request = require('supertest');
const app = require('../app');
const db = require('../db/db');

let testCustomerId;

beforeAll(done => {
  const sql = `
    INSERT INTO customers (name, email, phone, address, company_name, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, NOW(), NOW())
  `;
  db.query(sql, ['テスト', 'test@example.com', '09012345678', '東京', 'テスト株式会社'], (err, result) => {
    if (err) throw err;
    testCustomerId = result.insertId;
    done();
  });
});

afterAll(done => {
  db.query('DELETE FROM customers WHERE id = ?', [testCustomerId], () => {
    db.end();
    done();
  });
});

describe('GET /api/customers/:id', () => {
  it(' 顧客情報を取得できる（成功ケース）', async () => {
    const res = await request(app).get(`/api/customers/${testCustomerId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', testCustomerId);
    expect(res.body).toHaveProperty('name', 'テスト');
  });

  it(' 存在しないID → 404', async () => {
    const res = await request(app).get('/api/customers/999999');
    expect(res.statusCode).toBe(404);
    expect(res.text).toMatch(/見つかりません/);
  });
});

describe('PUT /api/customers/:id', () => {
  it(' 顧客情報を更新できる（成功ケース）', async () => {
    const res = await request(app)
      .put(`/api/customers/${testCustomerId}`)
      .send({
        name: '山田更新',
        email: 'updated@example.com',
        phone: '08098765432',
        address: '大阪',
        company_name: '更新株式会社'
      });
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/更新しました/);
  });

  it(' 必須項目が不足 → 400', async () => {
    const res = await request(app)
      .put(`/api/customers/${testCustomerId}`)
      .send({
        email: 'no-name@example.com',
        phone: '08000000000',
        address: '福岡',
        company_name: '名前なし株式会社'
      });
    expect(res.statusCode).toBe(400);
    expect(res.text).toMatch(/入力が必要/);
  });
});

describe('DELETE /api/customers/:id', () => {
  let tempId;

  beforeAll(done => {
    const sql = `
      INSERT INTO customers (name, email, phone, address, company_name, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;
    db.query(sql, ['削除対象', 'delete@example.com', '07000000000', '札幌', '削除株式会社'], (err, result) => {
      if (err) throw err;
      tempId = result.insertId;
      done();
    });
  });

  it(' 顧客を削除できる（成功ケース）', async () => {
    const res = await request(app).delete(`/api/customers/${tempId}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/削除しました/);
  });

  it(' 存在しないIDを削除 → 404', async () => {
    const res = await request(app).delete('/api/customers/999999');
    expect(res.statusCode).toBe(404);
    expect(res.text).toMatch(/見つかりません/);
  });
});