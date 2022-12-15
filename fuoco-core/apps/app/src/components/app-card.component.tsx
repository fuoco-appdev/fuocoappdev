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
} from '@fuoco.appdev/core-ui';
import { useEffect, useRef, useState } from 'react';
import { Strings } from '../localization';
import styles from './app-card.module.scss';

interface AppCardProps {
  key?: string | number;
  name?: string;
  company?: string;
  status?: string;
  profilePicture?: string;
  coverImages?: string[];
  progressIndex?: number;
  progressLength?: number;
  onProfilePictureChanged?: (index: number, blob: Blob) => void;
  onCoverImagesChanged?: (blobs: Blob[]) => void;
}

export default function AppCardComponent({
  key,
  name = 'Name',
  company = 'Company',
  status = 'No status',
  profilePicture,
  coverImages,
  progressIndex = -1,
  progressLength = 5,
  onProfilePictureChanged,
  onCoverImagesChanged,
}: AppCardProps): JSX.Element {
  const [selectedCoverImages, setSelectedCoverImages] =
    useState<FileList | null>(null);
  const coverImageFileRef = useRef<HTMLInputElement | null>(null);
  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [coverImageBlobs, setCoverImageBlobs] = useState<Blob[]>([]);
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
    if (index <= 0) {
      setCoverImageBlobs([blob]);
      return;
    }

    const images = coverImageBlobs.concat([blob]);
    setCoverImageBlobs(images);

    if (selectedCoverImages && index >= selectedCoverImages?.length - 1) {
      onCoverImagesChanged?.(images);
    }
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

  return (
    <Card key={key}>
      <div className={styles['root']}>
        <div className={styles['display-container']}>
          <div className={styles['display-content']}>
            <div className={styles['cover-image-container']}>
              <CardSwipe items={coverImageElements} />
              <div className={styles['cover-content-container']}>
                <div className={styles['request-update-container']}>
                  <Button
                    type={'default'}
                    size={'tiny'}
                    icon={<IconKey strokeWidth={2} />}
                  >
                    <span className={styles['button-text']}>
                      {Strings.requestUpdate}
                    </span>
                  </Button>
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
                    {name}
                  </Typography.Text>
                  <Typography.Text className={styles['company-name']}>
                    {company}
                  </Typography.Text>
                </div>
                <div className={styles['status-container']}>
                  <Typography.Text className={styles['status']}>
                    {`${Strings.status}: ${status}`}
                  </Typography.Text>
                </div>
              </div>
            </div>
          </div>
          <List items={[]} />
          <div className={styles['progress-container']}>
            {Array(progressLength)
              .fill(0)
              .map((value, index) => {
                const classes = [styles['progress-pill']];
                if (index <= progressIndex) {
                  classes.push(styles['progress-pill-active']);
                }
                return <div className={classes.join(' ')} />;
              })}
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
  );
}
