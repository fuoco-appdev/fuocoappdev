import { Auth, Typography, Button } from '@fuoco.appdev/core-ui';
import { Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from './product.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import ProductController from '../controllers/product.controller';
import { useNavigate } from 'react-router-dom';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export interface ProductProps {}

function ProductDesktopComponent({}: ProductProps): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}></div>
  );
}

function ProductMobileComponent({}: ProductProps): JSX.Element {
  const [props] = useObservable(ProductController.model.store);
  const { id } = useParams();

  useEffect(() => {
    ProductController.requestProductAsync(id ?? '');
  }, []);

  return (
    <div className={[styles['root'], styles['root-mobile']].join(' ')}>
      <div className={styles['thumbnail-container-mobile']}>
        <img
          className={styles['thumbnail-image-mobile']}
          src={props.thumbnail || '../assets/svg/wine-bottle.svg'}
        />
      </div>
      <div className={styles['content-mobile']}>
        <div className={styles['header-container-mobile']}>
          <div className={styles['title-container-mobile']}>
            <div className={styles['title']}>{props.title}</div>
            <div className={styles['subtitle']}>{props.subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <ProductDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <ProductMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
