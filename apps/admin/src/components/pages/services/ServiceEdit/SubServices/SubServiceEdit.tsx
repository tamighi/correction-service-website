import { SubServiceDto } from "../../service";
import { SubServiceCreate } from "./SubServiceCreate";
import { SubServiceEditForm } from "./SubServiceEditForm";

export const SubServiceEdit = ({
  subServices = [],
  serviceId,
}: {
  subServices?: SubServiceDto[];
  serviceId: number;
}) => {
  return (
    <>
      <span>Sous-services</span>
      {subServices.map((subService) => (
        <SubServiceEditForm
          key={subService.id}
          subService={subService}
          serviceId={serviceId}
        />
      ))}
      <SubServiceCreate serviceId={serviceId} />
    </>
  );
};
