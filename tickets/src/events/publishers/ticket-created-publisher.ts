import { Publisher, Subjects, TicketCreatedEvent } from '../../utils';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
