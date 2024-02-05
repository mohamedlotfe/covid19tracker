
interface Snapshot {
  [key: string]: { total?: number; new?: number };
}

export interface NinjaCovidData {
  country: string;
  region: string;
  cases: Snapshot & {
    total?: number;
    new?: number;
  };
  deaths: Snapshot & {
    total?: number;
    new?: number;
  };
}
export interface CovidDataEntry {
    country: string;
    deceased: number;
    historyData: string;
    infected: number;
    lastUpdatedApify: string;
    lastUpdatedSource?: string | null;
    moreData: string;
    recovered: string | null; // Update with actual type if applicable
    sourceUrl: string;
    tested: string | null; // Update with actual type if applicable
  }
  
