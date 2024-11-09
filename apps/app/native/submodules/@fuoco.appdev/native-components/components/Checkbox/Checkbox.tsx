import {
  ImageStyle,
  NativeSyntheticEvent,
  StyleSheet,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { FormLayout, FormLayoutStyles } from '../FormLayout/FormLayout';
import { createContext } from 'react';
import NativeCheckBox, {
  CheckBoxProps as CommunityCheckBoxProps,
} from '@react-native-community/checkbox';
import Typography from '../Typography/Typography';
import Colors from '../Themes/colors';
import { darkTheme } from '@storybook/react-native-theming';

export interface CheckboxStyles {
  container?: ViewStyle | TextStyle | ImageStyle;
  checkbox?: ViewStyle;
  labelContainer?: ViewStyle | TextStyle | ImageStyle;
  labelContainerLabel?: ViewStyle | TextStyle | ImageStyle;
  labelContainerLabelSpan?: ViewStyle | TextStyle | ImageStyle;
  label?: TextStyle;
  beforeLabel?: TextStyle;
  afterLabel?: TextStyle;
  descriptionLabel?: TextStyle;
}

export interface CheckboxProps {
  customStyles?: CheckboxStyles;
  customDarkStyles?: CheckboxStyles;
  customLightStyles?: CheckboxStyles;
  communityProps?: CommunityCheckBoxProps;
  label: string | React.ReactNode;
  afterLabel?: string | React.ReactNode;
  beforeLabel?: string | React.ReactNode;
  value?: boolean;
  description?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
}

export interface CheckboxGroupProps {
  id?: any;
  error?: any;
  descriptionText?: any;
  label?: any;
  afterLabel?: string;
  beforeLabel?: string;
  labelOptional?: any;
  name?: any;
  value?: any;
  children?: React.ReactNode;
  options: Array<CheckboxProps>;
  defaultValue?: string;
  onChange?(value: boolean): void;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
}

export interface ExtraCheckboxGroupStyles {
  formLayout: FormLayoutStyles;
}

export const CheckboxContext = createContext({
  parentCallback: (e: any) => {},
  name: '',
  parentSize: '',
});

function Group({
  id,
  error,
  descriptionText,
  label,
  afterLabel,
  beforeLabel,
  labelOptional,
  children,
  name,
  options,
  onChange,
  size = 'medium',
}: CheckboxGroupProps) {
  const parentCallback = (value: boolean) => {
    if (onChange) onChange(value);
  };

  return (
    <FormLayout
      label={label}
      afterLabel={afterLabel}
      beforeLabel={beforeLabel}
      labelOptional={labelOptional}
      id={id}
      error={error}
      descriptionText={descriptionText}
      size={size}
    >
      <CheckboxContext.Provider
        value={{ parentCallback, name, parentSize: size }}
      >
        {options
          ? options.map((option: CheckboxProps) => {
              return (
                <Checkbox
                  id={option.id}
                  value={option.value}
                  label={option.label}
                  beforeLabel={option.beforeLabel}
                  afterLabel={option.afterLabel}
                  checked={option.checked}
                  name={option.name}
                  description={option.description}
                />
              );
            })
          : children}
      </CheckboxContext.Provider>
    </FormLayout>
  );
}

const styles = StyleSheet.create<CheckboxStyles>({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
const lightStyles = StyleSheet.create<CheckboxStyles>({
  checkbox: {
    borderColor: Colors.gray_900,
  },
});
const darkStyles = StyleSheet.create<CheckboxStyles>({});

export function Checkbox({
  customStyles,
  customDarkStyles,
  customLightStyles,
  communityProps,
  id,
  label,
  afterLabel,
  beforeLabel,
  description,
  name,
  checked,
  value,
  onChange,
  size = 'medium',
  disabled = false,
  ...props
}: CheckboxProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  return (
    <CheckboxContext.Consumer>
      {({ parentCallback, name, parentSize }) => {
        const onInputChange = (value: boolean) => {
          // '`onChange` callback for parent component
          if (parentCallback) parentCallback(value);
          // '`onChange` callback for this component
          if (onChange) onChange(value);
        };

        return (
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
              {
                ...styles.container,
                ...(customStyles?.container ?? {}),
              },
            ]}
          >
            <NativeCheckBox
              style={[
                ...(isDarkTheme
                  ? [
                      {
                        ...darkStyles?.checkbox,
                        ...(customDarkStyles?.checkbox ?? {}),
                      },
                    ]
                  : [
                      {
                        ...lightStyles?.checkbox,
                        ...(customLightStyles?.checkbox ?? {}),
                      },
                    ]),
                {
                  ...styles.checkbox,
                  ...(customStyles?.checkbox ?? {}),
                },
              ]}
              tintColors={{
                true: Colors.brand_500,
              }}
              onFillColor={Colors.brand_500}
              {...communityProps}
              disabled={disabled}
              value={checked}
              onValueChange={onInputChange}
            />
            <View
              style={[
                ...(isDarkTheme
                  ? [
                      {
                        ...darkStyles?.labelContainer,
                        ...(customDarkStyles?.labelContainer ?? {}),
                      },
                    ]
                  : [
                      {
                        ...lightStyles?.labelContainer,
                        ...(customLightStyles?.labelContainer ?? {}),
                      },
                    ]),
                {
                  ...styles.labelContainer,
                  ...(customStyles?.labelContainer ?? {}),
                },
              ]}
            >
              {beforeLabel && (
                <Typography.Text
                  customStyles={{
                    root: {
                      ...styles?.beforeLabel,
                      ...customStyles?.beforeLabel,
                    },
                  }}
                  customDarkStyles={{
                    root: {
                      ...darkStyles?.beforeLabel,
                      ...customDarkStyles?.beforeLabel,
                    },
                  }}
                  customLightStyles={{
                    root: {
                      ...lightStyles?.beforeLabel,
                      ...customLightStyles?.beforeLabel,
                    },
                  }}
                >
                  {beforeLabel}
                </Typography.Text>
              )}
              <Typography.Text
                customStyles={{
                  root: {
                    ...styles?.label,
                    ...customStyles?.label,
                  },
                }}
                customDarkStyles={{
                  root: {
                    ...darkStyles?.label,
                    ...customDarkStyles?.label,
                  },
                }}
                customLightStyles={{
                  root: {
                    ...lightStyles?.label,
                    ...customLightStyles?.label,
                  },
                }}
              >
                {label}
              </Typography.Text>
              {afterLabel && (
                <Typography.Text
                  customStyles={{
                    root: {
                      ...styles?.afterLabel,
                      ...customStyles?.afterLabel,
                    },
                  }}
                  customDarkStyles={{
                    root: {
                      ...darkStyles?.afterLabel,
                      ...customDarkStyles?.afterLabel,
                    },
                  }}
                  customLightStyles={{
                    root: {
                      ...lightStyles?.afterLabel,
                      ...customLightStyles?.afterLabel,
                    },
                  }}
                >
                  {afterLabel}
                </Typography.Text>
              )}
            </View>
          </View>
        );
      }}
    </CheckboxContext.Consumer>
  );
}

Checkbox.Group = Group;
export default Checkbox;
