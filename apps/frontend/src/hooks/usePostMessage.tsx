import { postMessage } from "api";
import { MessageDto } from "components/pages/contactPage/message";
import { useMutation } from "react-query";

const usePostMessage = <T extends MessageDto>(
  resource: "question" | "devis" | "review"
) => {
  const { mutate, isLoading, isError, isSuccess } = useMutation(
    (question: Partial<T>) => postMessage(question, resource)
  );
  return { mutate, isError, isLoading, isSuccess };
};

export default usePostMessage;
