import { Publisher, Subjects, AssetCreatedEvent } from '../../utils';

export class AssetCreatedPublisher extends Publisher<AssetCreatedEvent> {
  subject: Subjects.AssetCreated = Subjects.AssetCreated;
}
