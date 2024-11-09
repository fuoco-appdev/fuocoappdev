import {
  Button,
  Colors,
  DatePicker,
  Globals,
  Input,
  InputPhoneNumber,
  MarginsPaddings,
  Typography,
} from '@fuoco.appdev/native-components';
import LottieView from 'lottie-react-native';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {
  CarouselRenderItemInfo,
  ICarouselInstance,
} from 'react-native-reanimated-carousel/lib/typescript/types';
import { RoutePathsType } from '../../shared/route-paths-type';
import { DIContext } from '../App';

export interface CompleteProfileProps {
  navigation: any;
}

export interface CompleteProfileStyles {
  root?: ViewStyle;
  content?: ViewStyle;
  title?: TextStyle;
  dotContainer?: ViewStyle;
  dot?: ViewStyle;
  dotActive?: ViewStyle;
  cardTopShadow?: ViewStyle;
  cardBottomShadow?: ViewStyle;
  card?: ViewStyle;
  horizontalButtons?: ViewStyle;
}

const styles = StyleSheet.create<CompleteProfileStyles>({
  root: {
    paddingTop: MarginsPaddings.mp_8,
    height: '100%',
  },
  dotContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: MarginsPaddings.mp_5,
    width: '100%',
    gap: MarginsPaddings.mp_3,
  },
  dot: {
    height: MarginsPaddings.mp_4,
    width: MarginsPaddings.mp_4,
    borderRadius: MarginsPaddings.mp_10,
    backgroundColor: `rgba(1, 87, 155, .08)`,
  },
  dotActive: {
    backgroundColor: Colors.brand_700,
  },
  cardTopShadow: {
    borderRadius: MarginsPaddings.mp_6,
    paddingLeft: MarginsPaddings.mp_5,
  },
  cardBottomShadow: {
    borderRadius: MarginsPaddings.mp_6,
    paddingRight: MarginsPaddings.mp_5,
  },
  card: {
    width: '100%',
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    paddingTop: MarginsPaddings.mp_6,
    paddingBottom: MarginsPaddings.mp_6,
    borderRadius: MarginsPaddings.mp_6,
    overflow: 'hidden',
  },
  horizontalButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: MarginsPaddings.mp_4,
    paddingTop: MarginsPaddings.mp_6,
    paddingBottom: MarginsPaddings.mp_6,
  },
});
const lightStyles = StyleSheet.create<CompleteProfileStyles>({
  root: {
    backgroundColor: 'rgba(179, 229, 252, .13)',
  },
  cardTopShadow: {
    shadowOffset: {
      width: -MarginsPaddings.mp_1,
      height: -MarginsPaddings.mp_1,
    },
    shadowColor: '#FFFFFF',
    shadowOpacity: 1,
    shadowRadius: MarginsPaddings.mp_2,
    elevation: 8,
  },
  cardBottomShadow: {
    shadowOffset: { width: MarginsPaddings.mp_1, height: MarginsPaddings.mp_1 },
    shadowColor: 'rgba(1, 87, 155, .13)',
    shadowOpacity: 1,
    shadowRadius: MarginsPaddings.mp_2,
    elevation: 8,
  },
  card: {
    backgroundColor: '#fff',
  },
});

const darkStyles = StyleSheet.create<CompleteProfileStyles>({
  root: {},
  card: {
    backgroundColor: Colors.dark_1,
  },
});

