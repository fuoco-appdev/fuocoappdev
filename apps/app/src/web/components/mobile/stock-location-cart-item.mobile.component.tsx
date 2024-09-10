import { Avatar } from '@fuoco.appdev/web-components';
import styles from '../../modules/stock-location-cart-item.module.scss';
// @ts-ignore
import Ripples from 'react-ripples';
import { ResponsiveMobile } from '../responsive.component';
import { StockLocationCartItemResponsiveProps } from '../stock-location-cart-item.component';

export default function StockLocationCartItemMobileComponent({
  stockLocation,
  cartCount,
  selected,
  avatar,
  onClick,
}: StockLocationCartItemResponsiveProps): JSX.Element {
  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <Ripples
          color={'rgba(133, 38, 122, .35)'}
          className={[
            styles['ripples'],
            styles['ripples-mobile'],
            selected && styles['ripples-selected'],
          ].join(' ')}
          onClick={onClick}
        >
          <div
            className={[styles['container'], styles['container-mobile']].join(
              ' '
            )}
          >
            <div
              className={[styles['details'], styles['details-mobile']].join(
                ' '
              )}
            >
              <div
                className={[
                  styles['title-container'],
                  styles['title-container-mobile'],
                ].join(' ')}
              >
                <Avatar
                  classNames={{
                    container: !avatar
                      ? [
                          styles['no-avatar-container'],
                          styles['no-avatar-container-mobile'],
                        ].join(' ')
                      : [
                          styles['avatar-container'],
                          styles['avatar-container-mobile'],
                        ].join(' '),
                  }}
                  size={'custom'}
                  text={stockLocation.name}
                  src={avatar}
                />
                <div
                  className={[
                    styles['title'],
                    styles['title-mobile'],
                    selected && styles['title-selected'],
                  ].join(' ')}
                >
                  {stockLocation.name}
                </div>
              </div>
              <div
                className={[
                  styles['right-details-container'],
                  styles['right-details-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['right-details-content'],
                    styles['right-details-content-mobile'],
                  ].join(' ')}
                >
                  {cartCount !== undefined && cartCount > 0 && (
                    <div
                      className={[
                        styles['cart-number-container'],
                        styles['cart-number-container-mobile'],
                        selected && styles['cart-number-container-selected'],
                      ].join(' ')}
                    >
                      <span
                        className={[
                          styles['cart-number'],
                          styles['cart-number-mobile'],
                          selected && styles['cart-number-selected'],
                        ].join(' ')}
                      >
                        {cartCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Ripples>
      </div>
    </ResponsiveMobile>
  );
}
