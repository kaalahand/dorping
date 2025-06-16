'use client';

import { motion } from 'framer-motion';
import { PricingCard } from '@/components/molecules/PricingCard/PricingCard';
import { PRICING_PLANS } from '@/constants';
import styles from './PricingSection.module.css';

export const PricingSection: React.FC = () => {
  const handlePlanSelect = (planId: string) => {
    // TODO: Implement plan selection logic
    console.log('Selected plan:', planId);
  };

  return (
    <section id="pricing" className={styles.section} aria-labelledby="pricing-heading">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="pricing-heading" className={styles.title}>Choose Your Plan</h2>
          <p className={styles.subtitle}>Start free, upgrade when you need more power</p>
        </motion.div>

        <div className={styles.grid}>
          {PRICING_PLANS.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={index}
              onSelect={handlePlanSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
};