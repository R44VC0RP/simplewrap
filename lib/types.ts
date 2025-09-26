export interface APIKey {
  id: string;
  name: string | null;
  start: string | null;
  createdAt: Date;
  key?: string; // Full key only available immediately after creation
}
