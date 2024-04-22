import React from 'react';

import { Box, Link, List, ListItem, Container, Typography } from '@mui/material';

import { common, primary } from 'src/theme/palette';

export default function TermsAndConditions() {
  return (
    <>
      <Box sx={{ backgroundColor: primary.main, width: '100%', mb: 5, textAlign: 'center', py: 5 }}>
        <Typography variant="h2" color={common.white}>
          Terms & Condition
        </Typography>
        <Typography variant="h4" color={common.black}>
          Progult
        </Typography>
      </Box>

      <Container>
        <Typography variant="body1" mb={5}>
          {`Welcome to Progult Institute, our app is designed to help generate and track leads
        more efficiently while also streamlining sales process. We understand that privacy is
        important to you and that's why we have developed comprehensive terms and conditions to
        explain how we use, protect and collect your information. By accessing or using our Kunal
        Computer Institute app, you agree to be bound by the terms and conditions outlined below.`}
        </Typography>

        {/* Acceptance of Terms */}
        <Typography variant="h4" mb={1}>
          Acceptance of Terms
        </Typography>
        <Typography variant="body1" mb={5}>
          By using our Progult Institute app, you agree to be bound by these terms and conditions.
          If you do not agree to these terms and conditions, please do not use our app.
        </Typography>

        {/* User Obligations */}
        <Typography variant="h4" mb={1}>
          User Obligations
        </Typography>
        <Typography variant="body1" mb={1}>
          By using our Progult Institute app, you agree to the following:
        </Typography>
        <List>
          <ListItem>
            You will not use our app in any way that infringes on the rights of others, including
            their intellectual property rights.
          </ListItem>
          <ListItem>
            {`You will not use our app to transmit any content that is unlawful, harmful, threatening,
          abusive, harassing, defamatory, vulgar, obscene, libelous, invasive of another's privacy,
          hateful, or racially, ethnically or otherwise objectionable.`}
          </ListItem>
          <ListItem>
            You will not use our app to transmit any unsolicited or unauthorized advertising,
            promotional materials, junk mail, spam, chain letters, pyramid schemes, or any other
            form of solicitation.
          </ListItem>
          <ListItem>
            You will not use our app to impersonate any person or entity, or to falsely state or
            otherwise misrepresent your affiliation with a person or entity.
          </ListItem>
        </List>

        {/* Privacy */}
        <Typography variant="h4" mb={1}>
          Privacy
        </Typography>
        <Typography variant="body1" mb={5}>
          We understand that privacy is important to you. Please read our Privacy Policy to
          understand how we collect, use, and protect your information.
        </Typography>

        {/* Information We Collect */}
        <Typography variant="h5">Information We Collect</Typography>
        <Typography variant="body1" mb={1}>
          We collect certain personal and non-personal information when you use our Progult
          Institute app. This information may include:
        </Typography>
        <List>
          <ListItem>
            <span style={{ fontWeight: 'bold' }}>Personal information:</span> This includes your
            name, email address, phone number, location and other contact information.
          </ListItem>
          <ListItem>
            <span style={{ fontWeight: 'bold' }}>Usage information:</span> This includes information
            about how you use our app, including the pages you visit, the features you use, and the
            time you spend on our app.
          </ListItem>
          <ListItem>
            <span style={{ fontWeight: 'bold' }}>Device information:</span> This includes
            information about the device you use to access our app, such as your device type,
            operating system, and browser type.
          </ListItem>
        </List>

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

        {/* Sharing Your Information */}
        <Typography variant="h4" mb={1}>
          Sharing Your Information
        </Typography>
        <Typography variant="body1" mb={5}>
          {`We do not share your personal information with third parties, except as necessary to provide
        our Progult Institute app or as required by law. We may share non-personal
        information with third parties for the purpose of analyzing usage patterns and improving our
        app's features and functionality.`}
        </Typography>

        {/* Your Rights and Choices */}
        <Typography variant="h4" mb={1}>
          Your Rights and Choices
        </Typography>
        <Typography variant="body1" mb={5}>
          You have the right to access, correct, or delete your personal information at any time.
          You can do this by contacting us at{' '}
          <Link href="mailto:progult@gmail.com" underline="hover">
            progult@gmail.com
          </Link>
          . You also have the right to object to the processing of your personal information, and to
          withdraw your consent at any time.
        </Typography>

        {/* Children's Privacy */}
        <Typography variant="h4" mb={1}>{`Children's Privacy`}</Typography>
        <Typography variant="body1" mb={5}>
          Our Progult Institute app is not intended for use by children under the age of 13. We do
          not knowingly collect personal information from children under the age of 13. If you are a
          parent or guardian and believe that your child has provided us with personal information,
          please contact us immediately progult@gmail.com.
        </Typography>

        {/* Changes to This Privacy Policy */}
        <Typography variant="h4" mb={1}>
          Changes to This Privacy Policy :
        </Typography>
        <Typography variant="body1" mb={5}>
          We may update this Privacy Policy from time to time. Any changes will be effective
          immediately upon posting on our Progult Institute app. Your continued use of our app
          following any such modifications constitutes your acceptance of the new Privacy Policy.
        </Typography>

        {/* Proprietary Rights */}
        <Typography variant="h4" mb={1}>
          Proprietary Rights
        </Typography>
        <Typography variant="body1" mb={5}>
          Our Progult Institute app contains proprietary and confidential information that is
          protected by intellectual property laws. You acknowledge and agree that all content and
          materials available on our app, including but not limited to text, graphics, logos, button
          icons, images, audio clips, data compilations and software, are the property of Kunal
          Computer Institute or its licensors.
        </Typography>

        {/* Limitation of Liability */}
        <Typography variant="h4" mb={1}>
          Limitation of Liability
        </Typography>
        <Typography variant="body1" mb={5}>
          You acknowledge and agree that Progult Institute and its affiliates shall not be liable
          for any direct, indirect, incidental, special, consequential or exemplary damages,
          including but not limited to damages for loss of profits, goodwill, use, data or other
          intangible losses, resulting from the use or inability to use our Progult Institute app.
        </Typography>

        {/* Indemnification */}
        <Typography variant="h4" mb={1}>
          Indemnification
        </Typography>
        <Typography variant="body1" mb={5}>
          {`You agree to indemnify and hold Progult Institute and its affiliates, directors,
        officers, agents and employees harmless from any claim or demand, including reasonable
        attorneys' fees, made by any third party due to or arising out of your use of our Kunal
        Computer Institute app, your violation of these terms and conditions, or your violation of
        any rights of another.`}
        </Typography>

        {/* Termination */}
        <Typography variant="h4" mb={1}>
          Termination
        </Typography>
        <Typography variant="body1" mb={5}>
          We reserve the right to terminate your access to our Progult Institute app at any time,
          without notice, for any reason whatsoever.
        </Typography>

        {/* Governing Law */}
        <Typography variant="h4" mb={1}>
          Governing Law
        </Typography>
        <Typography variant="body1" mb={5}>
          These terms and conditions shall be governed by and construed in accordance with the laws
          of the jurisdiction in which Progults operates. Any disputes arising out of or related to
          these terms and conditions shall be subject to the exclusive jurisdiction of the courts in
          that jurisdiction. By accepting this Privacy Policy, you acknowledge that you have read,
          understood, and agreed to the terms and conditions outlined above. If you have any
          questions or concerns about our Progults app or this Privacy Policy, please contact us at
          progult@gmail.com .
        </Typography>
      </Container>
    </>
  );
}
