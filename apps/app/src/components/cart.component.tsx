import { useEffect, useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import CartController from '../controllers/cart.controller';
import styles from './cart.module.scss';
import { Alert, Button } from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import { LineItem, ProductVariant } from '@medusajs/medusa';

function CartDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(CartController.model.store);

  return <></>;
}

function CartMobileComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(CartController.model.store);
  const { t, i18n } = useTranslation();

  return (
    <div className={styles['root-mobile']}>
      <div className={styles['account-container-mobile']}>
        <div className={styles['already-have-an-account-title-mobile']}>
          {t('alreadyHaveAnAccount')}
        </div>
        <div className={styles['already-have-an-account-description-mobile']}>
          {t('alreadyHaveAnAccountDescription')}
        </div>
        <div className={styles['sign-in-button-container']}>
          <Button
            classNames={{
              button: styles['sign-in-button'],
            }}
            rippleProps={{
              color: 'rgba(233, 33, 66, .35)',
            }}
            size={'large'}
            touchScreen={true}
            onClick={() => navigate(RoutePaths.Signin)}
          >
            {t('signIn')}
          </Button>
        </div>
      </div>
      <div className={styles['shopping-cart-container-mobile']}>
        <div className={styles['shopping-cart-title-mobile']}>
          {t('shoppingCart')}
        </div>
        <div className={styles['shopping-cart-items-mobile']}>
          {props.cart?.items.map((item: LineItem) => {
            console.log(item.variant.options);
            return (
              <div
                key={item.variant_id}
                className={styles['cart-item-container-mobile']}
              >
                <div className={styles['cart-item-details-mobile']}>
                  <div className={styles['cart-item-thumbnail-mobile']}>
                    <img
                      className={styles['cart-thumbnail-image-mobile']}
                      src={item.thumbnail || '../assets/svg/wine-bottle.svg'}
                    />
                  </div>
                  <div className={styles['cart-item-title-container-mobile']}>
                    <div className={styles['cart-item-title-mobile']}>
                      {item.title}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function CartComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <CartDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <CartMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
