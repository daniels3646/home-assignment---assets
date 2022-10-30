import { Publisher, Subjects, AssetUpdatedEvent } from '../../utils';


export class AssetUpdatedPublisher extends Publisher<AssetUpdatedEvent> {
  subject: Subjects.AssetUpdated = Subjects.AssetUpdated;
}
