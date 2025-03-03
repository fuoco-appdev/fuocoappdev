/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jsx-a11y/alt-text */
import {
  Avatar,
  Button,
  Dropdown,
  DropdownAlignment,
  FormLayout,
  Input,
  Line,
  Scroll,
  Tabs,
} from '@fuoco.appdev/web-components';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { Outlet, useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { InterestResponse } from '../../../shared/protobuf/interest_pb';
import { RoutePathsType } from '../../../shared/route-paths-type';
import styles from '../../modules/account.module.scss';
import { useQuery } from '../../route-paths';
import AccountProfileFormComponent from '../account-profile-form.component';
import { AccountResponsiveProps } from '../account.component';
import { DIContext } from '../app.component';
import { ResponsiveDesktop } from '../responsive.component';

function AccountDesktopComponent({
  isCropImageModalVisible,
  likeCount,
  followerCount,
  followingCount,
  isAddInterestOpen,
  setIsAddInterestOpen,
  setIsCropImageModalVisible,
  onUsernameChanged,
  onCompleteProfile,
  onScrollLoad,
  onAvatarChanged,
  onLikesClick,
  onFollowersClick,
  onFollowingClick,
}: AccountResponsiveProps): JSX.Element {
  const scrollContainerRef = React.createRef<HTMLDivElement>();
  const topBarRef = React.useRef<HTMLDivElement | null>(null);
  const interestButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const interestInputRef = React.useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();
  const { AccountController } = React.useContext(DIContext);
  const {
    account,
    customer,
    activeTabId,
    areLikedProductsLoading,
    areOrdersLoading,
    profileForm,
    profileFormErrors,
    isCreateCustomerLoading,
    selectedInterests,
    profileUrl,
    isAvatarUploadLoading,
    activeTabIndex,
    prevTabIndex,
    addInterestInput,
    areAddInterestsLoading,
    creatableInterest,
    searchedInterests,
  } = AccountController.model;
  let prevPreviewScrollTop = 0;
  let yPosition = 0;

  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          ref={topBarRef}
          className={[styles['top-bar'], styles['top-bar-desktop']].join(' ')}
        >
          <div
            className={[
              styles['left-tab-container'],
              styles['left-tab-container-desktop'],
            ].join(' ')}
          >
            {account?.status === 'Complete' && (
              <div
                className={[
                  styles['top-bar-text-container'],
                  styles['top-bar-text-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['top-bar-text'],
                    styles['top-bar-username'],
                    styles['top-bar-text-desktop'],
                  ].join(' ')}
                >
                  {account?.username}
                </div>
              </div>
            )}
          </div>
          <div
            className={[
              styles['center-tab-container'],
              styles['center-tab-container-desktop'],
            ].join(' ')}
          >
            {account?.status === 'Incomplete' && (
              <div
                className={[
                  styles['top-bar-text-container'],
                  styles['top-bar-text-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['top-bar-text'],
                    styles['top-bar-text-desktop'],
                  ].join(' ')}
                >
                  {t('completeProfile')}
                </div>
              </div>
            )}
          </div>
          <div
            className={[
              styles['right-tab-container'],
              styles['right-tab-container-desktop'],
            ].join(' ')}
          >
            {account?.status === 'Complete' && (
              <div
                className={[
                  styles['tab-button-container'],
                  styles['tab-button-container-desktop'],
                ].join(' ')}
              >
                <Button
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
          </div>
        </div>
        <Scroll
          loadComponent={
            <img
              src={'../assets/svg/ring-resize-dark.svg'}
              className={styles['loading-ring']}
            />
          }
          loadingHeight={56}
          showIndicatorThreshold={56}
          reloadThreshold={96}
          pullIndicatorComponent={
            <div className={[styles['pull-indicator-container']].join(' ')}>
              <Line.ArrowDownward size={24} />
            </div>
          }
          isLoadable={activeTabId !== RoutePathsType.AccountAddresses}
          isLoading={areLikedProductsLoading || areOrdersLoading}
          onLoad={onScrollLoad}
          onScroll={(progress, scrollRef, contentRef) => {
            const elementHeight = topBarRef.current?.clientHeight ?? 0;
            const scrollTop =
              contentRef.current?.getBoundingClientRect().top ?? 0;
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
          <div
            className={[
              styles['scroll-content'],
              styles['scroll-content-desktop'],
            ].join(' ')}
          >
            {account?.status === 'Incomplete' && (
              <div
                className={[
                  styles['incomplete-form-container'],
                  styles['incomplete-form-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['incomplete-content'],
                    styles['incomplete-content-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['incomplete-form-title'],
                      styles['incomplete-form-title-desktop'],
                    ].join(' ')}
                  >
                    {t('generalInformation')}
                  </div>
                  <div
                    className={[
                      styles['form-container'],
                      styles['form-container-desktop'],
                    ].join(' ')}
                  >
                    <AccountProfileFormComponent
                      values={profileForm}
                      errors={profileFormErrors}
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
                  <div>
                    <Button
                      touchScreen={true}
                      classNames={{
                        container: [
                          styles['submit-button-container'],
                          styles['submit-button-container-desktop'],
                        ].join(' '),
                        button: [
                          styles['submit-button'],
                          styles['submit-button-desktop'],
                        ].join(' '),
                      }}
                      block={true}
                      size={'large'}
                      icon={<Line.Done size={24} />}
                      onClick={onCompleteProfile}
                      loading={isCreateCustomerLoading}
                      loadingComponent={
                        <img
                          src={'../assets/svg/ring-resize-light.svg'}
                          style={{ height: 24 }}
                          className={[
                            styles['loading-ring'],
                            styles['loading-ring-desktop'],
                          ].join(' ')}
                        />
                      }
                    >
                      {t('complete')}
                    </Button>
                  </div>
                </div>
                <div
                  className={[
                    styles['incomplete-content'],
                    styles['incomplete-content-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['incomplete-form-title'],
                      styles['incomplete-form-title-desktop'],
                    ].join(' ')}
                  >
                    {t('optional')}
                  </div>
                  <div
                    className={[
                      styles['form-container'],
                      styles['form-container-desktop'],
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
                        styles['selected-interests-container-desktop'],
                      ].join(' ')}
                    >
                      {Object.values(selectedInterests).map(
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
              </div>
            )}
            {account?.status === 'Complete' && (
              <>
                <div
                  className={[
                    styles['top-content'],
                    styles['top-content-desktop'],
                  ].join(' ')}
                >
                  <div
                    className={[
                      styles['status-container'],
                      styles['status-container-desktop'],
                    ].join(' ')}
                  >
                    <div
                      className={[
                        styles['avatar-content'],
                        styles['avatar-content-desktop'],
                      ].join(' ')}
                    >
                      <div
                        className={[
                          styles['avatar-container'],
                          styles['avatar-container-desktop'],
                        ].join(' ')}
                      >
                        <Avatar
                          classNames={{
                            button: {
                              button: [
                                styles['avatar-button'],
                                styles['avatar-button-desktop'],
                              ].join(' '),
                            },
                            cropImage: {
                              overlay: {
                                background: [
                                  styles['avatar-overlay-background'],
                                  styles['avatar-overlay-background-desktop'],
                                ].join(' '),
                              },
                              saveButton: {
                                button: [styles['avatar-save-button']].join(
                                  ' '
                                ),
                              },
                            },
                          }}
                          text={customer?.first_name ?? ''}
                          src={profileUrl}
                          editMode={true}
                          onChange={onAvatarChanged}
                          loading={isAvatarUploadLoading}
                          loadingComponent={
                            <img
                              src={'../assets/svg/ring-resize-light.svg'}
                              style={{ height: 24 }}
                              className={[
                                styles['loading-ring'],
                                styles['loading-ring-desktop'],
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
                  </div>
                  <div
                    className={[
                      styles['username'],
                      styles['username-desktop'],
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
                          styles['skeleton-user-desktop'],
                        ].join(' ')}
                      />
                    )}
                  </div>
                  <div
                    className={[
                      styles['followers-status-container'],
                      styles['followers-status-container-desktop'],
                    ].join(' ')}
                  >
                    {likeCount !== undefined && (
                      <div
                        className={[
                          styles['followers-status-item'],
                          styles['followers-status-item-desktop'],
                        ].join(' ')}
                        onClick={onLikesClick}
                      >
                        <div
                          className={[
                            styles['followers-status-value'],
                            styles['followers-status-value-desktop'],
                          ].join(' ')}
                        >
                          {likeCount}
                        </div>
                        <div
                          className={[
                            styles['followers-status-name'],
                            styles['followers-status-name-desktop'],
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
                          styles['followers-status-item-desktop'],
                        ].join(' ')}
                      >
                        <div
                          className={[
                            styles['followers-status-value'],
                            styles['followers-status-value-desktop'],
                          ].join(' ')}
                        >
                          <Skeleton width={30} height={19} borderRadius={19} />
                        </div>
                        <div
                          className={[
                            styles['followers-status-name'],
                            styles['followers-status-name-desktop'],
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
                          styles['followers-status-item-desktop'],
                        ].join(' ')}
                        onClick={onFollowersClick}
                      >
                        <div
                          className={[
                            styles['followers-status-value'],
                            styles['followers-status-value-desktop'],
                          ].join(' ')}
                        >
                          {followerCount}
                        </div>
                        <div
                          className={[
                            styles['followers-status-name'],
                            styles['followers-status-name-desktop'],
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
                          styles['followers-status-item-desktop'],
                        ].join(' ')}
                      >
                        <div
                          className={[
                            styles['followers-status-value'],
                            styles['followers-status-value-desktop'],
                          ].join(' ')}
                        >
                          <Skeleton width={30} height={19} borderRadius={19} />
                        </div>
                        <div
                          className={[
                            styles['followers-status-name'],
                            styles['followers-status-name-desktop'],
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
                          styles['followers-status-item-desktop'],
                        ].join(' ')}
                        onClick={onFollowingClick}
                      >
                        <div
                          className={[
                            styles['followers-status-value'],
                            styles['followers-status-value-desktop'],
                          ].join(' ')}
                        >
                          {followingCount}
                        </div>
                        <div
                          className={[
                            styles['followers-status-name'],
                            styles['followers-status-name-desktop'],
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
                          styles['followers-status-item-desktop'],
                        ].join(' ')}
                      >
                        <div
                          className={[
                            styles['followers-status-value'],
                            styles['followers-status-value-desktop'],
                          ].join(' ')}
                        >
                          <Skeleton width={30} height={19} borderRadius={19} />
                        </div>
                        <div
                          className={[
                            styles['followers-status-name'],
                            styles['followers-status-name-desktop'],
                          ].join(' ')}
                        >
                          <Skeleton width={55} height={19} borderRadius={19} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={[
                      styles['tabs-container'],
                      styles['tabs-container-desktop'],
                    ].join(' ')}
                  >
                    <Tabs
                      flex={true}
                      touchScreen={true}
                      activeId={activeTabId}
                      classNames={{
                        nav: [
                          styles['tab-nav'],
                          styles['tab-nav-desktop'],
                        ].join(' '),
                        tabButton: [
                          styles['tab-button'],
                          styles['tab-button-desktop'],
                        ].join(''),
                        tabOutline: [
                          styles['tab-outline'],
                          styles['tab-outline-desktop'],
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
                </div>
                <div
                  className={[
                    styles['outlet-container'],
                    styles['outlet-container-desktop'],
                  ].join(' ')}
                >
                  <TransitionGroup
                    component={null}
                    childFactory={(child) =>
                      React.cloneElement(child, {
                        classNames: {
                          enter:
                            activeTabIndex > prevTabIndex
                              ? styles['left-to-right-enter']
                              : styles['right-to-left-enter'],
                          enterActive:
                            activeTabIndex > prevTabIndex
                              ? styles['left-to-right-enter-active']
                              : styles['right-to-left-enter-active'],
                          exit:
                            activeTabIndex > prevTabIndex
                              ? styles['left-to-right-exit']
                              : styles['right-to-left-exit'],
                          exitActive:
                            activeTabIndex > prevTabIndex
                              ? styles['left-to-right-exit-active']
                              : styles['right-to-left-exit-active'],
                        },
                        timeout: 250,
                      })
                    }
                  >
                    <CSSTransition
                      key={activeTabIndex}
                      classNames={{
                        enter:
                          activeTabIndex < prevTabIndex
                            ? styles['left-to-right-enter']
                            : styles['right-to-left-enter'],
                        enterActive:
                          activeTabIndex < prevTabIndex
                            ? styles['left-to-right-enter-active']
                            : styles['right-to-left-enter-active'],
                        exit:
                          activeTabIndex < prevTabIndex
                            ? styles['left-to-right-exit']
                            : styles['right-to-left-exit'],
                        exitActive:
                          activeTabIndex < prevTabIndex
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
        </Scroll>
      </div>
      {ReactDOM.createPortal(
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
                  styles['dropdown-item-button-search-desktop'],
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
                  value={addInterestInput}
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
                    AccountController.updateAddInterestInput(event.target.value)
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
            {!areAddInterestsLoading && creatableInterest && (
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
                    creatableInterest ?? ''
                  )
                }
              >
                {creatableInterest}
              </Button>
            )}
            {searchedInterests.map((value: InterestResponse) => {
              return (
                <Button
                  size={'tiny'}
                  rounded={true}
                  classNames={{
                    button: [
                      styles['secondary-button'],
                      Object.keys(selectedInterests).includes(value.id) &&
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
                maxHeight: areAddInterestsLoading ? 24 : 0,
                width: '100%',
              }}
            />
          </Dropdown.Item>
        </Dropdown>,
        document.body
      )}
    </ResponsiveDesktop>
  );
}

export default observer(AccountDesktopComponent);
