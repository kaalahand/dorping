'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/Button/Button';
import { StatisticCard } from '@/components/molecules/StatisticCard/StatisticCard';
import { STATISTICS } from '@/constants';
import styles from './SocialProofSection.module.css';

export const SocialProofSection: React.FC = () => {
  const handleGetStarted = () => {
    // TODO: Implement sign-up flow
    console.log('Get started clicked');
  };

  return (
    <section className={styles.section} aria-labelledby="social-proof-heading">
      <div className={styles.container}>
        <motion.h2
          id="social-proof-heading"
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Join content creators saving 8.1 hours weekly with 67% faster results
        </motion.h2>

        <div className={styles.statistics}>
          {STATISTICS.map((statistic, index) => (
            <StatisticCard
              key={statistic.id}
              statistic={statistic}
              index={index}
            />
          ))}
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={handleGetStarted}
            className={styles.ctaButton}
            ariaLabel="Start creating content today for free"
          >
            Start Creating Today - It's Free
          </Button>
        </motion.div>
      </div>
    </section>
  );
};