import { IContact } from '../../contact/contact.model';

const styles = {
  container: 'font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #e0e0e0; border: 1px solid #333; border-radius: 8px; overflow: hidden;',
  header: 'background: linear-gradient(90deg, #000000 0%, #1a1a1a 100%); padding: 30px; text-align: center; border-bottom: 2px solid #00f0ff;',
  headerText: 'color: #00f0ff; margin: 0; font-size: 24px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;',
  body: 'padding: 40px 30px; background-color: #111;',
  label: 'color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;',
  value: 'color: #fff; font-size: 16px; margin-bottom: 20px; line-height: 1.5;',
  messageBox: 'background-color: #1a1a1a; padding: 20px; border-left: 4px solid #00f0ff; border-radius: 4px; margin-top: 10px;',
  footer: 'background-color: #050505; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #222;',
  link: 'color: #00f0ff; text-decoration: none;',
  button: 'display: inline-block; padding: 12px 24px; background-color: #00f0ff; color: #000; text-decoration: none; font-weight: bold; border-radius: 4px; margin-top: 20px; transition: background-color 0.3s;',
};

export const getAdminNotificationTemplate = (contact: IContact): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Submission</title>
    </head>
    <body style="margin: 0; padding: 20px; background-color: #000;">
      <div style="${styles.container}">
        <div style="${styles.header}">
          <h1 style="${styles.headerText}">New Inquiry</h1>
        </div>
        <div style="${styles.body}">
          <p style="color: #ccc; margin-bottom: 30px;">You have received a new message from your portfolio contact form.</p>
          
          <div style="${styles.label}">Name</div>
          <div style="${styles.value}">${contact.name}</div>
          
          <div style="${styles.label}">Email</div>
          <div style="${styles.value}"><a href="mailto:${contact.email}" style="${styles.link}">${contact.email}</a></div>
          
          <div style="${styles.label}">Subject</div>
          <div style="${styles.value}">${contact.subject}</div>
          
          <div style="${styles.label}">Message</div>
          <div style="${styles.value}">
            <div style="${styles.messageBox}">
              ${contact.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
            <div style="${styles.label}">Source</div>
            <div style="${styles.value}">${contact.source || 'Direct Submission'}</div>
            <div style="${styles.label}">Submission Time</div>
            <div style="${styles.value}">${new Date().toLocaleString()}</div>
          </div>
        </div>
        <div style="${styles.footer}">
          &copy; ${new Date().getFullYear()} Portfolio Backend System<br>
          <span style="opacity: 0.5;">Automated Notification Service</span>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const getUserAutoReplyTemplate = (contact: IContact): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank You for Contacting</title>
    </head>
    <body style="margin: 0; padding: 20px; background-color: #000;">
      <div style="${styles.container}">
        <div style="${styles.header}">
          <h1 style="${styles.headerText}">Message Received</h1>
        </div>
        <div style="${styles.body}">
          <p style="color: #fff; font-size: 18px; margin-bottom: 20px;">Hello ${contact.name},</p>
          
          <p style="color: #ccc; line-height: 1.6; margin-bottom: 25px;">
            Thank you for reaching out! I have successfully received your message regarding <strong>"${contact.subject}"</strong>.
          </p>
          
          <p style="color: #ccc; line-height: 1.6; margin-bottom: 25px;">
            I appreciate you taking the time to write to me. I typically respond to inquiries within 24-48 hours. Please be patient while I review your message.
          </p>
          
          <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <p style="color: #888; font-size: 14px; margin: 0 0 10px 0;">A copy of your message:</p>
            <p style="font-style: italic; color: #bbb; margin: 0;">"${contact.message.length > 100 ? contact.message.substring(0, 100) + '...' : contact.message}"</p>
          </div>

          <div style="text-align: center; margin-top: 40px;">
             <!-- Optional: Add a link back to the portfolio site if URL is known -->
             <p style="color: #666; font-size: 14px;">In the meantime, feel free to browse my work.</p>
          </div>
        </div>
        <div style="${styles.footer}">
          &copy; ${new Date().getFullYear()} Harshal Honde. All rights reserved.<br>
          <span style="opacity: 0.5;">This is an automated response. Please do not reply to this email.</span>
        </div>
      </div>
    </body>
    </html>
  `;
};
