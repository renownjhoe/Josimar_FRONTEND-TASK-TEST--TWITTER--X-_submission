```markdown
# Twitter OAuth 2.0 Authentication with OTP Verification

A React/Node.js application that implements Twitter OAuth 2.0 authentication and sends a one-time password (OTP) via Twitter Direct Messages (DMs) for secure access.

![Demo](https://via.placeholder.com/800x400?text=Application+Demo+Screenshot) *Replace with actual screenshot*

## Features
- **Twitter OAuth 2.0 Login** - Secure authentication using Twitter's OAuth 2.0 PKCE flow
- **OTP via DM** - Automatically sends 6-digit code to user's Twitter DMs
- **Protected Routes** - Secure dashboard access with session management
- **Responsive UI** - Built with Tailwind CSS
- **Redux State Management** - Centralized auth/OTP state handling

## Prerequisites
- Node.js v18+ 
- npm v9+
- Twitter Developer Account ([Create](https://developer.twitter.com/))
- Registered application on Twitter Developer Portal

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/twitter-oauth-app.git
cd twitter-oauth-app
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

### 3. Backend Setup
```bash
cd backend
npm install
```

## Configuration

### 1. Twitter Developer Setup
1. Create app at [Twitter Developer Portal](https://developer.twitter.com/)
2. Enable OAuth 2.0 with these settings:
   - **Callback URI:** `https://yourdomain.com/callback`
   - **Scopes:** `users.read`, `tweet.read`, `dm.write`
3. Obtain credentials:
   - Client ID
   - Client Secret

### 2. Environment Variables
Create `.env` files in both frontend/backend:

**Frontend (./frontend/.env)**
```env
REACT_APP_TWITTER_CLIENT_ID=your_client_id
REACT_APP_BACKEND_URL=https://api.yourdomain.com
REACT_APP_REDIRECT_URI=https://yourdomain.com/callback
```

**Backend (./backend/.env)**
```env
TWITTER_CLIENT_ID=your_client_id
TWITTER_CLIENT_SECRET=your_client_secret
FRONTEND_URL=https://yourdomain.com
PORT=3001
```

## Running the Application

### 1. Development Mode
**Frontend:**
```bash
cd frontend
npm start
```

**Backend:**
```bash
cd backend
npm run dev
```

### 2. Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## Deployment

### 1. Frontend Deployment
- Deploy built `frontend/build` folder to:
  - Vercel
  - Netlify
  - AWS Amplify

### 2. Backend Deployment
- Deploy Node.js server to:
  - Heroku
  - AWS EC2
  - DigitalOcean Droplet

Ensure these environment variables are set in production:
```bash
TWITTER_CLIENT_ID
TWITTER_CLIENT_SECRET
FRONTEND_URL
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/twitter` | GET | Initiate Twitter OAuth flow |
| `/api/auth/twitter/callback` | POST | Handle OAuth callback |
| `/api/otp` | POST | Generate/send OTP |
| `/api/verify` | POST | Verify OTP |

## Testing
1. Visit application URL
2. Click "Login with Twitter"
3. Complete Twitter authentication
4. Check Twitter DMs for OTP
5. Enter OTP on verification page
6. Access protected dashboard

## Troubleshooting

**Common Errors:**
- `Could not authenticate you (32)`: Verify Twitter credentials match developer portal
- `OTP not received`: Check Twitter API permissions for DM access
- `CORS errors`: Ensure proper frontend/backend URL configuration

**Debugging Tips:**
- Check server logs for detailed errors
- Validate environment variables
- Test API endpoints with Postman

## Security Best Practices
1. **Never commit** `.env` files
2. Rotate Twitter credentials regularly
3. Use HTTPS in production
4. Implement rate limiting on OTP endpoints
5. Store OTPs hashed (backend implementation)

## Contributing
1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## License
MIT License - See [LICENSE](LICENSE) for details

## Acknowledgments
- Twitter API Documentation
- `react-oauth2-pkce` library
- Tailwind CSS framework

---

**Need Help?**  
Create an issue or contact maintainers@yourdomain.com
```

This README includes:
1. Clear setup/installation instructions
2. Environment configuration details
3. Deployment guidelines
4. API documentation
5. Troubleshooting section
6. Security considerations
7. Contribution guidelines