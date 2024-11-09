import { Auth, MarginsPaddings } from '@fuoco.appdev/native-components';
import { runInAction } from 'mobx';
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

export interface PrivacyPolicyProps {
  navigation: any;
}

export interface PrivacyPolicyStyles {
  root?: ViewStyle;
}

const styles = StyleSheet.create<PrivacyPolicyStyles>({
  root: {
    paddingTop: MarginsPaddings.mp_9,
    paddingBottom: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    height: '100%',
  },
});
const lightStyles = StyleSheet.create<PrivacyPolicyStyles>({
  root: {
    backgroundColor: 'rgba(179, 229, 252, .13)',
  },
});

const darkStyles = StyleSheet.create<PrivacyPolicyStyles>({
  root: {},
});

function PrivacyPolicyComponent({ navigation }: PrivacyPolicyProps) {
  const { PrivacyPolicyController } = useContext(DIContext);
  const { markdown } = PrivacyPolicyController.model;
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const { t } = useTranslation();

  useEffect(() => {
    runInAction(() => {
      PrivacyPolicyController.load(1);
      const loadMarkdown = async () => {
        const file = await fs.readFileAssets('markdown/privacy_policy.md');
        PrivacyPolicyController.updateMarkdown(file);
      };
      loadMarkdown();
    });

    return () => {
      PrivacyPolicyController.disposeLoad(1);
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

export default observer(PrivacyPolicyComponent);
