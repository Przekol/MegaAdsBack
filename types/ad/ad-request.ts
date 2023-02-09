import { AdEntity } from './ad-entity';

export type AddAdRequest = Omit<AdEntity, 'id'>;

export interface GetOneAdParams {
  id: string;
}
export interface GetSearchParams {
  name?: string;
}
