import { Avatar, Line } from '@fuoco.appdev/core-ui';
import { lazy } from '@loadable/component';
import { PriceList } from '@medusajs/medusa';
import { Store } from '@ngneat/elf';
import { useObservable } from '@ngneat/use-observable';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { StorageFolderType } from 'src/protobuf/common_pb';
import AccountPublicController from '../controllers/account-public.controller';
import AccountController from '../controllers/account.controller';
import ExploreController from '../controllers/explore.controller';
import ProductController from '../controllers/product.controller';
import WindowController from '../controllers/window.controller';
import { AccountPublicState } from '../models/account-public.model';
import { AccountState } from '../models/account.model';
import { ExploreState } from '../models/explore.model';
import { ProductState } from '../models/product.model';
import { WindowLocalState, WindowState } from '../models/window.model';
import { RoutePathsType, useQuery } from '../route-paths';
import AccountNotificationService, { AccountData } from '../services/account-notification.service';
import BucketService from '../services/bucket.service';
import SupabaseService from '../services/supabase.service';
import { WindowSuspenseDesktopComponent } from './desktop/suspense/window.suspense.desktop.component';
import { WindowSuspenseMobileComponent } from './mobile/suspense/window.suspense.mobile.component';
import { WindowSuspenseTabletComponent } from './tablet/suspense/window.suspense.tablet.component';
import styles from './window.module.scss';

const WindowDesktopComponent = lazy(
  () => import('./desktop/window.desktop.component')
);
const WindowTabletComponent = lazy(
  () => import('./tablet/window.tablet.component')
);
const WindowMobileComponent = lazy(
  () => import('./mobile/window.mobile.component')
);

export interface WindowResponsiveProps {
  windowProps: WindowState;
  windowLocalProps: WindowLocalState;
  accountPublicProps: AccountPublicState;
  accountProps: AccountState;
  exploreProps: ExploreState;
  productProps: ProductState;
  openMore: boolean;
  isLanguageOpen: boolean;
  setOpenMore: (value: boolean) => void;
  setIsLanguageOpen: (value: boolean) => void;
  onSelectLocation: () => void;
  onCancelLocation: () => void;
  onSidebarTabsChanged: (id: string) => void;
  onNavigateBack: () => void;
}

