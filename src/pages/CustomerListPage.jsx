import { Helmet } from 'react-helmet-async';

import { CustomerListView } from 'src/sections/customerList';
//-------------------------------------------------------

export default function CustomerListPage() {
  return (
    <>
      <Helmet>
        <title> Proglut | Customer List </title>
      </Helmet>

      <CustomerListView />
    </>
  );
}
