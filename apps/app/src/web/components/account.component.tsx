import { lazy } from '@loadable/component';
import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutletContext } from 'react-router-dom';
import AccountController from '../../controllers/account.controller';
import StoreController from '../../controllers/store.controller';
import WindowController from '../../controllers/window.controller';
import { AccountState } from '../../models/account.model';
import { StoreState } from '../../models/store.model';
import { WindowState } from '../../models/window.model';
import { RoutePathsType, useQuery } from '../route-paths';
import { AuthenticatedComponent } from './authenticated.component';
import { AccountSuspenseDesktopComponent } from './desktop/suspense/account.suspense.desktop.component';
import { AccountSuspenseMobileComponent } from './mobile/suspense/account.suspense.mobile.component';

const AccountDesktopComponent = lazy(
  () => import('./desktop/account.desktop.component')
);
const AccountMobileComponent = lazy(
  () => import('./mobile/account.mobile.component')
);

export type AccountOutletContextType = {
  scrollContainerRef: React.RefObject<HTMLDivElement> | undefined;
};

export function useAccountOutletContext() {
  return useOutletContext<AccountOutletContextType>();
}

export interface AccountResponsiveProps {
  windowProps: WindowState;
  accountProps: AccountState;
  storeProps: StoreState;
  isCropImageModalVisible: boolean;
  likeCount: string | undefined;
  followerCount: string | undefined;
  followingCount: string | undefined;
  isAddInterestOpen: boolean;
  setIsAddInterestOpen: (value: boolean) => void;
  setIsCropImageModalVisible: (value: boolean) => void;
  onUsernameChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompleteProfile: () => void;
  onScrollReload: () => void;
  onScrollLoad: () => void;
  onAvatarChanged: (index: number, blob: Blob) => void;
  onLikesClick: () => void;
  onFollowersClick: () => void;
  onFollowingClick: () => void;
}

