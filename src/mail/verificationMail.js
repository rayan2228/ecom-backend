import { PORT } from "./../constant.js";
export function verificationMail(displayname, token) {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #111827;
      color: #fff;
      padding: 20px;
      text-align: center;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      color: #333;
    }
    .email-body p {
      margin: 16px 0;
    }
    .email-button {
      display: block;
      text-align: center;
      margin: 20px 0;
    }
    .email-button a {
      background-color: #374151;
      color: #fff;
      text-decoration: none;
      padding: 10px 20px;
      font-size: 18px;
      border-radius: 5px;
    }
    .email-footer {
      background-color: #f5f5f5;
      color: #777;
      text-align: center;
      padding: 10px;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      Verify Your Email
    </div>
    <div class="email-body">
      <p>Hi ${displayname},</p>
      <p>Thank you for signing up! Please click the button below to verify your email address:</p>
      <div class="email-button">
        <a href="http://localhost:${PORT}/api/v1/users/verify/${token}" target="_blank">Verify Email</a>
      </div>
      <p>If you didn’t sign up for this account, you can safely ignore this email.</p>
      <p>Thanks,<br>The mern2308 Team</p>
    </div>
    <div class="email-footer">
      © ${new Date().getFullYear()} mern2308. All rights reserved.
    </div>
  </div>
</body>
</html>
`
}