import React, { useState } from "react";
import InputField from "../InputField/InputField";
import { requestCompanyInfo } from "../../api/companyInfo";
import SearchCompany from "../SearchCompany/SearchCompany";
import CompanyTable from "../CompanyTable/CompanyTable";
import LeadershipTable from "../LeadershipTable/LeadershipTable";
const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async (companyName) => {
    setLoading(true);
    setError(null);
    try {
      const data = await requestCompanyInfo(companyName);
      if (!data.leadershipInfo) {
        throw new Error("No leadership info found");
      }
      setData(data.leadershipInfo);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(companyName);
  };

  return (
    <div className="App">
      <SearchCompany
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        value={companyName}
      />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        data && <CompanyTable data={data} />
      )}
      {data && <LeadershipTable data={data} />}
    </div>
  );
};
export default App;
