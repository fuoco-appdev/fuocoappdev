import { Auth, MarginsPaddings } from '@fuoco.appdev/native-components';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import fs from 'react-native-fs';
import Markdown from 'react-native-markdown-display';
import { DIContext } from '../App';

export interface TermsOfServiceProps {
  navigation: any;
}

export interface TermsOfServiceStyles {
  root?: ViewStyle;
}

const styles = StyleSheet.create<TermsOfServiceStyles>({
  root: {
    paddingTop: MarginsPaddings.mp_9,
    paddingBottom: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    height: '100%',
  },
});
const lightStyles = StyleSheet.create<TermsOfServiceStyles>({
  root: {
    backgroundColor: 'rgba(179, 229, 252, .13)',
  },
});

const darkStyles = StyleSheet.create<TermsOfServiceStyles>({
  root: {},
});

function TermsOfServiceComponent({ navigation }: TermsOfServiceProps) {
  const { TermsOfServiceController } = useContext(DIContext);
  const { markdown } = TermsOfServiceController.model;
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const { t } = useTranslation();

  useEffect(() => {
    TermsOfServiceController.load(1);
    const loadMarkdown = async () => {
      const file = await fs.readFileAssets('markdown/terms_of_service.md');
      TermsOfServiceController.updateMarkdown(file);
    };
    loadMarkdown();

    return () => {
      TermsOfServiceController.disposeLoad(1);
    };
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        style={[
          ...(isDarkTheme ? [darkStyles?.root] : [lightStyles?.root]),
          { ...styles.root },
        ]}
      >
        <Auth.TermsOfService>
          <Markdown>{markdown}</Markdown>
        </Auth.TermsOfService>
      </ScrollView>
    </SafeAreaView>
  );
}

export default observer(TermsOfServiceComponent);
