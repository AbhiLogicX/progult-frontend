import { Helmet } from 'react-helmet-async';

import { AppSettingView } from 'src/sections/appSetting/view';
//-------------------------------------------------------

export default function AppSettingPage() {
  return (
    <>
      <Helmet>
        <title> Progult | App Settings </title>
      </Helmet>

      <AppSettingView />
    </>
  );
}
