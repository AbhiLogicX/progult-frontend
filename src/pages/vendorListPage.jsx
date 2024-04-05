import { Helmet } from 'react-helmet-async';

import { VendorListView } from 'src/sections/vendorList/view';
//-------------------------------------------------------

export default function VendorListPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Vendor List </title>
      </Helmet>

      <VendorListView />
    </>
  );
}
