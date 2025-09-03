import * as nodemailer from 'nodemailer';


async function sendEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: 'jeena.manuel@interfacesys.com',
        pass: 'Interface6',
      },
    });

    const mailOptions = {
      from: 'jeena.manuel@interfacesys.com',
      to: 'jmanuel@suyati.com',
      subject: 'Automation Test Report',
      text: 'Please find attached the test report.',
      attachments: [
        {
          filename: 'cucumber-report.html',
          path: '/API_UI_POC/test-results/cucumber-report.html',
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error occurred while sending email:', error);
  }
}

sendEmail().catch(console.error);
