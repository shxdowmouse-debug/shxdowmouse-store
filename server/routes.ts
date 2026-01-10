function waitlistTemplate() {
  return `
  <html>
    <head>
      <meta name="color-scheme" content="dark light">
      <meta name="supported-color-schemes" content="dark light">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&display=swap');

        body {
          margin: 0;
          padding: 0;
          background: #000;
          color: #fff;
          font-family: 'Space Grotesk', sans-serif;
        }

        .container {
          max-width: 480px;
          margin: 0 auto;
          padding: 40px 24px;
          background: #0a0a0a;
          border-radius: 12px;
        }

        .logo {
          width: 48px;
          margin-bottom: 24px;
        }

        h1 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        p {
          font-size: 16px;
          line-height: 1.6;
          opacity: 0.9;
        }

        .footer {
          margin-top: 40px;
          font-size: 12px;
          opacity: 0.5;
          text-align: center;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <img class="logo" src="https://shxdowmouse.onrender.com/logo.png" alt="SHXDOWMOUSE">

        <h1>You're on the list.</h1>

        <p>
          Thanks for signing up for <strong>SHXDOWMOUSE</strong>.  
          You’ll be the first to know when we launch.
        </p>

        <p class="footer">
          © 2026 SHXDOWMOUSE. All rights reserved.
        </p>
      </div>
    </body>
  </html>
  `;
}

app.post("/waitlist.notify", async (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "Email is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    await sendEmail(
      email,
      "You're on the list – SHXDOWMOUSE",
      waitlistTemplate()
    );

    res.json({ success: true, message: "Confirmation email sent successfully" });
  } catch (error) {
    console.error("Waitlist error:", error);
    res.status(500).json({ message: "Failed to send confirmation email" });
  }
});
