import { Button, Dropdown, DropdownAlignment, FormLayout, Input, Line, Scroll, Slider } from '@fuoco.appdev/web-components';
import convert from 'convert';
import { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AccountController from '../../../controllers/account.controller';
import { RoutePathsType, useQuery } from '../../route-paths';
import { AccountAddFriendsResponsiveProps } from '../account-add-friends.component';
import styles from '../account-add-friends.module.scss';
import AccountFollowItemComponent from '../account-follow-item.component';
import { ResponsiveMobile } from '../responsive.component';

export default function AccountAddFriendsMobileComponent({
  accountProps,
  locationDropdownOpen,
  setLocationDropdownOpen,
}: AccountAddFriendsResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const locationSearchInputRef = useRef<HTMLInputElement | null>(null);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  let prevPreviewScrollTop = 0;
  let yPosition = 0;

  return (
    <ResponsiveMobile>
      <div className={[
        styles['root'],
        styles['root-mobile'],
      ].join(' ')}>
        <div
          className={[
            styles['search-container'],
            styles['search-container-mobile'],
          ].join(' ')}
          ref={topBarRef}
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
              icon={<Line.FilterList size={24} />}
              rounded={true}
            />
          </div>
        </div>
        <Scroll
          touchScreen={true}
          classNames={{
            scrollContainer: [styles['scroll-container'], styles['scroll-container-mobile']].join(' '),
            reloadContainer: [styles['scroll-load-container'], styles['scroll-load-container-mobile']].join(' '),
            loadContainer: [styles['scroll-load-container'], styles['scroll-load-container-mobile']].join(' '),
            pullIndicator: [styles['pull-indicator'], styles['pull-indicator-mobile']].join(' ')
          }}
          reloadComponent={
            <img
              src={'../assets/svg/ring-resize-dark.svg'}
              className={styles['loading-ring']}
            />
          }
          loadComponent={
            <img
              src={'../assets/svg/ring-resize-dark.svg'}
              className={styles['loading-ring']}
            />
          }
          isLoadable={accountProps.hasMoreAddFriends}
          loadingHeight={56}
          showIndicatorThreshold={56}
          reloadThreshold={96}
          pullIndicatorComponent={<div className={[styles['pull-indicator-container']].join(' ')}><Line.ArrowDownward size={24} /></div>}
          isReloading={accountProps.areAddFriendsReloading}
          isLoading={accountProps.areAddFriendsLoading}
          onReload={() => AccountController.reloadFollowRequestsAndFriendsAccountsAsync()}
          onLoad={() => AccountController.onNextAddFriendsScrollAsync()}
          onScroll={(progress, scrollRef, contentRef) => {
            const elementHeight = topBarRef.current?.clientHeight ?? 0;
            const scrollTop = contentRef.current?.getBoundingClientRect().top ?? 0;
            if (prevPreviewScrollTop <= scrollTop) {
              yPosition -= prevPreviewScrollTop - scrollTop;
              if (yPosition >= 0) {
                yPosition = 0;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            } else {
              yPosition += scrollTop - prevPreviewScrollTop;
              if (yPosition <= -elementHeight) {
                yPosition = -elementHeight;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            }

            prevPreviewScrollTop = scrollTop;
          }}
        >
          <div className={[
            styles['scroll-content'],
            styles['scroll-content-mobile'],
          ].join(' ')}>
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
        </Scroll>
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
                        accountProps.addFriendsSex === 'any' &&
                        styles['button-selected'],
                      ].join(' '),
                    }}
                    type={'primary'}
                    size={'large'}
                    rippleProps={{
                      color: 'rgba(133, 38, 122, 0.35)',
                    }}
                    onClick={() => AccountController.updateAddFriendsSex('any')}
                  >
                    {t('any')}
                  </Button>
                  <Button
                    block={true}
                    classNames={{
                      button: [
                        styles['button'],
                        accountProps.addFriendsSex === 'male' &&
                        styles['button-selected'],
                      ].join(' '),
                    }}
                    type={'primary'}
                    size={'large'}
                    rippleProps={{
                      color: 'rgba(133, 38, 122, 0.35)',
                    }}
                    onClick={() => AccountController.updateAddFriendsSex('male')}
                  >
                    {t('male')}
                  </Button>
                  <Button
                    block={true}
                    classNames={{
                      button: [
                        styles['button'],
                        accountProps.addFriendsSex === 'female' &&
                        styles['button-selected'],
                      ].join(' '),
                    }}
                    type={'primary'}
                    size={'large'}
                    rippleProps={{
                      color: 'rgba(133, 38, 122, 0.35)',
                    }}
                    onClick={() =>
                      AccountController.updateAddFriendsSex('female')
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
