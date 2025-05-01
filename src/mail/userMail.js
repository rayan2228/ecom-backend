const passwordChangeMail = (displayname) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Change Notification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        color: #333333;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .email-header {
        background-color: #4caf50;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .email-body {
        padding: 20px;
      }
      .email-body h2 {
        margin-top: 0;
        color: #4caf50;
      }
      .email-footer {
        background-color: #f9f9f9;
        padding: 20px;
        text-align: center;
        font-size: 12px;
        color: #888888;
      }
      .btn {
        display: inline-block;
        padding: 10px 20px;
        color: #ffffff;
        background-color: #4caf50;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
        font-size: 16px;
      }
      .btn:hover {
        background-color: #45a049;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1>Password Change Confirmation</h1>
      </div>
      <div class="email-body">
        <h2>Hello ${displayname},</h2>
        <p>Your password was successfully changed. If this was not you, please take immediate action to secure your account.</p>
        <p>If you have any concerns or questions, click the button below to contact our support team:</p>
        <a href="#" class="btn">Contact Support</a>
        <p style="margin-top: 20px;">If you recognize this activity, you can safely ignore this email.</p>
      </div>
      <div class="email-footer">
        <p>&copy; 2024 Your Company Name. All rights reserved. ${new Date().getFullYear()}</p>
        <p>This is an automated email. Please do not reply to this message.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

export { passwordChangeMail };  