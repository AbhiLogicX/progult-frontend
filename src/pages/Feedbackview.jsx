import { Helmet } from 'react-helmet-async';

import { FeedbackView } from 'src/sections/feedbacksection/view';

// ----------------------------------------------------------------------

export default function Feedbackpages() {
  return (
    <>
      <Helmet>
        <title> Login | Feedback </title>
      </Helmet>

      <FeedbackView />
    </>
  );
}
