# Razorpay Integration Setup Guide

## Overview

This document provides instructions on how to set up Razorpay payment gateway integration for the Bolt Spices e-commerce website. The integration allows customers to make payments using various methods including credit/debit cards, UPI, netbanking, and wallets.

## Prerequisites

1. A Razorpay account (create one at [razorpay.com](https://razorpay.com) if you don't have one)
2. Access to Razorpay Dashboard
3. API keys from your Razorpay account

## Setup Instructions

### 1. Install Dependencies

The Razorpay package has been added to the project dependencies. Run the following command to install it:

```bash
npm install
```

### 2. Get Your API Keys

1. Log in to your Razorpay Dashboard
2. Navigate to Settings > API Keys
3. Generate a new API key pair if you don't have one already
4. Note down your Key ID and Key Secret

### 3. Add Your API Key to the Code

Open the file `src/pages/CheckoutPage.jsx` and locate the following code section:

```javascript
// Initialize Razorpay options
// You'll need to replace 'YOUR_RAZORPAY_KEY_ID' with your actual Razorpay key
const options = {
  key: "YOUR_RAZORPAY_KEY_ID", // Enter your Razorpay Key ID here
  amount: orderData.amount,
  currency: orderData.currency,
  // ... other options
};
```

Replace `"YOUR_RAZORPAY_KEY_ID"` with your actual Razorpay Key ID.

### 4. Backend Integration (Optional but Recommended)

For a production environment, it's recommended to create orders on your backend server for security reasons. This involves:

1. Setting up a server endpoint to create Razorpay orders
2. Modifying the frontend code to fetch the order ID from your backend
3. Using the fetched order ID in the Razorpay options

### 5. Testing the Integration

Razorpay provides test cards and other payment methods for testing:

- Test Card Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3-digit number
- Name: Any name
- 3D Secure Password: 1234

## Security Considerations

1. Never expose your Key Secret in the frontend code
2. For production, always verify payments on your backend
3. Implement proper error handling for failed payments

## Additional Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay API Reference](https://razorpay.com/docs/api/)
- [Razorpay Testing Guide](https://razorpay.com/docs/payments/payments/test-card-details/)

## Support

If you encounter any issues with the Razorpay integration, please contact:

- Razorpay Support: support@razorpay.com
- Your development team for application-specific issues