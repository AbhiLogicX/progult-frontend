import { Helmet } from 'react-helmet-async';

import { Notification } from 'src/sections/notification/view';
//-------------------------------------------------------

export default function BookingsPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Notification </title>
      </Helmet>

      <Notification />
    </>
  );
}
