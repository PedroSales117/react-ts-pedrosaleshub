import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState<string>('');
  const [isCaretVisible, setIsCaretVisible] = useState<boolean>(true);
  const typingInProgress = useRef<boolean>(false);
  const typingIntervalRef = useRef<any>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const texts = useRef(['HELLO WORLD', 'PLAY HALO', 'GEN AI', 'PRINT("IM HERE")']);
  const currentTextIndex = useRef(0);

  useEffect(() => {
    const caretInterval = setInterval(() => {
      setIsCaretVisible(visible => !visible);
    }, 530);

    return () => clearInterval(caretInterval);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      const autoTypeText = () => {
        typeText(texts.current[currentTextIndex.current], '');
        currentTextIndex.current = (currentTextIndex.current + 1) % texts.current.length;
      };

      autoTypeText();
      const autoTypeInterval = setInterval(autoTypeText, 4000);

      return () => clearInterval(autoTypeInterval);
    }
  }, []);

  const typeText = (text: string, buttonName: string) => {
    setActiveButton(buttonName);
    if (typingInProgress.current) {
      return;
    }
    typingInProgress.current = true;
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    setTypedText('');
    let i = 0;
    typingIntervalRef.current = setInterval(() => {
      if (i < text.length) {
        setTypedText(typed => typed + text.charAt(i - 1));
        i++;
      } else {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        typingInProgress.current = false;
      }
    }, 120);
  };

  const handleClick = (path: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    navigate(path);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.textBackground}>
        {typedText}
        <span className={isCaretVisible ? styles.caret : styles.caretHidden}>_</span>
      </div>
      <button
        onClick={(event) => handleClick('/backend', event)}
        onMouseEnter={() => typeText('BACK_END', 'BACKEND')}
        onMouseLeave={() => setActiveButton(null)}
        className={`${styles.button} ${activeButton !== 'BACKEND' && activeButton ? styles.dimmed : ''}`}
      >
        Back-end
      </button>
      <button
        onClick={(event) => handleClick('/ai', event)}
        onMouseEnter={() => typeText('ARTIFICIAL INTELLIGENCE', 'AI')}
        onMouseLeave={() => setActiveButton(null)}
        className={`${styles.button} ${activeButton !== 'AI' && activeButton ? styles.dimmed : ''}`}
      >
        Artificial Intelligence
      </button>
      <div className={styles.grid}>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => navigate('/all')}
          className={`${styles.allProjectsButton} ${styles.textLink}`}
          style={{ padding: '10px 20px', background: 'none', border: 'none', color: 'white', textDecoration: 'underline' }}
        >
          All Public Projects
        </button>
      </div>
    </div>
  );
};

export default HomePage;
