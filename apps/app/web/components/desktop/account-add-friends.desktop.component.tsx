import {
  Button,
  Dropdown,
  DropdownAlignment,
  FormLayout,
  Input,
  Line,
  Slider,
} from '@fuoco.appdev/web-components';
import convert from 'convert';
import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePathsType } from '../../../shared/route-paths-type';
import styles from '../../modules/account-add-friends.module.scss';
import { useQuery } from '../../route-paths';
import { AccountAddFriendsResponsiveProps } from '../account-add-friends.component';
import AccountFollowItemComponent from '../account-follow-item.component';
import { DIContext } from '../app.component';
import { ResponsiveDesktop } from '../responsive.component';

function AccountAddFriendsDesktopComponent({
  locationDropdownOpen,
  setLocationDropdownOpen,
}: AccountAddFriendsResponsiveProps): JSX.Element {
  const navigate = useNavigate();
  const query = useQuery();
  const { t } = useTranslation();
  const locationInputRef = useRef<HTMLInputElement | null>(null);
  const { AccountController } = React.useContext(DIContext);
  const {
    addFriendsSearchInput,
    addFriendsLocationInput,
    addFriendsRadiusMeters,
    addFriendsSex,
    followRequestAccounts,
    followRequestAccountFollowers,
    addFriendAccounts,
    addFriendAccountFollowers,
    hasMoreAddFriends,
    areAddFriendsLoading,
    addFriendsLocationGeocoding,
  } = AccountController.model;
  return (
    <ResponsiveDesktop>
      <div className={[styles['root'], styles['root-desktop']].join(' ')}>
        <div
          className={[
            styles['side-bar-container'],
            styles['side-bar-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['filter-title'],
              styles['filter-title-desktop'],
            ].join(' ')}
          >
            {t('filter')}
          </div>
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
                value={addFriendsSearchInput}
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
                onChange={(event) => {
                  // AccountController.updateAddFriendsSearchInput(
                  //   event.target.value
                  // )
                }}
              />
            </div>
          </div>
          <Input
            inputRef={locationInputRef}
            classNames={{
              root: styles['input-root'],
              formLayout: { label: styles['input-form-layout-label'] },
              input: styles['input'],
              container: styles['input-container'],
            }}
            label={t('location') ?? ''}
            value={addFriendsLocationInput}
            onChange={(event) => {
              // AccountController.updateAddFriendsLocationInput(
              //   event.target.value
              // )
            }}
            onFocus={() => {
              setLocationDropdownOpen(true);
              locationInputRef.current?.select();
            }}
          />
          <FormLayout
            classNames={{
              label: styles['input-form-layout-label'],
              labelAfter: styles['input-form-layout-label'],
            }}
            label={t('radius') ?? undefined}
            afterLabel={`${convert(addFriendsRadiusMeters, 'meters')
              .to('km')
              .toFixed()} ${t('km')}`}
          >
            <Slider
              min={1000}
              max={1000000}
              value={addFriendsRadiusMeters}
              onChange={(e) => {
                // AccountController.updateAddFriendsRadiusMeters(
                //   Number(e.currentTarget.value)
                // )
              }}
            />
          </FormLayout>
          <FormLayout
            classNames={{ label: styles['input-form-layout-label'] }}
            label={t('sex') ?? undefined}
          >
            <div
              className={[
                styles['sex-options'],
                styles['sex-options-desktop'],
              ].join(' ')}
            >
              <Button
                block={true}
                classNames={{
                  button: [
                    styles['button'],
                    addFriendsSex === 'any' && styles['button-selected'],
                  ].join(' '),
                }}
                type={'primary'}
                size={'large'}
                rippleProps={{
                  color: 'rgba(133, 38, 122, 0.35)',
                }}
                onClick={() => {
                  // AccountController.updateAddFriendsSex('any')
                }}
              >
                {t('any')}
              </Button>
              <Button
                block={true}
                classNames={{
                  button: [
                    styles['button'],
                    addFriendsSex === 'male' && styles['button-selected'],
                  ].join(' '),
                }}
                type={'primary'}
                size={'large'}
                rippleProps={{
                  color: 'rgba(133, 38, 122, 0.35)',
                }}
                onClick={() => {
                  // AccountController.updateAddFriendsSex('male')
                }}
              >
                {t('male')}
              </Button>
              <Button
                block={true}
                classNames={{
                  button: [
                    styles['button'],
                    addFriendsSex === 'female' && styles['button-selected'],
                  ].join(' '),
                }}
                type={'primary'}
                size={'large'}
                rippleProps={{
                  color: 'rgba(133, 38, 122, 0.35)',
                }}
                onClick={() => {
                  // AccountController.updateAddFriendsSex('female')
                }}
              >
                {t('female')}
              </Button>
            </div>
          </FormLayout>
        </div>
        <div
          className={[
            styles['scroll-content'],
            styles['scroll-content-desktop'],
          ].join(' ')}
        >
          {followRequestAccounts.length > 0 &&
            addFriendsSearchInput.length <= 0 && (
              <div
                className={[
                  styles['follower-request-items-container'],
                  styles['follower-request-items-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[styles['title'], styles['title-desktop']].join(
                    ' '
                  )}
                >
                  {t('followerRequests')}
                </div>
                {followRequestAccounts.map((value) => {
                  const accountFollowerRequest = Object.keys(
                    followRequestAccountFollowers
                  ).includes(value.id ?? '')
                    ? followRequestAccountFollowers[value.id ?? '']
                    : null;
                  return (
                    <AccountFollowItemComponent
                      key={value.id}
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

          <div className={[styles['title'], styles['title-desktop']].join(' ')}>
            {t('results')}
          </div>
          <div
            className={[
              styles['result-items-container'],
              styles['result-items-container-desktop'],
            ].join(' ')}
          >
            {addFriendAccounts.map((value) => {
              const accountFollower = Object.keys(
                addFriendAccountFollowers
              ).includes(value.id ?? '')
                ? addFriendAccountFollowers[value.id ?? '']
                : null;
              return (
                <AccountFollowItemComponent
                  key={value.id}
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
                maxHeight: hasMoreAddFriends || areAddFriendsLoading ? 24 : 0,
              }}
            />
            {!hasMoreAddFriends && addFriendAccounts.length <= 0 && (
              <div
                className={[
                  styles['no-items-container'],
                  styles['no-items-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['no-items-text'],
                    styles['no-items-text-desktop'],
                  ].join(' ')}
                >
                  {t('noFriendsFound', {
                    username: addFriendsSearchInput,
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {ReactDOM.createPortal(
        <Dropdown
          classNames={{
            touchscreenOverlay: styles['dropdown-touchscreen-overlay'],
          }}
          open={locationDropdownOpen}
          anchorRef={locationInputRef}
          align={DropdownAlignment.Left}
          onClose={() => setLocationDropdownOpen(false)}
          onOpen={() => {
            locationInputRef.current?.focus();
          }}
        >
          {addFriendsLocationGeocoding?.features.map((feature) => (
            <Dropdown.Item
              classNames={{
                container: styles['dropdown-item-container'],
                button: {
                  button: styles['dropdown-item-button'],
                },
              }}
              onClick={() => {
                //AccountController.updateAddFriendsLocationFeature(feature);
                locationInputRef.current?.blur();
                setLocationDropdownOpen(false);
              }}
              rippleProps={{ color: 'rgba(133, 38, 122, 0.35)' }}
            >
              <div
                className={[
                  styles['place-name'],
                  styles['place-name-desktop'],
                ].join(' ')}
              >
                {feature.place_name}
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown>,
        document.body
      )}
    </ResponsiveDesktop>
  );
}

export default observer(AccountAddFriendsDesktopComponent);
