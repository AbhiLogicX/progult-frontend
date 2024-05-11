import { useState, useEffect, useContext } from 'react';

import { Box, Paper, Button } from '@mui/material';

import { getReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

import Iconify from 'src/components/iconify/iconify';
import CouponTableView from 'src/components/tableView/TableCupon';
import CouponDialogForm from 'src/components/dialogueForm/EditCuponDialog';

export default function CouponsView() {
  const [fetchedData, setFetchedData] = useState(false);
  const [couponsData, setCouponsData] = useState();
  const [openEditForm, setOpenEditForm] = useState(false);
  const { setTitle } = useContext(TitleContext);

  const handleOpenForm = () => {
    setOpenEditForm(true);
  };

  const handleCloseForm = () => {
    setOpenEditForm(false);
  };

  useEffect(() => {
    if (!fetchedData) {
      fetcheCouponData();
    }
    async function fetcheCouponData() {
      await getReq(`domain/coupon`).then((res) => {
        if (res.statusCode === 200) {
          // console.log(res);
          setCouponsData(res.data);
          setFetchedData(true);
        }
      });
    }
  });

  const cols = ['CouponCode', 'Title', 'Status', 'MinimumAmt', 'Discount', 'Duration'];
  const Actionbtn = ['Edit', 'Delete'];

  setTitle('Coupons');
  return (
    <Box mx={2} mt={1}>
      <Box mb={1} textAlign="right">
        <Button
          variant="contained"
          onClick={handleOpenForm}
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add Coupon
        </Button>

        <CouponDialogForm
          open={openEditForm}
          handleClose={handleCloseForm}
          fromCall="add"
          handleReload={setFetchedData}
        />
      </Box>

      <Box component={Paper}>
        {fetchedData ? (
          <CouponTableView
            tableData={couponsData}
            columns={cols}
            actionbtn={Actionbtn}
            handleReload={setFetchedData}
          />
        ) : null}
      </Box>
    </Box>
  );
}
