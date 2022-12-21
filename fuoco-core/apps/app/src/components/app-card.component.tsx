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
import { Strings } from '../localization';
import styles from './app-card.module.scss';
import { AppStatus, Link } from '../protobuf/core_pb';

export interface AppCardData {
  name: string;
  userId: string;
  status: AppStatus;
  links: { id: string; name: string; url: string }[];
}

interface AppCardProps {
  id: string;
  name?: string;
  companyIndex?: number;
  status?: string;
  links?: { id: string; name: string; url: string }[];
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

export default function AppCardComponent({
  id,
  name = '',
  companyIndex = 0,
  links = [],
  companyOptions = [],
  profilePicture,
  coverImages,
  progressType = AppStatus.USER_STORIES,
  progressLength = 4,
  onProfilePictureChanged,
  onCoverImagesChanged,
  onDeleteClicked,
  onSaveClicked,
}: AppCardProps): JSX.Element {
  const [selectedCoverImages, setSelectedCoverImages] =
    useState<FileList | null>(null);
  const coverImageFileRef = useRef<HTMLInputElement | null>(null);
  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [coverImageBlobs, setCoverImageBlobs] = useState<Blob[]>([]);
  const [coverImageElements, setCoverImageElements] = useState<
    React.ReactElement[]
  >([]);
  const [editLinkItems, setEditLinkItems] = useState<DraggableListItem[]>([]);
  const [draftLinks, setDraftLinks] =
    useState<{ id: string; name: string; url: string }[]>(links);
  const [editExpand, setEditExpand] = useState<boolean>(false);
  const [draftName, setDraftName] = useState<string>(name);
  const [draftCompanyIndex, setDraftCompanyIndex] =
    useState<number>(companyIndex);
  const [draftCompany, setDraftCompany] = useState<string>(
    companyOptions[companyIndex]?.value ?? ''
  );
  const [draftProgressType, setDraftProgressType] =
    useState<AppStatus>(progressType);

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
      onCoverImagesChanged?.(images);
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
    coverImages?.map((url) => {
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
  }, [coverImages]);

  const statusOptionProps: OptionProps[] = [];
  const statusTypes = Strings.statusTypes.split(',');
  statusTypes.map((value: string, index: number) => {
    statusOptionProps.push({
      id: AppStatus[index],
      value: value,
      children: ({ selected }) => (
        <span className={styles['dropdown-label']}>{value}</span>
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
    <div key={id}>
      <Card className={styles['root']}>
        <div className={styles['card-content']}>
          <div className={styles['display-container']}>
            <div className={styles['display-content']}>
              <div className={styles['cover-image-container']}>
                <CardSwipe items={coverImageElements} />
                <div className={styles['cover-content-container']}>
                  <div className={styles['request-update-container']}>
                    <Button
                      type={'default'}
                      size={'tiny'}
                      disabled={draftProgressType !== AppStatus.RELEASE}
                      icon={<IconKey strokeWidth={2} />}
                    >
                      <span className={styles['button-text']}>
                        {Strings.requestUpdate}
                      </span>
                    </Button>
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
                  </div>
                  <div className={styles['edit-cover-container']}>
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
                      <span className={styles['button-text']}>
                        {Strings.editCoverPhoto}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className={styles['app-content']}>
                <div className={styles['app-info']}>
                  <Avatar
                    src={profilePicture}
                    editMode={true}
                    onChange={onProfilePictureChanged}
                    AvatarIcon={IconBriefcase}
                  />
                  <div className={styles['app-name-container']}>
                    <Typography.Text className={styles['app-name']}>
                      {draftName.length > 0 ? draftName : Strings.name}
                    </Typography.Text>
                    <Typography.Text className={styles['company-name']}>
                      {draftCompany.length > 0 ? draftCompany : Strings.company}
                    </Typography.Text>
                  </div>
                  <div className={styles['status-container']}>
                    <Typography.Text className={styles['status']}>
                      {`${Strings.status}: ${statusTypes[draftProgressType]}`}
                    </Typography.Text>
                  </div>
                </div>
              </div>
              <List items={[]} />
            </div>
            <div className={styles['progress-container']}>
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
                  onClick={() => onDeleteClicked?.(id)}
                  icon={<IconTrash2 strokeWidth={2} />}
                >
                  <span className={styles['button-text']}>
                    {Strings.delete}
                  </span>
                </Button>
                <Button
                  type={'default'}
                  size={'tiny'}
                  onClick={() =>
                    onSaveClicked?.(id, {
                      name: draftName,
                      userId: companyOptions[draftCompanyIndex]?.id ?? '',
                      status: draftProgressType,
                      links: draftLinks,
                    })
                  }
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
                defaultIndex={companyIndex}
                label={Strings.company}
                options={companyOptions}
                onChange={(index: number, id: string, value: string) => {
                  setDraftCompany(value);
                  setDraftCompanyIndex(index);
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
    </div>
  );
}
