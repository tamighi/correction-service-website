import { useGetList } from "hooks/useData";
import { Card } from "lib";
import { useNavigate } from "react-router-dom";

import styles from "./CardLayout.css";

export type Row<T extends object> = {
  [K in keyof T]: {
    Header: string;
    accessor: K;
    Cell?: (data: T[K]) => JSX.Element;
  };
}[keyof T];

export interface CardLayoutProps<T extends { id: string | number }> {
  ressource: string;
  rows: Row<T>[];
  isTArray: (obj: object) => obj is T[];
}

const entryPerPage = 20;

export const CardLayout = <T extends { id: string | number }>({
  ressource,
  rows,
  isTArray,
}: CardLayoutProps<T>) => {
  const { data, isLoading, isError, error } = useGetList(ressource, {
    sort: { field: "id", order: "DESC" },
    pagination: { page: 1, perPage: entryPerPage },
    filter: {},
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Fetching ...</div>;
  }

  if (!data?.data || isError || !isTArray(data.data)) {
    return <div>Error !</div>;
  }

  if (data.count === 0) {
    return <div>No data found ... </div>;
  }

  return (
    <div className={styles.CardGrid}>
      {data.data.map((item: T) => (
        <Card
          key={item.id}
          onClick={() => navigate(`${item.id}`)}
          className={styles.Card}
        >
          {rows.map((row, idx) => {
            return (
              <div key={idx}>
                <h5 className={styles.CardHeader}>{row.Header}</h5>
                <span className={styles.CardContent}>
                  {row.Cell ? (
                    row.Cell(item[row.accessor])
                  ) : (
                    <>{item[row.accessor]}</>
                  )}
                </span>
              </div>
            );
          })}
        </Card>
      ))}
    </div>
  );
};