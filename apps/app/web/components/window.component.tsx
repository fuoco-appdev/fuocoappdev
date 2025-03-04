// prettier-ignore
import { useQuery } from '../route-paths';
// prettier-ignore
import { StorageFolderType } from '@shared/protobuf/common_pb';
import { RoutePathsType } from '@shared/route-paths-type';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { DIContext } from './app.component';
import { WindowSuspenseDesktopComponent } from './desktop/suspense/window.suspense.desktop.component';
import { WindowSuspenseMobileComponent } from './mobile/suspense/window.suspense.mobile.component';

const WindowDesktopComponent = React.lazy(
  () => import('./desktop/window.desktop.component')
);
const WindowMobileComponent = React.lazy(
  () => import('./mobile/window.mobile.component')
);

export interface WindowResponsiveProps {
  openMore: boolean;
  isLanguageOpen: boolean;
  showDeleteModal: boolean;
  setShowDeleteModal: (value: boolean) => void;
  setOpenMore: (value: boolean) => void;
  setIsLanguageOpen: (value: boolean) => void;
  onSelectLocation: () => void;
  onCancelLocation: () => void;
  onSidebarTabsChanged: (id: string) => void;
  onNavigateBack: () => void;
}

function WindowComponent(): JSX.Element {
  const location = useLocation();
  const query = useQuery();
  const navigate = useNavigate();
  const {
    AccountController,
    ExploreController,
    WindowController,
    AccountPublicController,
    ChatController,
    AccountService,
    ChatService,
    BucketService,
    SupabaseService,
    AccountNotificationService,
  } = React.useContext(DIContext);
  const {
    queryInventoryLocation,
    loadedLocationPath,
    authState,
    languageInfo,
    priceLists,
    isAuthenticated,
    orderPlacedNotificationData,
    orderShippedNotificationData,
    orderReturnedNotificationData,
    orderCanceledNotificationData,
    accountFollowerAcceptedNotificationData,
    accountFollowerFollowingNotificationData,
    suspense,
  } = WindowController.model;
  const { selectedInventoryLocationId } = ExploreController.model;
  const { chatSubscriptions } = ChatController.model;
  const isMounted = React.useRef<boolean>(false);
  const { i18n, t } = useTranslation();
  const [openMore, setOpenMore] = React.useState<boolean>(false);
  const [isLanguageOpen, setIsLanguageOpen] = React.useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const renderCountRef = React.useRef<number>(0);

  const onCancelLocation = () => {
    if (selectedInventoryLocationId) {
      query.set('sales_location', selectedInventoryLocationId);
    }

    navigate({ search: query.toString() });
    WindowController.updateQueryInventoryLocationAsync(undefined, query);
  };

  const onSelectLocation = () => {
    if (!queryInventoryLocation) {
      return;
    }

    ExploreController.updateSelectedInventoryLocationId(
      queryInventoryLocation.id
    );
    onCancelLocation();
  };

  const onSidebarTabsChanged = (id: string) => {
    navigate({ pathname: id, search: query.toString() });
  };

  const onNavigateBack = () => {
    if (loadedLocationPath && loadedLocationPath === RoutePathsType.Cart) {
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

    if (loadedLocationPath && loadedLocationPath === RoutePathsType.Cart) {
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

    if (loadedLocationPath && loadedLocationPath === RoutePathsType.Checkout) {
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
      (loadedLocationPath &&
        loadedLocationPath.startsWith(RoutePathsType.Chats)) ||
      location.pathname.startsWith(RoutePathsType.Chats)
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
      loadedLocationPath &&
      loadedLocationPath === RoutePathsType.EmailConfirmation
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

    if (location.pathname?.startsWith(`${RoutePathsType.Store}/`)) {
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
      loadedLocationPath &&
      loadedLocationPath?.startsWith(`${RoutePathsType.OrderConfirmed}/`)
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
      loadedLocationPath &&
      WindowController.isLocationAccountWithId(loadedLocationPath)
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
      if (
        AccountController.model.account?.id ===
        AccountPublicController.model.account?.id
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
      } else {
        setTimeout(
          () =>
            navigate({
              pathname: `${RoutePathsType.Account}/${AccountPublicController.model.account?.id}/likes`,
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
  }, [location.pathname, authState]);

  React.useEffect(() => {
    if (authState === 'SIGNED_OUT') {
      navigate({ pathname: RoutePathsType.Signin, search: query.toString() });
    } else if (!authState) {
      navigate({ pathname: RoutePathsType.Landing, search: query.toString() });
    } else if (authState === 'PASSWORD_RECOVERY') {
      navigate({
        pathname: RoutePathsType.ResetPassword,
        search: query.toString(),
      });
    }
  }, [authState]);

  React.useEffect(() => {
    const upsertAccountPresenceAsync = async (isOnline: boolean) => {
      if (!AccountController.model.account) {
        return;
      }

      await AccountService.requestUpsertAccountPresenceAsync(
        AccountController.model.account.id,
        isOnline
      );
    };

    const handleBeforeUnloadChangeAsync = async () => {
      await upsertAccountPresenceAsync(false);
    };

    upsertAccountPresenceAsync(true);

    window.addEventListener('beforeunload', handleBeforeUnloadChangeAsync);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnloadChangeAsync);
    };
  }, [AccountController.model.account]);

  React.useEffect(() => {
    const chatIds = Object.keys(chatSubscriptions);
    const subscription = ChatService.subscribeToMessages(chatIds, (payload) => {
      ChatController.onMessageChangedAsync(payload);
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, [chatSubscriptions]);

  React.useEffect(() => {
    i18n.changeLanguage(languageInfo?.isoCode);
  }, [languageInfo]);

  // React.useEffect(() => {
  //   WindowController.addToast(undefined);
  // }, [toast]);

  // React.useEffect(() => {
  //   WindowController.addBanner(undefined);
  // }, [banner]);

  React.useEffect(() => {
    if (!selectedInventoryLocationId) {
      return;
    }

    query.set('sales_location', selectedInventoryLocationId);
    navigate({ search: query.toString() });
  }, [selectedInventoryLocationId]);

  React.useEffect(() => {
    for (const priceList of priceLists) {
      const date = new Date(priceList.ends_at?.toString() ?? '');
      if (date < new Date(Date.now())) {
        continue;
      }

      // setTimeout(
      //   () =>
      //     WindowController.addBanner({
      //       key: `${priceList.id}-${Math.random()}`,
      //       title: priceList.name,
      //       subtitle: exploreProps.selectedInventoryLocation?.company,
      //       description: priceList.description,
      //       footerText:
      //         t('priceListEndsOn', {
      //           date: `${date.toLocaleDateString(
      //             i18n.language
      //           )} ${date.toLocaleTimeString(i18n.language)}`,
      //         }) ?? '',
      //       icon: <Line.Sell size={40} color={'#2A2A5F'} />,
      //     }),
      //   500
      // );
    }
  }, [priceLists]);

  React.useEffect(() => {
    setTimeout(() => {
      if (isAuthenticated === false) {
        // WindowController.addBanner({
        //   key: `signup-${Math.random()}`,
        //   title: t('priceDeals') ?? '',
        //   description: t('priceDealsCallToAction') ?? '',
        //   icon: <Line.Sell size={40} color={'#2A2A5F'} />,
        // });
      }
    }, 2000);
  }, [isAuthenticated]);

  React.useEffect(() => {
    if (!orderPlacedNotificationData) {
      return;
    }

    // WindowController.addToast({
    //   key: `order-placed-${windowProps.orderPlacedNotificationData.id}`,
    //   icon: (
    //     <div className={[styles['toast-order-icon']].join(' ')}>
    //       {!windowProps.orderPlacedNotificationData.items?.[0]?.thumbnail && (
    //         <img
    //           className={[
    //             styles['no-thumbnail-image'],
    //             styles['no-thumbnail-image-desktop'],
    //           ].join(' ')}
    //           src={'../assets/images/wine-bottle.png'}
    //         />
    //       )}
    //       {windowProps.orderPlacedNotificationData.items?.[0]?.thumbnail && (
    //         <img
    //           className={[
    //             styles['thumbnail-image'],
    //             styles['thumbnail-image-desktop'],
    //           ].join(' ')}
    //           src={
    //             windowProps.orderPlacedNotificationData.items?.[0]?.thumbnail
    //           }
    //         />
    //       )}
    //     </div>
    //   ),
    //   message: t('orderPlaced') ?? '',
    //   description:
    //     t('orderPlacedDescription', {
    //       displayId: windowProps.orderPlacedNotificationData?.display_id ?? 0,
    //     }) ?? '',
    // });
    WindowController.updateOrderPlacedNotificationData(undefined);
  }, [orderPlacedNotificationData]);

  React.useEffect(() => {
    if (!orderShippedNotificationData) {
      return;
    }

    // WindowController.addToast({
    //   key: `order-shipped-${orderShippedNotificationData.id}`,
    //   icon: (
    //     <div className={[styles['toast-order-icon']].join(' ')}>
    //       {!orderShippedNotificationData.items?.[0]?.thumbnail && (
    //         <img
    //           className={[
    //             styles['no-thumbnail-image'],
    //             styles['no-thumbnail-image-desktop'],
    //           ].join(' ')}
    //           src={'../assets/images/wine-bottle.png'}
    //         />
    //       )}
    //       {orderShippedNotificationData.items?.[0]?.thumbnail && (
    //         <img
    //           className={[
    //             styles['thumbnail-image'],
    //             styles['thumbnail-image-desktop'],
    //           ].join(' ')}
    //           src={
    //             windowProps.orderShippedNotificationData.items?.[0]?.thumbnail
    //           }
    //         />
    //       )}
    //     </div>
    //   ),
    //   message: t('orderShipped') ?? '',
    //   description:
    //     t('orderShippedDescription', {
    //       displayId: orderShippedNotificationData?.display_id ?? 0,
    //     }) ?? '',
    // });
    // WindowController.updateOrderShippedNotificationData(undefined);
  }, [orderShippedNotificationData]);

  React.useEffect(() => {
    if (!orderReturnedNotificationData) {
      return;
    }

    // WindowController.addToast({
    //   key: `order-returned-${windowProps.orderReturnedNotificationData.id}`,
    //   icon: (
    //     <div className={[styles['toast-order-icon']].join(' ')}>
    //       {!windowProps.orderReturnedNotificationData.items?.[0]?.thumbnail && (
    //         <img
    //           className={[
    //             styles['no-thumbnail-image'],
    //             styles['no-thumbnail-image-desktop'],
    //           ].join(' ')}
    //           src={'../assets/images/wine-bottle.png'}
    //         />
    //       )}
    //       {windowProps.orderReturnedNotificationData.items?.[0]?.thumbnail && (
    //         <img
    //           className={[
    //             styles['thumbnail-image'],
    //             styles['thumbnail-image-desktop'],
    //           ].join(' ')}
    //           src={
    //             windowProps.orderReturnedNotificationData.items?.[0]?.thumbnail
    //           }
    //         />
    //       )}
    //     </div>
    //   ),
    //   message: t('orderReturned') ?? '',
    //   description:
    //     t('orderReturnedDescription', {
    //       displayId: windowProps.orderReturnedNotificationData?.display_id ?? 0,
    //     }) ?? '',
    // });
    // WindowController.updateOrderReturnedNotificationData(undefined);
  }, [orderReturnedNotificationData]);

  React.useEffect(() => {
    if (!orderCanceledNotificationData) {
      return;
    }

    // WindowController.addToast({
    //   key: `order-canceled-${windowProps.orderCanceledNotificationData.id}`,
    //   icon: (
    //     <div className={[styles['toast-order-icon']].join(' ')}>
    //       {!windowProps.orderCanceledNotificationData.items?.[0]?.thumbnail && (
    //         <img
    //           className={[
    //             styles['no-thumbnail-image'],
    //             styles['no-thumbnail-image-desktop'],
    //           ].join(' ')}
    //           src={'../assets/images/wine-bottle.png'}
    //         />
    //       )}
    //       {windowProps.orderCanceledNotificationData.items?.[0]?.thumbnail && (
    //         <img
    //           className={[
    //             styles['thumbnail-image'],
    //             styles['thumbnail-image-desktop'],
    //           ].join(' ')}
    //           src={
    //             windowProps.orderCanceledNotificationData.items?.[0]?.thumbnail
    //           }
    //         />
    //       )}
    //     </div>
    //   ),
    //   message: t('orderCanceled') ?? '',
    //   description:
    //     t('orderCanceledDescription', {
    //       displayId: windowProps.orderCanceledNotificationData?.display_id ?? 0,
    //     }) ?? '',
    // });
    // WindowController.updateOrderCanceledNotificationData(undefined);
  }, [orderCanceledNotificationData]);

  React.useEffect(() => {
    const accountData = accountFollowerAcceptedNotificationData;
    if (!accountData) {
      return;
    }

    const addToastAsync = async () => {
      const publicProfileUrl = await BucketService.getPublicUrlAsync(
        StorageFolderType.Avatars,
        accountData.profile_url
      );

      // WindowController.addToast({
      //   key: `account-follower-accepted-${accountData.id}`,
      //   icon: (
      //     <Avatar
      //       classNames={{
      //         container: styles['toast-avatar-icon'],
      //       }}
      //       text={accountData.username}
      //       src={publicProfileUrl}
      //       size={'custom'}
      //     />
      //   ),
      //   message: accountData.username ?? '',
      //   description: t('accountFollowerAcceptedDescription') ?? '',
      // });
      // WindowController.updateAccountFollowerAcceptedNotificationData(undefined);
    };

    addToastAsync();
  }, [accountFollowerAcceptedNotificationData]);

  React.useEffect(() => {
    const accountData = accountFollowerFollowingNotificationData;
    if (!accountData) {
      return;
    }

    const addToastAsync = async () => {
      const publicProfileUrl = await BucketService.getPublicUrlAsync(
        StorageFolderType.Avatars,
        accountData.profile_url
      );

      // WindowController.addToast({
      //   key: `account-follower-following-${accountData.id}`,
      //   icon: (
      //     <Avatar
      //       classNames={{
      //         container: styles['toast-avatar-icon'],
      //       }}
      //       text={accountData.username}
      //       src={publicProfileUrl}
      //       size={'custom'}
      //     />
      //   ),
      //   message: accountData.username ?? '',
      //   description: t('accountFollowerFollowingDescription') ?? '',
      // });
      // WindowController.updateAccountFollowerFollowingNotificationData(
      //   undefined
      // );
    };

    addToastAsync();
  }, [accountFollowerFollowingNotificationData]);

  React.useEffect(() => {
    if (!AccountController.model.account) {
      return;
    }

    if (SupabaseService.supabaseClient) {
      AccountNotificationService.initializeRealtime(
        SupabaseService.supabaseClient,
        AccountController.model.account.id
      );
    }

    return () => {
      if (SupabaseService.supabaseClient) {
        AccountNotificationService.disposeRealtime(
          SupabaseService.supabaseClient
        );
      }
    };
  }, [AccountController.model.account]);

  const suspenseComponent = (
    <>
      <WindowSuspenseDesktopComponent />
      <WindowSuspenseMobileComponent />
    </>
  );

  if (suspense) {
    return suspenseComponent;
  }

  return (
    <React.Suspense fallback={suspenseComponent}>
      <WindowDesktopComponent
        openMore={openMore}
        isLanguageOpen={isLanguageOpen}
        setOpenMore={setOpenMore}
        setIsLanguageOpen={setIsLanguageOpen}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        onSelectLocation={onSelectLocation}
        onCancelLocation={onCancelLocation}
        onSidebarTabsChanged={onSidebarTabsChanged}
        onNavigateBack={onNavigateBack}
      />
      <WindowMobileComponent
        openMore={openMore}
        isLanguageOpen={isLanguageOpen}
        setOpenMore={setOpenMore}
        setIsLanguageOpen={setIsLanguageOpen}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        onSelectLocation={onSelectLocation}
        onCancelLocation={onCancelLocation}
        onSidebarTabsChanged={onSidebarTabsChanged}
        onNavigateBack={onNavigateBack}
      />
    </React.Suspense>
  );
}

export default observer(WindowComponent);
