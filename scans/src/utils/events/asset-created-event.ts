import { Subjects } from './subjects';

export interface AssetCreatedEvent {
  subject: Subjects.AssetCreated;
  data: {
    id: string;
    ip: string;
    name: string;
    description: string;
    dateCreated: Date;
    version: number;
  };
}
