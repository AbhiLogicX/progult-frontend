import { Helmet } from 'react-helmet-async';

import { AdminProfileEdit } from 'src/sections/adminProfile/view';
//-------------------------------------------------------

export default function AdminProfilePage() {
  return (
    <>
      <Helmet>
        <title> Progult | Profile </title>
      </Helmet>

      <AdminProfileEdit />
    </>
  );
}
