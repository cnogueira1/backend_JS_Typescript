import { startOfHour } from 'date-fns';
import Appointment from '../models/Appoitment';
import AppointmentsRepository from '../repositories/AppoinstmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointment = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointment) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
