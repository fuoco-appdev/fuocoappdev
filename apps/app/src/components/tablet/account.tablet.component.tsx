import {
  Avatar,
  Button,
  Dropdown,
  DropdownAlignment,
  FormLayout,
  Input,
  Line,
  Tabs,
} from '@fuoco.appdev/core-ui';
import { Customer } from '@medusajs/medusa';
import React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { Outlet, useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AccountController from '../../controllers/account.controller';
import { AccountResponse } from '../../protobuf/account_pb';
import { InterestResponse } from '../../protobuf/interest_pb';
import { RoutePathsType, useQuery } from '../../route-paths';
import AccountProfileFormComponent from '../account-profile-form.component';
import { AccountResponsiveProps } from '../account.component';
import styles from '../account.module.scss';
import { ResponsiveTablet } from '../responsive.component';

export default function AccountTabletComponent({
  accountProps,
  storeProps,
  isCropImageModalVisible,
  likeCount,
  followerCount,
  followingCount,
  isAddInterestOpen,
  setIsAddInterestOpen,
  setIsCropImageModalVisible,
  onUsernameChanged,
  onCompleteProfile,
  onScroll,
  onScrollLoad,
  onAvatarChanged,
  onLikesClick,
  onFollowersClick,
  onFollowingClick,
}: AccountResponsiveProps): JSX.Element {
  const scrollContainerRef = React.createRef<HTMLDivElement>();
  const topBarRef = React.useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const query = useQuery();
  const interestButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const interestInputRef = React.useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  let prevPreviewScrollTop = 0;
  let yPosition = 0;

  const account = accountProps.account as AccountResponse;
  const customer = accountProps.customer as Customer;
  return (
    <ResponsiveTablet>
      <div className={[styles['root'], styles['root-tablet']].join(' ')}>
        <div
          ref={topBarRef}
          className={[styles['top-bar'], styles['top-bar-tablet']].join(' ')}
        >
          <div
            className={[
              styles['left-tab-container'],
              styles['left-tab-container-tablet'],
            ].join(' ')}
          >
            {accountProps.account?.status === 'Complete' && (
              <div
                className={[
                  styles['username-container'],
                  styles['username-container-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['username'],
                    styles['username-tablet'],
                  ].join(' ')}
                >
                  {accountProps.account?.username}
                </div>
              </div>
            )}
          </div>
          <div
            className={[
              styles['center-tab-container'],
              styles['center-tab-container-tablet'],
            ].join(' ')}
          >
            <div
              className={[
                styles['top-bar-text-container'],
                styles['top-bar-text-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['top-bar-text'],
                  styles['top-bar-text-tablet'],
                ].join(' ')}
              >
                {t('completeProfile')}
              </div>
            </div>
          </div>
          <div
            className={[
              styles['right-tab-container'],
              styles['right-tab-container-tablet'],
            ].join(' ')}
          >
            {account?.status === 'Complete' && (
              <div
                className={[
                  styles['tab-button-container'],
                  styles['tab-button-container-tablet'],
                ].join(' ')}
              >
                <Button
                  touchScreen={true}
                  classNames={{
                    button: styles['button'],
                  }}
                  rippleProps={{
                    color: 'rgba(88, 40, 109, .35)',
                  }}
                  onClick={() =>
                    setTimeout(
                      () =>
                        navigate({
                          pathname: RoutePathsType.AccountAddFriends,
                          search: query.toString(),
                        }),
                      75
                    )
                  }
                  type={'text'}
                  rounded={true}
                  floatingLabel={t('addFriends') ?? ''}
                  size={'tiny'}
                  icon={<Line.PersonAddAlt1 size={24} color={'#2A2A5F'} />}
                />
              </div>
            )}
            <div
              className={[
                styles['tab-button-container'],
                styles['tab-button-container-tablet'],
              ].join(' ')}
            >
              <Button
                touchScreen={true}
                classNames={{
                  button: styles['button'],
                }}
                rippleProps={{
                  color: 'rgba(88, 40, 109, .35)',
                }}
                onClick={() =>
                  setTimeout(
                    () =>
                      navigate({
                        pathname: RoutePathsType.AccountSettingsAccount,
                        search: query.toString(),
                      }),
                    75
                  )
                }
                type={'text'}
                rounded={true}
                floatingLabel={t('settings') ?? ''}
                size={'tiny'}
                icon={<Line.Settings size={24} color={'#2A2A5F'} />}
              />
            </div>
          </div>
        </div>
        <div
          className={[
            styles['scroll-container'],
            styles['scroll-container-tablet'],
          ].join(' ')}
          style={{ height: window.innerHeight }}
          onScroll={(e) => {
            onScroll(e);
            const elementHeight = topBarRef.current?.clientHeight ?? 0;
            const scrollTop = e.currentTarget.scrollTop;
            if (prevPreviewScrollTop >= scrollTop) {
              yPosition += prevPreviewScrollTop - scrollTop;
              if (yPosition >= 0) {
                yPosition = 0;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            } else {
              yPosition -= scrollTop - prevPreviewScrollTop;
              if (yPosition <= -elementHeight) {
                yPosition = -elementHeight;
              }

              topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
            }

            prevPreviewScrollTop = e.currentTarget.scrollTop;
          }}
          onLoad={onScrollLoad}
          ref={scrollContainerRef}
        >
          {account?.status === 'Incomplete' && (
            <div
              className={[
                styles['incomplete-form-container'],
                styles['incomplete-form-container-tablet'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['incomplete-content'],
                  styles['incomplete-content-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['incomplete-form-title'],
                    styles['incomplete-form-title-tablet'],
                  ].join(' ')}
                >
                  {t('generalInformation')}
                </div>
                <div
                  className={[
                    styles['form-container'],
                    styles['form-container-tablet'],
                  ].join(' ')}
                >
                  <AccountProfileFormComponent
                    storeProps={storeProps}
                    values={accountProps.profileForm}
                    errors={accountProps.profileFormErrors}
                    onChangeCallbacks={{
                      firstName: (event) =>
                        AccountController.updateProfile({
                          firstName: event.target.value,
                        }),
                      lastName: (event) =>
                        AccountController.updateProfile({
                          lastName: event.target.value,
                        }),
                      username: (event) => {
                        AccountController.updateProfile({
                          username: event.target.value,
                        });
                        onUsernameChanged(event);
                      },
                      birthday: (event) => {
                        AccountController.updateProfile({
                          birthday: event.currentTarget.value,
                        });
                      },
                      sex: (value) => {
                        AccountController.updateProfile({
                          sex: value,
                        });
                      },
                      phoneNumber: (value, _event, _formattedValue) =>
                        AccountController.updateProfile({
                          phoneNumber: value,
                        }),
                    }}
                  />
                </div>
              </div>
              <div
                className={[
                  styles['incomplete-content'],
                  styles['incomplete-content-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['incomplete-form-title'],
                    styles['incomplete-form-title-tablet'],
                  ].join(' ')}
                >
                  {t('optional')}
                </div>
                <div
                  className={[
                    styles['form-container'],
                    styles['form-container-tablet'],
                  ].join(' ')}
                >
                  <FormLayout
                    classNames={{ label: styles['input-form-layout-label'] }}
                    label={t('interests') ?? undefined}
                  >
                    <Button
                      ref={interestButtonRef}
                      block={true}
                      classNames={{
                        button: [styles['secondary-button']].join(' '),
                      }}
                      type={'primary'}
                      size={'large'}
                      rippleProps={{
                        color: 'rgba(133, 38, 122, 0.35)',
                      }}
                      icon={<Line.Add size={24} />}
                      onClick={() => setIsAddInterestOpen(true)}
                    >
                      {t('addInterest')}
                    </Button>
                  </FormLayout>
                  <div
                    className={[
                      styles['selected-interests-container'],
                      styles['selected-interests-container-tablet'],
                    ].join(' ')}
                  >
                    {Object.values(accountProps.selectedInterests).map(
                      (value: InterestResponse) => {
                        return (
                          <Button
                            size={'tiny'}
                            rounded={true}
                            classNames={{
                              button: [
                                styles['secondary-button'],
                                styles['interest-selected'],
                              ].join(' '),
                            }}
                            rippleProps={{
                              color: 'rgba(133, 38, 122, 0.35)',
                            }}
                            onClick={() =>
                              AccountController.updateSelectedInterest(value)
                            }
                          >
                            {value.name}
                          </Button>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
              <div
                className={[
                  styles['incomplete-content'],
                  styles['incomplete-content-tablet'],
                ].join(' ')}
              >
                <Button
                  touchScreen={true}
                  classNames={{
                    container: [
                      styles['submit-button-container'],
                      styles['submit-button-container-tablet'],
                    ].join(' '),
                    button: [
                      styles['submit-button'],
                      styles['submit-button-tablet'],
                    ].join(' '),
                  }}
                  block={true}
                  size={'large'}
                  icon={<Line.Done size={24} />}
                  onClick={onCompleteProfile}
                  loading={accountProps.isCreateCustomerLoading}
                  loadingComponent={
                    <img
                      src={'../assets/svg/ring-resize-light.svg'}
                      style={{ height: 24 }}
                      className={[
                        styles['loading-ring'],
                        styles['loading-ring-tablet'],
                      ].join(' ')}
                    />
                  }
                >
                  {t('complete')}
                </Button>
              </div>
            </div>
          )}
          {account?.status === 'Complete' && (
            <>
              <div
                className={[
                  styles['top-content'],
                  styles['top-content-tablet'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['status-container'],
                    styles['status-container-tablet'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['avatar-content'],
                      styles['avatar-content-tablet'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['avatar-container'],
                        styles['avatar-container-tablet'],
                      ].join(' ')}
                    >
                      <Avatar
                        classNames={{
                          button: {
                            button: [
                              styles['avatar-button'],
                              styles['avatar-button-tablet'],
                            ].join(' '),
                          },
                          cropImage: {
                            overlay: {
                              background: [
                                styles['avatar-overlay-background'],
                                styles['avatar-overlay-background-tablet'],
                              ].join(' '),
                            },
                            saveButton: {
                              button: [styles['avatar-save-button']].join(' '),
                            },
                          },
                        }}
                        text={customer?.first_name}
                        src={accountProps.profileUrl}
                        editMode={true}
                        onChange={onAvatarChanged}
                        loading={accountProps.isAvatarUploadLoading}
                        loadingComponent={
                          <img
                            src={'../assets/svg/ring-resize-light.svg'}
                            style={{ height: 24 }}
                            className={[
                              styles['loading-ring'],
                              styles['loading-ring-tablet'],
                            ].join(' ')}
                          />
                        }
                        onLoading={(value) =>
                          AccountController.updateIsAvatarUploadLoading(value)
                        }
                        size={'large'}
                        isModalVisible={isCropImageModalVisible}
                        onModalVisible={(value) =>
                          setIsCropImageModalVisible(value)
                        }
                      />
                    </div>
                  </div>
                  <div
                    className={[
                      styles['followers-status-container'],
                      styles['followers-status-container-tablet'],
                    ].join(' ')}
                  >
                    {likeCount !== undefined && (
                      <div
                        className={[
                          styles['followers-status-item'],
                          styles['followers-status-item-tablet'],
                        ].join(' ')}
                        onClick={onLikesClick}
                      >
                        <div
                          className={[
                            styles['followers-status-value'],
                            styles['followers-status-value-tablet'],
                          ].join(' ')}
                        >
                          {likeCount}
                        </div>
                        <div
                          className={[
                            styles['followers-status-name'],
                            styles['followers-status-name-tablet'],
                          ].join(' ')}
                        >
                          {t('likes')}
                        </div>
                      </div>
                    )}
                    {likeCount === undefined && (
                      <div
                        className={[
                          styles['followers-status-item'],
                          styles['followers-status-item-tablet'],
                        ].join(' ')}
                      >
                        <div
                          className={[
                            styles['followers-status-value'],
                            styles['followers-status-value-tablet'],
                          ].join(' ')}
                        >
                          <Skeleton width={30} height={19} borderRadius={19} />
                        </div>
                        <div
                          className={[
                            styles['followers-status-name'],
                            styles['followers-status-name-tablet'],
                          ].join(' ')}
                        >
                          <Skeleton width={55} height={19} borderRadius={19} />
                        </div>
                      </div>
                    )}
                    {followerCount !== undefined && (
                      <div
                        className={[
                          styles['followers-status-item'],
                          styles['followers-status-item-tablet'],
                        ].join(' ')}
                        onClick={onFollowersClick}
                      >
                        <div
                          className={[
                            styles['followers-status-value'],
                            styles['followers-status-value-tablet'],
                          ].join(' ')}
                        >
                          {followerCount}
                        </div>
                        <div
                          className={[
                            styles['followers-status-name'],
                            styles['followers-status-name-tablet'],
                          ].join(' ')}
                        >
                          {t('followers')}
                        </div>
                      </div>
                    )}
                    {followerCount === undefined && (
                      <div
                        className={[
                          styles['followers-status-item'],
                          styles['followers-status-item-tablet'],
                        ].join(' ')}
                      >
                        <div
                          className={[
                            styles['followers-status-value'],
                            styles['followers-status-value-tablet'],
                          ].join(' ')}
                        >
                          <Skeleton width={30} height={19} borderRadius={19} />
                        </div>
                        <div
                          className={[
                            styles['followers-status-name'],
                            styles['followers-status-name-tablet'],
                          ].join(' ')}
                        >
                          <Skeleton width={55} height={19} borderRadius={19} />
                        </div>
                      </div>
                    )}
                    {followingCount !== undefined && (
                      <div
                        className={[
                          styles['followers-status-item'],
                          styles['followers-status-item-tablet'],
                        ].join(' ')}
                        onClick={onFollowingClick}
                      >
                        <div
                          className={[
                            styles['followers-status-value'],
                            styles['followers-status-value-tablet'],
                          ].join(' ')}
                        >
                          {followingCount}
                        </div>
                        <div
                          className={[
                            styles['followers-status-name'],
                            styles['followers-status-name-tablet'],
                          ].join(' ')}
                        >
                          {t('following')}
                        </div>
                      </div>
                    )}
                    {followingCount === undefined && (
                      <div
                        className={[
                          styles['followers-status-item'],
                          styles['followers-status-item-tablet'],
                        ].join(' ')}
                      >
                        <div
                          className={[
                            styles['followers-status-value'],
                            styles['followers-status-value-tablet'],
                          ].join(' ')}
                        >
                          <Skeleton width={30} height={19} borderRadius={19} />
                        </div>
                        <div
                          className={[
                            styles['followers-status-name'],
                            styles['followers-status-name-tablet'],
                          ].join(' ')}
                        >
                          <Skeleton width={55} height={19} borderRadius={19} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={[
                    styles['username'],
                    styles['username-tablet'],
                  ].join(' ')}
                >
                  {customer ? (
                    `${customer?.first_name} ${customer?.last_name}`
                  ) : (
                    <Skeleton
                      count={1}
                      borderRadius={9999}
                      width={120}
                      className={[
                        styles['skeleton-user'],
                        styles['skeleton-user-tablet'],
                      ].join(' ')}
                    />
                  )}
                </div>
              </div>

              <div
                className={[
                  styles['tabs-container'],
                  styles['tabs-container-tablet'],
                ].join(' ')}
              >
                <Tabs
                  flex={true}
                  touchScreen={true}
                  activeId={accountProps.activeTabId}
                  classNames={{
                    nav: [styles['tab-nav'], styles['tab-nav-tablet']].join(
                      ' '
                    ),
                    tabButton: [
                      styles['tab-button'],
                      styles['tab-button-tablet'],
                    ].join(''),
                    tabOutline: [
                      styles['tab-outline'],
                      styles['tab-outline-tablet'],
                    ].join(' '),
                  }}
                  onChange={(id) => {
                    AccountController.updateActiveTabId(id);
                    navigate({ pathname: id, search: query.toString() });
                  }}
                  type={'underlined'}
                  tabs={[
                    {
                      id: RoutePathsType.AccountLikes,
                      icon: <Line.FavoriteBorder size={24} />,
                    },
                    {
                      id: RoutePathsType.AccountOrderHistory,
                      icon: <Line.History size={24} />,
                    },
                    {
                      id: RoutePathsType.AccountAddresses,
                      icon: <Line.LocationOn size={24} />,
                    },
                  ]}
                />
              </div>
              <div
                className={[
                  styles['outlet-container'],
                  styles['outlet-container-tablet'],
                ].join(' ')}
              >
                <TransitionGroup
                  component={null}
                  childFactory={(child) =>
                    React.cloneElement(child, {
                      classNames: {
                        enter:
                          accountProps.activeTabIndex >
                          accountProps.prevTabIndex
                            ? styles['left-to-right-enter']
                            : styles['right-to-left-enter'],
                        enterActive:
                          accountProps.activeTabIndex >
                          accountProps.prevTabIndex
                            ? styles['left-to-right-enter-active']
                            : styles['right-to-left-enter-active'],
                        exit:
                          accountProps.activeTabIndex >
                          accountProps.prevTabIndex
                            ? styles['left-to-right-exit']
                            : styles['right-to-left-exit'],
                        exitActive:
                          accountProps.activeTabIndex >
                          accountProps.prevTabIndex
                            ? styles['left-to-right-exit-active']
                            : styles['right-to-left-exit-active'],
                      },
                      timeout: 250,
                    })
                  }
                >
                  <CSSTransition
                    key={accountProps.activeTabIndex}
                    classNames={{
                      enter:
                        accountProps.activeTabIndex < accountProps.prevTabIndex
                          ? styles['left-to-right-enter']
                          : styles['right-to-left-enter'],
                      enterActive:
                        accountProps.activeTabIndex < accountProps.prevTabIndex
                          ? styles['left-to-right-enter-active']
                          : styles['right-to-left-enter-active'],
                      exit:
                        accountProps.activeTabIndex < accountProps.prevTabIndex
                          ? styles['left-to-right-exit']
                          : styles['right-to-left-exit'],
                      exitActive:
                        accountProps.activeTabIndex < accountProps.prevTabIndex
                          ? styles['left-to-right-exit-active']
                          : styles['right-to-left-exit-active'],
                    }}
                    timeout={250}
                    unmountOnExit={false}
                  >
                    <div style={{ minWidth: '100%', minHeight: '100%' }}>
                      <Outlet context={{ scrollContainerRef }} />
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              </div>
            </>
          )}
        </div>
      </div>
      {ReactDOM.createPortal(
        <>
          <Dropdown
            classNames={{
              touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
            }}
            open={isAddInterestOpen}
            anchorRef={interestButtonRef}
            align={DropdownAlignment.Left}
            style={{ width: interestButtonRef.current?.clientWidth }}
            onClose={() => setIsAddInterestOpen(false)}
            onOpen={() => {
              interestInputRef.current?.focus();
            }}
          >
            <Dropdown.Item
              classNames={{
                container: styles['dropdown-item-container-search'],
                button: {
                  button: [
                    styles['dropdown-item-button-search'],
                    styles['dropdown-item-button-search-tablet'],
                  ].join(' '),
                },
              }}
              rippleProps={{ color: 'rgba(0,0,0,0)' }}
            >
              <div
                className={[
                  styles['search-container'],
                  styles['search-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['search-input-root'],
                    styles['search-input-root-desktop'],
                  ].join(' ')}
                >
                  <Input
                    inputRef={interestInputRef}
                    value={accountProps.addInterestInput}
                    classNames={{
                      container: [
                        styles['search-input-container'],
                        styles['search-input-container-desktop'],
                      ].join(' '),
                      input: [
                        styles['search-input'],
                        styles['search-input-desktop'],
                      ].join(' '),
                    }}
                    placeholder={t('search') ?? ''}
                    icon={<Line.Search size={24} color={'#2A2A5F'} />}
                    onChange={(event) =>
                      AccountController.updateAddInterestInput(
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item
              classNames={{
                container: styles['dropdown-item-container-interests'],
                button: {
                  button: styles['dropdown-item-button-interests'],
                  children: styles['dropdown-item-button-children-interests'],
                },
              }}
              rippleProps={{ color: 'rgba(0,0,0,0)' }}
            >
              {!accountProps.areAddInterestsLoading &&
                accountProps.creatableInterest && (
                  <Button
                    classNames={{
                      button: styles['secondary-button'],
                    }}
                    size={'tiny'}
                    rounded={true}
                    icon={<Line.Add size={24} />}
                    rippleProps={{
                      color: 'rgba(133, 38, 122, 0.35)',
                    }}
                    onClick={() =>
                      AccountController.addInterestsCreateAsync(
                        accountProps.creatableInterest ?? ''
                      )
                    }
                  >
                    {accountProps.creatableInterest}
                  </Button>
                )}
              {accountProps.searchedInterests.map((value: InterestResponse) => {
                return (
                  <Button
                    size={'tiny'}
                    rounded={true}
                    classNames={{
                      button: [
                        styles['secondary-button'],
                        Object.keys(accountProps.selectedInterests).includes(
                          value.id
                        ) && styles['interest-selected'],
                      ].join(' '),
                    }}
                    rippleProps={{
                      color: 'rgba(133, 38, 122, 0.35)',
                    }}
                    onClick={() =>
                      AccountController.updateSelectedInterest(value)
                    }
                  >
                    {value.name}
                  </Button>
                );
              })}
            </Dropdown.Item>
            <Dropdown.Item
              classNames={{
                container: styles['dropdown-item-container-loading'],
                button: {
                  button: styles['dropdown-item-button-loading'],
                },
              }}
              rippleProps={{ color: 'rgba(0,0,0,0)' }}
            >
              <img
                src={'../assets/svg/ring-resize-dark.svg'}
                className={styles['loading-ring']}
                style={{
                  maxHeight: accountProps.areAddInterestsLoading ? 24 : 0,
                  width: '100%',
                }}
              />
            </Dropdown.Item>
          </Dropdown>
        </>,
        document.body
      )}
    </ResponsiveTablet>
  );
}
