// backend/server.js
const express = require('express');
const axios = require('axios');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3002;

// Twitter API credentials (replace with your own)
const CONSUMER_API_KEY = 'dcabApfAe14x2kWk1l5lT9hxU';
const CONSUMER_API_KEY_SECRET = 'tbdts9VnDthNOKPzOSmGkZ9MKWHGWx7mopkc8SCYOlvrTeavRJ'; // Replace with the correct secret
const CALLBACK_URL = 'https://www.josimarakpomudia.me/callback';

// Initialize OAuth 1.0a
const oauth = new OAuth({
    consumer: {
        key: CONSUMER_API_KEY,
        secret: CONSUMER_API_KEY_SECRET,
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    },
});

// Endpoint to request a temporary token (unchanged, already working)
app.get('/request-token', async (req, res) => {
    try {
        const requestData = {
            url: 'https://api.twitter.com/oauth/request_token',
            method: 'GET',
            data: { oauth_callback: CALLBACK_URL },
        };

        const authorized = oauth.authorize(requestData);
        console.log('Request Token - Authorized params:', authorized);

        const params = new URLSearchParams(authorized);
        const urlWithParams = `${requestData.url}?${params.toString()}`;
        console.log('Request Token - Full URL:', urlWithParams);

        const response = await axios.get(urlWithParams);
        console.log('Request Token - Response:', response.data);

        const responseParams = new URLSearchParams(response.data);
        res.json({
            oauth_token: responseParams.get('oauth_token'),
            oauth_token_secret: responseParams.get('oauth_token_secret'),
        });
    } catch (error) {
        console.error('Request Token - Error:', error.response?.data || error.message);
        if (error.response) {
            console.error('Request Token - Error headers:', error.response.headers);
        }
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// Updated endpoint to exchange oauth_token and oauth_verifier for access token
app.post('/access-token', async (req, res) => {
    const { oauth_token, oauth_verifier } = req.body;
    try {
        const requestData = {
            url: 'https://api.twitter.com/oauth/access_token',
            method: 'POST',
            data: { oauth_verifier }, // Include oauth_verifier in the signature base string
        };

        const token = {
            key: oauth_token,
            secret: '', // We don't have the oauth_token_secret for this step
        };

        const authorized = oauth.authorize(requestData, token);
        console.log('Access Token - Authorized params:', authorized);

        // Use Authorization header for OAuth parameters (standard practice)
        const authHeader = oauth.toHeader(authorized);
        console.log('Access Token - Authorization header:', authHeader);

        // Pass oauth_verifier in the query string (as in Postman)
        const urlWithParams = `${requestData.url}?oauth_verifier=${encodeURIComponent(oauth_verifier)}&oauth_token=${encodeURIComponent(oauth_token)}`;
        console.log('Access Token - Full URL:', urlWithParams);

        const response = await axios.post(urlWithParams, null, {
            headers: {
                ...authHeader,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        console.log('Access Token - Response:', response.data);

        const responseParams = new URLSearchParams(response.data);
        res.json({
            access_token: responseParams.get('oauth_token'),
            access_token_secret: responseParams.get('oauth_token_secret'),
            user_id: responseParams.get('user_id'),
            screen_name: responseParams.get('screen_name'),
        });
    } catch (error) {
        console.error('Access Token - Error:', error.response?.data || error.message);
        if (error.response) {
            console.error('Access Token - Error headers:', error.response.headers);
        }
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// Endpoint to send DM (unchanged)
app.post('/send-dm', async (req, res) => {
    const { access_token, access_token_secret, user_id, message } = req.body;
    try {
        const requestData = {
            url: 'https://api.twitter.com/1.1/direct_messages/events/new.json',
            method: 'POST',
            data: {
                event: {
                    type: 'message_create',
                    message_create: {
                        target: { recipient_id: user_id },
                        message_data: { text: message },
                    },
                },
            },
        };

        const token = {
            key: access_token,
            secret: access_token_secret,
        };

        const authorized = oauth.authorize(requestData, token);
        console.log('Send DM - Authorized params:', authorized);

        const authHeader = oauth.toHeader(authorized);
        console.log('Send DM - Authorization header:', authHeader);

        const response = await axios.post(requestData.url, requestData.data, {
            headers: {
                ...authHeader,
                'Content-Type': 'application/json',
            },
        });
        console.log('Send DM - Response:', response.data);

        res.json({ success: true });
    } catch (error) {
        console.error('Send DM - Error:', error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});