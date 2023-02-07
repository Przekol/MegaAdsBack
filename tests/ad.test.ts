import { AdRecord } from '../src/records/ad.record';

describe('Tests for AdRecord.getOne method', () => {
  test('AdRecord returns data form database form one entry.', async () => {
    const ad = await AdRecord.getOne('abc');

    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('Testowa');
  });

  test('AdRecord returns null database for unexciting entry.', async () => {
    const ad = await AdRecord.getOne('---');

    expect(ad).toBeNull();
  });
});
