import React from "react";
import { DataGrid } from "../../components";
import "../styles/Page.css";

const data = [
  { name: "Alfred", age: 30 },
  { name: "Bob", age: 40 },
];

type ColumnType = {
  Header: string;
  accessor: "name" | "age";
};

const columns: ColumnType[] = [
  { Header: "Name", accessor: "name" },
  { Header: "Age", accessor: "age" },
];

export const TestDataGrid = () => {
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  return (
    <div className="Page" style={{ margin: "20px" }}>
      <DataGrid
        data={data}
        columns={columns}
        selection
        setSelected={setSelectedRows}
      />
    </div>
  );
};