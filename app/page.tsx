export default function Home() {
  return (
    <main className="text-center max-w-[600px]">
      <h1 className="text-8xl mb-10">About</h1>
      <p className="text-lg mb-10">
        This demo web application is a financial data platform providing
        detailed information across various asset classes.
      </p>
      <ul className="list-disc text-md text-left">
        <li>
          <span className="font-bold">Commodities:</span> Detailed insights on
          commodities, including current and historical prices and charts
        </li>
        <li>
          <span className="font-bold">Forex:</span> Data on foreign exchange
          rates, tracking a currency pair
        </li>
        <li>
          <span className="font-bold">Cryptocurrencies:</span> Information on
          digital currencies, including price movements and trends
        </li>
        <li>
          <span className="font-bold">Stock:</span> Time series data on stock
          prices, enabling analysis of historical performance
        </li>
      </ul>
    </main>
  );
}
