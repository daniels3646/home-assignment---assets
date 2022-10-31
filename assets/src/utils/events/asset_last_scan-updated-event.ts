import { Subjects } from './subjects';

export interface AssetLastScanUpdatedEvent {
  subject: Subjects.AssetLastScanUpdated;
  data: {
    assetId: string;
    lastScanDate: Date;
  };
}
