import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

// GraphQL Queries
const GET_ALL_STOCKS = gql`
  query GetAllStocks {
    allStocks {
      code
      fullname_vi
      exchange
      industry_level1
      market_cap
    }
  }
`;

const GET_STOCK_DETAILS = gql`
  query GetStockDetails($code: String!) {
    stockByCode(code: $code) {
      code
      fullname_vi
      fullname_en
      description
      exchange
      industry_level1
      industry_level2
      industry_level3
      industry_level4
      market_cap
      total_shares_outstanding
      website
      address
      accounting_firm {
        nam
        donvikiemtoan
      }
    }
  }
`;

const GET_STOCKS_BY_INDUSTRY = gql`
  query GetStocksByIndustry($industry: String!) {
    stocksByIndustry(industry: $industry) {
      code
      fullname_vi
      exchange
      industry_level1
      industry_level2
      market_cap
    }
  }
`;

const GET_STOCKS_BY_AUDITOR = gql`
  query GetStocksByAuditor($auditor: String!, $year: Int) {
    stocksByAuditor(auditor: $auditor, year: $year) {
      code
      fullname_vi
      exchange
      accounting_firm {
        nam
        donvikiemtoan
      }
    }
  }
`;

const StockExplorer = () => {
  const [selectedStock, setSelectedStock] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedAuditor, setSelectedAuditor] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  // Query for all stocks (limited fields)
  const { loading: allStocksLoading, error: allStocksError, data: allStocksData } = 
    useQuery(GET_ALL_STOCKS);

  // Query for specific stock details
  const { loading: stockDetailsLoading, error: stockDetailsError, data: stockDetailsData } = 
    useQuery(GET_STOCK_DETAILS, {
      variables: { code: selectedStock },
      skip: !selectedStock
    });

  // Query for stocks by industry
  const { loading: industryStocksLoading, error: industryStocksError, data: industryStocksData } = 
    useQuery(GET_STOCKS_BY_INDUSTRY, {
      variables: { industry: selectedIndustry },
      skip: !selectedIndustry || activeTab !== 'industry'
    });

  // Query for stocks by auditor
  const { loading: auditorStocksLoading, error: auditorStocksError, data: auditorStocksData } = 
    useQuery(GET_STOCKS_BY_AUDITOR, {
      variables: { 
        auditor: selectedAuditor,
        year: selectedYear
      },
      skip: !selectedAuditor || activeTab !== 'auditor'
    });

  // Fix for the Set issue - create a function to get unique industries
  const getUniqueIndustries = (): string[] => {
    if (!allStocksData || !allStocksData.allStocks) return [];
    
    // Explicitly cast each industry to string
    const industries: string[] = allStocksData.allStocks.map((stock: any) => 
      stock.industry_level1 as string
    ).filter(Boolean); // Remove any null/undefined values
    
    // Create a Set and convert back to array with explicit typing
    return Array.from(new Set(industries));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">GraphQL Stock Explorer</h1>
      
      {/* Tab Navigation */}
      <div className="flex mb-6 border-b">
        <button 
          className={`px-4 py-2 ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('all')}
        >
          All Stocks
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'details' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('details')}
        >
          Stock Details
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'industry' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('industry')}
        >
          By Industry
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'auditor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('auditor')}
        >
          By Auditor
        </button>
      </div>
      
      {/* All Stocks Tab */}
      {activeTab === 'all' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">All Stocks</h2>
          
          {allStocksLoading && <p>Loading stocks...</p>}
          {allStocksError && <p className="text-red-500">Error: {allStocksError.message}</p>}
          
          {allStocksData && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Code</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Exchange</th>
                    <th className="border px-4 py-2">Industry</th>
                    <th className="border px-4 py-2">Market Cap</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allStocksData.allStocks.map((stock: any) => (
                    <tr key={stock.code}>
                      <td className="border px-4 py-2">{stock.code}</td>
                      <td className="border px-4 py-2">{stock.fullname_vi}</td>
                      <td className="border px-4 py-2">{stock.exchange}</td>
                      <td className="border px-4 py-2">{stock.industry_level1}</td>
                      <td className="border px-4 py-2">
                        {(stock.market_cap / 1000000000).toFixed(2)} tỷ
                      </td>
                      <td className="border px-4 py-2">
                        <button 
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                          onClick={() => {
                            setSelectedStock(stock.code);
                            setActiveTab('details');
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {/* Stock Details Tab */}
      {activeTab === 'details' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Stock Details</h2>
          
          <div className="mb-4">
            <label className="block mb-2">Select Stock:</label>
            <select 
              className="border p-2 w-64"
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
            >
              <option value="">-- Select a stock --</option>
              {allStocksData && allStocksData.allStocks.map((stock: any) => (
                <option key={stock.code} value={stock.code}>
                  {stock.code} - {stock.fullname_vi}
                </option>
              ))}
            </select>
          </div>
          
          {stockDetailsLoading && <p>Loading stock details...</p>}
          {stockDetailsError && <p className="text-red-500">Error: {stockDetailsError.message}</p>}
          
          {stockDetailsData && stockDetailsData.stockByCode && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{stockDetailsData.stockByCode.code} - {stockDetailsData.stockByCode.fullname_vi}</h3>
                  <p className="text-gray-600">{stockDetailsData.stockByCode.fullname_en}</p>
                </div>
                <div className="bg-gray-100 px-3 py-1 rounded">
                  {stockDetailsData.stockByCode.exchange}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-1">Description:</h4>
                <p>{stockDetailsData.stockByCode.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold mb-1">Industry:</h4>
                  <ul className="list-disc pl-5">
                    <li>{stockDetailsData.stockByCode.industry_level1}</li>
                    <li>{stockDetailsData.stockByCode.industry_level2}</li>
                    <li>{stockDetailsData.stockByCode.industry_level3}</li>
                    <li>{stockDetailsData.stockByCode.industry_level4}</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">Financial Info:</h4>
                  <p>Market Cap: {(stockDetailsData.stockByCode.market_cap / 1000000000).toFixed(2)} tỷ VND</p>
                  <p>Outstanding Shares: {stockDetailsData.stockByCode.total_shares_outstanding.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-1">Contact:</h4>
                <p>Website: <a href={`https://${stockDetailsData.stockByCode.website}`} target="_blank" className="text-blue-500">{stockDetailsData.stockByCode.website}</a></p>
                <p>Address: {stockDetailsData.stockByCode.address}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-1">Accounting Firms:</h4>
                <table className="min-w-full border">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Year</th>
                      <th className="border px-4 py-2">Auditor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockDetailsData.stockByCode.accounting_firm.map((firm: any, index: number) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{firm.nam}</td>
                        <td className="border px-4 py-2">{firm.donvikiemtoan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Industry Tab */}
      {activeTab === 'industry' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Stocks by Industry</h2>
          
          <div className="mb-4">
            <label className="block mb-2">Select Industry:</label>
            <select 
              className="border p-2 w-64"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option value="">-- Select an industry --</option>
              {getUniqueIndustries().map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          
          {industryStocksLoading && <p>Loading industry stocks...</p>}
          {industryStocksError && <p className="text-red-500">Error: {industryStocksError.message}</p>}
          
          {industryStocksData && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Code</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Exchange</th>
                    <th className="border px-4 py-2">Industry Level 2</th>
                    <th className="border px-4 py-2">Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {industryStocksData.stocksByIndustry.map((stock: any) => (
                    <tr key={stock.code}>
                      <td className="border px-4 py-2">{stock.code}</td>
                      <td className="border px-4 py-2">{stock.fullname_vi}</td>
                      <td className="border px-4 py-2">{stock.exchange}</td>
                      <td className="border px-4 py-2">{stock.industry_level2}</td>
                      <td className="border px-4 py-2">
                        {(stock.market_cap / 1000000000).toFixed(2)} tỷ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      
      {/* Auditor Tab */}
      {activeTab === 'auditor' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Stocks by Auditor</h2>
          
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Select Auditor:</label>
              <input 
                type="text"
                className="border p-2 w-full"
                placeholder="Enter auditor name (e.g., VAE)"
                value={selectedAuditor}
                onChange={(e) => setSelectedAuditor(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block mb-2">Select Year (optional):</label>
              <input 
                type="number"
                className="border p-2 w-full"
                placeholder="Enter year (e.g., 2023)"
                value={selectedYear || ''}
                onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
              />
            </div>
          </div>
          
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            onClick={() => {
              // Trigger query by changing a dependency
              setSelectedAuditor(selectedAuditor);
            }}
            disabled={!selectedAuditor}
          >
            Search
          </button>
          
          {auditorStocksLoading && <p>Loading auditor stocks...</p>}
          {auditorStocksError && <p className="text-red-500">Error: {auditorStocksError.message}</p>}
          
          {auditorStocksData && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Code</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Exchange</th>
                    <th className="border px-4 py-2">Audit History</th>
                  </tr>
                </thead>
                <tbody>
                  {auditorStocksData.stocksByAuditor.map((stock: any) => (
                    <tr key={stock.code}>
                      <td className="border px-4 py-2">{stock.code}</td>
                      <td className="border px-4 py-2">{stock.fullname_vi}</td>
                      <td className="border px-4 py-2">{stock.exchange}</td>
                      <td className="border px-4 py-2">
                        <ul>
                          {stock.accounting_firm
                            .filter((firm: any) => firm.donvikiemtoan === selectedAuditor)
                            .map((firm: any, index: number) => (
                              <li key={index}>
                                {firm.nam}: {firm.donvikiemtoan}
                              </li>
                            ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockExplorer;