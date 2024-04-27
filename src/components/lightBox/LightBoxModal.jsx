// // import * as React from 'react';
// // import Box from '@mui/material/Box';
// // import Button from '@mui/material/Button';
// // import Typography from '@mui/material/Typography';
// // import Modal from '@mui/material/Modal';

// // export default function ImgModalLight({ open, handleClose, imgData }) {
// //   return (
// //     <div>
// //       <Modal
// //         open={open}
// //         onClose={() => {
// //           handleClose(false);
// //         }}
// //         aria-labelledby="modal-modal-title"
// //         aria-describedby="modal-modal-description"
// //       >
// //         <Box sx={style}>
// //           <Typography id="modal-modal-title" variant="h6" component="h2">
// //             Text in a modal
// //           </Typography>
// //           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
// //             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
// //           </Typography>
// //         </Box>
// //       </Modal>
// //     </div>
// //   );
// // }

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// export default function ImgModalLight({ open, handleClose, imgData }) {
//   return (
//     <>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Let Google help apps determine location. This means sending anonymous location data to
//             Google, even when no apps are running.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Disagree</Button>
//           <Button onClick={handleClose} autoFocus>
//             Agree
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }
