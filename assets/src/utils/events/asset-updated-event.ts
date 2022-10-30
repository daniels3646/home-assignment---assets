import { Subjects } from './subjects';

export interface AssetUpdatedEvent {
  subject: Subjects.AssetUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    orderId?: string;
  };
}
