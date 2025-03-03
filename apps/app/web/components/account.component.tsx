/* eslint-disable no-restricted-globals */
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { RoutePathsType } from '../../shared/route-paths-type';
import { useQuery } from '../route-paths';
import { DIContext } from './app.component';
import { AuthenticatedComponent } from './authenticated.component';
import { AccountSuspenseDesktopComponent } from './desktop/suspense/account.suspense.desktop.component';
import { AccountSuspenseMobileComponent } from './mobile/suspense/account.suspense.mobile.component';

const AccountDesktopComponent = React.lazy(
  () => import('./desktop/account.desktop.component')
);
const AccountMobileComponent = React.lazy(
  () => import('./mobile/account.mobile.component')
);

export type AccountOutletContextType = {
  scrollContainerRef: React.RefObject<HTMLDivElement> | undefined;
};

export function useAccountOutletContext() {
  return useOutletContext<AccountOutletContextType>();
}

export interface AccountResponsiveProps {
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

function AccountComponent(): JSX.Element {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();
  const { AccountController, WindowController } = React.useContext(DIContext);
  const {
    suspense,
    account,
    likeCount,
    followerCount,
    followingCount,
    activeTabId,
  } = AccountController.model;
  const { activeRoute, loadedLocationPath } = WindowController.model;
  const [isCropImageModalVisible, setIsCropImageModalVisible] =
    React.useState<boolean>(false);
  const [currentLikeCount, setCurrentLikeCount] = React.useState<
    string | undefined
  >(undefined);
  const [currentFollowerCount, setCurrentFollowerCount] = React.useState<
    string | undefined
  >(undefined);
  const [currentFollowingCount, setCurrentFollowingCount] = React.useState<
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
    } else if (
      AccountController.model.activeTabId === RoutePathsType.AccountAddresses
    ) {
    }
  };

  const onScrollLoad = () => {
    if (AccountController.model.activeTabId === RoutePathsType.AccountLikes) {
      AccountController.onNextLikedProductScrollAsync();
    } else if (
      AccountController.model.activeTabId === RoutePathsType.AccountOrderHistory
    ) {
      AccountController.onNextOrderScrollAsync();
    } else if (
      AccountController.model.activeTabId === RoutePathsType.AccountAddresses
    ) {
    }
  };

  const onUsernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    AccountController.checkIfUsernameExists(event.target.value);
  };

  const onCompleteProfile = async () => {
    AccountController.updateProfileFormErrors({
      firstName: undefined,
      lastName: undefined,
      username: undefined,
      phoneNumber: undefined,
    });
    const errors = await AccountController.getProfileFormErrorsAsync(
      AccountController.model.profileForm
    );
    if (errors) {
      AccountController.updateProfileFormErrors(errors);
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
      pathname: `${RoutePathsType.AccountStatus}/${account?.id}/followers`,
      search: query.toString(),
    });
  };

  const onFollowingClick = () => {
    navigate({
      pathname: `${RoutePathsType.AccountStatus}/${account?.id}/following`,
      search: query.toString(),
    });
  };

  React.useEffect(() => {
    AccountController.updateProfileFormErrorStrings({
      empty: t('fieldEmptyError') ?? '',
      exists: t('fieldExistsError') ?? '',
      spaces: t('fieldSpacesError') ?? '',
    });
  }, [i18n.language]);

  React.useEffect(() => {
    renderCountRef.current += 1;
    AccountController.load(renderCountRef.current);
    if (activeRoute === RoutePathsType.Account) {
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
    if (likeCount !== undefined) {
      setCurrentLikeCount(
        new Intl.NumberFormat(i18n.language).format(likeCount)
      );
    }

    if (followerCount !== undefined) {
      setCurrentFollowerCount(
        new Intl.NumberFormat(i18n.language).format(followerCount)
      );
    }

    if (followingCount !== undefined) {
      setCurrentFollowingCount(
        new Intl.NumberFormat(i18n.language).format(followingCount)
      );
    }
  }, [likeCount, followerCount, followingCount]);

  React.useEffect(() => {
    const loadedLocation = loadedLocationPath as string | undefined;
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
          pathname: activeTabId,
          search: query.toString(),
        });
      }
    }
  }, [loadedLocationPath]);

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

  if (suspense) {
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
            isCropImageModalVisible={isCropImageModalVisible}
            likeCount={currentLikeCount}
            followerCount={currentFollowerCount}
            followingCount={currentFollowingCount}
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
            isCropImageModalVisible={isCropImageModalVisible}
            likeCount={currentLikeCount}
            followerCount={currentFollowerCount}
            followingCount={currentFollowingCount}
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

export default observer(AccountComponent);
