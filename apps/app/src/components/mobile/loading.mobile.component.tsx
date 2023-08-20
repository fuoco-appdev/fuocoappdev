import styles from '../loading.module.scss';

export default function LoadingMobileComponent(): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <img
        className={[styles['logo'], styles['logo-mobile']].join(' ')}
        src={'../../assets/svg/logo.svg'}
      />
    </div>
  );
}
