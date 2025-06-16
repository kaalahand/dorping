'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';
import styles from './Navigation.module.css';

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleSignIn = () => {
    // TODO: Implement sign-in flow
    console.log('Sign in clicked');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div
            className={styles.logo}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Zap className={styles.logoIcon} aria-hidden="true" />
            <span className={styles.logoText}>AI Craft</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className={styles.desktop}>
            <button
              onClick={scrollToPricing}
              className={styles.navLink}
              aria-label="Go to pricing section"
            >
              Pricing
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSignIn}
              ariaLabel="Sign in to your account"
            >
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className={styles.menuIcon} aria-hidden="true" />
            ) : (
              <Menu className={styles.menuIcon} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={scrollToPricing}
              className={styles.mobileNavLink}
              aria-label="Go to pricing section"
            >
              Pricing
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSignIn}
              className={styles.mobileSignIn}
              ariaLabel="Sign in to your account"
            >
              Sign In
            </Button>
          </motion.div>
        )}
      </div>
    </nav>
  );
};