import { Helmet } from 'react-helmet-async';

import { BussinessListView } from 'src/sections/bussinessList/view';
//-------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> BussinessList | Minimal UI </title>
      </Helmet>

      <BussinessListView />
    </>
  );
}
