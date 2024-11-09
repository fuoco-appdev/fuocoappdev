import { Button, ButtonStyles } from '../Button';
import { FormLayout, FormLayoutStyles } from '../FormLayout';
import {
  GestureResponderEvent,
  ListRenderItem,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputFocusEventData,
  TextStyle,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { CountryData, CountryDataProps } from './CountryData';
import memoize from 'lodash.memoize';
import { reduce, startsWith } from 'lodash';
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import CountryFlag from 'react-native-country-flag';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetItemStyles,
  BottomSheetStyles,
  ExtraBottomSheetItemStyles,
} from '../BottomSheet/BottomSheet';
import { Colors, Globals, MarginsPaddings } from '../Themes';
import { Typography } from '../Typography';
import { SharedValue } from 'react-native-reanimated';
import { ErrorOutline } from '../Icon/Icons/Line';

export interface InputPhoneNumberStyles {
  root?: ViewStyle;
  countryName?: TextStyle;
  dialCode?: TextStyle;
  searchRoot?: ViewStyle;
  searchContainer?: ViewStyle;
  searchIcon?: ViewStyle;
  searchWithIcon?: ViewStyle;
  search?: ViewStyle;
  dropdownList?: ViewStyle;
  inputPhoneNumber?: ViewStyle;
  actionsContainer?: TextStyle;
  inputContainer?: ViewStyle;
  error?: ViewStyle | TextStyle;
  input?: TextStyle;
}

export interface ExtraInputPhoneNumberStyles {
  button?: ButtonStyles;
  formLayout?: FormLayoutStyles;
  bottomSheet?: BottomSheetStyles;
  bottomSheetItem?: BottomSheetItemStyles;
  extraButtomSheetItem?: ExtraBottomSheetItemStyles;
}

export interface InputPhoneNumberProps {
  customStyles?: InputPhoneNumberStyles;
  customLightStyles?: InputPhoneNumberStyles;
  customDarkStyles?: InputPhoneNumberStyles;
  customExtraStyles?: ExtraInputPhoneNumberStyles;
  customExtraDarkStyles?: ExtraInputPhoneNumberStyles;
  customExtraLightStyles?: ExtraInputPhoneNumberStyles;
  id?: string;
  error?: string;
  label?: string;
  afterLabel?: string;
  beforeLabel?: string;
  labelOptional?: string;
  layout?: 'horizontal' | 'vertical';
  descriptionText?: string;
  prefix?: string;
  disableCountryCode?: boolean;
  countryCodeEditable?: boolean;
  disableCountryGuess?: boolean;
  enableLongNumbers?: boolean;
  country?: string;
  onlyCountries?: string[];
  excludeCountries?: string[];
  enableAreaCodes?: string[];
  enableTerritories?: boolean;
  regions?: string[];
  preferredCountries?: string[];
  preserveOrder?: string[];
  masks?: string[];
  priority?: number;
  areaCodes?: string[];
  localization?: Record<string, string>;
  defaultMask?: string;
  alwaysDefaultMask?: boolean;
  disableInitialCountryGuess?: boolean;
  defaultValue?: string;
  enableAreaCodeStretch?: boolean;
  autoFormat?: boolean;
  disabled?: boolean;
  jumpCursorToEnd?: boolean;
  defaultPlaceholder?: string;
  searchNotFound?: string;
  searchPlaceholder?: string;
  autocompleteSearch?: boolean;
  placeholderTextColor?: string;
  //   inputProps?: React.DetailedHTMLProps<
  //     React.InputHTMLAttributes<HTMLInputElement>,
  //     HTMLInputElement
  //   >;
  //   formStyle?: React.CSSProperties;
  //   containerStyle?: React.CSSProperties;
  //   inputStyle?: React.CSSProperties;
  shakeInterpolationCount?: number;
  shakeDistance?: number;
  onChange?: (
    value: string,
    data: CountryDataProps | {},
    event:
      | NativeSyntheticEvent<TextInputChangeEventData>
      | GestureResponderEvent,
    formattedValue: string
  ) => void;
  onFocus?: (
    event: NativeSyntheticEvent<TextInputFocusEventData>,
    data: CountryDataProps | {}
  ) => void;
}

