import { Helmet } from 'react-helmet-async';

import { SubscriptionView } from 'src/sections/subscriptions/view';
//-------------------------------------------------------

export default function VendorListPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Subscriptions </title>
      </Helmet>

      <SubscriptionView />
    </>
  );
}
