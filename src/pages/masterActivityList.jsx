import { Helmet } from 'react-helmet-async';

import { ActiviyListView } from 'src/sections/activityList/view';
//-------------------------------------------------------

export default function MasterCategoeryPage() {
  return (
    <>
      <Helmet>
        <title> Master Activiy | Minimal UI </title>
      </Helmet>

      <ActiviyListView />
    </>
  );
}
