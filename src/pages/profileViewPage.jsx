import { Helmet } from 'react-helmet-async';

import { ProfileView } from 'src/sections/profileView/view';
//-------------------------------------------------------

export default function ProfileViewPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Profileview </title>
      </Helmet>

      <ProfileView />
    </>
  );
}
