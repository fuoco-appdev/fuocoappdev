import { observer } from 'mobx-react-lite';
import styles from '../../modules/loading.module.scss';

function LoadingMobileComponent(): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <img
        className={[styles['logo'], styles['logo-mobile']].join(' ')}
        src={'../../assets/svg/logo.svg'}
      />
    </div>
  );
}

export default observer(LoadingMobileComponent);
