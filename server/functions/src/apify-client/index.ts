import { ApifyClient } from "apify-client";

export class CovidDataFetcher {
  private static instance: CovidDataFetcher;
  private client: ApifyClient;

  private constructor() {
    this.client = new ApifyClient({
      token: "apify_api_ePoXx6pXIrLWjMcnSRlyzyyJKW2TaF2ryAwU",
    });
  }

  public static getInstance(): CovidDataFetcher {
    if (!CovidDataFetcher.instance) {
      CovidDataFetcher.instance = new CovidDataFetcher();
    }
    return CovidDataFetcher.instance;
  }

  public async fetchCovidData(): Promise<any> {
    const run = await this.client
      .actor("petrpatek/covid-19-aggregator")
      .call({});
    const { items: covidData } = await this.client
      .dataset(run.defaultDatasetId)
      .listItems({
        clean: true,
        desc: true,
        skipEmpty: true,
        skipHidden: true,
        limit: 1000,
      });
    return covidData;
  }
}