const styles = StyleSheet.create<InputPhoneNumberStyles>({
  root: {},
  countryName: {},
  dialCode: {},
  searchRoot: {},
  searchContainer: {},
  searchIcon: {},
  searchWithIcon: {},
  search: {},
  dropdownList: {},
  inputPhoneNumber: {},
  actionsContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: MarginsPaddings.mp_4,
    top: 0,
    bottom: 0,
    right: 0,
    paddingRight: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Globals.rounded_md,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
  },
  error: {
    borderColor: Colors.red_500,
    borderWidth: 1,
    borderStyle: 'solid',
    fontFamily: Globals.font_family,
  },
  input: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    paddingTop: MarginsPaddings.mp_4,
    paddingBottom: MarginsPaddings.mp_4,
    width: '100%',
    fontSize: Globals.font_size_sm,
    lineHeight: Globals.font_line_height_sm,
    fontFamily: Globals.font_family,
  },
});
const lightStyles = StyleSheet.create<InputPhoneNumberStyles>({
  root: {},
  countryName: {},
  dialCode: {},
  searchRoot: {},
  searchContainer: {},
  searchIcon: {},
  searchWithIcon: {},
  search: {},
  dropdownList: {},
  inputPhoneNumber: {},
  actionsContainer: {
    color: Colors.gray_900,
  },
  inputContainer: {
    backgroundColor: Colors.gray_100,
  },
  input: {
    color: Colors.gray_900,
  },
});
const darkStyles = StyleSheet.create<InputPhoneNumberStyles>({
  root: {},
  countryName: {},
  dialCode: {},
  searchRoot: {},
  searchContainer: {},
  searchIcon: {},
  searchWithIcon: {},
  search: {},
  dropdownList: {},
  inputPhoneNumber: {},
  actionsContainer: {
    color: Colors.gray_100,
  },
  inputContainer: {
    backgroundColor: Colors.dark_1,
  },
  input: {
    color: Colors.gray_100,
  },
});

