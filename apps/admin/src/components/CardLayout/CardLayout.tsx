import { Card } from "lib";
import { useNavigate } from "react-router-dom";

import { ResourceString, ResourceType } from "types";
import { useGetList } from "hooks";
import { ApiErrorImage, EmptyData, Loader } from "components";

import styles from "./CardLayout.css";

export type Row<T extends object> = {
  [K in keyof T]: {
    Header: string;
    accessor: K;
    Cell?: (data: T[K]) => JSX.Element;
  };
}[keyof T];

export interface CardLayoutProps<R extends ResourceString> {
  resource: R;
  rows: Row<ResourceType<R>>[];
}

export const CardLayout = <K extends ResourceString>({
  resource,
  rows,
}: CardLayoutProps<K>) => {
  //const params = useGetSearchParams();

  const { data, isLoading, isError } = useGetList<K>(resource, {});

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
    <div className={styles.CardGrid}>
      {data.data.map((value) => (
        <Card
          key={value.id}
          onClick={() => navigate(`${value.id}`)}
          className={styles.Card}
        >
          {rows.map((row, idx) => {
            return (
              <div key={idx}>
                <h5 className={styles.CardHeader}>{row.Header}</h5>
                <span className={styles.CardContent}>
                  {row.Cell ? (
                    row.Cell(value[row.accessor])
                  ) : (
                    <>{value[row.accessor]}</>
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