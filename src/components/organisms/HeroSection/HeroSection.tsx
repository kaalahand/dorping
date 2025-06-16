'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';
import { DemoCard } from '@/components/molecules/DemoCard/DemoCard';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  const [demoState, setDemoState] = useState<'initial' | 'questions' | 'result'>('initial');

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoState(current => {
        switch (current) {
          case 'initial': return 'questions';
          case 'questions': return 'result';
          case 'result': return 'initial';
          default: return 'initial';
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    // TODO: Implement sign-up flow
    console.log('Get started clicked');
  };

  const handleWatchDemo = () => {
    // TODO: Implement demo modal
    console.log('Watch demo clicked');
  };

  return (
    <section className={styles.section} role="banner">
      <div className={styles.container}>
        <div className={styles.grid}>
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className={styles.headline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              From Idea to{' '}
              <span className={styles.gradient}>Final Draft</span>
              <br />
              in Seconds
            </motion.h1>
            
            <motion.p
              className={styles.subheadline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Our AI assistant asks the right questions to transform your simple thoughts 
              into perfectly structured, ready-to-use content.
            </motion.p>

            <motion.div
              className={styles.actions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                onClick={handleGetStarted}
                ariaLabel="Start using AI Craft for free with 50 prompts"
              >
                Start for Free - 50 Prompts on Us
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleWatchDemo}
                ariaLabel="Watch product demonstration"
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.demo}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <DemoCard demoState={demoState} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};