export default function InputPhoneNumber({
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  customExtraStyles = {},
  customExtraDarkStyles = {},
  customExtraLightStyles = {},
  id,
  error,
  label,
  afterLabel,
  beforeLabel,
  labelOptional,
  layout,
  descriptionText,
  prefix = '+',
  disableCountryCode = false,
  countryCodeEditable = true,
  enableLongNumbers,
  country = '',
  enableAreaCodes = [],
  enableTerritories = false,
  regions = [],
  onlyCountries = [],
  excludeCountries = [],
  preferredCountries = [],
  preserveOrder = [],
  masks = [],
  priority,
  areaCodes,
  localization = {},
  defaultMask = '... ... ... ... ..',
  alwaysDefaultMask = false,
  defaultValue = '',
  disableInitialCountryGuess = false,
  disableCountryGuess = false,
  enableAreaCodeStretch = false,
  autoFormat = true,
  disabled = false,
  jumpCursorToEnd = true,
  defaultPlaceholder = '1 (702) 123-4567',
  searchNotFound = 'No entries to show',
  searchPlaceholder = 'Search',
  placeholderTextColor,
  autocompleteSearch = false,
  // inputProps,
  // formStyle,
  // containerStyle,
  // inputStyle,
  shakeInterpolationCount = 3,
  shakeDistance = 6,
  onChange,
  onFocus,
}: InputPhoneNumberProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const numberInputRef = useRef<TextInput>(null);
  const [selectedCountry, setSelectedCountry] =
    useState<CountryDataProps | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [formattedNumber, setFormattedNumber] = useState<string>('');
  const [freezeSelection, setFreezeSelection] = useState<boolean>(false);
  const [selection, setSelection] = useState<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });
  const countryData = new CountryData(
    enableAreaCodes,
    enableTerritories,
    regions,
    onlyCountries,
    preferredCountries,
    excludeCountries,
    preserveOrder,
    areaCodes,
    localization,
    prefix,
    defaultMask,
    alwaysDefaultMask,
    masks,
    priority
  );
  const [onlyCountriesData, setOnlyCountriesData] = useState<
    CountryDataProps[]
  >(countryData.onlyCountries);
  const [hiddenAreaCodesData, setHiddenAreaCodesData] = useState<
    CountryDataProps[]
  >(countryData.hiddenAreaCodes);
  const [preferredCountriesData, setPreferredCountriesData] = useState<
    CountryDataProps[]
  >(countryData.preferredCountries);
  const [searchValue, setSearchValue] = useState<string>('');
  const getCountryData = (): CountryData | {} => {
    if (!selectedCountry) return {};
    return {
      name: selectedCountry.name || '',
      dialCode: selectedCountry.dialCode || '',
      countryCode: selectedCountry.iso2 || '',
      format: selectedCountry.format || '',
    };
  };

  const guessSelectedCountry = memoize(
    (
      inputNumber: string,
      country: string | number,
      onlyCountries: CountryDataProps[],
      hiddenAreaCodes: CountryDataProps[]
    ): CountryDataProps | undefined => {
      // if enableAreaCodes == false, try to search in hidden area codes to detect area code correctly
      // then search and insert main country which has this area code
      // https://github.com/bl00mber/react-phone-input-2/issues/201
      if (enableAreaCodes.length <= 0) {
        let mainCode: CountryDataProps | undefined;
        hiddenAreaCodes.some((country: CountryDataProps) => {
          if (startsWith(inputNumber, country.dialCode)) {
            onlyCountries.some((o) => {
              if (country.iso2 === o.iso2 && o.mainCode) {
                mainCode = o;
                return true;
              }
            });
            return true;
          }
        });
        if (mainCode) return mainCode;
      }

      const secondBestGuess = onlyCountries.find((o) => o.iso2 === country);
      if (inputNumber.trim() === '') return secondBestGuess;

      const bestGuess: CountryDataProps | undefined = onlyCountries.reduce(
        (selected, country) => {
          if (startsWith(inputNumber, country.dialCode)) {
            if (country.dialCode.length > selected.dialCode.length) {
              return country;
            }
            if (
              country.dialCode.length === selected.dialCode.length &&
              country.priority < selected.priority
            ) {
              return country;
            }
          }
          return selected;
        },
        {
          ...(selectedCountry ?? {
            name: '',
            localName: '',
            countryCode: '',
            regions: [],
            format: '',
            iso2: '',
            dialCode: '',
            mainCode: false,
            hasAreaCodes: false,
            isAreaCode: false,
            priority: 0,
            areaCodeLength: 0,
          }),
          dialCode: '',
          priority: 10001,
        }
      );

      if (!bestGuess?.name) return secondBestGuess;
      return bestGuess;
    }
  );

  const formatNumber = (
    text: string,
    country: CountryDataProps | null
  ): string => {
    if (!country) return text;

    const { format } = country;

    let pattern: string[] | string | null = null;
    if (disableCountryCode) {
      pattern = format.split(' ');
      pattern.shift();
      pattern = pattern.join(' ');
    } else {
      if (enableAreaCodeStretch && country.isAreaCode) {
        pattern = format.split(' ');
        pattern[1] = pattern[1].replace(
          /\.+/,
          ''.padEnd(country.areaCodeLength, '.')
        );
        pattern = pattern.join(' ');
      } else {
        pattern = format;
      }
    }

    if (!text || text.length === 0) {
      return disableCountryCode ? '' : prefix ?? '';
    }

    // for all strings with length less than 3, just return it (1, 2 etc.)
    // also return the same text if the selected country has no fixed format
    if ((text && text.length < 2) || !pattern || !autoFormat) {
      return disableCountryCode ? text : prefix + text;
    }

    const formattedObject = reduce(
      pattern,
      (acc, character) => {
        if (acc.remainingText.length === 0) {
          return acc;
        }

        if (character !== '.') {
          return {
            formattedText: acc.formattedText + character,
            remainingText: acc.remainingText,
          };
        }

        const [head, ...tail] = acc.remainingText;

        return {
          formattedText: acc.formattedText + head,
          remainingText: tail,
        };
      },
      {
        formattedText: '',
        remainingText: text.split(''),
      }
    );

    let formattedNumber: string = '';
    if (enableLongNumbers) {
      formattedNumber =
        formattedObject.formattedText + formattedObject.remainingText.join('');
    } else {
      formattedNumber = formattedObject.formattedText;
    }

    // Always close brackets
    if (formattedNumber.includes('(') && !formattedNumber.includes(')'))
      formattedNumber += ')';
    return formattedNumber;
  };

  const getFormattedValue = (
    value: string
  ): {
    newFormattedValue: string;
    newSelectedCountry: CountryDataProps | null;
  } => {
    let newFormattedNumber = disableCountryCode ? '' : prefix ?? '';
    let newSelectedCountry: CountryDataProps | null = selectedCountry;

    if (!countryCodeEditable) {
      const mainCode: string | undefined = newSelectedCountry?.hasAreaCodes
        ? onlyCountriesData.find(
            (o: CountryDataProps) =>
              o.iso2 === newSelectedCountry?.iso2 && o.mainCode
          )?.dialCode
        : newSelectedCountry?.dialCode;

      const updatedInput = (prefix ?? '') + (mainCode ?? '');
      if (value.slice(0, updatedInput.length) !== updatedInput)
        return { newFormattedValue: '', newSelectedCountry: null };
    }

    if (value === prefix) {
      // we should handle change when we delete the last digit
      return { newFormattedValue: '', newSelectedCountry: newSelectedCountry };
    }

    // Does exceed default 15 digit phone number limit
    if (value.replace(/\D/g, '').length > 15) {
      if (enableLongNumbers === false)
        return { newFormattedValue: '', newSelectedCountry: null };
      if (typeof enableLongNumbers === 'number') {
        if (value.replace(/\D/g, '').length > enableLongNumbers)
          return { newFormattedValue: '', newSelectedCountry: null };
      }
    }

    // if the input is the same as before, must be some special key like enter etc.
    if (value === formattedNumber)
      return { newFormattedValue: '', newSelectedCountry: null };

    // if (onChange) e.persist();

    if (value.length > 0) {
      // before entering the number in new format, lets check if the dial code now matches some other country
      const inputNumber = value.replace(/\D/g, '');
      // we don't need to send the whole number to guess the country... only the first 6 characters are enough
      // the guess country function can then use memoization much more effectively since the set of input it
      // gets has drastically reduced
      if (
        !freezeSelection ||
        (!!selectedCountry &&
          selectedCountry.dialCode.length > inputNumber.length)
      ) {
        if (disableCountryGuess) {
          newSelectedCountry = selectedCountry;
        } else {
          newSelectedCountry =
            guessSelectedCountry(
              inputNumber.substring(0, 6),
              country ?? '',
              onlyCountriesData,
              hiddenAreaCodesData
            ) || selectedCountry;
        }

        if (freezeSelection) {
          setFreezeSelection(false);
        }
      }

      newFormattedNumber = formatNumber(inputNumber, newSelectedCountry!);
      newSelectedCountry = newSelectedCountry?.dialCode
        ? newSelectedCountry
        : selectedCountry;
    }

    const oldFormattedText = formattedNumber;
    let oldCaretPosition = selection?.start ?? 0;
    let caretPosition = selection?.start ?? 0;
    let formattedNumberDifference =
      (newFormattedNumber?.length ?? 0) - (oldFormattedText.length ?? 0);

    if (formattedNumberDifference > 0) {
      caretPosition = caretPosition - formattedNumberDifference;
    }

    const lastChar = newFormattedNumber.charAt(newFormattedNumber.length - 1);
    if (lastChar === ')') {
      setSelection({
        start: oldFormattedText.length - 1 + formattedNumberDifference,
        end: oldFormattedText.length - 1 + formattedNumberDifference,
      });
    } else if (oldCaretPosition < oldFormattedText.length) {
      setSelection({
        start: oldCaretPosition + 1 + formattedNumberDifference,
        end: oldCaretPosition + 1 + formattedNumberDifference,
      });
    } else {
      setSelection({
        start: selection.start + formattedNumberDifference,
        end: selection.end + formattedNumberDifference,
      });
    }

    return {
      newFormattedValue: newFormattedNumber,
      newSelectedCountry: newSelectedCountry,
    };
  };

  const handleInputFocus = (
    e: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    // if the input is blank, insert dial code of the selected country
    if (
      e.nativeEvent.text === prefix &&
      selectedCountry &&
      !disableCountryCode
    ) {
      const newFormattedNumber = prefix + selectedCountry.dialCode;
      setFormattedNumber(newFormattedNumber);
    }

    onFocus?.(e, getCountryData());
  };

  const concatPreferredCountries = (
    preferredCountriesData: CountryDataProps[],
    onlyCountriesData: CountryDataProps[]
  ) => {
    if (preferredCountries.length > 0) {
      return [...new Set(preferredCountriesData.concat(onlyCountriesData))];
    } else {
      return onlyCountriesData;
    }
  };

  const getSearchFilteredCountries = () => {
    const allCountries = concatPreferredCountries(
      preferredCountriesData,
      onlyCountriesData
    );
    const sanitizedSearchValue = searchValue
      .trim()
      .toLowerCase()
      .replace('+', '');
    if (sanitizedSearchValue) {
      // [...new Set()] to get rid of duplicates
      // firstly search by iso2 code
      if (/^\d+$/.test(sanitizedSearchValue)) {
        // contains digits only
        // values wrapped in ${} to prevent undefined
        return allCountries.filter(({ dialCode }) =>
          [`${dialCode}`].some((field) =>
            field.toLowerCase().includes(sanitizedSearchValue)
          )
        );
      } else {
        const iso2countries: CountryDataProps[] = allCountries.filter(
          ({ iso2 }) =>
            [`${iso2}`].some((field) =>
              field.toLowerCase().includes(sanitizedSearchValue)
            )
        );
        // || '' - is a fix to prevent search of 'undefined' strings
        // Since all the other values shouldn't be undefined, this fix was accepte
        // but the structure do not looks very good
        const searchedCountries = allCountries.filter(
          ({ name, localName, iso2 }) =>
            [`${name}`, `${localName || ''}`].some((field) =>
              field.toLowerCase().includes(sanitizedSearchValue)
            )
        );

        //scrollToTop();
        return [
          ...new Set(
            ([] as CountryDataProps[]).concat(iso2countries, searchedCountries)
          ),
        ];
      }
    } else {
      return allCountries;
    }
  };

  const getDropdownCountryName = (country: CountryDataProps) => {
    return country.localName || country.name;
  };

  const handleFlagItemClick = (
    country: CountryDataProps,
    e: GestureResponderEvent
  ) => {
    const currentSelectedCountry = selectedCountry;
    const newSelectedCountry = onlyCountriesData.find((o) => o === country);
    if (!newSelectedCountry) return;

    const unformattedNumber: string = formattedNumber
      .replace(' ', '')
      .replace('(', '')
      .replace(')', '')
      .replace('-', '');
    const newNumber =
      unformattedNumber.length > 1
        ? unformattedNumber.replace(
            currentSelectedCountry?.dialCode ?? '',
            newSelectedCountry.dialCode
          )
        : newSelectedCountry.dialCode;
    const newFormattedNumber = formatNumber(
      newNumber.replace(/\D/g, ''),
      newSelectedCountry
    );

    setShowDropdown(false);
    setSelectedCountry(newSelectedCountry);
    setFreezeSelection(true);
    setFormattedNumber(newFormattedNumber);
    setSearchValue('');
    setSelection({
      start: newFormattedNumber.length,
      end: newFormattedNumber.length,
    });
    numberInputRef.current?.focus();

    onChange?.(
      formattedNumber.replace(/[^0-9]+/g, ''),
      getCountryData(),
      e,
      formattedNumber
    );
  };

  const handleInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const { newFormattedValue, newSelectedCountry } = getFormattedValue(
      e.nativeEvent.text
    );
    setFormattedNumber(newFormattedValue);
    setSelectedCountry(newSelectedCountry);

    onChange?.(
      newFormattedValue.replace(/[^0-9]+/g, ''),
      getCountryData(),
      e,
      newFormattedValue
    );
  };

  const data = useMemo(() => getSearchFilteredCountries(), []);
  const renderItem = useCallback(({ item, index }: any) => {
    return (
      <BottomSheet.Item
        customStyles={customExtraStyles.bottomSheet}
        customDarkStyles={customExtraDarkStyles.bottomSheet}
        customLightStyles={customExtraLightStyles.bottomSheet}
        customExtraDarkStyles={customExtraDarkStyles.extraButtomSheetItem}
        customExtraLightStyles={customExtraLightStyles.extraButtomSheetItem}
        customExtraStyles={customExtraStyles.extraButtomSheetItem}
        key={item.name}
        icon={
          <CountryFlag isoCode={item?.iso2?.toUpperCase() ?? 'ca'} size={21} />
        }
        onPress={(e) => handleFlagItemClick(item, e)}
      >
        {`${getDropdownCountryName(item)} ${
          item.format
            ? formatNumber(item.dialCode, item)
            : prefix + item.dialCode
        }`}
      </BottomSheet.Item>
    );
  }, []);

  useEffect(() => {
    const { newFormattedValue, newSelectedCountry } =
      getFormattedValue(defaultValue);

    setFormattedNumber(newFormattedValue);
    setSelectedCountry(newSelectedCountry);
  }, [defaultValue]);

  return (
    <View
      style={[
        ...(isDarkTheme
          ? [{ ...darkStyles?.root, ...(customDarkStyles?.root ?? {}) }]
          : [{ ...lightStyles?.root, ...(customLightStyles?.root ?? {}) }]),
        { ...styles.root, ...(customStyles?.root ?? {}) },
      ]}
    >
      <FormLayout
        label={label}
        afterLabel={afterLabel}
        beforeLabel={beforeLabel}
        labelOptional={labelOptional}
        error={error}
        descriptionText={descriptionText}
        customStyles={customExtraStyles.formLayout}
        customDarkStyles={customExtraDarkStyles.formLayout}
        customLightStyles={customExtraDarkStyles.formLayout}
      >
        <View
          style={[
            ...(isDarkTheme
              ? [
                  {
                    ...darkStyles?.inputContainer,
                    ...(customDarkStyles?.inputContainer ?? {}),
                  },
                  error ? darkStyles.error : {},
                ]
              : [
                  {
                    ...lightStyles?.inputContainer,
                    ...(customLightStyles?.inputContainer ?? {}),
                  },
                  error ? lightStyles.error : {},
                ]),
            {
              ...styles.inputContainer,
              ...(customStyles?.inputContainer ?? {}),
            },
            error ? styles.error : {},
          ]}
        >
          <Button
            customStyles={{
              ...customExtraStyles.button,
              ...{
                leftIconContainer: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 21,
                  width: 21,
                },
              },
            }}
            customDarkStyles={customExtraDarkStyles.button}
            customLightStyles={customExtraLightStyles.button}
            rounded={true}
            size={'tiny'}
            type={'text'}
            icon={
              <CountryFlag
                isoCode={selectedCountry?.iso2?.toUpperCase() ?? 'ca'}
                size={16}
              />
            }
            onPress={() => {
              numberInputRef.current?.blur();
              setShowDropdown(true);
            }}
          />
          <TextInput
            ref={numberInputRef}
            style={[
              styles.input,
              customStyles?.input ?? {},
              ...(isDarkTheme
                ? [darkStyles?.input, customDarkStyles?.input ?? {}]
                : [lightStyles?.input, customLightStyles?.input ?? {}]),
            ]}
            value={formattedNumber}
            placeholderTextColor={
              placeholderTextColor ?? isDarkTheme
                ? Colors.gray_400
                : Colors.gray_600
            }
            editable={!disabled}
            selectTextOnFocus={!disabled}
            onChange={handleInput}
            selection={selection}
            onSelectionChange={(e) =>
              setSelection({
                start: e.nativeEvent.selection.start,
                end: e.nativeEvent.selection.end,
              })
            }
            onFocus={handleInputFocus}
            placeholder={defaultPlaceholder}
            keyboardType={'phone-pad'}
          />
          {error && (
            <View
              style={[
                styles.actionsContainer,
                customStyles?.actionsContainer ?? {},
                ...(isDarkTheme
                  ? [
                      darkStyles?.actionsContainer,
                      customDarkStyles?.actionsContainer ?? {},
                    ]
                  : [
                      lightStyles?.actionsContainer,
                      customLightStyles?.actionsContainer ?? {},
                    ]),
              ]}
            >
              {error && (
                <ErrorOutline
                  size={21}
                  color={Colors.red_500}
                  strokeWidth={0}
                />
              )}
            </View>
          )}
        </View>
      </FormLayout>
      <BottomSheet
        customStyles={customExtraStyles.bottomSheet}
        customDarkStyles={customExtraDarkStyles.bottomSheet}
        customLightStyles={customExtraLightStyles.bottomSheet}
        id={'phone-number'}
        type={'flat-list'}
        snapPoints={['50%', '90%']}
        open={showDropdown}
        onClose={() => {
          setShowDropdown(false);
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.iso2}
      />
    </View>
  );
}
