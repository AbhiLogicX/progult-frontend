import * as React from 'react';
import PropTypes from 'prop-types';
import { AxiosError } from 'axios';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import Dialog from '@mui/material/Dialog';
import { grey } from '@mui/material/colors';
import TabContext from '@mui/lab/TabContext';
import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { error } from 'src/theme/palette';
import { getReq, deleteReq } from 'src/api/api';

import BussActivityTimeForm from './AddEditSlotDialog';

export default function LabTabs({ bussActivityId, fetchedSlotData, setFetchedSlotData }) {
  // const [fetchedSlotData, setFetchedSlotData] = React.useState(false);
  // const [fetchedData, setFetchedData] = React.useState(false);
  const [value, setValue] = React.useState('Mon');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFetchedSlotData(false);
  };
  // console.log(bussActivityId);
  // React.useEffect(() => {
  //   if (!fetchedData) {
  //     fetchActivitySlot();
  //   }
  //   async function fetchActivitySlot() {
  //     await getReq(`bussinessActivity/slots?bussActivityId=${bussActivityId}`).then((res) => {
  //       if (res.statusCode === 200) {
  //         console.log(res);
  //       }
  //     });
  //   }
  // });
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TabContext value={value}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            sx={{
              bgcolor: grey[200],
              width: '98%',
              display: 'flex',
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          >
            <Tab value="Mon" label="Monday" />
            <Tab value="Tue" label="Tuesday" />
            <Tab value="Wed" label="Wednesday" />
            <Tab value="Thu" label="Thursday" />
            <Tab value="Fri" label="Friday" />
            <Tab value="Sat" label="Saturday" />
            <Tab value="Sun" label="Sunday" />
          </Tabs>
        </Box>

        <Box sx={{ width: '100%' }}>
          <TabPanel value="Mon">
            <Box display="flex" flexWrap="wrap">
              <RenderCard
                day="Mon"
                Id={bussActivityId}
                fetchedData={fetchedSlotData}
                setFetchedData={setFetchedSlotData}
              />
            </Box>
          </TabPanel>
          <TabPanel value="Tue">
            <Box display="flex" flexWrap="wrap">
              <RenderCard
                day="Tue"
                Id={bussActivityId}
                fetchedData={fetchedSlotData}
                setFetchedData={setFetchedSlotData}
              />
            </Box>
          </TabPanel>
          <TabPanel value="Wed">
            <Box display="flex" flexWrap="wrap">
              <RenderCard
                day="Wed"
                Id={bussActivityId}
                fetchedData={fetchedSlotData}
                setFetchedData={setFetchedSlotData}
              />
            </Box>
          </TabPanel>
          <TabPanel value="Thu">
            <Box display="flex" flexWrap="wrap">
              <RenderCard
                day="Thu"
                Id={bussActivityId}
                fetchedData={fetchedSlotData}
                setFetchedData={setFetchedSlotData}
              />
            </Box>
          </TabPanel>
          <TabPanel value="Fri">
            <Box display="flex" flexWrap="wrap">
              <RenderCard
                day="Fri"
                Id={bussActivityId}
                fetchedData={fetchedSlotData}
                setFetchedData={setFetchedSlotData}
              />
            </Box>
          </TabPanel>
          <TabPanel value="Sat">
            <Box display="flex" flexWrap="wrap">
              <RenderCard
                day="Sat"
                Id={bussActivityId}
                fetchedData={fetchedSlotData}
                setFetchedData={setFetchedSlotData}
              />
            </Box>
          </TabPanel>
          <TabPanel value="Sun">
            <Box display="flex" flexWrap="wrap">
              <RenderCard
                day="Sun"
                Id={bussActivityId}
                fetchedData={fetchedSlotData}
                setFetchedData={setFetchedSlotData}
              />
            </Box>
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}

function RenderCard({ Id, day, fetchedData, setFetchedData }) {
  const [emptyList, setEmptyList] = React.useState(false);
  const [data, setData] = React.useState();
  React.useEffect(() => {
    if (!fetchedData) {
      fetchActivitySlot();
    }
    async function fetchActivitySlot() {
      await getReq(`bussinessActivity/slots?bussActivityId=${Id}&day=${day}`).then((res) => {
        if (res.code === AxiosError.ERR_BAD_REQUEST) {
          if (res.response.data.statusCode === 404) {
            setData([]);
            setEmptyList(true);
            setFetchedData(true);
          }
        }
        if (res.statusCode === 200) {
          setData(res.data);
          setFetchedData(true);
          setEmptyList(false);
        }
      });
    }
  }, [fetchedData, Id, day, setFetchedData]);

  // const handleDelete = () => {
  //   console.log('delete');
  // };

  // console.log('data', data);
  return (
    <>
      {!emptyList ? (
        data?.map((itm) => (
          <Box bgcolor="white" p={2} borderRadius={2} mr={2} mb={2}>
            <Box display="flex" alignItems="flex-end">
              <Typography variant="h4">{`₹${itm.rate}`}</Typography>
              <Typography variant="h6">/ head</Typography>
            </Box>
            <Typography variant="subtitle1" mb={1}>
              {`${itm.startTime} to ${itm.endTime}`}
            </Typography>
            <Box>
              <DeleteDialog slotId={itm._id} handleReload={setFetchedData} />

              {/* <Button>
                <EditIcon /> Edit
              </Button> */}
              <BussActivityTimeForm fromCall="edit" timeData={itm} handleReload={setFetchedData} />
            </Box>
          </Box>
        ))
      ) : (
        <Typography variant="h4">There are no slots </Typography>
      )}
    </>
  );
}

function DeleteDialog({ slotId, handleReload }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteReq(`bussinessActivity/slots?Id=${slotId}&status=delete`).then((res) => {
      if (res.statusCode === 200) {
        handleReload(false);
      }
    });

    // domain/coupon?Id=663b69d2673fd6e8367b4096&status=delete
  };

  return (
    <>
      <Button
        sx={{
          color: error.main,
          backgroundColor: error.errorBackground,
          mr: 1,
          '&:hover': {
            backgroundColor: error.main,
            color: error.errorBackground,
          },
        }}
        onClick={handleClickOpen}
      >
        <DeleteIcon />
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          Are you sure want to delete this slot ? It would may affect on the days on which this slot
          is applied ?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: error.main,
              backgroundColor: error.errorBackground,
              '&:hover': {
                backgroundColor: error.main,
                color: error.errorBackground,
              },
            }}
          >
            Disagree
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

LabTabs.propTypes = {
  bussActivityId: PropTypes.string,
  fetchedSlotData: PropTypes.bool,
  setFetchedSlotData: PropTypes.func,
};

RenderCard.propTypes = {
  Id: PropTypes.string,
  day: PropTypes.string,
  setFetchedData: PropTypes.func,
  fetchedData: PropTypes.bool,
};

DeleteDialog.propTypes = {
  slotId: PropTypes.string,
  handleReload: PropTypes.func,
};
