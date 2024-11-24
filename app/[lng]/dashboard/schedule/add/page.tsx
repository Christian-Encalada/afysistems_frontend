'use client';

import { useState } from 'react';
import AddAppointment from '../../../components/Schedule/AddAppointment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { getAllAppointments } from '../../../services/appointmentService';
import moment from 'moment-timezone';
import EventDetailsDialog from '../../../components/Schedule/EventDetailsDialog';

export default function AddSchedulePage({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [lastRange, setLastRange] = useState<{
    start: string;
    end: string;
  } | null>(null);

  const handleDateClick = (info: any) => {
    const localDate = moment(info.dateStr).toDate();
    setSelectedDate(localDate);
    setIsAppointmentDialogOpen(true);
  };

  const handleDatesSet = async (info: any) => {
    const startRange = moment(info.start).startOf('day').toISOString();
    const endRange = moment(info.end).endOf('day').toISOString();

    if (lastRange?.start === startRange && lastRange?.end === endRange) return;

    try {
      const appointments = await getAllAppointments(startRange, endRange);
      const formattedEvents = formatAppointmentsForCalendar(appointments);
      setEvents(formattedEvents);
      setLastRange({ start: startRange, end: endRange });
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const formatAppointmentsForCalendar = (appointments: any[]) => {
    const today = moment().startOf('day');

    const eventColors = {
      today: {
        light: {
          bg: '#4E25BE',
          text: '#FFFFFF',
          border: '#3c1d96',
        },
        dark: {
          bg: '#2d333b',
          text: '#adbac7',
          border: '#444c56',
        },
      },
      normal: {
        light: {
          bg: '#4e25be42',
          text: '#0D003F',
          border: '#4E25BE',
        },
        dark: {
          bg: '#2d333b',
          text: '#adbac7',
          border: '#444c56',
        },
      },
      recurring: {
        light: {
          bg: '#B41DEB42',
          text: '#0D003F',
          border: '#B41DEB',
        },
        dark: {
          bg: '#1c2128',
          text: '#adbac7',
          border: '#2d333b',
        },
      },
    };

    return appointments.flatMap((appointment) => {
      const appointmentDate = moment.utc(
        `${appointment.startDate.split('T')[0]}T${appointment.startTime}`
      );

      const isToday = appointmentDate.isSame(today, 'day');
      const isDarkMode =
        document.documentElement.getAttribute('data-theme') === 'dark';

      const mainEvent = {
        id: appointment.id,
        title: appointment.title,
        start: moment
          .utc(
            `${appointment.startDate.split('T')[0]}T${appointment.startTime}`
          )
          .tz(moment.tz.guess())
          .toDate(),
        backgroundColor: isToday
          ? eventColors.today.light.bg
          : isDarkMode
            ? eventColors.today.dark.bg
            : eventColors.normal.light.bg,
        textColor: isToday
          ? eventColors.today.light.text
          : isDarkMode
            ? eventColors.today.dark.text
            : eventColors.normal.light.text,
        borderLeft: `4px solid ${
          isToday
            ? eventColors.today.light.border
            : isDarkMode
              ? eventColors.today.dark.border
              : eventColors.normal.light.border
        }`,
        extendedProps: {
          description: appointment.description,
          clientId: appointment.client.id,
          recurrenceRule: appointment.recurrenceRule,
          isRecurring: !!appointment.recurrenceRule,
        },
      };

      const recurringEvents = Array.isArray(appointment.recurringDates)
        ? appointment.recurringDates.map((recDate: string) => {
            const isRecurringToday = moment.utc(recDate).isSame(today, 'day');
            return {
              id: `${appointment.id}-${recDate}`,
              title: appointment.title,
              start: moment.utc(recDate).tz(moment.tz.guess()).toDate(),
              backgroundColor: isRecurringToday
                ? eventColors.today.light.bg
                : isDarkMode
                  ? eventColors.recurring.dark.bg
                  : eventColors.recurring.light.bg,
              textColor: isRecurringToday
                ? eventColors.today.light.text
                : isDarkMode
                  ? eventColors.recurring.dark.text
                  : eventColors.recurring.light.text,
              borderLeft: `4px solid ${
                isRecurringToday
                  ? eventColors.today.light.border
                  : isDarkMode
                    ? eventColors.recurring.dark.border
                    : eventColors.recurring.light.border
              }`,
              extendedProps: {
                description: appointment.description,
                clientId: appointment.client.id,
                recurrenceRule: appointment.recurrenceRule,
                isRecurringInstance: true,
              },
            };
          })
        : [];

      return [mainEvent, ...recurringEvents];
    });
  };

  const handleEventClick = (info: any) => {
    setSelectedEvent(info.event);
    setIsEventDetailsOpen(true);
  };

  return (
    <div className='h-full p-4'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, momentTimezonePlugin]}
        initialView='dayGridMonth'
        events={events}
        dateClick={handleDateClick}
        selectable
        timeZone={'UTC'}
        expandRows
        aspectRatio={2}
        height='auto'
        contentHeight='auto'
        datesSet={handleDatesSet}
        locale={lng}
        eventClick={handleEventClick}
      />
      <AddAppointment
        selectedDate={selectedDate}
        isOpen={isAppointmentDialogOpen}
        setIsOpen={setIsAppointmentDialogOpen}
      />
      <EventDetailsDialog
        isOpen={isEventDetailsOpen}
        setIsOpen={setIsEventDetailsOpen}
        event={selectedEvent}
      />
    </div>
  );
}
