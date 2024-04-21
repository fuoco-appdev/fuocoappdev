import { Button, Dropdown, DropdownAlignment, FormLayout, Input, Line, Slider } from '@fuoco.appdev/core-ui';
import convert from 'convert';
import { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import { RoutePathsType, useQuery } from '../../route-paths';
import { AccountAddFriendsResponsiveProps } from '../account-add-friends.component';
import styles from '../account-add-friends.module.scss';
import AccountFollowItemComponent from '../account-follow-item.component';
import { ResponsiveMobile } from '../responsive.component';

export default function AccountAddFriendsMobileComponent({
  accountProps,
  locationDropdownOpen,
  setLocationDropdownOpen,
  onAddFriendsLoad,
  onAddFriendsScroll,
}: AccountAddFriendsResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();
  const locationSearchInputRef = useRef<HTMLInputElement | null>(null);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  return (
    <ResponsiveMobile>
      <div
        className={[styles['root'], styles['root-mobile']].join(' ')}
        style={{ height: window.innerHeight }}
        onScroll={onAddFriendsScroll}
        onLoad={onAddFriendsLoad}
      >
        <div
          className={[
            styles['search-container'],
            styles['search-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['search-input-root'],
              styles['search-input-root-mobile'],
            ].join(' ')}
          >
            <Input
              value={accountProps.addFriendsSearchInput}
              classNames={{
                container: [
                  styles['search-input-container'],
                  styles['search-input-container-mobile'],
                ].join(' '),
                input: [
                  styles['search-input'],
                  styles['search-input-mobile'],
                ].join(' '),
              }}
              placeholder={t('search') ?? ''}
              icon={<Line.Search size={24} color={'#2A2A5F'} />}
              onChange={(event) =>
                AccountController.updateAddFriendsSearchInput(
                  event.target.value
                )
              }
            />
          </div>
          <div>
            <Button
              classNames={{
                button: styles['filter-button'],
              }}
              onClick={() => setOpenFilter(true)}
              rippleProps={{
                color: 'rgba(233, 33, 66, .35)',
              }}
              block={true}
              icon={<Line.FilterList size={24} color={'#fff'} />}
              rounded={true}
            />
          </div>
        </div>
        {accountProps.followRequestAccounts.length > 0 &&
          accountProps.addFriendsSearchInput.length <= 0 && (
            <div
              className={[
                styles['follower-request-items-container'],
                styles['follower-request-items-container-mobile'],
              ].join(' ')}
            >
              <div
                className={[styles['title'], styles['title-mobile']].join(' ')}
              >
                {t('followerRequests')}
              </div>
              {accountProps.followRequestAccounts.map((value) => {
                const accountFollowerRequest = Object.keys(
                  accountProps.followRequestAccountFollowers
                ).includes(value.id ?? '')
                  ? accountProps.followRequestAccountFollowers[value.id ?? '']
                  : null;
                return (
                  <AccountFollowItemComponent
                    key={value.id}
                    accountProps={accountProps}
                    account={value}
                    follower={accountFollowerRequest}
                    isRequest={true}
                    onClick={() =>
                      navigate({
                        pathname: `${RoutePathsType.Account}/${value.id}/likes`,
                        search: query.toString(),
                      })
                    }
                    onConfirm={() =>
                      AccountController.confirmFollowRequestAsync(
                        accountFollowerRequest?.accountId ?? '',
                        accountFollowerRequest?.followerId ?? ''
                      )
                    }
                    onRemove={() =>
                      AccountController.removeFollowRequestAsync(
                        accountFollowerRequest?.accountId ?? '',
                        accountFollowerRequest?.followerId ?? ''
                      )
                    }
                  />
                );
              })}
            </div>
          )}

        <div className={[styles['title'], styles['title-mobile']].join(' ')}>
          {t('results')}
        </div>
        <div
          className={[
            styles['result-items-container'],
            styles['result-items-container-mobile'],
          ].join(' ')}
        >
          {accountProps.addFriendAccounts.map((value) => {
            const accountFollower = Object.keys(
              accountProps.addFriendAccountFollowers
            ).includes(value.id ?? '')
              ? accountProps.addFriendAccountFollowers[value.id ?? '']
              : null;
            return (
              <AccountFollowItemComponent
                key={value.id}
                accountProps={accountProps}
                account={value}
                follower={accountFollower}
                isRequest={false}
                onClick={() =>
                  navigate({
                    pathname: `${RoutePathsType.Account}/${value.id}/likes`,
                    search: query.toString(),
                  })
                }
                onFollow={() =>
                  AccountController.requestFollowAsync(value.id ?? '')
                }
                onRequested={() =>
                  AccountController.requestUnfollowAsync(value.id ?? '')
                }
                onUnfollow={() =>
                  AccountController.requestUnfollowAsync(value.id ?? '')
                }
              />
            );
          })}
          <img
            src={'../assets/svg/ring-resize-dark.svg'}
            className={styles['loading-ring']}
            style={{
              maxHeight:
                accountProps.hasMoreAddFriends ||
                  accountProps.areAddFriendsLoading
                  ? 24
                  : 0,
            }}
          />
          {!accountProps.hasMoreAddFriends &&
            accountProps.addFriendAccounts.length <= 0 && (
              <div
                className={[
                  styles['no-items-container'],
                  styles['no-items-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['no-items-text'],
                    styles['no-items-text-mobile'],
                  ].join(' ')}
                >
                  {t('noFriendsFound', {
                    username: accountProps.addFriendsSearchInput,
                  })}
                </div>
              </div>
            )}
        </div>
      </div>
      {ReactDOM.createPortal(
        <>
          <Dropdown
            classNames={{
              touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
            }}
            open={openFilter}
            align={DropdownAlignment.Left}
            onClose={() => setOpenFilter(false)}
            touchScreen={true}
            title={t('filter') ?? ''}
          >
            <div className={[
              styles['filter-container'],
              styles['filter-container-mobile'],
            ].join(' ')}>
              <Input
                classNames={{
                  root: styles['input-root'],
                  formLayout: { label: styles['input-form-layout-label'] },
                  input: styles['input'],
                  container: styles['input-container'],
                }}
                label={t('location') ?? ''}
                value={accountProps.addFriendsLocationInput}
                onChange={(event) =>
                  AccountController.updateAddFriendsLocationInput(
                    event.target.value
                  )
                }
                onFocus={() => {
                  setLocationDropdownOpen(true);
                }}
              />
              <FormLayout
                classNames={{
                  label: styles['input-form-layout-label'],
                  labelAfter: styles['input-form-layout-label'],
                }}
                label={t('radius') ?? undefined}
                afterLabel={`${convert(
                  accountProps.addFriendsRadiusMeters,
                  'meters'
                )
                  .to('km')
                  .toFixed()} ${t('km')}`}
              >
                <Slider
                  classNames={{
                    sliderThumb: styles['slider-thumb'],
                  }}
                  marks={0}
                  min={1000}
                  max={1000000}
                  defaultValue={10000}
                  value={accountProps.addFriendsRadiusMeters}
                  onChange={(value: number) =>
                    AccountController.updateAddFriendsRadiusMeters(value)
                  }
                />
              </FormLayout>
              <FormLayout
                classNames={{ label: styles['input-form-layout-label'] }}
                label={t('sex') ?? undefined}
              >
                <div
                  className={[
                    styles['sex-options'],
                    styles['sex-options-mobile'],
                  ].join(' ')}
                >
                  <Button
                    block={true}
                    classNames={{
                      button: [
                        styles['button'],
                        accountProps.addFriendsSexes.includes('male') &&
                        styles['button-selected'],
                      ].join(' '),
                    }}
                    type={'primary'}
                    size={'large'}
                    rippleProps={{
                      color: 'rgba(133, 38, 122, 0.35)',
                    }}
                    onClick={() => AccountController.updateAddFriendsSexes('male')}
                  >
                    {t('male')}
                  </Button>
                  <Button
                    block={true}
                    classNames={{
                      button: [
                        styles['button'],
                        accountProps.addFriendsSexes.includes('female') &&
                        styles['button-selected'],
                      ].join(' '),
                    }}
                    type={'primary'}
                    size={'large'}
                    rippleProps={{
                      color: 'rgba(133, 38, 122, 0.35)',
                    }}
                    onClick={() =>
                      AccountController.updateAddFriendsSexes('female')
                    }
                  >
                    {t('female')}
                  </Button>
                </div>
              </FormLayout>
            </div>
          </Dropdown>
          <Dropdown
            classNames={{
              touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
            }}
            open={locationDropdownOpen}
            align={DropdownAlignment.Left}
            onClose={() => setLocationDropdownOpen(false)}
            onOpen={() => {
              locationSearchInputRef.current?.focus();
              locationSearchInputRef.current?.select();
            }}
            touchScreen={true}
          >
            <Dropdown.Item
              classNames={{
                container: styles['dropdown-item-container'],
                button: {
                  button: styles['dropdown-item-button'],
                },
              }}
              rippleProps={{ color: 'rgba(0,0,0,0)' }}
              touchScreen={true}
            >
              <div
                className={[
                  styles['search-container'],
                  styles['search-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['search-input-root'],
                    styles['search-input-root-mobile'],
                  ].join(' ')}
                >
                  <Input
                    inputRef={locationSearchInputRef}
                    value={accountProps.addFriendsLocationInput}
                    classNames={{
                      container: [
                        styles['search-input-container'],
                        styles['search-input-container-mobile'],
                      ].join(' '),
                      input: [
                        styles['search-input'],
                        styles['search-input-mobile'],
                      ].join(' '),
                    }}
                    placeholder={t('search') ?? ''}
                    icon={<Line.Search size={24} color={'#2A2A5F'} />}
                    onChange={(event) =>
                      AccountController.updateAddFriendsLocationInput(
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>
            </Dropdown.Item>
            {accountProps.addFriendsLocationGeocoding?.features.map((feature) => (
              <Dropdown.Item
                classNames={{
                  container: styles['dropdown-item-container'],
                  button: {
                    button: styles['dropdown-item-button'],
                  },
                }}
                onClick={() => {
                  AccountController.updateAddFriendsLocationFeature(feature);
                  locationSearchInputRef.current?.blur();
                  setLocationDropdownOpen(false);
                }}
                rippleProps={{ color: 'rgba(133, 38, 122, 0.35)' }}
                touchScreen={true}
              >
                <div className={[styles['place-name'], styles['place-name-mobile']].join(' ')}>{feature.place_name}</div>
              </Dropdown.Item>
            ))}
          </Dropdown>
        </>,
        document.body
      )}
    </ResponsiveMobile>
  );
}
