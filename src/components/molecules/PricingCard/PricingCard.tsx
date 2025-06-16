'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';
import { PricingPlan } from '@/types';
import styles from './PricingCard.module.css';

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
  onSelect: (planId: string) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, index, onSelect }) => {
  return (
    <motion.div
      className={`${styles.card} ${plan.popular ? styles.popular : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {plan.popular && (
        <div className={styles.badge}>
          <span>Most Popular</span>
        </div>
      )}
      
      <div className={styles.header}>
        <h3 className={styles.name}>{plan.name}</h3>
        <div className={styles.pricing}>
          <span className={styles.price}>{plan.price}</span>
          {plan.period && <span className={styles.period}>{plan.period}</span>}
        </div>
        <p className={styles.prompts}>{plan.prompts}</p>
      </div>

      <ul className={styles.features} role="list">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className={styles.feature}>
            <Check className={styles.checkIcon} aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <Button
          variant={plan.popular ? 'primary' : 'outline'}
          size="lg"
          onClick={() => onSelect(plan.id)}
          className={styles.ctaButton}
          ariaLabel={`Select ${plan.name} plan`}
        >
          {plan.cta}
        </Button>
      </div>
    </motion.div>
  );
};