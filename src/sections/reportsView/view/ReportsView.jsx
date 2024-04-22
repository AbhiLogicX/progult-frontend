import { useContext } from 'react';

import { Container } from '@mui/material';

import { TitleContext } from 'src/context/mainContext';

export default function ReportsView() {
  const { setTitle } = useContext(TitleContext);

  setTitle('Reports');
  return <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }} />;
}
