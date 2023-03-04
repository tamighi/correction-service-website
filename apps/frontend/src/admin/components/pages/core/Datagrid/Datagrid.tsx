import React from "react";
import { BasePage } from "..";
import {
  AddIcon,
  Card,
  DataGrid,
  DeleteIcon,
  IconButton,
  Navbar,
  useDialog,
} from "lib";

import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useGetData } from "admin/hooks/useData";
import { dataProvider } from "admin/api/dataProvider";

import { Column } from "react-table";

import styles from "./Datagrid.css";

export const DataGridLayout = <T extends { id: string }>({
  ressource,
  columns,
}: {
  ressource: string;
  columns: Column<T>[];
}) => {
  const [selected, setSelected] = React.useState<T[]>([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useGetData<T>(ressource);

  const { showDialog } = useDialog();
  const onDeleteClick = async () => {
    await dataProvider.deleteMany("service", {
      ids: selected.map((value) => value.id),
    });
    showDialog?.({ content: `${selected.length} item(s) deleted` });
    queryClient.invalidateQueries("service");
  };

  const memoizedData = React.useMemo(() => data, [data]);

  return (
    <BasePage>
      <Card
        className={`${styles.SelectedCard} ${
          selected.length !== 0 ? styles.Open : styles.Close
        }`}
      >
        <p style={{ paddingRight: "48px" }}>
          {selected.length} item(s) selected
        </p>
        <IconButton onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </Card>
      <Navbar style={{ justifyContent: "flex-end" }}>
        <IconButton onClick={() => navigate("create")}>
          <AddIcon />
        </IconButton>
      </Navbar>
      {memoizedData && (
        <DataGrid
          data={memoizedData.data}
          columns={columns}
          selection
          setSelected={setSelected}
          clickable
          onRowClick={(value: T) => navigate(`${value.id}`)}
        />
      )}
    </BasePage>
  );
};
