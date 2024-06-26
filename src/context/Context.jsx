import React, { createContext, useState, useEffect, useCallback } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = useCallback(async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-yCUdHQ8nydsY6tJi5h2F98JQ",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch coin data");
      }
      const data = await response.json();
      setAllCoin(data);
    } catch (err) {
      console.error(err);
      // Handle error state or retries as needed
    }
  }, [currency]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllCoin();
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, fetchAllCoin]); // Include fetchAllCoin in the dependency array

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
