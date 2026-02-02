export interface ApiStatus {
  statusHistory: StatusEntry[];
}

export interface StatusEntry {
  status: string;
  timestamp: string;
}
