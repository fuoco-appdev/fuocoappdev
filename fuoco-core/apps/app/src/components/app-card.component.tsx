import {
  Card,
  Avatar,
  IconBriefcase,
  Typography,
  List,
  CardSwipe,
  Button,
  IconKey,
  IconCamera,
  CropImage,
  IconChevronRight,
  Divider,
  IconEdit2,
  IconTrash2,
  IconSave,
  Input,
  Listbox,
  IconPlus,
  DraggableList,
  DraggableListItem,
  IconMenu,
  OptionProps,
} from '@fuoco.appdev/core-ui';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Strings } from '../strings';
import styles from './app-card.module.scss';
import { AppStatus, Link } from '../protobuf/core_pb';
import { ResponsiveDesktop, ResponsiveMobile } from './responsive.component';

function AppCardEditLink() {
  return (
    <div className={styles['edit-link-root']}>
      <div className={styles['edit-link-icon-container']}>
        <IconMenu strokeWidth={2} />
      </div>
      <Input
        label={Strings.name}
        classNames={{
          root: styles['edit-input-root'],
          container: styles['edit-input-container'],
          input: styles['edit-input'],
          formLayout: {
            label: styles['edit-formlayout-label'],
          },
        }}
      />
      <Input
        label={Strings.link}
        classNames={{
          root: styles['edit-input-root'],
          container: styles['edit-input-container'],
          input: styles['edit-input'],
          formLayout: {
            label: styles['edit-formlayout-label'],
          },
        }}
      />
    </div>
  );
}

