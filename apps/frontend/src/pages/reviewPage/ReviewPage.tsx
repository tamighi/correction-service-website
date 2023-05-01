import { CenteredPage } from "components/generics/basePage/CenteredPage";

import ReviewContactForm from "./ReviewContactForm";

const ReviewPage = () => {
  return (
    <CenteredPage>
      <h2>Laissez moi un avis !</h2>
      <ReviewContactForm />
    </CenteredPage>
  );
};

export default ReviewPage;