// pages/index.js

import Link from 'next/link';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>💔 Welcome to LoveBreakup AI</h1>
      <p style={styles.subheading}>Choose where you want to begin your healing journey:</p>

      <ul style={styles.list}>
        <li><Link href="/chat"><a style={styles.link}>💬 Talk to LoveBreakup AI</a></Link></li>
        <li><Link href="/recovery"><a style={styles.link}>🧘‍♀️ Recovery Plan</a></Link></li>
        <li><Link href="/journal"><a style={styles.link}>📓 Journal</a></Link></li>
        <li><Link href="/sos"><a style={styles.link}>🚨 SOS Support</a></Link></li>
        <li><Link href="/therapy"><a style={styles.link}>🧠 Therapy Guide</a></Link></li>
        <li><Link href="/nojugdement"><a style={styles.link}>🤝 No Judgement Zone</a></Link></li>
        <li><Link href="/plan-7day"><a style={styles.link}>📅 7-Day Plan</a></Link></li>
        <li><Link href="/plan-30day"><a style={styles.link}>📅 30-Day Plan</a></Link></li>
        <li><Link href="/plan-90day"><a style={styles.link}>📅 90-Day Plan</a></Link></li>
      </ul>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: `'Segoe UI', sans-serif`,
    background: 'linear-gradient(135deg, #ffe6f0, #fddde6)',
    minHeight: '100vh',
    padding: '3rem',
    color: '#333',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#ff2c83',
    marginBottom: '1rem',
  },
  subheading: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    display: 'inline-block',
    marginBottom: '1rem',
    fontSize: '1.1rem',
    color: '#ff007f',
    textDecoration: 'none',
    border: '1px solid #ff007f',
    padding: '10px 20px',
    borderRadius: '8px',
    backgroundColor: '#fff0f5',
  }
};
