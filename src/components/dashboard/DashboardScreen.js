import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardScreen.css'; // Import your CSS file for styling

const DashboardScreen = ({ authToken }) => {
  const [ipoData, setIpoData] = useState([]);
  const [currencyRates, setCurrencyRates] = useState({});
  const [loading, setLoading] = useState(true);
  const API_TOKEN = 'sk_5caf1b4a7f46406ea95e99901bb5f5d0'


  useEffect(() => {
    const fetchIPOs = async () => {
      try {
        const response = await axios.get(
          `https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=${API_TOKEN}`
        );
        setIpoData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching IPO data:', error);
      }
    };

    const fetchCurrencyRates = async () => {
      try {
        const response = await axios.get(
          `https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=${API_TOKEN}`

        );
        setCurrencyRates(response.data);
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      }
    };

    Promise.all([fetchIPOs(), fetchCurrencyRates()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Upcoming IPOs and Currency Exchange Rates</h1>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="section">
            <h2 className="section-title">Upcoming IPOs</h2>
            <ul className="ipo-list">
              {ipoData.map((ipo) => (
                <li key={ipo.symbol} className="ipo-item">
                  <div className="company-info">
                    <strong>{ipo.companyName}</strong>
                    <p><strong>Expected Date: </strong> {ipo.updated}</p>
                    <p><strong>Status: </strong> {ipo.status}</p>
                    <p><strong>Volume: </strong>{ipo.volume}</p>
                    <p><strong>Price Range: </strong> $ {ipo.priceRangeLow} - {ipo.priceRangeHigh}</p>
                  </div>
                  <div className="ipo-details">
                    <p>{ipo.details}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h2 className="section-title">Currency Exchange Rates</h2>
            <ul className="currency-list">
              {Object.entries(currencyRates).map(([symbol, data]) => (
                <li key={symbol} className="currency-item">
                  <strong>{currencyRates[symbol].symbol}</strong>: {data.rate}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardScreen;


