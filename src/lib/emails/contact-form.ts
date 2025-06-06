interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

export function generateContactFormEmail({
  name,
  email,
  message,
}: ContactFormEmailProps): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Contact Form Submission</h2>
      
      <div style="margin: 20px 0;">
        <p style="font-size: 16px;"><strong>From:</strong> ${name}</p>
        <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
      </div>

      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
        <h3 style="color: #2c3e50; margin-top: 0;">Message:</h3>
        <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
      </div>

      <div style="color: #666; font-size: 14px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
        <p>Received: ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}</p>
      </div>
    </div>
  `;
}
