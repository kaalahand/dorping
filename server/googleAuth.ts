import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import type { Express } from 'express';
import { storage } from './storage';

const GOOGLE_CLIENT_ID = '611093594672-9ah1rug8k9q6jp9nr7bru1mfaj1o0t3j.apps.googleusercontent.com';

export function setupGoogleAuth(app: Express) {
  // Google OAuth Strategy
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: "/auth/google/callback"
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
      
      // Create new user
      const newUser = await storage.createGoogleUser({
        googleId: profile.id,
        email: email || '',
        username: profile.displayName || email || `user_${profile.id}`,
        plan: 'Free'
      });
      
      return done(null, newUser);
    } catch (error) {
      console.error('Google OAuth error:', error);
      return done(error, false);
    }
  }));

  // Google OAuth routes
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      // Successful authentication, redirect to dashboard
      res.redirect('/?auth=success');
    }
  );
}