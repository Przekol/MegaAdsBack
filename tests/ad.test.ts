import { AdRecord } from '../src/records/ad.record';
import { pool } from '../src/config';
import { AdEntity } from '../types';
import { HttpException } from '../src/exceptions';

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

  test('AdRecord.findAll returns smaller amount of data.', async () => {
    const ads = await AdRecord.findAll('');

    expect((ads[0] as AdEntity).price).toBeUndefined();
    expect((ads[0] as AdEntity).description).toBeUndefined();
  });
});

describe('Tests for AdRecord.insert method', () => {
  const defaultObj = {
    name: 'Test Name',
    description: 'Test Description',
    url: 'http://example.com',
    price: 0,
    lat: 9,
    lon: 9,
  };
  test('AdRecord.insert inserts data to database.', async () => {
    const ad = new AdRecord(defaultObj);
    await ad.insert();

    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
  });

  test('AdRecord.insert returns new UUID.', async () => {
    const ad = new AdRecord(defaultObj);
    await ad.insert();

    const foundAd = await AdRecord.getOne(ad.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);
  });

  test('AdRecord.insert throws error on inserting duplicate', async () => {
    const ad = new AdRecord(defaultObj);
    await ad.insert();
    // try {
    //   await ad.insert();
    //   fail('AdRecord.insert should have thrown an error');
    // } catch (err) {
    //   expect(err).toBeInstanceOf(HttpException);
    //   expect(err.status).toBe(409);
    //   expect(err.message).toBe('Cannot insert something that is already inserted!');
    // }
    try {
      await expect(ad.insert()).rejects.toThrowError(HttpException);
    } catch (error) {
      expect(error.getStatus()).toEqual(409);
      expect(error.getResponse()).toEqual("Cannot insert something that is already inserted!'");
    }
  });
});
