import {
  StyleSheet,
  useColorScheme,
  View,
  ViewStyle,
  Image,
  ImageSourcePropType,
  Text,
  TextStyle,
  ImageStyle,
} from 'react-native';
import { Button, ButtonStyles } from '../Button';
import { Colors, Globals } from '../Themes';
import { Edit } from '../Icon/Icons/Line';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';

export interface AvatarStyles {
  container?: ViewStyle;
  editImageButton?: ViewStyle;
  image?: ImageStyle;
  text?: TextStyle;
}

export interface ExtraAvatarStyles {
  button?: ButtonStyles;
}

export interface AvatarProps {
  children?: React.ReactNode;
  src?: ImageSourcePropType | undefined;
  loading?: boolean;
  loadingComponent?: JSX.Element;
  customStyles?: AvatarStyles;
  customDarkStyles?: AvatarStyles;
  customLightStyles?: AvatarStyles;
  customExtraStyles?: ExtraAvatarStyles;
  customExtraDarkStyles?: ExtraAvatarStyles;
  customExtraLightStyles?: ExtraAvatarStyles;
  text?: string;
  editMode?: boolean;
  size?: 'custom' | 'small' | 'medium' | 'large';
  cropperSize?: { width: number; height: number };
  avatarIcon?: JSX.Element;
  onChange?: (content: ImageOrVideo) => void;
  onLoading?: (loading: boolean) => void;
}

const styles = StyleSheet.create<AvatarStyles>({
  container: {
    position: 'relative',
    borderRadius: Globals.rounded_full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {},
  text: {
    fontWeight: Globals.font_weight_bold,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

const lightStyles = StyleSheet.create<AvatarStyles>({
  container: {
    backgroundColor: Colors.gray_200,
  },
  text: {
    color: Colors.gray_900,
  },
});

const darkStyles = StyleSheet.create<AvatarStyles>({
  container: {
    backgroundColor: Colors.dark_6,
  },
  text: {
    color: Colors.gray_100,
  },
});

export default function Avatar({
  src,
  customStyles,
  customDarkStyles,
  customLightStyles,
  customExtraStyles,
  customExtraDarkStyles,
  customExtraLightStyles,
  loading,
  loadingComponent,
  text,
  editMode = false,
  size = 'large',
  cropperSize = { width: 300, height: 300 },
  avatarIcon,
  children,
  onChange,
  onLoading,
}: AvatarProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  let sizeStyle: ViewStyle | ImageStyle = {};
  let editImageButtonSizeStyle: ViewStyle = {};
  if (size === 'small') {
    sizeStyle = {
      height: 34,
      width: 34,
    };
    editImageButtonSizeStyle = {
      height: 21,
      width: 21,
    };
  } else if (size === 'medium') {
    sizeStyle = {
      height: 55,
      width: 55,
    };
    editImageButtonSizeStyle = {
      height: 21,
      width: 21,
    };
  } else if (size === 'large') {
    sizeStyle = {
      height: 90,
      width: 90,
    };
    editImageButtonSizeStyle = {
      height: 34,
      width: 34,
    };
  } else if (size === 'custom') {
  }

  const onEditFilePressAsync = async () => {
    onLoading?.(true);
    try {
      const content = await ImagePicker.openPicker({
        width: cropperSize.width,
        height: cropperSize.height,
        cropping: true,
        mediaType: 'photo',
      });
      onChange?.(content);
    } catch (error: any) {
      console.warn(error);
    }
    onLoading?.(false);
  };

  return (
    <View>
      <View
        style={[
          ...(isDarkTheme
            ? [
                {
                  ...darkStyles?.container,
                  ...(customDarkStyles?.container ?? {}),
                },
              ]
            : [
                {
                  ...lightStyles?.container,
                  ...(customLightStyles?.container ?? {}),
                },
              ]),
          { ...styles.container, ...(customStyles?.container ?? {}) },
          sizeStyle,
        ]}
      >
        {!src && avatarIcon}
        {!src && text && (
          <Text
            style={[
              ...(isDarkTheme
                ? [
                    {
                      ...darkStyles?.text,
                      ...(customDarkStyles?.text ?? {}),
                    },
                  ]
                : [
                    {
                      ...lightStyles?.text,
                      ...(customLightStyles?.text ?? {}),
                    },
                  ]),
              { ...styles.text, ...(customStyles?.text ?? {}) },
            ]}
          >
            {text[0]}
          </Text>
        )}
        {src && (
          <Image
            source={src}
            style={[
              ...(isDarkTheme
                ? [
                    {
                      ...darkStyles?.image,
                      ...(customDarkStyles?.image ?? {}),
                    },
                  ]
                : [
                    {
                      ...lightStyles?.image,
                      ...(customLightStyles?.image ?? {}),
                    },
                  ]),
              {
                ...styles.image,
                ...(customStyles?.image ?? {}),
              },
              sizeStyle as ImageStyle,
            ]}
          />
        )}
        {children && children}
        {editMode && (
          <View
            style={[
              ...(isDarkTheme
                ? [
                    {
                      ...darkStyles?.editImageButton,
                      ...(customDarkStyles?.editImageButton ?? {}),
                    },
                  ]
                : [
                    {
                      ...lightStyles?.editImageButton,
                      ...(customLightStyles?.editImageButton ?? {}),
                    },
                  ]),
              {
                ...styles.editImageButton,
                ...(customStyles?.editImageButton ?? {}),
              },
              editImageButtonSizeStyle,
            ]}
          >
            <Button
              customStyles={{
                button: { ...editImageButtonSizeStyle },
                ...customExtraStyles?.button,
              }}
              customDarkStyles={customExtraDarkStyles?.button}
              customLightStyles={customExtraLightStyles?.button}
              rounded={true}
              loadingComponent={loadingComponent}
              loading={loading}
              icon={
                <Edit size={21} color={'#fff'} onPress={onEditFilePressAsync} />
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}
