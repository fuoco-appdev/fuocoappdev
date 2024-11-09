import {
  Button,
  Globals,
  MarginsPaddings,
  Typography,
} from '@fuoco.appdev/native-components';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

export interface HomeProps {
  navigation: any;
}

export interface HomeStyles {
  root?: ViewStyle;
  tagListContainer?: ViewStyle;
  recentsHeaderContainer?: ViewStyle;
  headerTitle?: TextStyle;
  recentListContainer?: ViewStyle;
  recommendationHeaderContainer?: ViewStyle;
  recommendationListContainer?: ViewStyle;
  teachersHeaderContainer?: ViewStyle;
  teachersListContainer?: ViewStyle;
}

const styles = StyleSheet.create<HomeStyles>({
  root: {
    height: '100%',
    paddingBottom: MarginsPaddings.mp_8,
  },
  tagListContainer: {
    paddingTop: MarginsPaddings.mp_5,
    paddingBottom: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    gap: MarginsPaddings.mp_3,
  },
  recentsHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: MarginsPaddings.mp_5,
    paddingBottom: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
  },
  headerTitle: {
    fontFamily: 'Poppins Bold',
  },
  recentListContainer: {
    paddingTop: MarginsPaddings.mp_5,
    paddingBottom: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    gap: MarginsPaddings.mp_5,
  },
  recommendationHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: MarginsPaddings.mp_5,
    paddingBottom: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
  },
  recommendationListContainer: {
    paddingTop: MarginsPaddings.mp_5,
    paddingBottom: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    gap: MarginsPaddings.mp_5,
  },
  teachersHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: MarginsPaddings.mp_5,
    paddingBottom: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
  },
  teachersListContainer: {
    paddingTop: MarginsPaddings.mp_5,
    paddingBottom: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    gap: MarginsPaddings.mp_5,
  },
});
const lightStyles = StyleSheet.create<HomeStyles>({
  root: {},
});

const darkStyles = StyleSheet.create<HomeStyles>({
  root: {},
});

function HomeComponent({ navigation }: HomeProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const { t } = useTranslation();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const tagsData = [
    {
      id: 'all',
      title: 'All',
    },
    {
      id: 'anxiety',
      title: 'Anxiety',
    },
    {
      id: 'stress',
      title: 'Stress',
    },
    {
      id: 'sadness',
      title: 'Sadness',
    },
    {
      id: 'calming',
      title: 'Calming',
    },
    {
      id: 'harmony',
      title: 'Harmony',
    },
  ];
  const recentsData = [
    {
      id: 'track1',
      title: 'Track 1',
      subtitle: 'amalsadvalas',
    },
    {
      id: 'track2',
      title: 'Track 2',
      subtitle: 'amalsadvalas',
    },
    {
      id: 'track3',
      title: 'Track 3',
      subtitle: 'amalsadvalas',
    },
    {
      id: 'track4',
      title: 'Track 4',
      subtitle: 'amalsadvalas',
    },
    {
      id: 'track5',
      title: 'Track 5',
      subtitle: 'amalsadvalas',
    },
  ];

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <SafeAreaView>
      <ScrollView
        bounces={true}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={[
            ...(isDarkTheme ? [darkStyles?.root] : [lightStyles?.root]),
            { ...styles.root },
          ]}
        >
          <FlatList
            horizontal={true}
            data={tagsData}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              ...(isDarkTheme
                ? [darkStyles?.tagListContainer]
                : [lightStyles?.tagListContainer]),
              { ...styles.tagListContainer },
            ]}
            renderItem={({ item }) => (
              <Button key={item.id} rounded={true} type={'default'}>
                {item.title}
              </Button>
            )}
            keyExtractor={(item) => item.id}
          />
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
          <FlatList
            horizontal={true}
            data={recentsData}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              ...(isDarkTheme
                ? [darkStyles?.recentListContainer]
                : [lightStyles?.recentListContainer]),
              { ...styles.recentListContainer },
            ]}
            bounces={true}
            renderItem={({ item }) => (
              <View
                key={item.id}
                style={[
                  {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                ]}
              >
                <View
                  style={[
                    {
                      height: 90,
                      width: 90,
                      backgroundColor: '#fff',
                      borderRadius: Globals.rounded_lg,
                      shadowColor: '#000',
                      shadowOpacity: 1,
                      shadowRadius: MarginsPaddings.mp_2,
                      elevation: 4,
                    },
                  ]}
                />
                <View
                  style={[
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      paddingTop: MarginsPaddings.mp_4,
                      paddingBottom: MarginsPaddings.mp_4,
                    },
                  ]}
                >
                  <Typography.Title level={4}>{item.title}</Typography.Title>
                  <Typography.Text
                    customStyles={{
                      root: {
                        fontSize: Globals.font_size_xs,
                        lineHeight: Globals.font_line_height_xs,
                        fontFamily: 'Poppins Bold',
                      },
                    }}
                  >
                    {item.subtitle}
                  </Typography.Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
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
              {t('youMightLike')}
            </Typography.Title>
          </View>
          <FlatList
            horizontal={true}
            data={recentsData}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              ...(isDarkTheme
                ? [darkStyles?.recommendationListContainer]
                : [lightStyles?.recommendationListContainer]),
              { ...styles.recommendationListContainer },
            ]}
            bounces={true}
            renderItem={({ item }) => (
              <View
                key={item.id}
                style={[
                  {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                ]}
              >
                <View
                  style={[
                    {
                      height: 145,
                      width: 145,
                      backgroundColor: '#fff',
                      borderRadius: Globals.rounded_lg,
                      shadowColor: '#000',
                      shadowOpacity: 1,
                      shadowRadius: MarginsPaddings.mp_2,
                      elevation: 4,
                    },
                  ]}
                />
                <View
                  style={[
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      paddingTop: MarginsPaddings.mp_4,
                      paddingBottom: MarginsPaddings.mp_4,
                    },
                  ]}
                >
                  <Typography.Title level={4}>{item.title}</Typography.Title>
                  <Typography.Text
                    customStyles={{
                      root: {
                        fontSize: Globals.font_size_xs,
                        lineHeight: Globals.font_line_height_xs,
                        fontFamily: 'Poppins Bold',
                      },
                    }}
                  >
                    {item.subtitle}
                  </Typography.Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
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
              {t('yourTopTeachers')}
            </Typography.Title>
          </View>
          <FlatList
            horizontal={true}
            data={recentsData}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              ...(isDarkTheme
                ? [darkStyles?.recentListContainer]
                : [lightStyles?.recentListContainer]),
              { ...styles.recentListContainer },
            ]}
            bounces={true}
            renderItem={({ item }) => (
              <View
                key={item.id}
                style={[
                  {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                ]}
              >
                <View
                  style={[
                    {
                      height: 145,
                      width: 145,
                      backgroundColor: '#fff',
                      borderRadius: Globals.rounded_full,
                      shadowColor: '#000',
                      shadowOpacity: 1,
                      shadowRadius: MarginsPaddings.mp_2,
                      elevation: 4,
                    },
                  ]}
                />
                <View
                  style={[
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      paddingTop: MarginsPaddings.mp_4,
                      paddingBottom: MarginsPaddings.mp_4,
                    },
                  ]}
                >
                  <Typography.Title level={4}>{item.title}</Typography.Title>
                  <Typography.Text
                    customStyles={{
                      root: {
                        fontSize: Globals.font_size_xs,
                        lineHeight: Globals.font_line_height_xs,
                        fontFamily: 'Poppins Bold',
                      },
                    }}
                  >
                    {item.subtitle}
                  </Typography.Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default observer(HomeComponent);
