import { Publisher, Subjects, TicketUpdatedEvent } from '../../utils';


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
