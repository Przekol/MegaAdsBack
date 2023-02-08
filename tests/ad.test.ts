import { AdRecord } from '../src/records/ad.record';
import { pool } from '../src/config';

afterAll(async () => {
  await pool.end();
});

describe('Tests for AdRecord.getOne method', () => {
  test('AdRecord.getOne returns data form database form one entry.', async () => {
    const ad = await AdRecord.getOne('abc');

    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('Testowa');
  });

  test('AdRecord.getOne returns null database for unexciting entry.', async () => {
    const ad = await AdRecord.getOne('---');

    expect(ad).toBeNull();
  });
});

describe('Tests for AdRecord.findAll method', () => {
  test('AdRecord.findAll returns array of found entries.', async () => {
    const ads = await AdRecord.findAll('');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
  });

  test('AdRecord.findAll returns empty array when searching for something that does not exist.', async () => {
    const ads = await AdRecord.findAll('----------------------');

    expect(ads).toEqual([]);
  });
});
