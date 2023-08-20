import styles from '../loading.module.scss';

export default function LoadingDesktopComponent(): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <img
        className={[styles['logo'], styles['logo-desktop']].join(' ')}
        src={'../../assets/svg/logo.svg'}
      />
    </div>
  );
}