export default function AccountComponent(): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();
  const [accountProps] = useObservable(AccountController.model.store);
  const [windowProps] = useObservable(WindowController.model.store);
  const [storeProps] = useObservable(StoreController.model.store);
  const [isCropImageModalVisible, setIsCropImageModalVisible] =
    React.useState<boolean>(false);
  const [likeCount, setLikeCount] = React.useState<string | undefined>(
    undefined
  );
  const [followerCount, setFollowerCount] = React.useState<string | undefined>(
    undefined
  );
  const [followingCount, setFollowingCount] = React.useState<
    string | undefined
  >(undefined);
  const [isAddInterestOpen, setIsAddInterestOpen] =
    React.useState<boolean>(false);
  const renderCountRef = React.useRef<number>(0);

  const onScrollReload = () => {
    if (AccountController.model.activeTabId === RoutePathsType.AccountLikes) {
      AccountController.reloadLikedProducts();
    } else if (
      AccountController.model.activeTabId === RoutePathsType.AccountOrderHistory
    ) {
      AccountController.reloadOrders();
    } else if (AccountController.model.activeTabId === RoutePathsType.AccountAddresses) {

    }
  };

  const onScrollLoad = () => {
    if (AccountController.model.activeTabId === RoutePathsType.AccountLikes) {
      AccountController.onNextLikedProductScrollAsync();
    } else if (
      AccountController.model.activeTabId === RoutePathsType.AccountOrderHistory
    ) {
      AccountController.onNextOrderScrollAsync();
    } else if (AccountController.model.activeTabId === RoutePathsType.AccountAddresses) {

    }
  };

  const onUsernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    AccountController.checkIfUsernameExists(event.target.value);
  };

  const onCompleteProfile = async () => {
    AccountController.updateProfileErrors({
      firstName: undefined,
      lastName: undefined,
      username: undefined,
      phoneNumber: undefined,
    });
    const errors = await AccountController.getProfileFormErrorsAsync(
      AccountController.model.profileForm
    );
    if (errors) {
      AccountController.updateProfileErrors(errors);
      return;
    }
    AccountController.completeProfileAsync();
  };

  const onAvatarChanged = async (index: number, blob: Blob) => {
    await AccountController.uploadAvatarAsync(index, blob);
    setIsCropImageModalVisible(false);
  };

  const onLikesClick = () => {
    navigate({
      pathname: RoutePathsType.AccountLikes,
      search: query.toString(),
    });
  };

  const onFollowersClick = () => {
    navigate({
      pathname: `${RoutePathsType.AccountStatus}/${accountProps.account?.id}/followers`,
      search: query.toString(),
    });
  };

  const onFollowingClick = () => {
    navigate({
      pathname: `${RoutePathsType.AccountStatus}/${accountProps.account?.id}/following`,
      search: query.toString(),
    });
  };

  React.useEffect(() => {
    AccountController.updateErrorStrings({
      empty: t('fieldEmptyError') ?? '',
      exists: t('fieldExistsError') ?? '',
      spaces: t('fieldSpacesError') ?? '',
    });
  }, [i18n.language]);

  React.useEffect(() => {
    renderCountRef.current += 1;
    AccountController.load(renderCountRef.current);
    if (windowProps.activeRoute === RoutePathsType.Account) {
      navigate({
        pathname: RoutePathsType.AccountLikes,
        search: query.toString(),
      });
    }

    return () => {
      AccountController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (accountProps.likeCount !== undefined) {
      setLikeCount(
        new Intl.NumberFormat(i18n.language).format(accountProps.likeCount)
      );
    }

    if (accountProps.followerCount !== undefined) {
      setFollowerCount(
        new Intl.NumberFormat(i18n.language).format(accountProps.followerCount)
      );
    }

    if (accountProps.followingCount !== undefined) {
      setFollowingCount(
        new Intl.NumberFormat(i18n.language).format(accountProps.followingCount)
      );
    }
  }, [
    accountProps.likeCount,
    accountProps.followerCount,
    accountProps.followingCount,
  ]);

  React.useEffect(() => {
    const loadedLocation = windowProps.loadedLocationPath as string | undefined;
    if (loadedLocation && loadedLocation !== RoutePathsType.Account) {
      if (
        loadedLocation.startsWith(RoutePathsType.Account) &&
        !WindowController.isLocationAccountWithId(loadedLocation) &&
        !loadedLocation.startsWith(RoutePathsType.Settings)
      ) {
        AccountController.updateActiveTabId(loadedLocation);
      }
      WindowController.updateLoadedLocationPath(undefined);
    } else {
      if (!loadedLocation?.startsWith(RoutePathsType.Settings)) {
        navigate({
          pathname: accountProps.activeTabId,
          search: query.toString(),
        });
      }
    }
  }, [windowProps.loadedLocationPath]);

  React.useEffect(() => {
    if (AccountController.model.activeTabId === location.pathname) {
      return;
    }

    if (location.pathname === RoutePathsType.AccountLikes) {
      AccountController.updateActiveTabId(RoutePathsType.AccountLikes);
    } else if (location.pathname === RoutePathsType.AccountOrderHistory) {
      AccountController.updateActiveTabId(RoutePathsType.AccountOrderHistory);
    } else if (location.pathname === RoutePathsType.AccountAddresses) {
      AccountController.updateActiveTabId(RoutePathsType.AccountAddresses);
    }
  }, [location.pathname]);

  const suspenceComponent = (
    <>
      <AccountSuspenseDesktopComponent />
      <AccountSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenceComponent;
  }

  return (
    <>
      <Helmet>
        <title>Cruthology</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="title" content={'Cruthology'} />
        <meta
          name="description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta
          property="og:image"
          content={'https://cruthology.com/assets/opengraph/opengraph.jpg'}
        />
        <meta property="og:title" content={'Cruthology'} />
        <meta
          property="og:description"
          content={
            'An exclusive wine club offering high-end dinners, entertainment, and enchanting wine tastings, providing a gateway to extraordinary cultural experiences.'
          }
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <React.Suspense fallback={suspenceComponent}>
        <AuthenticatedComponent>
          <AccountDesktopComponent
            accountProps={accountProps}
            windowProps={windowProps}
            storeProps={storeProps}
            isCropImageModalVisible={isCropImageModalVisible}
            likeCount={likeCount}
            followerCount={followerCount}
            followingCount={followingCount}
            isAddInterestOpen={isAddInterestOpen}
            setIsAddInterestOpen={setIsAddInterestOpen}
            setIsCropImageModalVisible={setIsCropImageModalVisible}
            onUsernameChanged={onUsernameChanged}
            onCompleteProfile={onCompleteProfile}
            onScrollReload={onScrollReload}
            onScrollLoad={onScrollLoad}
            onAvatarChanged={onAvatarChanged}
            onLikesClick={onLikesClick}
            onFollowersClick={onFollowersClick}
            onFollowingClick={onFollowingClick}
          />
          <AccountMobileComponent
            accountProps={accountProps}
            windowProps={windowProps}
            storeProps={storeProps}
            isCropImageModalVisible={isCropImageModalVisible}
            likeCount={likeCount}
            followerCount={followerCount}
            followingCount={followingCount}
            isAddInterestOpen={isAddInterestOpen}
            setIsAddInterestOpen={setIsAddInterestOpen}
            setIsCropImageModalVisible={setIsCropImageModalVisible}
            onUsernameChanged={onUsernameChanged}
            onCompleteProfile={onCompleteProfile}
            onScrollReload={onScrollReload}
            onScrollLoad={onScrollLoad}
            onAvatarChanged={onAvatarChanged}
            onLikesClick={onLikesClick}
            onFollowersClick={onFollowersClick}
            onFollowingClick={onFollowingClick}
          />
        </AuthenticatedComponent>
      </React.Suspense>
    </>
  );
}
