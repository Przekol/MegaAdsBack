import { Request, Router } from 'express';

import {
  AddAdRequest,
  ClientApiResponse,
  GetListOfAdsResponse,
  GetOneAdParams,
  GetOneAdResponse,
  GetSearchParams,
} from 'types';
import { AdRecord } from '../records';
import { ValidationException } from '../exceptions';

export const adRouter = Router();
adRouter
  .get('/search/:name?', async (req: Request<GetSearchParams, ClientApiResponse<GetListOfAdsResponse>, never>, res) => {
    const ads = await AdRecord.findAll(req.params.name ?? '');

    res.status(200).json({
      ok: true,
      data: ads,
      status: 200,
    });
  })

  .get('/:id', async (req: Request<GetOneAdParams, ClientApiResponse<GetOneAdResponse>, never>, res) => {
    const ad = await AdRecord.getOne(req.params.id);
    if (!ad) {
      throw new ValidationException('Brak ogłoszenia o takim id.');
    }

    res.status(200).json({
      ok: true,
      data: ad,
      status: 200,
    });
  })

  .post('/', async (req: Request<never, ClientApiResponse<GetOneAdResponse>, AddAdRequest>, res) => {
    const ad = new AdRecord(req.body);
    await ad.insert();

    res.status(201).json({
      ok: true,
      data: ad,
      status: 201,
    });
  });
