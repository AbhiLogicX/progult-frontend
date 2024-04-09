import { Helmet } from 'react-helmet-async';

import { AminitieListView } from 'src/sections/aminitiesListView/view';
//-------------------------------------------------------

export default function MasterAminitiesPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Master Aminites </title>
      </Helmet>

      <AminitieListView />
    </>
  );
}
