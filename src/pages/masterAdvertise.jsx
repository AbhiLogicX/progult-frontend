import { Helmet } from 'react-helmet-async';

import { AdvertiseList } from 'src/sections/advertiseList/view';
//-------------------------------------------------------

export default function MasterAdvertisePage() {
  return (
    <>
      <Helmet>
        <title> Progult | Master Advertise </title>
      </Helmet>

      <AdvertiseList />
    </>
  );
}
