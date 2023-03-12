import { useGetOne } from "hooks/useData";
import { useParams } from "react-router-dom";

import { isService } from "..";
import { FormContent, MainCard, SecondaryCard } from "../../core";
import { ServiceEditForm } from "./ServiceEditForm";
import { ServiceEditHeader } from "./ServiceEditHeader";
import { SubServiceEdit } from "./SubServices";

export const ServiceEdit = () => {
  const { id = "1" } = useParams();

  const { data, isLoading } = useGetOne("service", { id });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !isService(data.data)) {
    return <div>Unkown error...</div>;
  }

  return (
    <MainCard>
      <ServiceEditHeader serviceDto={data.data} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <SecondaryCard>
          <ServiceEditForm data={data.data} />
        </SecondaryCard>
        <SecondaryCard>
          <FormContent>
            <SubServiceEdit
              serviceId={data.data.id}
              subServices={data.data.subServices}
            />
          </FormContent>
        </SecondaryCard>
      </div>
    </MainCard>
  );
};
