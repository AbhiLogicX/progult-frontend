import { Helmet } from 'react-helmet-async';

import { UnitListView } from 'src/sections/unitListView/view';
//-------------------------------------------------------

export default function MasterUnitPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Master Unit </title>
      </Helmet>

      <UnitListView />
    </>
  );
}