export default function WindowComponent(): JSX.Element {
  const location = useLocation();
  const query = useQuery();
  const navigate = useNavigate();
  const [windowProps] = useObservable(WindowController.model.store);
  const [exploreLocalProps] = useObservable(
    ExploreController.model.localStore ?? Store.prototype
  );
  const [accountPublicProps] = useObservable(
    AccountPublicController.model.store
  );
  const [accountProps] = useObservable(AccountController.model.store);
  const [exploreProps] = useObservable(ExploreController.model.store);
  const [productProps] = useObservable(ProductController.model.store);
  const isMounted = React.useRef<boolean>(false);
  const { i18n, t } = useTranslation();
  const [openMore, setOpenMore] = React.useState<boolean>(false);
  const [isLanguageOpen, setIsLanguageOpen] = React.useState<boolean>(false);
  const [windowLocalProps] = useObservable(
    WindowController.model.localStore ?? Store.prototype
  );
  const renderCountRef = React.useRef<number>(0);

  const onCancelLocation = () => {
    query.set('sales_location', exploreLocalProps.selectedInventoryLocationId);
    navigate({ search: query.toString() });
    WindowController.updateQueryInventoryLocationAsync(undefined, query);
  };

  const onSelectLocation = () => {
    ExploreController.updateSelectedInventoryLocationId(
      windowProps.queryInventoryLocation.id
    );
    onCancelLocation();
  };

  const onSidebarTabsChanged = (id: string) => {
    navigate({ pathname: id, search: query.toString() });
  };

  const onNavigateBack = () => {
    if (
      windowProps.loadedLocationPath &&
      windowProps.loadedLocationPath === RoutePathsType.Cart
    ) {
      setTimeout(
        () =>
          navigate({
            pathname: RoutePathsType.Store,
            search: query.toString(),
          }),
        150
      );
      return;
    }

    if (
      windowProps.loadedLocationPath &&
      windowProps.loadedLocationPath === RoutePathsType.Checkout
    ) {
      setTimeout(
        () =>
          navigate({
            pathname: RoutePathsType.Cart,
            search: query.toString(),
          }),
        150
      );
      return;
    }

    if (
      windowProps.loadedLocationPath &&
      windowProps.loadedLocationPath.startsWith(RoutePathsType.Chats)
    ) {
      setTimeout(
        () =>
          navigate({
            pathname: RoutePathsType.Account,
            search: query.toString(),
          }),
        150
      );
      return;
    }

    if (
      windowProps.loadedLocationPath &&
      windowProps.loadedLocationPath === RoutePathsType.EmailConfirmation
    ) {
      setTimeout(
        () =>
          navigate({
            pathname: RoutePathsType.Signin,
            search: query.toString(),
          }),
        150
      );
      return;
    }

    if (
      location.pathname?.startsWith(`${RoutePathsType.Store}/`)
    ) {
      setTimeout(
        () =>
          navigate({
            pathname: RoutePathsType.Store,
            search: query.toString(),
          }),
        150
      );
      return;
    }

    if (
      windowProps.loadedLocationPath &&
      windowProps.loadedLocationPath?.startsWith(
        `${RoutePathsType.OrderConfirmed}/`
      )
    ) {
      setTimeout(
        () =>
          navigate({
            pathname: RoutePathsType.Store,
            search: query.toString(),
          }),
        150
      );
      return;
    }

    if (
      windowProps.loadedLocationPath &&
      WindowController.isLocationAccountWithId(windowProps.loadedLocationPath)
    ) {
      setTimeout(
        () =>
          navigate({
            pathname: RoutePathsType.Account,
            search: query.toString(),
          }),
        150
      );
      return;
    }

    if (WindowController.isLocationAccountStatusWithId(location.pathname)) {
      if (accountProps.account?.id === accountPublicProps.account?.id) {
        setTimeout(
          () =>
            navigate({
              pathname: RoutePathsType.Account,
              search: query.toString(),
            }),
          150
        );
        return;
      } else {
        setTimeout(
          () =>
            navigate({
              pathname: `${RoutePathsType.Account}/${accountPublicProps.account?.id}/likes`,
              search: query.toString(),
            }),
          150
        );
        return;
      }
    }

    setTimeout(() => navigate(-1), 150);
  };

  React.useEffect(() => {
    renderCountRef.current += 1;
    WindowController.load(renderCountRef.current);

    if (!isMounted.current) {
      WindowController.updateIsLoading(true);
      isMounted.current = true;
    }

    return () => {
      WindowController.disposeLoad(renderCountRef.current);
    };
  }, []);

  React.useEffect(() => {
    WindowController.updateOnLocationChanged(location, query);
  }, [location.pathname, windowProps.authState]);

  React.useEffect(() => {
    if (windowProps.authState === 'SIGNED_OUT') {
      navigate({ pathname: RoutePathsType.Signin, search: query.toString() });
    } else if (windowProps.authState === 'USER_DELETED') {
      navigate({ pathname: RoutePathsType.Signup, search: query.toString() });
    } else if (windowProps.authState === 'PASSWORD_RECOVERY') {
      navigate({
        pathname: RoutePathsType.ResetPassword,
        search: query.toString(),
      });
    }
  }, [windowProps.authState]);

  React.useEffect(() => {
    i18n.changeLanguage(windowLocalProps.languageInfo?.isoCode);
  }, [windowLocalProps.languageInfo]);

  React.useEffect(() => {
    WindowController.addToast(undefined);
  }, [windowProps.toast]);

  React.useEffect(() => {
    WindowController.addBanner(undefined);
  }, [windowProps.banner]);

  React.useEffect(() => {
    if (!exploreLocalProps.selectedInventoryLocationId) {
      return;
    }

    query.set('sales_location', exploreLocalProps.selectedInventoryLocationId);
    navigate({ search: query.toString() });
  }, [exploreLocalProps.selectedInventoryLocationId]);

  React.useEffect(() => {
    for (const priceList of windowProps.priceLists as PriceList[]) {
      const date = new Date(priceList.ends_at?.toString() ?? '');
      if (date < new Date(Date.now())) {
        continue;
      }

      setTimeout(
        () =>
          WindowController.addBanner({
            key: `${priceList.id}-${Math.random()}`,
            title: priceList.name,
            subtitle: exploreProps.selectedInventoryLocation?.company,
            description: priceList.description,
            footerText:
              t('priceListEndsOn', {
                date: `${date.toLocaleDateString(
                  i18n.language
                )} ${date.toLocaleTimeString(i18n.language)}`,
              }) ?? '',
            icon: <Line.Sell size={40} color={'#2A2A5F'} />,
          }),
        500
      );
    }
  }, [windowProps.priceLists]);

  React.useEffect(() => {
    setTimeout(() => {
      if (windowProps.isAuthenticated === false) {
        WindowController.addBanner({
          key: `signup-${Math.random()}`,
          title: t('priceDeals') ?? '',
          description: t('priceDealsCallToAction') ?? '',
          icon: <Line.Sell size={40} color={'#2A2A5F'} />,
        });
      }
    }, 2000);
  }, [windowProps.isAuthenticated]);

  React.useEffect(() => {
    if (!windowProps.orderPlacedNotificationData) {
      return;
    }

    WindowController.addToast({
      key: `order-placed-${windowProps.orderPlacedNotificationData.id}`,
      icon: (
        <div className={[styles['toast-order-icon']].join(' ')}>
          {!windowProps.orderPlacedNotificationData.items?.[0]?.thumbnail && (
            <img
              className={[
                styles['no-thumbnail-image'],
                styles['no-thumbnail-image-desktop'],
              ].join(' ')}
              src={'../assets/images/wine-bottle.png'}
            />
          )}
          {windowProps.orderPlacedNotificationData.items?.[0]?.thumbnail && (
            <img
              className={[
                styles['thumbnail-image'],
                styles['thumbnail-image-desktop'],
              ].join(' ')}
              src={
                windowProps.orderPlacedNotificationData.items?.[0]?.thumbnail
              }
            />
          )}
        </div>
      ),
      message: t('orderPlaced') ?? '',
      description:
        t('orderPlacedDescription', {
          displayId: windowProps.orderPlacedNotificationData?.display_id ?? 0,
        }) ?? '',
    });
    WindowController.updateOrderPlacedNotificationData(undefined);
  }, [windowProps.orderPlacedNotificationData]);

  React.useEffect(() => {
    if (!windowProps.orderShippedNotificationData) {
      return;
    }

    WindowController.addToast({
      key: `order-shipped-${windowProps.orderShippedNotificationData.id}`,
      icon: (
        <div className={[styles['toast-order-icon']].join(' ')}>
          {!windowProps.orderShippedNotificationData.items?.[0]?.thumbnail && (
            <img
              className={[
                styles['no-thumbnail-image'],
                styles['no-thumbnail-image-desktop'],
              ].join(' ')}
              src={'../assets/images/wine-bottle.png'}
            />
          )}
          {windowProps.orderShippedNotificationData.items?.[0]?.thumbnail && (
            <img
              className={[
                styles['thumbnail-image'],
                styles['thumbnail-image-desktop'],
              ].join(' ')}
              src={
                windowProps.orderShippedNotificationData.items?.[0]?.thumbnail
              }
            />
          )}
        </div>
      ),
      message: t('orderShipped') ?? '',
      description:
        t('orderShippedDescription', {
          displayId: windowProps.orderShippedNotificationData?.display_id ?? 0,
        }) ?? '',
    });
    WindowController.updateOrderShippedNotificationData(undefined);
  }, [windowProps.orderShippedNotificationData]);

  React.useEffect(() => {
    if (!windowProps.orderReturnedNotificationData) {
      return;
    }

    WindowController.addToast({
      key: `order-returned-${windowProps.orderReturnedNotificationData.id}`,
      icon: (
        <div className={[styles['toast-order-icon']].join(' ')}>
          {!windowProps.orderReturnedNotificationData.items?.[0]?.thumbnail && (
            <img
              className={[
                styles['no-thumbnail-image'],
                styles['no-thumbnail-image-desktop'],
              ].join(' ')}
              src={'../assets/images/wine-bottle.png'}
            />
          )}
          {windowProps.orderReturnedNotificationData.items?.[0]?.thumbnail && (
            <img
              className={[
                styles['thumbnail-image'],
                styles['thumbnail-image-desktop'],
              ].join(' ')}
              src={
                windowProps.orderReturnedNotificationData.items?.[0]?.thumbnail
              }
            />
          )}
        </div>
      ),
      message: t('orderReturned') ?? '',
      description:
        t('orderReturnedDescription', {
          displayId: windowProps.orderReturnedNotificationData?.display_id ?? 0,
        }) ?? '',
    });
    WindowController.updateOrderReturnedNotificationData(undefined);
  }, [windowProps.orderReturnedNotificationData]);

  React.useEffect(() => {
    if (!windowProps.orderCanceledNotificationData) {
      return;
    }

    WindowController.addToast({
      key: `order-canceled-${windowProps.orderCanceledNotificationData.id}`,
      icon: (
        <div className={[styles['toast-order-icon']].join(' ')}>
          {!windowProps.orderCanceledNotificationData.items?.[0]?.thumbnail && (
            <img
              className={[
                styles['no-thumbnail-image'],
                styles['no-thumbnail-image-desktop'],
              ].join(' ')}
              src={'../assets/images/wine-bottle.png'}
            />
          )}
          {windowProps.orderCanceledNotificationData.items?.[0]?.thumbnail && (
            <img
              className={[
                styles['thumbnail-image'],
                styles['thumbnail-image-desktop'],
              ].join(' ')}
              src={
                windowProps.orderCanceledNotificationData.items?.[0]?.thumbnail
              }
            />
          )}
        </div>
      ),
      message: t('orderCanceled') ?? '',
      description:
        t('orderCanceledDescription', {
          displayId: windowProps.orderCanceledNotificationData?.display_id ?? 0,
        }) ?? '',
    });
    WindowController.updateOrderCanceledNotificationData(undefined);
  }, [windowProps.orderCanceledNotificationData]);

  React.useEffect(() => {
    const accountData = windowProps.accountFollowerAcceptedNotificationData as AccountData | undefined;
    if (!accountData) {
      return;
    }

    const addToastAsync = async () => {
      const publicProfileUrl = await BucketService.getPublicUrlAsync(StorageFolderType.Avatars, accountData.profile_url);

      WindowController.addToast({
        key: `account-follower-accepted-${accountData.id}`,
        icon: (
          <Avatar
            classNames={{
              container: styles['toast-avatar-icon']
            }}
            text={accountData.username}
            src={publicProfileUrl}
            size={'custom'}
          />
        ),
        message: accountData.username ?? '',
        description:
          t('accountFollowerAcceptedDescription', {
            username: accountData.username,
          }) ?? '',
      });
      WindowController.updateAccountFollowerAcceptedNotificationData(undefined);
    };

    addToastAsync();
  }, [windowProps.accountFollowerAcceptedNotificationData]);

  React.useEffect(() => {
    const accountData = windowProps.accountFollowerFollowingNotificationData as AccountData | undefined;
    if (!accountData) {
      return;
    }

    const addToastAsync = async () => {
      const publicProfileUrl = await BucketService.getPublicUrlAsync(StorageFolderType.Avatars, accountData.profile_url);

      WindowController.addToast({
        key: `account-follower-following-${accountData.id}`,
        icon: (
          <Avatar
            classNames={{
              container: styles['toast-avatar-icon']
            }}
            text={accountData.username}
            src={publicProfileUrl}
            size={'custom'}
          />
        ),
        message: accountData.username ?? '',
        description:
          t('accountFollowerFollowingDescription', {
            username: accountData.username,
          }) ?? '',
      });
      WindowController.updateAccountFollowerFollowingNotificationData(undefined);
    };

    addToastAsync();
  }, [windowProps.accountFollowerFollowingNotificationData]);

  React.useEffect(() => {
    if (!accountProps.account) {
      return;
    }

    if (SupabaseService.supabaseClient) {
      AccountNotificationService.initializeRealtime(
        SupabaseService.supabaseClient,
        accountProps.account.id
      );
    }

    return () => {
      if (SupabaseService.supabaseClient) {
        AccountNotificationService.disposeRealtime(
          SupabaseService.supabaseClient
        );
      }
    };
  }, [accountProps.account]);

  const suspenseComponent = (
    <>
      <WindowSuspenseDesktopComponent />
      <WindowSuspenseTabletComponent />
      <WindowSuspenseMobileComponent />
    </>
  );

  if (process.env['DEBUG_SUSPENSE'] === 'true') {
    return suspenseComponent;
  }

  return (
    <React.Suspense fallback={suspenseComponent}>
      <WindowDesktopComponent
        windowProps={windowProps}
        windowLocalProps={windowLocalProps}
        accountPublicProps={accountPublicProps}
        accountProps={accountProps}
        exploreProps={exploreProps}
        productProps={productProps}
        openMore={openMore}
        isLanguageOpen={isLanguageOpen}
        setOpenMore={setOpenMore}
        setIsLanguageOpen={setIsLanguageOpen}
        onSelectLocation={onSelectLocation}
        onCancelLocation={onCancelLocation}
        onSidebarTabsChanged={onSidebarTabsChanged}
        onNavigateBack={onNavigateBack}
      />
      <WindowTabletComponent
        windowProps={windowProps}
        windowLocalProps={windowLocalProps}
        accountPublicProps={accountPublicProps}
        accountProps={accountProps}
        exploreProps={exploreProps}
        productProps={productProps}
        openMore={openMore}
        isLanguageOpen={isLanguageOpen}
        setOpenMore={setOpenMore}
        setIsLanguageOpen={setIsLanguageOpen}
        onSelectLocation={onSelectLocation}
        onCancelLocation={onCancelLocation}
        onSidebarTabsChanged={onSidebarTabsChanged}
        onNavigateBack={onNavigateBack}
      />
      <WindowMobileComponent
        windowProps={windowProps}
        windowLocalProps={windowLocalProps}
        accountPublicProps={accountPublicProps}
        accountProps={accountProps}
        exploreProps={exploreProps}
        productProps={productProps}
        openMore={openMore}
        isLanguageOpen={isLanguageOpen}
        setOpenMore={setOpenMore}
        setIsLanguageOpen={setIsLanguageOpen}
        onSelectLocation={onSelectLocation}
        onCancelLocation={onCancelLocation}
        onSidebarTabsChanged={onSidebarTabsChanged}
        onNavigateBack={onNavigateBack}
      />
    </React.Suspense>
  );
}