function AppCardDesktopComponent({
  id,
  name,
  company,
  links,
  editMode,
  companyOptions,
  profilePicture,
  progressType = AppStatus.USER_STORIES,
  progressLength = 4,
  onProfilePictureChanged,
  onDeleteClicked,
  onSaveClicked,
  draftLinks,
  editLinkItems,
  selectedCoverImages,
  coverImageElements,
  isCropModalVisible,
  onCoverImageFileChanged,
  onCropConfirmed,
  onCropCanceled,
  onCoverChanged,
  onEditLinksChanged,
  onAddEditLink,
}: Partial<AppCardProps> & {
  draftLinks: { id: string; name: string; url: string }[];
  editLinkItems: DraggableListItem[];
  selectedCoverImages: FileList | null;
  coverImageElements: React.ReactElement[];
  isCropModalVisible: boolean;
  onCoverImageFileChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCropConfirmed: (index: number) => void;
  onCropCanceled: () => void;
  onCoverChanged: (index: number, blob: Blob) => void;
  onEditLinksChanged: (items: string[]) => void;
  onAddEditLink: () => void;
}): JSX.Element {
  const coverImageFileRef = useRef<HTMLInputElement | null>(null);
  const [editExpand, setEditExpand] = useState<boolean>(false);
  const [draftName, setDraftName] = useState<string>(name ?? '');
  const [draftCompany, setDraftCompany] = useState<string>(company ?? '');

  const [draftProgressType, setDraftProgressType] =
    useState<AppStatus>(progressType);

  const statusOptionProps: OptionProps[] = [];
  const statusTypes = Strings.statusTypes.split(',');
  statusTypes.map((value: string, index: number) => {
    statusOptionProps.push({
      id: AppStatus[index],
      value: value,
      children: ({ selected }) => (
        <span
          className={[
            styles['dropdown-label'],
            styles['dropdown-label-desktop'],
          ].join(' ')}
        >
          {value}
        </span>
      ),
    });
  });

  const editExpandIconClasses = [styles['expand-edit-icon']];
  const editExpandClasses = [styles['expand-edit']];
  if (editExpand) {
    editExpandIconClasses.push(styles['expand-edit-icon-active']);
    editExpandClasses.push(styles['expand-edit-active']);
  }

  return (
    <Card
      key={id}
      className={[styles['root'], styles['root-desktop']].join(' ')}
    >
      <div
        className={[
          styles['card-content'],
          styles['card-content-desktop'],
        ].join(' ')}
      >
        <div
          className={[
            styles['display-container'],
            styles['display-container-desktop'],
          ].join(' ')}
        >
          <div
            className={[
              styles['display-content'],
              styles['display-content-desktop'],
            ].join(' ')}
          >
            <div
              className={[
                styles['cover-image-container'],
                styles['cover-image-container-desktop'],
              ].join(' ')}
            >
              <CardSwipe items={coverImageElements} />
              <div
                className={[
                  styles['cover-content-container'],
                  styles['cover-content-container-desktop'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['request-update-container'],
                    styles['request-update-container-desktop'],
                  ].join(' ')}
                >
                  <Button
                    type={'default'}
                    size={'tiny'}
                    disabled={draftProgressType !== AppStatus.RELEASE}
                    icon={<IconKey strokeWidth={2} />}
                  >
                    <span
                      className={[
                        styles['button-text'],
                        styles['button-text-desktop'],
                      ].join(' ')}
                    >
                      {Strings.requestUpdate}
                    </span>
                  </Button>
                  {editMode && (
                    <Button
                      type={'text'}
                      size={'tiny'}
                      onClick={() => {
                        setEditExpand(!editExpand);
                      }}
                      icon={
                        <IconChevronRight
                          strokeWidth={2}
                          className={editExpandIconClasses.join(' ')}
                        />
                      }
                    />
                  )}
                </div>
                <div
                  className={[
                    styles['edit-cover-container'],
                    styles['edit-cover-container-desktop'],
                  ].join(' ')}
                >
                  <input
                    ref={coverImageFileRef}
                    type="file"
                    accept=".png, .jpg, .jpeg, .svg"
                    style={{ display: 'none' }}
                    multiple={true}
                    onChange={onCoverImageFileChanged}
                  />
                  <Button
                    type={'default'}
                    size={'tiny'}
                    icon={<IconCamera strokeWidth={2} />}
                    onClick={() => coverImageFileRef?.current?.click()}
                  >
                    <span
                      className={[
                        styles['button-text'],
                        styles['button-text-desktop'],
                      ].join(' ')}
                    >
                      {Strings.editCoverPhoto}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <div
              className={[
                styles['app-content'],
                styles['app-content-desktop'],
              ].join(' ')}
            >
              <div
                className={[
                  styles['app-info'],
                  styles['app-info-desktop'],
                ].join(' ')}
              >
                <Avatar
                  src={profilePicture}
                  editMode={true}
                  onChange={onProfilePictureChanged}
                  AvatarIcon={IconBriefcase}
                />
                <div
                  className={[
                    styles['app-name-container'],
                    styles['app-name-container-desktop'],
                  ].join(' ')}
                >
                  <Typography.Text
                    className={[
                      styles['app-name'],
                      styles['app-name-desktop'],
                    ].join(' ')}
                  >
                    {draftName.length > 0 ? draftName : Strings.name}
                  </Typography.Text>
                  <Typography.Text
                    className={[
                      styles['company-name'],
                      styles['company-name-desktop'],
                    ].join(' ')}
                  >
                    {draftCompany.length > 0 ? draftCompany : Strings.company}
                  </Typography.Text>
                </div>
                <div
                  className={[
                    styles['status-container'],
                    styles['status-container-desktop'],
                  ].join(' ')}
                >
                  <Typography.Text
                    className={[
                      styles['status'],
                      styles['status-desktop'],
                    ].join(' ')}
                  >
                    {`${Strings.status}: ${statusTypes[draftProgressType]}`}
                  </Typography.Text>
                </div>
              </div>
            </div>
            <List items={[]} />
          </div>
          <div
            className={[
              styles['progress-container'],
              styles['progress-container-desktop'],
            ].join(' ')}
          >
            {Array(progressLength)
              .fill(0)
              .map((value, index) => {
                const classes = [styles['progress-pill']];
                if (index <= draftProgressType) {
                  classes.push(styles['progress-pill-active']);
                }
                return <div className={classes.join(' ')} />;
              })}
          </div>
        </div>
        {editMode && (
          <div className={editExpandClasses.join(' ')}>
            <div className={styles['edit-public-top-bar']}>
              <div className={styles['edit-public-top-bar-title-container']}>
                <IconEdit2 strokeWidth={2} stroke={'#000'} />
                <Typography.Text
                  strong={true}
                  className={styles['edit-public-top-bar-title']}
                >
                  {Strings.edit}
                </Typography.Text>
              </div>
              <div className={styles['edit-public-top-bar-button-container']}>
                <Button
                  danger={true}
                  size={'tiny'}
                  onClick={() => onDeleteClicked?.(id ?? '')}
                  icon={<IconTrash2 strokeWidth={2} />}
                >
                  <span className={styles['button-text']}>
                    {Strings.delete}
                  </span>
                </Button>
                <Button
                  type={'default'}
                  size={'tiny'}
                  onClick={() => {
                    const companyIndex = companyOptions?.findIndex(
                      (value) => value.value === draftCompany
                    );
                    onSaveClicked?.(id ?? '', {
                      name: draftName,
                      company: draftCompany,
                      userId: companyOptions?.[companyIndex ?? 0]?.id ?? '',
                      status: draftProgressType,
                      links: draftLinks,
                    });
                  }}
                  icon={<IconSave strokeWidth={2} stroke={'#000'} />}
                >
                  <span className={styles['button-text']}>{Strings.save}</span>
                </Button>
              </div>
            </div>
            <div className={styles['edit-public-content']}>
              <Input
                classNames={{
                  root: styles['edit-input-root'],
                  container: styles['edit-input-container'],
                  input: styles['edit-input'],
                  formLayout: {
                    label: styles['edit-formlayout-label'],
                  },
                }}
                label={Strings.appName}
                value={draftName}
                onChange={(event) => setDraftName(event.currentTarget.value)}
              />
              <Listbox
                classNames={{
                  listbox: styles['edit-listbox'],
                  formLayout: {
                    root: styles['edit-listbox-formlayout-root'],
                    label: styles['edit-formlayout-label'],
                  },
                  chevron: styles['edit-icon'],
                  label: styles['edit-listbox-label'],
                }}
                label={Strings.status}
                defaultIndex={progressType}
                options={statusOptionProps}
                onChange={(index: number, id: string, value: string) => {
                  setDraftProgressType(index);
                }}
              />
              <Listbox
                classNames={{
                  listbox: styles['edit-listbox'],
                  formLayout: {
                    root: styles['edit-listbox-formlayout-root'],
                    label: styles['edit-formlayout-label'],
                  },
                  chevron: styles['edit-icon'],
                  label: styles['edit-listbox-label'],
                }}
                defaultIndex={companyOptions?.findIndex(
                  (value) => value.value === draftCompany
                )}
                label={Strings.company}
                options={companyOptions ?? []}
                onChange={(index: number, id: string, value: string) => {
                  setDraftCompany(value);
                }}
              />
            </div>
            <Divider />
            <div className={styles['edit-private-top-bar']}>
              <div className={styles['edit-private-top-bar-button-container']}>
                <Button
                  type={'default'}
                  size={'tiny'}
                  onClick={onAddEditLink}
                  icon={<IconPlus strokeWidth={2} stroke={'#000'} />}
                >
                  <span className={styles['button-text']}>
                    {Strings.addLink}
                  </span>
                </Button>
              </div>
            </div>
            <div className={styles['edit-private-content']}>
              <DraggableList
                items={editLinkItems}
                onChanged={onEditLinksChanged}
              />
            </div>
          </div>
        )}
      </div>
      {selectedCoverImages && (
        <CropImage
          src={selectedCoverImages}
          isVisible={isCropModalVisible}
          onChange={onCoverChanged}
          onConfirmed={onCropConfirmed}
          onCanceled={onCropCanceled}
          editorProps={{
            image: '',
            width: 600,
            height: 400,
            border: 50,
            borderRadius: 4,
            color: [0, 0, 0, 0.6],
          }}
        />
      )}
    </Card>
  );
}

function AppCardMobileComponent({
  id,
  name,
  company,
  links,
  editMode,
  companyOptions,
  profilePicture,
  progressType = AppStatus.USER_STORIES,
  progressLength = 4,
  onProfilePictureChanged,
  onDeleteClicked,
  onSaveClicked,
  draftLinks,
  editLinkItems,
  selectedCoverImages,
  coverImageElements,
  isCropModalVisible,
  onCoverImageFileChanged,
  onCropConfirmed,
  onCropCanceled,
  onCoverChanged,
  onEditLinksChanged,
  onAddEditLink,
}: Partial<AppCardProps> & {
  draftLinks: { id: string; name: string; url: string }[];
  editLinkItems: DraggableListItem[];
  selectedCoverImages: FileList | null;
  coverImageElements: React.ReactElement[];
  isCropModalVisible: boolean;
  onCoverImageFileChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCropConfirmed: (index: number) => void;
  onCropCanceled: () => void;
  onCoverChanged: (index: number, blob: Blob) => void;
  onEditLinksChanged: (items: string[]) => void;
  onAddEditLink: () => void;
}): JSX.Element {
  const coverImageFileRef = useRef<HTMLInputElement | null>(null);
  const [editExpand, setEditExpand] = useState<boolean>(false);
  const [draftName, setDraftName] = useState<string>(name ?? '');
  const [draftCompany, setDraftCompany] = useState<string>(company ?? '');

  const [draftProgressType, setDraftProgressType] =
    useState<AppStatus>(progressType);

  const statusOptionProps: OptionProps[] = [];
  const statusTypes = Strings.statusTypes.split(',');
  statusTypes.map((value: string, index: number) => {
    statusOptionProps.push({
      id: AppStatus[index],
      value: value,
      children: ({ selected }) => (
        <span
          className={[
            styles['dropdown-label'],
            styles['dropdown-label-mobile'],
          ].join(' ')}
        >
          {value}
        </span>
      ),
    });
  });

  const editExpandIconClasses = [styles['expand-edit-icon']];
  const editExpandClasses = [styles['expand-edit']];
  if (editExpand) {
    editExpandIconClasses.push(styles['expand-edit-icon-active']);
    editExpandClasses.push(styles['expand-edit-active']);
  }

  return (
    <Card
      key={id}
      className={[styles['root'], styles['root-mobile']].join(' ')}
    >
      <div
        className={[styles['card-content'], styles['card-content-mobile']].join(
          ' '
        )}
      >
        <div
          className={[
            styles['display-container'],
            styles['display-container-mobile'],
          ].join(' ')}
        >
          <div
            className={[
              styles['display-content'],
              styles['display-content-mobile'],
            ].join(' ')}
          >
            <div
              className={[
                styles['cover-image-container'],
                styles['cover-image-container-mobile'],
              ].join(' ')}
            >
              <CardSwipe items={coverImageElements} />
              <div
                className={[
                  styles['cover-content-container'],
                  styles['cover-content-container-mobile'],
                ].join(' ')}
              >
                <div
                  className={[
                    styles['request-update-container'],
                    styles['request-update-container-mobile'],
                  ].join(' ')}
                >
                  <Button
                    type={'default'}
                    size={'tiny'}
                    disabled={draftProgressType !== AppStatus.RELEASE}
                    icon={<IconKey strokeWidth={2} />}
                  >
                    <span
                      className={[
                        styles['button-text'],
                        styles['button-text-mobile'],
                      ].join(' ')}
                    >
                      {Strings.requestUpdate}
                    </span>
                  </Button>
                  {editMode && (
                    <Button
                      type={'text'}
                      size={'tiny'}
                      onClick={() => {
                        setEditExpand(!editExpand);
                      }}
                      icon={
                        <IconChevronRight
                          strokeWidth={2}
                          className={editExpandIconClasses.join(' ')}
                        />
                      }
                    />
                  )}
                </div>
                <div
                  className={[
                    styles['edit-cover-container'],
                    styles['edit-cover-container-mobile'],
                  ].join(' ')}
                >
                  <input
                    ref={coverImageFileRef}
                    type="file"
                    accept=".png, .jpg, .jpeg, .svg"
                    style={{ display: 'none' }}
                    multiple={true}
                    onChange={onCoverImageFileChanged}
                  />
                  <Button
                    type={'default'}
                    size={'tiny'}
                    icon={<IconCamera strokeWidth={2} />}
                    onClick={() => coverImageFileRef?.current?.click()}
                  >
                    <span
                      className={[
                        styles['button-text'],
                        styles['button-text-mobile'],
                      ].join(' ')}
                    >
                      {Strings.editCoverPhoto}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            <div
              className={[
                styles['app-content'],
                styles['app-content-mobile'],
              ].join(' ')}
            >
              <div
                className={[styles['app-info'], styles['app-info-mobile']].join(
                  ' '
                )}
              >
                <Avatar
                  src={profilePicture}
                  editMode={true}
                  onChange={onProfilePictureChanged}
                  AvatarIcon={IconBriefcase}
                />
                <div
                  className={[
                    styles['app-name-container'],
                    styles['app-name-container-mobile'],
                  ].join(' ')}
                >
                  <Typography.Text
                    className={[
                      styles['app-name'],
                      styles['app-name-mobile'],
                    ].join(' ')}
                  >
                    {draftName.length > 0 ? draftName : Strings.name}
                  </Typography.Text>
                  <Typography.Text
                    className={[
                      styles['company-name'],
                      styles['company-name-mobile'],
                    ].join(' ')}
                  >
                    {draftCompany.length > 0 ? draftCompany : Strings.company}
                  </Typography.Text>
                </div>
                <div
                  className={[
                    styles['status-container'],
                    styles['status-container-mobile'],
                  ].join(' ')}
                >
                  <Typography.Text className={styles['status']}>
                    {`${Strings.status}: ${statusTypes[draftProgressType]}`}
                  </Typography.Text>
                </div>
              </div>
            </div>
            <List items={[]} />
          </div>
          <div
            className={[
              styles['progress-container'],
              styles['progress-container-mobile'],
            ].join(' ')}
          >
            {Array(progressLength)
              .fill(0)
              .map((value, index) => {
                const classes = [styles['progress-pill']];
                if (index <= draftProgressType) {
                  classes.push(styles['progress-pill-active']);
                }
                return <div className={classes.join(' ')} />;
              })}
          </div>
        </div>
        {editMode && (
          <div className={editExpandClasses.join(' ')}>
            <div className={styles['edit-public-top-bar']}>
              <div className={styles['edit-public-top-bar-title-container']}>
                <IconEdit2 strokeWidth={2} stroke={'#000'} />
                <Typography.Text
                  strong={true}
                  className={styles['edit-public-top-bar-title']}
                >
                  {Strings.edit}
                </Typography.Text>
              </div>
              <div className={styles['edit-public-top-bar-button-container']}>
                <Button
                  danger={true}
                  size={'tiny'}
                  onClick={() => onDeleteClicked?.(id ?? '')}
                  icon={<IconTrash2 strokeWidth={2} />}
                >
                  <span className={styles['button-text']}>
                    {Strings.delete}
                  </span>
                </Button>
                <Button
                  type={'default'}
                  size={'tiny'}
                  onClick={() => {
                    const companyIndex = companyOptions?.findIndex(
                      (value) => value.value === draftCompany
                    );
                    onSaveClicked?.(id ?? '', {
                      name: draftName,
                      company: draftCompany,
                      userId: companyOptions?.[companyIndex ?? 0]?.id ?? '',
                      status: draftProgressType,
                      links: draftLinks,
                    });
                  }}
                  icon={<IconSave strokeWidth={2} stroke={'#000'} />}
                >
                  <span className={styles['button-text']}>{Strings.save}</span>
                </Button>
              </div>
            </div>
            <div className={styles['edit-public-content']}>
              <Input
                classNames={{
                  root: styles['edit-input-root'],
                  container: styles['edit-input-container'],
                  input: styles['edit-input'],
                  formLayout: {
                    label: styles['edit-formlayout-label'],
                  },
                }}
                label={Strings.appName}
                value={draftName}
                onChange={(event) => setDraftName(event.currentTarget.value)}
              />
              <Listbox
                classNames={{
                  listbox: styles['edit-listbox'],
                  formLayout: {
                    root: styles['edit-listbox-formlayout-root'],
                    label: styles['edit-formlayout-label'],
                  },
                  chevron: styles['edit-icon'],
                  label: styles['edit-listbox-label'],
                }}
                label={Strings.status}
                defaultIndex={progressType}
                options={statusOptionProps}
                onChange={(index: number, id: string, value: string) => {
                  setDraftProgressType(index);
                }}
              />
              <Listbox
                classNames={{
                  listbox: styles['edit-listbox'],
                  formLayout: {
                    root: styles['edit-listbox-formlayout-root'],
                    label: styles['edit-formlayout-label'],
                  },
                  chevron: styles['edit-icon'],
                  label: styles['edit-listbox-label'],
                }}
                defaultIndex={companyOptions?.findIndex(
                  (value) => value.value === draftCompany
                )}
                label={Strings.company}
                options={companyOptions ?? []}
                onChange={(index: number, id: string, value: string) => {
                  setDraftCompany(value);
                }}
              />
            </div>
            <Divider />
            <div className={styles['edit-private-top-bar']}>
              <div className={styles['edit-private-top-bar-button-container']}>
                <Button
                  type={'default'}
                  size={'tiny'}
                  onClick={onAddEditLink}
                  icon={<IconPlus strokeWidth={2} stroke={'#000'} />}
                >
                  <span className={styles['button-text']}>
                    {Strings.addLink}
                  </span>
                </Button>
              </div>
            </div>
            <div className={styles['edit-private-content']}>
              <DraggableList
                items={editLinkItems}
                onChanged={onEditLinksChanged}
              />
            </div>
          </div>
        )}
      </div>
      {selectedCoverImages && (
        <CropImage
          src={selectedCoverImages}
          isVisible={isCropModalVisible}
          onChange={onCoverChanged}
          onConfirmed={onCropConfirmed}
          onCanceled={onCropCanceled}
          editorProps={{
            image: '',
            width: 600,
            height: 400,
            border: 50,
            borderRadius: 4,
            color: [0, 0, 0, 0.6],
          }}
        />
      )}
    </Card>
  );
}

export interface AppCardData {
  name: string;
  company: string;
  userId: string;
  status: AppStatus;
  links: { id: string; name: string; url: string }[];
}

interface AppCardProps {
  id: string;
  name?: string;
  company?: string;
  status?: string;
  links?: { id: string; name: string; url: string }[];
  editMode?: boolean;
  companyOptions?: OptionProps[];
  profilePicture?: string;
  coverImages?: string[];
  progressType?: AppStatus;
  progressLength?: number;
  onProfilePictureChanged?: (index: number, blob: Blob) => void;
  onCoverImagesChanged?: (blobs: Blob[]) => void;
  onDeleteClicked?: (id: string) => void;
  onSaveClicked?: (id: string, data: AppCardData) => void;
}

export default function AppCardComponent(props: AppCardProps): JSX.Element {
  const [selectedCoverImages, setSelectedCoverImages] =
    useState<FileList | null>(null);
  const [coverImageBlobs, setCoverImageBlobs] = useState<Blob[]>([]);
  const [editLinkItems, setEditLinkItems] = useState<DraggableListItem[]>([]);
  const [draftLinks, setDraftLinks] = useState<
    { id: string; name: string; url: string }[]
  >(props.links ?? []);
  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [coverImageElements, setCoverImageElements] = useState<
    React.ReactElement[]
  >([]);

  const onCoverImageFileChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files && event.target.files;
    if (!files) {
      return;
    }

    setSelectedCoverImages(files);
    setIsCropModalVisible(true);
  };

  const onCropConfirmed = (index: number) => {
    if (selectedCoverImages && index >= selectedCoverImages?.length - 1) {
      setIsCropModalVisible(false);
      setSelectedCoverImages(null);
      setCoverImageBlobs([]);
    }
  };

  const onCropCanceled = () => {
    setIsCropModalVisible(false);
    setSelectedCoverImages(null);
    setCoverImageBlobs([]);
  };

  const onCoverChanged = (index: number, blob: Blob) => {
    let images: Blob[] = coverImageBlobs;
    if (index <= 0) {
      images = [];
    }

    images = images.concat([blob]);
    setCoverImageBlobs(images);

    if (selectedCoverImages && index >= selectedCoverImages?.length - 1) {
      props.onCoverImagesChanged?.(images);
    }
  };

  const onEditLinksChanged = (items: string[]) => {
    const links: { id: string; name: string; url: string }[] = [];
    for (const item of items) {
      const link = draftLinks.find((link) => link.id === item);
      if (link) {
        links.push(link);
      }
    }
    setDraftLinks(links);
  };

  const onAddEditLink = () => {
    const id = uuidv4();
    draftLinks.push(new Link({ id: id, name: '', url: '' }));
    const items: DraggableListItem[] = editLinkItems.concat([
      {
        id: id,
        height: 90,
        element: <AppCardEditLink />,
      },
    ]);

    setDraftLinks(draftLinks);
    setEditLinkItems(items);
  };

  useEffect(() => {
    const elements: React.ReactElement[] = [];
    props.coverImages?.map((url) => {
      elements.push(
        <img
          style={{
            height: 'inherit',
            width: 'inherit',
            objectFit: 'contain',
            borderRadius: '6px',
          }}
          src={url}
        />
      );
    });
    setCoverImageElements(elements);
  }, [props.coverImages]);

  return (
    <>
      <ResponsiveDesktop>
        <AppCardDesktopComponent
          {...props}
          draftLinks={draftLinks}
          editLinkItems={editLinkItems}
          selectedCoverImages={selectedCoverImages}
          coverImageElements={coverImageElements}
          isCropModalVisible={isCropModalVisible}
          onCoverImageFileChanged={onCoverImageFileChanged}
          onCropConfirmed={onCropConfirmed}
          onCropCanceled={onCropCanceled}
          onCoverChanged={onCoverChanged}
          onEditLinksChanged={onEditLinksChanged}
          onAddEditLink={onAddEditLink}
        />
      </ResponsiveDesktop>
      <ResponsiveMobile>
        <AppCardMobileComponent
          {...props}
          draftLinks={draftLinks}
          editLinkItems={editLinkItems}
          selectedCoverImages={selectedCoverImages}
          coverImageElements={coverImageElements}
          isCropModalVisible={isCropModalVisible}
          onCoverImageFileChanged={onCoverImageFileChanged}
          onCropConfirmed={onCropConfirmed}
          onCropCanceled={onCropCanceled}
          onCoverChanged={onCoverChanged}
          onEditLinksChanged={onEditLinksChanged}
          onAddEditLink={onAddEditLink}
        />
      </ResponsiveMobile>
    </>
  );
}
