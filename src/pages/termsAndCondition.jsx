import { Helmet } from 'react-helmet-async';

import { TermsAndConditionComponent } from 'src/sections/termsAndCondition/view';

// ----------------------------------------------------------------------

export default function TermsAndCondition() {
  return (
    <>
      <Helmet>
        <title> T&C | Proglut </title>
      </Helmet>

      <TermsAndConditionComponent />
    </>
  );
}
