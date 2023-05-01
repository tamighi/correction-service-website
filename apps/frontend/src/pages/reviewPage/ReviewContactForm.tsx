import { ApiErrorForm } from "components/errors/ApiErrorForm";
import { Loader } from "components/utils/Loader/Loader";
import Rating from "components/utils/Rating/Rating";
import { usePostMessage } from "hooks";
import { Button, Input, TextArea, useForm } from "lib";
import { ReviewDto } from "types";
import { FormContent } from "../core/FormContent";

const ReviewContactForm = () => {
  const { register, handleSubmit, reset } = useForm<ReviewDto>();
  const { mutate, isLoading, isError, isSuccess } =
    usePostMessage<ReviewDto>("review");

  const onSubmit = (review: Partial<ReviewDto>) => {
    mutate(review, { onSuccess: reset });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContent>
        <Input required flex {...register("name")} label="Nom" />
        <Input required flex {...register("email")} label="Email" />
        <Rating required {...register("note")} />

        <TextArea
          required
          flex
          rows={13}
          {...register("message")}
          label="Message"
        />

        <div style={{ gap: "7px", display: "flex", alignItems: "flex-start" }}>
          <Button type="submit" variant="contained" disabled={isLoading}>
            Envoyer
          </Button>
          {isLoading && <Loader size="small" />}
          {isError && <ApiErrorForm />}
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
export default ReviewContactForm;