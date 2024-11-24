export enum AppointmentFrequency {
  NONE = 'no_repeat',
  WEEKLY = 'weekly',
  DAILY = 'daily',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  CUSTOM = 'custom',
}

export enum NotificationMethod {
  EMAIL = 'email',
  WHATSAPP = 'whatsapp',
}

export enum FrequencyInterval {
  DAILY = 'day',
  WEEKLY = 'week',
  MONTHLY = 'month',
  YEARLY = 'year',
}

export enum EndType {
  NEVER = 'never',
  ON_DATE = 'on_date',
  AFTER_OCCURRENCES = 'after_occurrences',
}

export enum DayOfWeek {
  SUNDAY = 'sunday',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
}

export interface RecurrenceRule {
  interval: number;
  frequencyType: FrequencyInterval;
  daysOfWeek?: DayOfWeek[];
  endType: EndType;
  endDate?: string;
  occurrences?: number;
}

export interface CreateAppointmentDto {
  title: string;
  description?: string;
  startDate: string;
  startTime: string;
  frequency: AppointmentFrequency;
  notificationMethod: NotificationMethod[];
  clientId: number;
  recurrenceRule?: RecurrenceRule;
  startRange: string;
  endRange: string;
}
