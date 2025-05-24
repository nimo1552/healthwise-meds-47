
// utils/emailService.ts
// This is a MOCK email service. It simulates sending emails by logging to the console.
// In a real-world application, this module would integrate with a backend email service
// (e.g., SendGrid, Mailgun, AWS SES) or an SMTP server to dispatch actual emails.
// The current implementation is for frontend demonstration and development purposes ONLY.

export interface EmailDetails {
  to: string;
  subject: string;
  body: string;
}

/**
 * Simulates sending an email.
 * @param details - The email details (to, subject, body).
 * @returns A promise that resolves to true after a simulated delay.
 */
export const sendEmail = (details: EmailDetails): Promise<boolean> => {
  return new Promise((resolve) => {
    // Simulate API call delay to mimic real-world network latency.
    setTimeout(() => {
      console.log('Mock Email Service: Email sent:', details);
      // In a real service, this would return success/failure based on the API response.
      resolve(true);
    }, 800);
  });
};

/**
 * Simulates sending an order confirmation email.
 * Constructs an HTML email body with order details and uses the mock sendEmail function.
 * @param email - The recipient's email address.
 * @param orderDetails - The details of the order to include in the email.
 * @returns A promise that resolves to true if the email was "sent" successfully.
 */
export const sendOrderConfirmationEmail = async (
  email: string,
  orderDetails: {
    orderId: string;
    date: string;
    total: number;
    items: Array<{ name: string; quantity: number; price: number }>;
    estimatedDelivery: string;
  }
): Promise<boolean> => {
  const subject = `Your Nimocare Order #${orderDetails.orderId} has been confirmed`;
  
  // Create email body with HTML formatting
  const itemsList = orderDetails.items
    .map(item => `<li>${item.name} (${item.quantity}x) - $${item.price.toFixed(2)}</li>`)
    .join('');
  
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4CAF50;">Your Order is Confirmed!</h2>
      <p>Dear Customer,</p>
      <p>Thank you for your order. We're getting it ready to be shipped. We will notify you when it has been sent.</p>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Order Summary</h3>
        <p><strong>Order Number:</strong> ${orderDetails.orderId}</p>
        <p><strong>Order Date:</strong> ${orderDetails.date}</p>
        <p><strong>Estimated Delivery Date:</strong> ${orderDetails.estimatedDelivery}</p>
      </div>
      
      <h3>Items in Your Order</h3>
      <ul style="padding-left: 20px;">
        ${itemsList}
      </ul>
      
      <p><strong>Order Total:</strong> $${orderDetails.total.toFixed(2)}</p>
      
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      
      <p>If you have any questions, contact our customer service at <a href="mailto:support@nimocare.com">support@nimocare.com</a></p>
      
      <p style="color: #666; font-size: 12px;">This email was sent from Nimocare, your trusted health partner.</p>
    </div>
  `;
  
  return sendEmail({ to: email, subject, body });
};
