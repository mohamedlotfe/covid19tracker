import React, { useEffect, useState } from "react";

const parseDate = (dateString: any) => {
  const parsedDate = new Date(dateString);

  return isNaN(parsedDate.getTime())
    ? "--"
    : new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      }).format(parsedDate);
};
const baseURL = process.env.REACT_APP_API_URL;

const CountriesListPage: React.FC = () => {
  const [countriesData, setCountriesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await fetch(baseURL + "getCountriesListData");
        const data = await response.json();
        setCountriesData(data);
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    };

    fetchCountriesData();
  }, []);

  return (
    <div>
      <h1 className="ml-3 mb-3">Countries List </h1>
      <ul className="list-countries">
        {countriesData.map((item: any, index: number) => (
          <li key={index} style={{ width: "20%" }}>
            <div
              className="my-2 mx-auto p-relative bg-white shadow-1 blue-hover"
              style={{
                width: "300px",
                overflow: "hidden",
                borderRadius: "1px",
              }}
            >
              <h1
                className="ff-serif font-weight-normal text-black card-heading mt-0 mb-1"
                style={{ lineHeight: "1.25", margin: "20px" }}
              >
                {item.country}
              </h1>

              <div className="px-2 py-2">
                <p className="mb-1">Total Cases: {item.infected}</p>
                <p className="mb-1">Recovered: {item.recovered}</p>
                <p className="mb-1">
                  Deceased: {item.deceased ?? "Not Ptovided"}
                </p>
                <p className="mb-1">Tested: {item?.tested ?? "Not Ptovided"}</p>
                <p className="mb-1">
                  Last Updated at:
                  {parseDate(item?.lastUpdatedSource) ?? "Not Provided"}
                </p>
              </div>

              <a
                href={item.moreData}
                className="text-uppercase d-inline-block font-weight-medium lts-2px ml-2 mb-2 text-center styled-link"
              >
                Read More
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
   
  );
};

export default CountriesListPage;
