import { Helmet } from 'react-helmet-async';

import { BussinessDetailView } from 'src/sections/BussinessDetailView/view';
//-------------------------------------------------------

export default function ProfileViewPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Bussiness Detail View </title>
      </Helmet>

      <BussinessDetailView />
    </>
  );
}
