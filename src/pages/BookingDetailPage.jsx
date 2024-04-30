import { Helmet } from 'react-helmet-async';

import { BookingDetailsView } from 'src/sections/bookingDetails/view';
//-------------------------------------------------------

export default function AppSettingPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Booking Details</title>
      </Helmet>

      <BookingDetailsView />
    </>
  );
}
