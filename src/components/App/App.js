import React, { useState } from "react";
import InputField from "../InputField/InputField";
import ResultsTable from "../ResultsTable/ResultsTable";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (companyName) => {
    setLoading(true);
    const response = await fetch("/api/leadership", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyName }),
    });
    const data = await response.json();
    setData(data.leadershipInfo);
    setSearchResults(data.leadershipInfo);
    setLoading(false);
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
      {loading ? <p>Loading...</p> : <ResultsTable data={data} />}
    </div>
  );
};
export default App;
