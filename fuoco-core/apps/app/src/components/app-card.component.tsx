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
import { useRef, useState } from 'react';
import { Strings } from '../localization';
import styles from './app-card.module.scss';

interface AppCardProps {
  key?: string | number;
  name?: string;
  company?: string;
  status?: string;
  profilePicture?: string;
  progressIndex?: number;
  progressLength?: number;
  onProfilePictureChanged?: (blob: Blob) => void;
  onCoverChanged?: (blob: Blob) => void;
}

export default function AppCardComponent({
  key,
  name = 'Name',
  company = 'Company',
  status = 'No status',
  profilePicture,
  progressIndex = -1,
  progressLength = 5,
  onProfilePictureChanged,
  onCoverChanged,
}: AppCardProps): JSX.Element {
  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(
    null
  );
  const coverImageFileRef = useRef<HTMLInputElement | null>(null);
  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);

  const onCoverImageFileChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    setSelectedCoverImage(file);
    setIsCropModalVisible(true);
  };

  const onCropConfirmed = () => {
    setIsCropModalVisible(false);
    setSelectedCoverImage(null);
  };

  const onCropCanceled = () => {
    setIsCropModalVisible(false);
    setSelectedCoverImage(null);
  };

  return (
    <Card key={key}>
      <div className={styles['root']}>
        <div className={styles['display-container']}>
          <div className={styles['display-content']}>
            <div className={styles['cover-image-container']}>
              <CardSwipe items={[]} />
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
      {selectedCoverImage && (
        <CropImage
          src={selectedCoverImage}
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
