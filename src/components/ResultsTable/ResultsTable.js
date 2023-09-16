import React from "react";
import "./ResultsTable.css";

const ResultsTable = ({ data }) => {
  const columns = data[0] && Object.keys(data[0]);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>{data[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr>
              {columns.map((column) => (
                <td>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
