import { Button, Input, Line, Tabs } from '@fuoco.appdev/core-ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ChatController from '../../controllers/chat.controller';
import { ChatTabs } from '../../models/chat.model';
import { useQuery } from '../../route-paths';
import { ChatsResponsiveProps } from '../chats.component';
import styles from '../chats.module.scss';
import { ResponsiveDesktop } from '../responsive.component';

export default function ChatsDesktopComponent({
    chatProps
}: ChatsResponsiveProps): JSX.Element {
    const navigate = useNavigate();
    const query = useQuery();
    const { t } = useTranslation();

    return (
        <ResponsiveDesktop>
            <div
                className={[styles['root'], styles['root-desktop']].join(' ')}
            >
                <div
                    className={[
                        styles['search-container'],
                        styles['search-container-desktop'],
                    ].join(' ')}
                >
                    <div
                        className={[
                            styles['top-bar-container'],
                            styles['top-bar-container-desktop'],
                        ].join(' ')}
                    >
                        <div
                            className={[
                                styles['top-bar-left-content'],
                                styles['top-bar-left-content-desktop'],
                            ].join(' ')}
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
                                        value={chatProps.searchInput}
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
                                            ChatController.updateSearchInput(event.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Button
                                        classNames={{
                                            container: styles['rounded-container'],
                                            button: styles['rounded-button'],
                                        }}
                                        onClick={() => { }}
                                        rippleProps={{
                                            color: 'rgba(42, 42, 95, .35)',
                                        }}
                                        type={'text'}
                                        block={true}
                                        icon={<Line.Edit size={24} />}
                                        rounded={true}
                                    />
                                </div>
                            </div>
                            <div
                                className={[
                                    styles['tab-container'],
                                    styles['tab-container-desktop'],
                                ].join(' ')}
                            >
                                <Tabs
                                    classNames={{
                                        nav: styles['tab-nav'],
                                        tabButton: styles['tab-button'],
                                        selectedTabButton: styles['selected-tab-button'],
                                        tabOutline: styles['tab-outline']
                                    }}
                                    removable={true}
                                    type={'underlined'}
                                    activeId={chatProps.selectedTab}
                                    onChange={(id: string) =>
                                        ChatController.updateSelectedTabAsync(
                                            id.length > 0 ? (id as ChatTabs) : ChatTabs.Messages
                                        )
                                    }
                                    tabs={[
                                        {
                                            id: ChatTabs.Messages,
                                            label: t('messages') ?? 'Messages',
                                        },
                                        {
                                            id: ChatTabs.Requests,
                                            label: t('requests') ?? 'Requests',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={[
                            styles['scroll-content'],
                            styles['scroll-content-desktop'],
                        ].join(' ')}
                        style={{ height: window.innerHeight }}
                    // onScroll={(e) => {
                    //     onScroll(e);
                    //     const elementHeight = topBarRef.current?.clientHeight ?? 0;
                    //     const scrollTop = e.currentTarget.scrollTop;
                    //     if (prevScrollTop >= scrollTop) {
                    //         yPosition += prevScrollTop - scrollTop;
                    //         if (yPosition >= 0) {
                    //             yPosition = 0;
                    //         }

                    //         topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
                    //     } else {
                    //         yPosition -= scrollTop - prevScrollTop;
                    //         if (yPosition <= -elementHeight) {
                    //             yPosition = -elementHeight;
                    //         }

                    //         topBarRef.current!.style.transform = `translateY(${yPosition}px)`;
                    //     }

                    //     prevScrollTop = e.currentTarget.scrollTop;
                    // }}
                    // ref={scrollContainerRef}
                    // onLoad={onScrollLoad}
                    >
                        {/* {exploreProps.searchedStockLocations.map(
                            (stockLocation: StockLocation, _index: number) => {
                                return (
                                    <StockLocationItemComponent
                                        key={stockLocation.id}
                                        stockLocation={stockLocation}
                                        onClick={async () =>
                                            onStockLocationClicked(
                                                await ExploreController.getInventoryLocationAsync(
                                                    stockLocation
                                                )
                                            )
                                        }
                                    />
                                );
                            }
                        )} */}
                    </div>
                </div>
            </div>
        </ResponsiveDesktop>
    );
}
