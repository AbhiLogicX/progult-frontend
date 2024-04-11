import { Helmet } from 'react-helmet-async';

import { EventListView } from 'src/sections/eventListView/view';
//-------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Event List </title>
      </Helmet>

      <EventListView />
    </>
  );
}
