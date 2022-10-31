import { Subjects } from './subjects';

export interface AssetUpdatedEvent {
  subject: Subjects.AssetUpdated;
  data: {
    id: string;
    ip: string;
    name: string;
    description: string;
    dateCreated: Date;
    version: number;
  };
}
