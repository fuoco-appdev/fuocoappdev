import { Button, Line } from '@fuoco.appdev/web-components';
import { observer } from 'mobx-react-lite';
import styles from '../../modules/address-item.module.scss';
import { AddressItemProps } from '../address-item.component';
import { ResponsiveMobile } from '../responsive.component';

function AddressItemMobileComponent({
  address,
  onEdit,
  onDelete,
}: AddressItemProps): JSX.Element {
  return (
    <ResponsiveMobile>
      <div className={[styles['root'], styles['root-mobile']].join(' ')}>
        <div
          className={[styles['container'], styles['container-mobile']].join(
            ' '
          )}
        >
          <div
            className={[styles['details'], styles['details-mobile']].join(' ')}
          >
            <div
              className={[
                styles['title-container'],
                styles['title-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[styles['title'], styles['title-mobile']].join(' ')}
              >
                {`${address.address_1}`}
                {address.address_2 ? ` ${address.address_2}, ` : ', '}
                {`${address.postal_code}, ${address.city}, `}
                {address.province && `${address.province}, `}
                {address.country_code?.toUpperCase()}
              </div>
              <div
                className={[styles['subtitle'], styles['subtitle-mobile']].join(
                  ' '
                )}
              >
                {`${address.first_name} ${address.last_name}, ${address.phone}`}
                {address.company && `, ${address.company}`}
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
                <div>
                  <Button
                    block={true}
                    classNames={{
                      button: [styles['button'], styles['button-mobile']].join(
                        ' '
                      ),
                    }}
                    type={'text'}
                    rounded={true}
                    touchScreen={true}
                    size={'tiny'}
                    icon={<Line.Edit size={24} />}
                    onClick={onEdit}
                  />
                </div>
                <div>
                  <Button
                    block={true}
                    classNames={{
                      button: [styles['button'], styles['button-mobile']].join(
                        ' '
                      ),
                    }}
                    type={'text'}
                    rounded={true}
                    touchScreen={true}
                    size={'tiny'}
                    icon={<Line.Delete size={24} />}
                    onClick={onDelete}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveMobile>
  );
}

export default observer(AddressItemMobileComponent);
