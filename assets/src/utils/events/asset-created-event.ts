import { Subjects } from './subjects';

export interface AssetCreatedEvent {
  subject: Subjects.AssetCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
  };
}
