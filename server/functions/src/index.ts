import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { CovidDataEntry } from "./interfaces";
import { CovidDataFetcher } from "./apify-client";
const firebaseConfig = {
  apiKey: "AIzaSyCDAQjESrSlgiLQibGoMGTNyYJjBivQjKI",
  authDomain: "tetco-app.firebaseapp.com",
  projectId: "tetco-app",
  storageBucket: "tetco-app.appspot.com",
  messagingSenderId: "189510480297",
  appId: "1:189510480297:web:9194a341c29aa9ee0c94b8",
  measurementId: "G-3F7PG5Y7JX",
  databaseURL: "https://tetco-app-default-rtdb.firebaseio.com",
};

admin.initializeApp(firebaseConfig);

const db = admin.database();
const covidDataFetcher = CovidDataFetcher.getInstance();



// A. Initaialization the data of Covid-19 cases
export const initCovidData = onRequest(async (req, res) => {
  try {
    // Initialize the ApifyClient with API token
    let covidData = await db.ref("covidData").once("value");

    if (!covidData.exists()) {
      covidData = await covidDataFetcher.fetchCovidData();

      // Process and store the data in the Realtime Database
      await db.ref("covidData").set(covidData);
    }

    res.status(200).send({
      test: "Covid data fetched from ApifyClient",
      data: covidData,
    });
  } catch (error) {
    res.status(500).send("Error fetching top countries data");
  }
});

// B. Endpoint to serve the top 5 countries in Covid-19 cases
export const getTopCountriesData = onRequest(async (req, res) => {
  try {
    const snapshot = await db
      .ref("covidData")
      .orderByChild("infected")
      .limitToLast(5)
      .once("value");
    const topCountriesData = snapshot.val();
    const mappedCountries: CovidDataEntry[] = Object.entries(
      topCountriesData
    ).map(([id, entry]: [string, any]) => ({
      id,
      ...entry,
      lastUpdatedSource: entry.lastUpdatedSource || null,
    }));
    res.status(200).json({ data: mappedCountries });
  } catch (error) {
    res.status(500).send("Error fetching top countries data");
  }
});
// C. Endpoint to serve the full list of countries with pandemic cases analytics
export const getCountriesListData = onRequest(async (req, res) => {
  try {
    const snapshot = await db.ref("covidData").once("value");
    const getCountriesListData = snapshot.val();
    res.status(200).json(getCountriesListData);
  } catch (error) {
    res.status(500).send("Error fetching countries pandemic analytics");
  }
});
