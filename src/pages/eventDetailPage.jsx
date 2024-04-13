import { Helmet } from 'react-helmet-async';

import { EventDetailView } from 'src/sections/eventDetailView/view';
//-------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Progult | Event Detail View </title>
      </Helmet>

      <EventDetailView />
    </>
  );
}
