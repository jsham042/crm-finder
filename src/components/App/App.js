import React, { useState } from "react";
import InputField from "../InputField/InputField";
import { requestCompanyInfo } from "../../api/companyInfo";
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
      <form onSubmit={handleSubmit}>
        <InputField
          value={companyName}
          onChange={handleInputChange}
          placeholder="Enter company name"
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        data && <LeadershipTable data={data} />
      )}
    </div>
  );
};
export default App;
