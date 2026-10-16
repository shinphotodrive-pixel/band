export interface IncidentData {
  bandNames: string[];
  hackerNames: string[];
  bandUrls: string[];
  incidentDateTime: string;
  notes: string;
  reporterName: string;
  reporterContact: string;
}

export interface ChecklistState {
  [key: string]: boolean;
}
