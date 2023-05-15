import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import StoreController from '../controllers/store.controller';
import styles from './store.module.scss';
import {
  Alert,
  Button,
  Dropdown,
  Input,
  Line,
  Tabs,
} from '@fuoco.appdev/core-ui';
import { RoutePaths } from '../route-paths';
import { useTranslation } from 'react-i18next';
import SupabaseService from '../services/supabase.service';
import { useObservable } from '@ngneat/use-observable';
import { useSpring } from 'react-spring';
import * as core from '../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';
import LoadingComponent from './loading.component';
import { Store } from '@ngneat/elf';
import { WinePreview } from '../models/store.model';
import { ProductPreviewMobileComponent } from './product-preview.component';

function StoreDesktopComponent(): JSX.Element {
  const navigate = useNavigate();
  const [props] = useObservable(StoreController.model.store);

  return <></>;
}

function StoreMobileComponent(): JSX.Element {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [props] = useObservable(StoreController.model.store);
  const { t, i18n } = useTranslation();

  return (
    <div ref={rootRef} className={styles['root-mobile']}>
      <div className={styles['top-bar-container-mobile']}>
        <div className={styles['search-container-mobile']}>
          <div className={styles['search-input-root']}>
            <Input
              value={props.input}
              classNames={{
                container: styles['search-input-container-mobile'],
                input: styles['search-input-mobile'],
              }}
              placeholder={t('search') ?? ''}
              icon={<Line.Search size={24} color={'#2A2A5F'} />}
              onChange={(event) =>
                StoreController.updateInput(event.target.value)
              }
            />
          </div>
          <div>
            <Button
              classNames={{
                container: styles['filter-container'],
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
        <div className={styles['tab-container-mobile']}>
          <Tabs
            classNames={{
              tabButton: styles['tab-button'],
              selectedTabButton: styles['selected-tab-button'],
              tabSliderPill: styles['tab-slider-pill'],
            }}
            removable={true}
            type={'pills'}
            tabs={[
              {
                id: 'best-of',
                label: 'Best of',
              },
              {
                id: 'new',
                label: 'New',
              },
              {
                id: 'white',
                label: 'White',
              },
              {
                id: 'red',
                label: 'Red',
              },
              {
                id: 'dessert',
                label: 'Dessert',
              },
              {
                id: 'chocolate',
                label: 'Chocolate',
              },
            ]}
          />
        </div>
      </div>
      <div className={styles['wine-previews-container-mobile']}>
        {props.previews.map((preview: WinePreview, index: number) => (
          <ProductPreviewMobileComponent
            parentRef={rootRef}
            key={index}
            preview={preview}
          />
        ))}
      </div>

      <Dropdown
        open={openFilter}
        touchScreen={true}
        onClose={() => setOpenFilter(false)}
      ></Dropdown>
    </div>
  );
}

export default function StoreComponent(): JSX.Element {
  return (
    <>
      <ResponsiveDesktop>
        <StoreDesktopComponent />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <StoreMobileComponent />
      </ResponsiveMobile>
    </>
  );
}
