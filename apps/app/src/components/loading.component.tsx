import styles from './loading.module.scss';
import Lottie from 'lottie-react';

interface LoadingProps {
  isVisible: boolean;
}

export default function LoadingComponent({
  isVisible = true,
}: LoadingProps): JSX.Element {
  return isVisible ? (
    <div
      className={styles['root']}
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      <img className={styles['logo']} src={'../assets/svg/logo.svg'} />
    </div>
  ) : (
    <></>
  );
}
