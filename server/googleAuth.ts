import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import type { Express } from 'express';
import { storage } from './storage';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '611093594672-9ah1rug8k9q6jp9nr7bru1mfaj1o0t3j.apps.googleusercontent.com';

export function setupGoogleAuth(app: Express) {
  // Google OAuth Strategy
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `https://${process.env.REPLIT_DOMAINS}/auth/google/callback`,
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('Google OAuth profile:', profile);
      
      // Check if user already exists
      let user = await storage.getUserByGoogleId(profile.id);
      
      if (user) {
        // User exists, update last login
        return done(null, user);
      }
      
      // Check if user exists with same email
      const email = profile.emails?.[0]?.value;
      if (email) {
        user = await storage.getUserByEmail(email);
        if (user) {
          // Link Google account to existing user
          await storage.linkGoogleAccount(user.id, profile.id);
          return done(null, user);
        }
      }
      
      // Create new user with selected plan from signup
      // Default to Free plan, but this will be updated from frontend
      const newUser = await storage.createGoogleUser({
        googleId: profile.id,
        email: email || '',
        username: profile.displayName || email || `user_${profile.id}`,
        plan: 'Free' // Will be updated after creation
      });
      
      console.log('Created new user:', newUser);
      return done(null, newUser);
    } catch (error) {
      console.error('Google OAuth error:', error);
      return done(error, false);
    }
  }));

  // Google OAuth routes
  app.get('/auth/google', (req, res, next) => {
    console.log('Google OAuth request initiated');
    console.log('Client ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set');
    console.log('Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set');
    console.log('Callback URL:', `https://${process.env.REPLIT_DOMAINS}/auth/google/callback`);
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  });

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      // For popup authentication, we need to communicate with the parent window
      res.send(`
        <script>
          // Notify parent window and close popup
          if (window.opener) {
            window.opener.postMessage({ type: 'AUTH_SUCCESS', user: ${JSON.stringify(req.user)} }, '*');
          }
          window.close();
        </script>
        <p>Authentication successful! You can close this window.</p>
      `);
    }
  );
}