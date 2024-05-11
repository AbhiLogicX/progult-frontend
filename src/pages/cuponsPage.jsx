import { Helmet } from 'react-helmet-async';

import { CouponsView } from 'src/sections/cuponsView/view';
//-------------------------------------------------------

export default function CustomerListPage() {
  return (
    <>
      <Helmet>
        <title> Proglut | Cupons </title>
      </Helmet>

      <CouponsView />
    </>
  );
}
