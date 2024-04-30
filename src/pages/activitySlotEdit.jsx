import { Helmet } from 'react-helmet-async';

import { ActivitySlotEdit } from 'src/sections/activitySlotEdit/view';
//-------------------------------------------------------

export default function AppSettingPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Edit Slots </title>
      </Helmet>

      <ActivitySlotEdit />
    </>
  );
}
