import { Auth, Typography, Button } from '@fuoco.appdev/core-ui';
import { Line } from '@fuoco.appdev/core-ui';
import { useObservable } from '@ngneat/use-observable';
import styles from './product.module.scss';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import ProductController from '../controllers/product.controller';
import { useNavigate } from 'react-router-dom';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface ProductProps {}

function ProductDesktopComponent({}: ProductProps): JSX.Element {
  return (
    <div className={[styles['root'], styles['root-desktop']].join(' ')}></div>
  );
}

function ProductMobileComponent({}: ProductProps): JSX.Element {
  const [props] = useObservable(ProductController.model.store);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [disableShowMore, setDisableShowMore] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    ProductController.requestProductAsync(id ?? '');
  }, []);

  useEffect(() => {
    if (props.description.length < 356) {
      setDisableShowMore(true);
    } else {
      setDisableShowMore(false);
      if (!showMore) {
        let index = props.description.indexOf('\n');
        if (index > 355) {
          index = 355;
        }
        let shortDescription = props.description.substring(0, index);
        if (shortDescription.endsWith('.')) {
          shortDescription += '..';
        } else {
          shortDescription += '...';
        }
        setDescription(shortDescription);
      } else {
        setDescription(props.description);
      }
    }
  }, [props.description, showMore]);

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
          <div className={styles['like-container-mobile']}>
            <div className={styles['like-count-mobile']}>{props.likeCount}</div>
            <Button
              rippleProps={{
                color: !props.isLiked
                  ? 'rgba(233, 33, 66, .35)'
                  : 'rgba(42, 42, 95, .35)',
              }}
              rounded={true}
              onClick={() => ProductController.updateIsLiked(!props.isLiked)}
              type={'text'}
              icon={
                props.isLiked ? (
                  <Line.Favorite size={24} color={'#E92142'} />
                ) : (
                  <Line.FavoriteBorder size={24} color={'#2A2A5F'} />
                )
              }
            />
          </div>
        </div>
        <div className={styles['description-container-mobile']}>
          <ReactMarkdown remarkPlugins={[gfm]} children={description} />
          {props.description && !disableShowMore && (
            <div className={styles['show-more-container-mobile']}>
              <Typography.Link
                className={styles['show-more-link']}
                onClick={() => setShowMore(!showMore)}
              >
                {!showMore ? t('showMore') : t('showLess')}
              </Typography.Link>
            </div>
          )}
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
