import { Publisher, Subjects} from '../../utils';
import { AssetLastScanUpdatedEvent } from '../../utils/events/asset_last_scan-updated-event';

export class AssetLastScanUpdatedPublisher extends Publisher<AssetLastScanUpdatedEvent> {
  subject: Subjects.AssetLastScanUpdated = Subjects.AssetLastScanUpdated;
}
