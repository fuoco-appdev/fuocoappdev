import styles from './loading.module.scss';
import Lottie from 'lottie-react';

interface LoadingProps {
  isVisible: boolean;
}

export default function LoadingComponent({
  isVisible = true,
}: LoadingProps): JSX.Element {
  return (
    <div
      className={styles['root']}
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      {/* <Lottie loop={true} animationData={{}} className={styles['animation']} /> */}
    </div>
  );
}
