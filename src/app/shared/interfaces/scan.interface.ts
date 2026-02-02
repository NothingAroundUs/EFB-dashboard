export interface Scan {
  scanData: ScanDatum[];
}

export interface ScanDatum {
  Timestamp: string;
  'Serial No.': string;
  Activity: string;
  'Volunteer Name': string;
  'Scanner Name': string;
  ContCategory: string;
}

export interface AggregatedData {
  ActivityName: string;
  Participants: number;
  VolunteerCategory: string;
}
