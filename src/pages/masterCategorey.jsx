import { Helmet } from 'react-helmet-async';

import { CategoeryListView } from 'src/sections/categoeryList/view';
//-------------------------------------------------------

export default function MasterCategoeryPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Master Categoery </title>
      </Helmet>

      <CategoeryListView />
    </>
  );
}
