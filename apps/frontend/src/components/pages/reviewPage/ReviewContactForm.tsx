import { Loader } from "components/utils/Loader";
import { usePostMessage } from "hooks/usePostMessage";
import { Button, Input, TextArea, useForm } from "lib";
import { FormContent } from "../core/FormContent";
import { ReviewDto } from "./review";

export const ReviewContactForm = () => {
  const { register, handleSubmit, reset } = useForm<ReviewDto>();
  const { mutate, isLoading, isError, isSuccess } =
    usePostMessage<ReviewDto>("review");

  const onSubmit = (devis: Partial<ReviewDto>) => {
    mutate(devis, { onSuccess: reset });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContent>
        <Input flex {...register("name")} placeholder="Nom" />
        <Input flex {...register("email")} placeholder="Email" />
        <TextArea
          flex
          rows={12}
          {...register("message")}
          placeholder="Message"
        />
        <div style={{ gap: "6px", display: "flex", alignItems: "flex-start" }}>
          <Button type="submit" variant="contained" disabled={isLoading}>
            Envoyer
          </Button>
          {isLoading && <Loader size="small" />}
          {isError && <div>Une erreur est survenue ...</div>}
        </div>
        {isSuccess && (
          <p>
            Votre message a bien été envoyé ! Je reviendrai vers vous dès que
            possible.
          </p>
        )}
      </FormContent>
    </form>
  );
};
