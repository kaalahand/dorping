'use client';

import { motion } from 'framer-motion';
import { Tooltip } from '@/components/atoms/Tooltip/Tooltip';
import { Statistic } from '@/types';
import styles from './StatisticCard.module.css';

interface StatisticCardProps {
  statistic: Statistic;
  index: number;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({ statistic, index }) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Tooltip content={statistic.description} position="top">
        <div className={styles.content}>
          <div className={styles.value} tabIndex={0} role="button" aria-describedby={`tooltip-${statistic.id}`}>
            {statistic.value}
          </div>
          <div className={styles.label}>{statistic.label}</div>
        </div>
      </Tooltip>
    </motion.div>
  );
};