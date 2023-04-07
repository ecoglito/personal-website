import React from 'react';
import styles from './MorphingText.module.css';

const MorphingText = () => {
  const texts = [
    'I design products.',
    'I develop software.',
    'I hack things.',
    'I back moonshots.',
  ];

  return (
    <div className = {styles.container}>
        <div className={styles.morphing}>
        {texts.map((text, index) => (
            <div key={index} className={styles.word}>
            {text}
            </div>
        ))}
        </div>
    </div>
  );
};

export default MorphingText;
