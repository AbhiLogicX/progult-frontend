import { Helmet } from 'react-helmet-async';

import { ContactUsView } from 'src/sections/contactUs/view';

// ----------------------------------------------------------------------

export default function ContactUsPage() {
  return (
    <>
      <Helmet>
        <title> ContactUs | Proglut </title>
      </Helmet>

      <ContactUsView />
    </>
  );
}
