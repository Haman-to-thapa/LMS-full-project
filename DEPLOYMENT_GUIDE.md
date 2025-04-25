# Deployment Guide for LMS Project

This guide will help you deploy the LMS project to Netlify (frontend) and a suitable backend hosting platform.

## Prerequisites

- A Netlify account
- A MongoDB Atlas account (for database)
- A Stripe account (for payment processing)
- A Cloudinary account (for media storage)
- A backend hosting platform (Render, Heroku, Railway, etc.)

## Backend Deployment

1. **Set up environment variables**:
   - Copy `.env.example` to `.env` and fill in all required values
   - Make sure to set `FRONTEND_URL` to your Netlify app URL once deployed
   - Set `ALLOWED_ORIGINS` to include your Netlify app URL

2. **Deploy to your chosen platform**:
   - Set up all environment variables on the platform
   - Deploy the backend code
   - Note the URL of your deployed backend API

3. **Configure Stripe Webhook**:
   - In your Stripe dashboard, create a webhook pointing to `https://your-backend-url.com/api/v1/purchase/webhook`
   - Set the webhook secret in your backend environment variables

## Frontend Deployment to Netlify

1. **Prepare your frontend**:
   - Create a `.env` file based on `.env.example` and set `VITE_API_BASE_URL` to your deployed backend URL
   - Run `npm run build` to test the build locally

2. **Deploy to Netlify**:
   - Connect your GitHub repository to Netlify
   - Set the build command to `npm run build`
   - Set the publish directory to `dist`
   - Add the environment variables in the Netlify UI:
     - `VITE_API_BASE_URL`: Your backend API URL
     - `VITE_STRIPE_PUBLIC_KEY`: Your Stripe public key (if needed)

3. **Configure Netlify settings**:
   - Enable "Prerendering" for better SEO
   - Set up custom domain if needed
   - Configure SSL

## Post-Deployment Verification

1. **Test user authentication**:
   - Register a new user
   - Login with the user
   - Verify that sessions persist

2. **Test course creation and management**:
   - Create a new course
   - Upload course content
   - Publish the course

3. **Test payment processing**:
   - Purchase a course using Stripe test cards
   - Verify that the webhook is working correctly
   - Check that purchased courses appear in the user's dashboard

## Troubleshooting

- **CORS issues**: Ensure that your backend's `ALLOWED_ORIGINS` includes your Netlify domain
- **API connection issues**: Check that `VITE_API_BASE_URL` is set correctly
- **Payment issues**: Verify Stripe keys and webhook configuration
- **Media upload issues**: Check Cloudinary configuration

## Maintenance

- Regularly check Netlify and backend logs for errors
- Monitor Stripe dashboard for payment issues
- Keep dependencies updated for security patches
