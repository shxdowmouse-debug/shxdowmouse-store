# Gmail App Password Setup Guide for shxdowmouse

To enable email sending for your shxdowmouse website (Support tickets and Newsletter), you need to configure a Gmail App Password. This allows your application to send emails securely through Google's SMTP servers.

## Step 1: Enable 2-Step Verification

1.  Go to your [Google Account](https://myaccount.google.com/).
2.  Select **Security** from the left navigation panel.
3.  Under "Signing in to Google," select **2-Step Verification**.
4.  Follow the on-screen steps to turn it on if it's not already enabled.

## Step 2: Generate an App Password

1.  Go back to the **Security** page.
2.  Under "How you sign in to Google," search for **App passwords**. You might need to search for it in the search bar at the top if it's not immediately visible.
3.  Sign in again if prompted.
4.  For "App name," enter "shxdowmouse Website" (or any name you recognize).
5.  Click **Create**.
6.  The system will generate a 16-character password (e.g., `xxxx xxxx xxxx xxxx`). **Copy this password.**

## Step 3: Configure Render Environment Variables

When you deploy your application to Render:

1.  Go to your service's dashboard on Render.
2.  Click on **Environment**.
3.  Add the following Environment Variables:

    *   **Key:** `GMAIL_USER`
        *   **Value:** Your full Gmail address (e.g., `yourname@gmail.com`)
    *   **Key:** `GMAIL_APP_PASSWORD`
        *   **Value:** The 16-character App Password you generated in Step 2 (spaces are optional, usually acceptable without).

    *   **Key:** `DATABASE_URL`
        *   **Value:** Your Internal Database URL from Render (if using Render Postgres).

    *   **Key:** `SESSION_SECRET`
        *   **Value:** A long random string.

4.  Click **Save Changes**.

## Testing

Once configured, your application will be able to:
- Send welcome emails when users sign up for the newsletter.
- Send confirmation emails when users submit a support ticket.
- Receive notifications (to the `GMAIL_USER` address) when a new support ticket is submitted.
