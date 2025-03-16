export const EquipmentStatus = {
  InUse: "IN_USE",
  Returned: "RETURNED",
  Lost: "LOST",
  Unknown: "UNKNOWN",
} as const;

export type EquipmentStatus =
  (typeof EquipmentStatus)[keyof typeof EquipmentStatus];

export const OffboardingStatus = {
  NotStarted: "NOT_STARTED",
  InProgress: "IN_PROGRESS",
  Complete: "COMPLETE",
  Unknown: "UNKNOWN",
} as const;

export type OffboardingStatus =
  (typeof OffboardingStatus)[keyof typeof OffboardingStatus];

export interface Equipment {
  name: string;
  id: string;
  status: EquipmentStatus;
  note?: string;
}

export interface Employee {
  id: string;
  offboardingId: string;
  name: string;
  email: string;
  department: string;
  equipment: Equipment[];
}

export interface OffboardingReciever {
  id: string;
  name: string;
  email: string;
  adressLine: string;
  country: string;
  city: string;
  postalCode: string;
  phone: string;
}

export interface OffboardingProcess {
  employee: Employee;
  status: OffboardingStatus;
  id: string;
  exitInterviewNote?: string;
  exitInterviewDate?: number;
  reciever?: OffboardingReciever;
  jobCertificateRecieved?: boolean;
  targetDate: number;
  startDate: number;
}

export interface PatchOffboardingProcess {
  id: string;
  jobCertificateRecieved?: boolean;
  targetDate?: number;
  startDate?: number;
  exitInterviewNote?: string;
  exitInterviewDate?: number;
  reciever?: Partial<OffboardingReciever>;
  equipment?: Array<Partial<Equipment>>;
}
