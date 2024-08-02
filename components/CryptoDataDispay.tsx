"use client";
import { useEffect, useState } from "react";
import Loader from "./Loader";

interface CrytoData {
  "Realtime Currency Exchange Rate": {
    "1. From_Currency Code": string;
    "2. From_Currency Name": string;
    "3. To_Currency Code": string;
    "4. To_Currency Name": string;
    "5. Exchange Rate": string;
    "6. Last Refreshed": string;
    "7. Time Zone": string;
    "8. Bid Price": string;
    "9. Ask Price": string;
  };
}

export default function CryptoDataDispay() {
  const [cryptoData, setCryptoData] = useState<CrytoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setCryptoData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occured");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCrypto();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center mt-10">Error: {error}</div>;
  }

  if (!cryptoData || !cryptoData["Realtime Currency Exchange Rate"]) {
    return null;
  }
  return (
    <div className="mt-10 bg-gray-800 items-center mx-auto border-[2px] shadow-lg flex flex-col lg:h-full h-screen rounded-lg p-3">
      <div className="flex border-[2px] p-2 max-w-xl rounded-lg my-3 w-full">
        <h1 className="md:text-4xl font-bold mb-4 text-xl ">
          Cryptocurrency Information
        </h1>
      </div>
      <div className="flex flex-col gap-4 h-full border-[2px] p-2 max-w-xl rounded-lg my-3 w-full">
        <p className="md:text-xl lg:text-xl text-lg">
          Currency:{" "}
          {
            cryptoData["Realtime Currency Exchange Rate"][
              "1. From_Currency Code"
            ]
          }
        </p>
        <p className="md:text-xl lg:text-xl text-lg">
          Name:{" "}
          {
            cryptoData["Realtime Currency Exchange Rate"][
              "2. From_Currency Name"
            ]
          }
        </p>

        <p className="md:text-xl lg:text-xl text-lg">
          Currency Code: $
          {cryptoData["Realtime Currency Exchange Rate"]["3. To_Currency Code"]}
        </p>

        <p className="md:text-xl lg:text-xl text-lg">
          Currency Name: $
          {cryptoData["Realtime Currency Exchange Rate"]["4. To_Currency Name"]}
        </p>

        <p className="md:text-xl lg:text-xl text-lg">
          Exchange Rate: $
          {cryptoData["Realtime Currency Exchange Rate"]["5. Exchange Rate"]}
        </p>

        <p className="md:text-xl lg:text-xl text-lg">
          Last Refreshed: $
          {cryptoData["Realtime Currency Exchange Rate"]["6. Last Refreshed"]}
        </p>

        <p className="md:text-xl lg:text-xl text-lg">
          Time Zone: $
          {cryptoData["Realtime Currency Exchange Rate"]["7. Time Zone"]}
        </p>

        <p className="md:text-xl lg:text-xl text-lg">
          Bid Price: $
          {cryptoData["Realtime Currency Exchange Rate"]["8. Bid Price"]}
        </p>

        <p className="md:text-xl lg:text-xl text-lg">
          Ask Price: $
          {cryptoData["Realtime Currency Exchange Rate"]["9. Ask Price"]}
        </p>
      </div>
    </div>
  );
}
