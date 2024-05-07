import { Helmet } from 'react-helmet-async';

import { AdvertiseList } from 'src/sections/advertiseList/view';
//-------------------------------------------------------

export default function MasterCategoeryPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Master Advertise </title>
      </Helmet>

      <AdvertiseList />
    </>
  );
}
