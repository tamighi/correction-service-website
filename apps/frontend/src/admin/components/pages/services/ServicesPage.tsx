import React from "react";

import { Column } from "react-table";
import { useNavigate } from "react-router-dom";
import { Card, DataGrid, DeleteIcon, IconButton } from "lib";

import { BasePage } from "../BasePage";
import { useData } from "admin/hooks/useData";

import { ServiceDto } from "./Services";
import { dataProvider } from "admin/api/dataProvider";

import styles from "./Datagrid.css";

const columns: Column<ServiceDto>[] = [
  { Header: "Id", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Description", accessor: "description" },
];

export const ServicesPage = () => {
  const { data } = useData<ServiceDto>("service");
  const navigate = useNavigate();

  const [selected, setSelected] = React.useState<string[]>([]);

  const onDeleteClick = async () => {
    dataProvider.deleteMany("service", {
      ids: selected,
    });
  };

  return (
    <BasePage>
      <Card
        className={`${styles.SelectedCard} ${
          selected.length !== 0 ? styles.Open : styles.Close
        }`}
      >
        <p style={{ paddingRight: "48px" }}>
          {selected.length} {selected.length > 1 ? "items" : "item"} selected
        </p>
        <IconButton onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </Card>
      <button
        style={{ alignSelf: "flex-end", minHeight: "54px" }}
        onClick={() => navigate("create")}
      >
        +
      </button>
      {data?.data && (
        <DataGrid
          data={data?.data}
          columns={columns}
          selection
          setSelected={setSelected}
        />
      )}
    </BasePage>
  );
};
