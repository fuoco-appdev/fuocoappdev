import {
  GestureResponderEvent,
  ListRenderItem,
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NativeBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
  BottomSheetVirtualizedList,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, ButtonStyles } from '../Button';
import { Portal } from '../Portal';
import { SharedValue } from 'react-native-reanimated';

export interface BottomSheetStyles {
  root?: ViewStyle;
  sheet?: ViewStyle;
  backdrop?: ViewStyle;
  container?: ViewStyle;
}

export interface BottomSheetProps {
  id: string;
  open: boolean;
  customStyles?: BottomSheetStyles;
  customDarkStyles?: BottomSheetStyles;
  customLightStyles?: BottomSheetStyles;
  snapIndex?: number;
  children?: React.ReactNode;
  snapPoints?: string[];
  data?:
    | ArrayLike<unknown>
    | SharedValue<ArrayLike<unknown> | null | undefined>;
  renderItem?:
    | ListRenderItem<unknown>
    | SharedValue<ListRenderItem<unknown> | null | undefined>
    | null;
  type?: 'view' | 'scroll-view' | 'flat-list' | 'virtualized-list';
  keyExtractor?: (item: unknown, index: number) => string;
  onClose?: () => void;
  onChange?: (index: number, position: number, type: SNAP_POINT_TYPE) => void;
}

const styles = StyleSheet.create<BottomSheetStyles>({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  sheet: {
    flex: 1,
  },
  backdrop: {},
  container: {},
});
const lightStyles = StyleSheet.create<BottomSheetStyles>({});
const darkStyles = StyleSheet.create<BottomSheetStyles>({});

function BottomSheet({
  customStyles,
  customDarkStyles,
  customLightStyles,
  id,
  open = false,
  snapIndex = 0,
  snapPoints = ['25%', '50%', '90%'],
  type = 'view',
  data,
  renderItem,
  children,
  keyExtractor,
  onClose,
  onChange,
}: BottomSheetProps) {
  const bottomSheetRef = useRef<NativeBottomSheet>(null);
  const snapPointsMemo = useMemo(() => snapPoints, []);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  useEffect(() => {
    if (open) {
      bottomSheetRef.current?.snapToIndex(snapIndex);
      setIsOpen(true);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [open]);

  const handleOnChange = (
    index: number,
    position: number,
    type: SNAP_POINT_TYPE
  ) => {
    onChange?.(index, position, type);
    if (index === -1) {
      setIsOpen(false);
    }
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        style={[
          ...(isDarkTheme
            ? [
                {
                  ...darkStyles?.backdrop,
                  ...(customDarkStyles?.backdrop ?? {}),
                },
              ]
            : [
                {
                  ...lightStyles?.backdrop,
                  ...(customLightStyles?.backdrop ?? {}),
                },
              ]),
          { ...styles.backdrop, ...(customStyles?.backdrop ?? {}) },
        ]}
      />
    ),
    []
  );

  return (
    <Portal name={id}>
      {isOpen && (
        <GestureHandlerRootView
          style={[
            ...(isDarkTheme
              ? [{ ...darkStyles?.root, ...(customDarkStyles?.root ?? {}) }]
              : [{ ...lightStyles?.root, ...(customLightStyles?.root ?? {}) }]),
            { ...styles.root, ...(customStyles?.root ?? {}) },
          ]}
        >
          <NativeBottomSheet
            ref={bottomSheetRef}
            onChange={handleOnChange}
            snapPoints={snapPointsMemo}
            enableDynamicSizing={false}
            backdropComponent={renderBackdrop}
            enablePanDownToClose={true}
            onClose={onClose}
            style={[
              ...(isDarkTheme
                ? [{ ...darkStyles?.sheet, ...(customDarkStyles?.sheet ?? {}) }]
                : [
                    {
                      ...lightStyles?.sheet,
                      ...(customLightStyles?.sheet ?? {}),
                    },
                  ]),
              { ...styles.sheet, ...(customStyles?.sheet ?? {}) },
            ]}
          >
            {type === 'view' && (
              <BottomSheetView
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
                ]}
              >
                {children}
              </BottomSheetView>
            )}
            {type === 'scroll-view' && (
              <BottomSheetScrollView
                contentContainerStyle={[
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
                ]}
              >
                {children}
              </BottomSheetScrollView>
            )}
            {type === 'flat-list' && (
              <BottomSheetFlatList
                contentContainerStyle={[
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
                ]}
                keyExtractor={keyExtractor}
                maxToRenderPerBatch={20}
                data={data}
                renderItem={renderItem}
              />
            )}
            {type === 'virtualized-list' && (
              <BottomSheetVirtualizedList
                data={data}
                keyExtractor={keyExtractor}
                getItemCount={(data) => data.length}
                getItem={(data, index) => data[index]}
                renderItem={renderItem}
              />
            )}
          </NativeBottomSheet>
        </GestureHandlerRootView>
      )}
    </Portal>
  );
}

export interface BottomSheetItemStyles {
  root?: ViewStyle;
}

export interface ExtraBottomSheetItemStyles {
  button?: ButtonStyles;
}

export interface BottomSheetItemProps {
  customStyles?: BottomSheetItemStyles;
  customLightStyles?: BottomSheetItemStyles;
  customDarkStyles?: BottomSheetItemStyles;
  customExtraStyles?: ExtraBottomSheetItemStyles;
  customExtraDarkStyles?: ExtraBottomSheetItemStyles;
  customExtraLightStyles?: ExtraBottomSheetItemStyles;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

const itemStyles = StyleSheet.create<BottomSheetItemStyles>({});
const itemLightStyles = StyleSheet.create<BottomSheetItemStyles>({});
const itemDarkStyles = StyleSheet.create<BottomSheetItemStyles>({});

function BottomSheetItem({
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  customExtraStyles = {},
  customExtraDarkStyles = {},
  customExtraLightStyles = {},
  children,
  icon,
  onPress,
}: BottomSheetItemProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  return (
    <View
      style={[
        ...(isDarkTheme
          ? [{ ...itemDarkStyles?.root, ...(customDarkStyles?.root ?? {}) }]
          : [{ ...itemLightStyles?.root, ...(customLightStyles?.root ?? {}) }]),
        { ...itemStyles.root, ...(customStyles?.root ?? {}) },
      ]}
    >
      <Button
        customStyles={customExtraStyles.button}
        customDarkStyles={customExtraDarkStyles.button}
        customLightStyles={customExtraLightStyles.button}
        block={true}
        type={'text'}
        size={'full'}
        onPress={onPress}
        icon={icon}
      >
        {children}
      </Button>
    </View>
  );
}

BottomSheet.Item = BottomSheetItem;
export default BottomSheet;
