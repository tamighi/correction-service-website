import React from "react";

import { Button, DataGrid, DeleteIcon, IconButton, useDialog } from "lib";

import { useNavigate } from "react-router-dom";
import { Column } from "react-table";

import { ResourceString, ResourceType } from "types";
import {
  useDeleteMany,
  useGetCurrentQuery,
  useGetList,
} from "hooks";
import { ApiErrorImage, EmptyData, Loader, SelectedOptions } from "components";

const entryPerPage = 4;

//TODO: SelectedOptions only used in DataGrid
export interface MyDatagridProps<R extends ResourceString> {
  resource: R;
  columns: Column<ResourceType<R>>[];
}

export const MyDatagrid = <R extends ResourceString>({
  resource,
  columns,
}: MyDatagridProps<R>) => {
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<ResourceType<R>[]>([]);

  const query = useGetCurrentQuery();

  const { data, isLoading, isError } = useGetList<R>(resource, query);

  const { showDialog } = useDialog();

  const { mutate } = useDeleteMany(
    resource,
    {
      onSuccess: () =>
        showDialog?.({ content: `${selected.length} item(s) deleted` }),
    },
    query
  );

  const onDeleteClick = async () => {
    mutate({ ids: selected.map((value) => value.id) });
  };

  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.data || isError) {
    return <ApiErrorImage />;
  }

  if (data.count === 0) {
    return <EmptyData />;
  }

  return (
    <>
      <SelectedOptions selected={selected}>
        <IconButton onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </SelectedOptions>
      <DataGrid
        data={data.data}
        columns={columns}
        selection
        setSelected={setSelected}
        clickable
        onRowClick={(value: ResourceType<R>) => navigate(`${value.id}`)}
      />
      <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
        Previous
      </Button>
      <Button
        disabled={data.count < query.range[1]}
        onClick={() => setPage(page + 1)}
      >
        Next
      </Button>
    </>
  );
};
