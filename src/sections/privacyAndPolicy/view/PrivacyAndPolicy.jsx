import React from 'react';

import { Box, List, ListItem, Container, Typography } from '@mui/material';

import { common, primary } from 'src/theme/palette';

export default function PrivacyAndPolicyComponent() {
  return (
    <>
      <Box sx={{ backgroundColor: primary.main, width: '100%', mb: 5, textAlign: 'center', py: 5 }}>
        <Typography variant="h2" color={common.white}>
          Privacy Policy
        </Typography>
        <Typography variant="h4" color={common.black}>
          Progult
        </Typography>
      </Box>

      <Container>
        <Typography variant="body1" mb={5}>
          This Privacy Policy governs the collection, use, and disclosure of personal information by
          Kunal Computer Institute. By using the App, you consent to the collection and use of your
          personal information as outlined in this Privacy Policy.
        </Typography>

        {/* Personal Information */}
        <Typography variant="h4" mb={1}>
          Personal Information
        </Typography>
        <Typography variant="body1" mb={5}>
          Personal information refers to any information that can be used to identify you, such as
          your name, email address, phone number, and employee ID number. We may collect personal
          information when you sign up for our app, fill out a form, or contact us for support. We
          may use your personal information to communicate with you, to provide you with support and
          to customise our services to better meet your needs.
        </Typography>

        {/* Non-Personal Information */}
        <Typography variant="h4" mb={1}>
          Non-Personal Information
        </Typography>
        <Typography variant="body1" mb={5}>
          We may collect non-personal information such as your IP address, device type, operating
          system, browser type, and location data. This information is collected automatically when
          you use our app and is used to improve our services and to provide analytics.
        </Typography>

        {/* Use of Information */}
        <Typography variant="h4" mb={1}>
          Use of Information
        </Typography>
        <Typography variant="body1" mb={5}>
          {`The personal information collected is used to provide the App's services, including
          tracking work hours, lead generation, and location tracking. The information may also be
          used to improve the App's functionality and user experience.`}
        </Typography>

        {/* How We Use Your Information */}
        <Typography variant="h4" mb={1}>
          How We Use Your Information
        </Typography>
        <Typography variant="body1" mb={1}>
          We may use your information for the following purposes:
        </Typography>
        <List>
          <ListItem>
            <span style={{ fontWeight: 'bold' }}>
              To provide and improve our Progult Institute app:
            </span>{' '}
            {`We use your information to provide you with a better experience when using our app, and to
          improve our app's features and functionality.`}
          </ListItem>
          <ListItem>
            <span style={{ fontWeight: 'bold' }}>To communicate with you:</span> We may use your
            information to send you updates about our Progult Institute app, as well as to respond
            to your inquiries and requests.
          </ListItem>
          <ListItem>
            <span style={{ fontWeight: 'bold' }}>
              To provide and improve our Progult Institute app:
            </span>{' '}
            {`We use your information to provide you with a better experience when using our app, and to
          improve our app's features and functionality.`}
          </ListItem>
          <ListItem>
            <span style={{ fontWeight: 'bold' }}>How We Protect Your Information:</span> We take
            reasonable measures to protect your personal information from unauthorized access, use,
            or disclosure. We use industry-standard security measures to safeguard your information,
            including secure servers and data encryption.
          </ListItem>
        </List>

        {/* Location Data */}
        <Typography variant="h4" mb={1}>
          Location Data
        </Typography>
        <Typography variant="body1" mb={5}>
          Our app may collect location data to enable the tracking of employee location for the
          purposes of ensuring that they are at their place of work, to provide geofencing features,
          and to enable location-based features. We will only collect location data with your
          explicit consent and you can withdraw your consent at any time.
        </Typography>

        {/* Call Logs */}
        <Typography variant="h4" mb={1}>
          Call Logs
        </Typography>
        <Typography variant="body1" mb={5}>
          Our app may collect call logs from your device to enable us to track employee
          communications and to ensure that employees are meeting their work requirements. We will
          only collect call logs with your explicit consent and you can withdraw your consent at any
          time.
        </Typography>

        {/* Data Sharing and Disclosure */}
        <Typography variant="h4" mb={1}>
          Data Sharing and Disclosure
        </Typography>
        <Typography variant="body1" mb={1}>
          We do not share your personal information with third parties except in the following
          cases:
        </Typography>
        <List>
          <ListItem>
            We may share personal information with our service providers and contractors who need
            access to the information to perform their services for us. We ensure that these
            providers comply with our privacy policy and that they are committed to protecting your
            personal information.
          </ListItem>
          <ListItem>
            We may disclose your personal information if required by law, or to protect our rights,
            property or safety or the rights, property or safety of others.
          </ListItem>
          <ListItem>
            We may disclose your personal information if we believe it is necessary to investigate,
            prevent, or take action regarding illegal activities, suspected fraud, or situations
            involving potential threats to the physical safety of any person.
          </ListItem>
        </List>

        {/* Security */}
        <Typography variant="h4" mb={1}>
          Security
        </Typography>
        <Typography variant="body1" mb={5}>
          We take appropriate measures to protect the security of your personal information. We use
          industry-standard encryption technologies to protect your data during transmission and
          storage. We also maintain physical, electronic, and procedural safeguards to ensure that
          your personal information is secure.
        </Typography>

        {/* Your Rights */}
        <Typography variant="h4" mb={1}>
          Your Rights
        </Typography>
        <Typography variant="body1" mb={5}>
          You have the right to access, update or delete your personal information that we hold. If
          you wish to exercise these rights, please contact us at the email address provided below.
        </Typography>

        {/* Proprietary Rights */}
        <Typography variant="h4" mb={1}>
          Changes to this Privacy Policy
        </Typography>
        <Typography variant="body1" mb={5}>
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on our website or through the app. You are advised to
          review this Privacy Policy periodically for any changes.
        </Typography>

        {/* Contact Us */}
        <Typography variant="h4" mb={1}>
          Contact Us
        </Typography>
        <Typography variant="body1" mb={5}>
          If you have any questions about this Privacy Policy or the use of your personal
          information, please contact us at [insert email address here].
        </Typography>

        {/* Conclusion */}
        <Typography variant="h4" mb={1}>
          Conclusion
        </Typography>
        <Typography variant="body1" mb={5}>
          We take your privacy seriously and are committed to protecting your personal information.
          By using our app, you agree to the terms of this Privacy Policy. If you have any questions
          or concerns, please do not hesitate to contact us at kunalcomputers@gmail.com
        </Typography>
      </Container>
    </>
  );
}
