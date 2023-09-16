import React, { useState } from "react";
import InputField from "../InputField/InputField";
import ResultsTable from "../ResultsTable/ResultsTable";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");

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
    setLoading(false);
  };

  return (
    <div className="App">
      <InputField
        onSearch={handleSearch}
        companyName={companyName}
        setCompanyName={setCompanyName}
      />
      {loading ? <p>Loading...</p> : <ResultsTable data={data} />}
    </div>
  );
};
export default App;
