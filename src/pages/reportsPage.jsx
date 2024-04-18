import { Helmet } from 'react-helmet-async';

import { ReportsView } from 'src/sections/reportsView/view';
//-------------------------------------------------------

export default function VendorListPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Reports </title>
      </Helmet>

      <ReportsView />
    </>
  );
}
