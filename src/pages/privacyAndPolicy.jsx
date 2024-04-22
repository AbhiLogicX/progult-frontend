import { Helmet } from 'react-helmet-async';

import { PrivacyAndPolicyComponent } from 'src/sections/privacyAndPolicy/view';

// ----------------------------------------------------------------------

export default function PrivacyAndPolicy() {
  return (
    <>
      <Helmet>
        <title> Privacy&Policy| Proglut </title>
      </Helmet>

      <PrivacyAndPolicyComponent />
    </>
  );
}
