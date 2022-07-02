import React from "react";
import {
  ListRenderItem,
  StyleSheet,
  View,
  ViewStyle,
  Animated,
  RefreshControlProps,
} from "react-native";
import { useTheme, Input, InputProps } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";

import Text from "./Text";
import NavigationAction from "./NavigationAction";
import LoadingIndicator from "./LoadingIndicator";

import { Modalize } from "react-native-modalize";

interface BottomSheetProps<T> {
  modalHeight?: number | undefined;
  title: string;
  data?: Array<T>;
  onEndReached?(): void;
  keyExtractor?: (item: any, index: number) => string; // must fix
  renderItem?: ListRenderItem<any> | undefined | null;
  ListHeaderComponent?:
    | React.ReactElement<any, any>
    | React.ComponentType<any>
    | null;
  ListFooterComponent?:
    | React.ReactElement<any, any>
    | React.ComponentType<any>
    | null;
  ListEmptyComponent?: React.ReactElement<any, any> | null;
  refreshControl?:
    | Animated.WithAnimatedObject<
        React.ReactElement<
          RefreshControlProps,
          | string
          | ((props: any) => React.ReactElement<any, any> | null)
          | (new (props: any) => React.Component<any, any, any>)
        >
      >
    | undefined;
  children?: React.ReactElement<any, any> | React.ComponentType<any> | null;
  contentContainerStyle?: ViewStyle;
  styleFlatList?: ViewStyle;
  loading?: boolean;
  searchProps?: InputProps;
  scrollEnabled?: boolean;
}

function ModalizePanel<T>(
  {
    modalHeight,
    title,
    data,
    onEndReached,
    renderItem,
    refreshControl,
    ListFooterComponent,
    ListHeaderComponent,
    ListEmptyComponent,
    contentContainerStyle,
    children,
    styleFlatList,
    loading,
    searchProps,
    scrollEnabled = true,
  }: BottomSheetProps<T>,
  ref: React.ForwardedRef<Modalize>
) {
  const theme = useTheme();
  const { height } = useLayout();
  const { bottom } = useSafeAreaInsets();

  const modalizeRef = React.useRef<Modalize>();

  React.useImperativeHandle(ref, () => ({
    open: () => {
      modalizeRef.current?.open();
    },
    close: () => {
      modalizeRef.current?.close();
    },
  }));

  const close = React.useCallback(() => {
    modalizeRef.current?.close();
  }, []);

  const headerComponent = React.useCallback(() => {
    return (
      <View style={styles.headerModal}>
        <NavigationAction icon={"close"} onPress={close} status="basic" />
        <Text marginTop={32} category="h4" capitalize>
          {title}
        </Text>
        {searchProps && (
          <View
            style={[
              styles.searchBox,
              { backgroundColor: theme["background-search-box"] },
            ]}
          >
            <Input {...searchProps} size="small" />
          </View>
        )}
      </View>
    );
  }, [title, searchProps]);

  return loading ? (
    <Modalize
      ref={modalizeRef}
      modalHeight={modalHeight ? modalHeight : height * 0.9}
      HeaderComponent={headerComponent}
      handleStyle={styles.handleStyle}
      modalStyle={[
        styles.modalStyle,
        { backgroundColor: theme["background-basic-color-1"] },
      ]}
    >
      <LoadingIndicator size="giant" />
    </Modalize>
  ) : children ? (
    <Modalize
      ref={modalizeRef}
      HeaderComponent={headerComponent}
      modalHeight={modalHeight ? modalHeight : height * 0.9}
      handleStyle={styles.handleStyle}
      modalStyle={[
        styles.modalStyle,
        { backgroundColor: theme["background-basic-color-1"] },
      ]}
    >
      {children}
    </Modalize>
  ) : (
    <Modalize
      ref={modalizeRef}
      modalHeight={modalHeight ? modalHeight : height * 0.9}
      flatListProps={{
        contentContainerStyle: [
          { paddingBottom: bottom },
          contentContainerStyle,
        ],
        ListHeaderComponent: ListHeaderComponent,
        ListFooterComponent: ListFooterComponent,
        ListEmptyComponent: ListEmptyComponent,
        refreshControl: refreshControl,
        style: styleFlatList ? styleFlatList : styles.styleFlatList,
        data: data,
        scrollEnabled: scrollEnabled,
        showsVerticalScrollIndicator: false,
        keyExtractor: (item: any, index: number) => index.toString(),
        renderItem: renderItem,
        onEndReached: onEndReached,
      }}
      HeaderComponent={headerComponent}
      handleStyle={styles.handleStyle}
      modalStyle={[
        styles.modalStyle,
        { backgroundColor: theme["background-basic-color-1"] },
      ]}
    />
  );
}

export default React.forwardRef(ModalizePanel) as <T>(
  props: BottomSheetProps<T> & { ref?: React.ForwardedRef<Modalize> }
) => ReturnType<typeof ModalizePanel>;

const styles = StyleSheet.create({
  modalStyle: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  handleStyle: {
    height: 0,
  },
  headerModal: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 32,
    paddingBottom: 8,
  },
  styleFlatList: {
    flex: 1,
    paddingHorizontal: 32,
  },
  searchBox: {
    marginTop: 32,
  },
});