function CompleteProfileComponent({ navigation }: CompleteProfileProps) {
  const { AccountController } = useContext(DIContext);
  const scrollOffsetValue = useSharedValue<number>(0);
  const carouselRef = useRef<ICarouselInstance>(null);
  const windowWidth = Dimensions.get('window').width;
  const { profileForm, profileFormErrors, account } = AccountController.model;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const { t, i18n } = useTranslation();
  const data = [0, 1];

  useEffect(() => {
    AccountController.updateErrorStrings({
      empty: t('fieldEmptyError') ?? '',
      exists: t('fieldExistsError') ?? '',
      spaces: t('fieldSpacesError') ?? '',
    });
  }, [i18n.language]);

  useEffect(() => {
    if (account?.status === 'Complete') {
      navigation.navigate(RoutePathsType.Customer);
    }
  }, [account]);

  const checkErrorsAsync = async (include?: string[]): Promise<boolean> => {
    AccountController.updateProfileErrors({
      firstName: undefined,
      lastName: undefined,
      username: undefined,
      phoneNumber: undefined,
    });
    const errors = await AccountController.getProfileFormErrorsAsync(
      profileForm,
      false,
      include
    );
    if (errors) {
      AccountController.updateProfileErrors(errors);
      return true;
    }

    return false;
  };

  const onNext = async () => {
    setIsLoading(true);
    const hasErrors = await checkErrorsAsync([
      'firstName',
      'lastName',
      'username',
    ]);
    if (!hasErrors) {
      carouselRef.current?.scrollTo({
        count: 1,
        animated: true,
      });
    }
    setIsLoading(false);
  };

  const onCompleteProfileAsync = async () => {
    setIsLoading(true);
    const hasErrors = await checkErrorsAsync();
    if (!hasErrors) {
      try {
        await AccountController.completeProfileAsync();
      } catch (error: any) {
        console.error(error);
      }
    }
    setIsLoading(false);
  };

  const renderItem = (
    info: CarouselRenderItemInfo<number>
  ): React.ReactNode => {
    if (info.index === 0) {
      return (
        <View
          key={0}
          style={[
            ...(isDarkTheme
              ? [darkStyles?.cardTopShadow]
              : [lightStyles?.cardTopShadow]),
            { ...styles.cardTopShadow },
          ]}
        >
          <View
            style={[
              ...(isDarkTheme
                ? [darkStyles?.cardBottomShadow]
                : [lightStyles?.cardBottomShadow]),
              { ...styles.cardBottomShadow },
            ]}
          >
            <View
              style={[
                ...(isDarkTheme ? [darkStyles?.card] : [lightStyles?.card]),
                { ...styles.card },
              ]}
            >
              <Typography.Title
                customStyles={{
                  root: {
                    paddingBottom: MarginsPaddings.mp_6,
                    textAlign: 'center',
                    fontWeight: Globals.font_weight_bold,
                  },
                }}
                level={4}
              >
                {t('generalInformation')}
              </Typography.Title>
              <Input
                label={t('firstName') ?? ''}
                value={profileForm.firstName}
                error={profileFormErrors.firstName}
                onChange={(e) =>
                  AccountController.updateProfile({
                    firstName: e.nativeEvent.text,
                  })
                }
              />
              <Input
                label={t('lastName') ?? ''}
                value={profileForm.lastName}
                error={profileFormErrors.lastName}
                onChange={(e) =>
                  AccountController.updateProfile({
                    lastName: e.nativeEvent.text,
                  })
                }
              />
              <Input
                label={t('username') ?? ''}
                value={profileForm.username}
                error={profileFormErrors.username}
                onChange={(e) =>
                  AccountController.updateProfile({
                    username: e.nativeEvent.text,
                  })
                }
              />
              <Button
                customStyles={{
                  root: {
                    paddingTop: MarginsPaddings.mp_6,
                    paddingBottom: MarginsPaddings.mp_6,
                  },
                }}
                size={'full'}
                onPress={onNext}
                loading={isLoading}
                loadingComponent={
                  <LottieView
                    source={require('../../shared/assets/lottie/loading-light.json')}
                    style={{ width: 21, height: 21 }}
                    autoPlay={true}
                    loop={true}
                  />
                }
              >
                {t('next')}
              </Button>
            </View>
          </View>
        </View>
      );
    } else if (info.index === 1) {
      return (
        <View
          key={1}
          style={[
            ...(isDarkTheme
              ? [darkStyles?.cardTopShadow]
              : [lightStyles?.cardTopShadow]),
            { ...styles.cardTopShadow },
          ]}
        >
          <View
            style={[
              ...(isDarkTheme
                ? [darkStyles?.cardBottomShadow]
                : [lightStyles?.cardBottomShadow]),
              { ...styles.cardBottomShadow },
            ]}
          >
            <View
              style={[
                ...(isDarkTheme ? [darkStyles?.card] : [lightStyles?.card]),
                { ...styles.card },
              ]}
            >
              <Typography.Title
                customStyles={{
                  root: {
                    paddingBottom: MarginsPaddings.mp_5,
                    textAlign: 'center',
                    fontWeight: Globals.font_weight_bold,
                  },
                }}
                level={4}
              >
                {t('personalInformation')}
              </Typography.Title>
              <DatePicker
                label={t('birthday') ?? ''}
                error={profileFormErrors.birthday}
                date={new Date(profileForm.birthday ?? Date.now())}
                onChange={(value) =>
                  AccountController.updateProfile({
                    birthday: value.toISOString(),
                  })
                }
              >
                {moment(profileForm.birthday).format('MMM Do YY')}
              </DatePicker>
              <InputPhoneNumber
                label={t('phoneNumber') ?? ''}
                error={profileFormErrors.phoneNumber}
                onChange={(value) =>
                  AccountController.updateProfile({ phoneNumber: value })
                }
              />
              <View
                style={[
                  ...(isDarkTheme
                    ? [darkStyles?.horizontalButtons]
                    : [lightStyles?.horizontalButtons]),
                  { ...styles.horizontalButtons },
                ]}
              >
                <Button
                  customStyles={{
                    root: {
                      flex: 1,
                    },
                  }}
                  type={'default'}
                  size={'full'}
                  onPress={() =>
                    carouselRef.current?.scrollTo({
                      count: -1,
                      animated: true,
                    })
                  }
                >
                  {t('back')}
                </Button>
                <Button
                  customStyles={{
                    root: {
                      flex: 1,
                    },
                  }}
                  size={'full'}
                  onPress={onCompleteProfileAsync}
                  loading={isLoading}
                  loadingComponent={
                    <LottieView
                      source={require('../../shared/assets/lottie/loading-light.json')}
                      style={{ width: 21, height: 21 }}
                      autoPlay={true}
                      loop={true}
                    />
                  }
                >
                  {t('complete')}
                </Button>
              </View>
            </View>
          </View>
        </View>
      );
    }
    return <View />;
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={[
          ...(isDarkTheme ? [darkStyles?.root] : [lightStyles?.root]),
          { ...styles.root },
        ]}
      >
        <View
          style={[
            ...(isDarkTheme ? [darkStyles?.content] : [lightStyles?.content]),
            { ...styles.content },
          ]}
        >
          <Typography.Title
            customStyles={{
              root: {
                paddingTop: MarginsPaddings.mp_7,
                paddingBottom: MarginsPaddings.mp_7,
                textAlign: 'center',
                fontFamily: 'Lora',
              },
            }}
          >
            {t('completeYourProfile')}
          </Typography.Title>
          <View
            style={[
              ...(isDarkTheme
                ? [darkStyles?.dotContainer]
                : [lightStyles?.dotContainer]),
              { ...styles.dotContainer },
            ]}
          >
            {data.map((value) => (
              <View
                style={[
                  ...(isDarkTheme ? [darkStyles?.dot] : [lightStyles?.dot]),
                  {
                    ...styles.dot,
                    ...(selectedIndex === value && styles.dotActive),
                  },
                ]}
              ></View>
            ))}
          </View>
          <Carousel
            ref={carouselRef}
            loop={true}
            width={windowWidth}
            height={600}
            snapEnabled={true}
            pagingEnabled={true}
            // autoPlayInterval={2000}
            data={data}
            defaultScrollOffsetValue={scrollOffsetValue}
            style={{ width: '100%' }}
            onSnapToItem={(index: number) => setSelectedIndex(index)}
            renderItem={(info) => renderItem(info)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default observer(CompleteProfileComponent);
