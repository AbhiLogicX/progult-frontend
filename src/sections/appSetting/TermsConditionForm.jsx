import { useState } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

import { Box, Alert, Button } from '@mui/material';

import { patchReq } from 'src/api/api';

export default function TermsAndConditionForm({ AppData, handleReload }) {
  const [alert, setAlert] = useState(false);
  const [alertVisisble, setAlertVisible] = useState(false);
  const [errMessage, setErrorMessage] = useState('');
  const [tcData, setTCdata] = useState();

  const handleChange = (e) => {
    // console.log('edit', e);
    setTCdata(e);
  };

  //   console.log('tc', AppData);
  const onSubmit = async () => {
    const data = { termsConditions: tcData, Id: AppData?._id };
    await patchReq(`master/application-setting`, data).then((res) => {
      if (res.statusCode === 200) {
        // console.log(res);
        setAlert(true);
        setAlertVisible(true);
        setTimeout(() => {
          setAlert(false);
          setAlertVisible(false);
          handleReload(false);
        }, 1200);
      } else {
        setAlertVisible(true);
        setErrorMessage(res?.response?.data?.message);
        setTimeout(() => {
          setAlertVisible(false);
        }, 1000);
      }
    });
  };

  return (
    <Box>
      <Box mb={2}>
        {alert ? (
          <>
            {alertVisisble ? (
              <Alert variant="filled" severity="success">
                updated successfully
              </Alert>
            ) : null}
          </>
        ) : null}
        {alert ? null : (
          <>
            {alertVisisble ? (
              <Alert variant="filled" severity="error">
                {errMessage !== '' ? errMessage : ` not updated`}
              </Alert>
            ) : null}
          </>
        )}
      </Box>
      <Editor
        apiKey="vbxbmtc52bvwv44by915w7c4usey2snvtwai8a6pkwxtso8i"
        initialValue={AppData?.termsConditions}
        init={{
          initialValue: AppData?.termsConditions,
          height: 500,
          menubar: true,
          plugins: [
            'image',
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
            'anchor',
          ],
          toolbar:
            'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
        onEditorChange={handleChange}
      />
      <Box mt={2} textAlign="right">
        <Button variant="contained" onClick={onSubmit}>
          Save
        </Button>
      </Box>
    </Box>
  );
}

TermsAndConditionForm.propTypes = {
  AppData: PropTypes.object,
  handleReload: PropTypes.func,
};
