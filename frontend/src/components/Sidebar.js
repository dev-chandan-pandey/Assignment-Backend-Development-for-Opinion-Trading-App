import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h3>Menu</h3>
      <ul>
        <li><Link href="/">Live Events</Link></li>
        <li><Link href="/dashboard">User Dashboard</Link></li>
        <li><Link href="/admin">Admin Panel</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
