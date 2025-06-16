'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, FileText, Lightbulb, ExternalLink, Copy } from 'lucide-react';
import styles from './DemoCard.module.css';

interface DemoCardProps {
  demoState: 'initial' | 'questions' | 'result';
}

export const DemoCard: React.FC<DemoCardProps> = ({ demoState }) => {
  const taskCards = [
    { icon: Mail, label: 'Write Email', color: 'blue' },
    { icon: FileText, label: 'Create Document', color: 'purple' },
    { icon: Lightbulb, label: 'Brainstorm Content', color: 'green' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>AI Content Creator</h3>
        <div className={styles.controls}>
          <div className={styles.dot} style={{ backgroundColor: '#ef4444' }} />
          <div className={styles.dot} style={{ backgroundColor: '#eab308' }} />
          <div className={styles.dot} style={{ backgroundColor: '#22c55e' }} />
        </div>
      </div>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {demoState === 'initial' && (
            <motion.div
              key="initial"
              className={styles.initialState}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.taskGrid}>
                {taskCards.slice(0, 2).map((task, index) => (
                  <motion.div
                    key={task.label}
                    className={`${styles.taskCard} ${styles[task.color]}`}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <task.icon className={styles.taskIcon} aria-hidden="true" />
                    <span className={styles.taskLabel}>{task.label}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                className={`${styles.taskCard} ${styles.green} ${styles.fullWidth}`}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Lightbulb className={styles.taskIcon} aria-hidden="true" />
                <span className={styles.taskLabel}>Brainstorm Content</span>
              </motion.div>
            </motion.div>
          )}

          {demoState === 'questions' && (
            <motion.div
              key="questions"
              className={styles.questionsState}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="goal-input">What's the goal?</label>
                <input
                  id="goal-input"
                  type="text"
                  placeholder="Follow up on meeting..."
                  className={styles.input}
                  aria-describedby="goal-help"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="tone-select">What's the tone?</label>
                <select id="tone-select" className={styles.select} aria-describedby="tone-help">
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="formal">Formal</option>
                </select>
              </div>
            </motion.div>
          )}

          {demoState === 'result' && (
            <motion.div
              key="result"
              className={styles.resultState}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.generatedContent}>
                <div className={styles.contentLabel}>Generated Email:</div>
                <div className={styles.emailPreview}>
                  <div className={styles.emailSubject}>Subject: Follow-up on Today's Meeting</div>
                  <div className={styles.emailBody}>
                    <div>Hi Sarah,</div>
                    <div>Thank you for taking the time to meet with me today...</div>
                  </div>
                </div>
              </div>
              <div className={styles.actions}>
                <button className={`${styles.actionButton} ${styles.export}`} aria-label="Export email">
                  <ExternalLink className={styles.actionIcon} aria-hidden="true" />
                  Export
                </button>
                <button className={`${styles.actionButton} ${styles.copy}`} aria-label="Copy email">
                  <Copy className={styles.actionIcon} aria-hidden="true" />
                  Copy
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};