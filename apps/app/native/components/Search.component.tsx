import {
  Button,
  Colors,
  Globals,
  Line,
  MarginsPaddings,
  Solid,
  Typography,
} from '@fuoco.appdev/native-components';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ImageStyle,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

export interface SearchProps {
  navigation: any;
}

export interface SearchStyles {
  root?: ViewStyle;
  headerTitle?: TextStyle;
  recentsHeaderContainer?: ViewStyle;
  recentsContainer?: ViewStyle;
  recentItemContainer?: ViewStyle;
  recentItemLeftContent?: ViewStyle;
  recentItemRightContent?: ViewStyle;
  recentItemImage?: ImageStyle;
  recentItemTextContainer?: ViewStyle;
  categoriesHeaderContainer?: ViewStyle;
}

const styles = StyleSheet.create<SearchStyles>({
  root: {
    height: '100%',
  },
  headerTitle: {
    fontFamily: 'Poppins Bold',
  },
  recentsHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: MarginsPaddings.mp_6,
    paddingBottom: MarginsPaddings.mp_4,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
  },
  recentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: MarginsPaddings.mp_5,
    paddingBottom: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    gap: MarginsPaddings.mp_3,
  },
  recentItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: MarginsPaddings.mp_4,
    paddingBottom: MarginsPaddings.mp_4,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    backgroundColor: '#fff',
    borderRadius: Globals.rounded_lg,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: MarginsPaddings.mp_2,
    elevation: 4,
  },
  recentItemLeftContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  recentItemRightContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: MarginsPaddings.mp_3,
  },
  recentItemImage: {
    backgroundColor: 'rgba(179, 229, 252, .13)',
    borderRadius: Globals.rounded_full,
    borderColor: Colors.brand_600,
    borderWidth: 1,
    width: 55,
    height: 55,
  },
  recentItemTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: MarginsPaddings.mp_5,
  },
  categoriesHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: MarginsPaddings.mp_6,
    paddingBottom: MarginsPaddings.mp_4,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
  },
});
const lightStyles = StyleSheet.create<SearchStyles>({
  root: {},
});

const darkStyles = StyleSheet.create<SearchStyles>({
  root: {},
});

function SearchComponent({ navigation }: SearchProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const { t } = useTranslation();

  const recentData = [
    {
      id: 'track1',
      image: '',
      title: 'Track 1',
      subtitle: 'amalsadvalas',
    },
    {
      id: 'track2',
      image: '',
      title: 'Track 2',
      subtitle: 'amalsadvalas',
    },
    {
      id: 'track2',
      image: '',
      title: 'Track 2',
      subtitle: 'amalsadvalas',
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={[
            ...(isDarkTheme ? [darkStyles?.root] : [lightStyles?.root]),
            { ...styles.root },
          ]}
        >
          <View
            style={[
              ...(isDarkTheme
                ? [darkStyles?.recentsHeaderContainer]
                : [lightStyles?.recentsHeaderContainer]),
              { ...styles.recentsHeaderContainer },
            ]}
          >
            <Typography.Title
              customStyles={{
                root: styles.headerTitle,
              }}
              level={4}
            >
              {t('recents')}
            </Typography.Title>
            <Button size={'tiny'} type={'default'}>
              {t('showAll')}
            </Button>
          </View>
          <View
            style={[
              ...(isDarkTheme
                ? [darkStyles?.recentsContainer]
                : [lightStyles?.recentsContainer]),
              { ...styles.recentsContainer },
            ]}
          >
            {recentData.map((data) => (
              <View
                style={[
                  ...(isDarkTheme
                    ? [darkStyles?.recentItemContainer]
                    : [lightStyles?.recentItemContainer]),
                  { ...styles.recentItemContainer },
                ]}
              >
                <View
                  style={[
                    ...(isDarkTheme
                      ? [darkStyles?.recentItemLeftContent]
                      : [lightStyles?.recentItemLeftContent]),
                    { ...styles.recentItemLeftContent },
                  ]}
                >
                  <Image
                    style={[
                      ...(isDarkTheme
                        ? [darkStyles?.recentItemImage]
                        : [lightStyles?.recentItemImage]),
                      { ...styles.recentItemImage },
                    ]}
                    src={data.image}
                  />
                  <View
                    style={[
                      ...(isDarkTheme
                        ? [darkStyles?.recentItemTextContainer]
                        : [lightStyles?.recentItemTextContainer]),
                      { ...styles.recentItemTextContainer },
                    ]}
                  >
                    <Typography.Title
                      customStyles={{ root: { fontFamily: 'Poppins Bold' } }}
                      level={4}
                    >
                      {data.title}
                    </Typography.Title>
                    <Typography.Text>{data.subtitle}</Typography.Text>
                  </View>
                </View>
                <View
                  style={[
                    ...(isDarkTheme
                      ? [darkStyles?.recentItemRightContent]
                      : [lightStyles?.recentItemRightContent]),
                    { ...styles.recentItemRightContent },
                  ]}
                >
                  <Button
                    type={'text'}
                    rounded={true}
                    icon={<Solid.PlayArrow size={21} color={'#000'} />}
                  />
                  <Button
                    type={'text'}
                    rounded={true}
                    icon={<Line.Close size={21} color={'#000'} />}
                  />
                </View>
              </View>
            ))}
          </View>
          <View
            style={[
              ...(isDarkTheme
                ? [darkStyles?.categoriesHeaderContainer]
                : [lightStyles?.categoriesHeaderContainer]),
              { ...styles.categoriesHeaderContainer },
            ]}
          >
            <Typography.Title
              customStyles={{
                root: styles.headerTitle,
              }}
              level={4}
            >
              {t('categories')}
            </Typography.Title>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default observer(SearchComponent);
