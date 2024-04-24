import { Helmet } from 'react-helmet-async';

import { BannerListView } from 'src/sections/BannerList/view';
//-------------------------------------------------------

export default function MasterCategoeryPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Master Banner </title>
      </Helmet>

      <BannerListView />
    </>
  );
}
