import { observer } from 'mobx-react-lite';
import styles from '../../modules/loading.module.scss';

function LoadingDesktopComponent(): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}>
      <img
        className={[styles['logo'], styles['logo-desktop']].join(' ')}
        src={'../../assets/svg/logo.svg'}
      />
    </div>
  );
}

export default observer(LoadingDesktopComponent);
