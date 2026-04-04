import BottomSheetInitial, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import type { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React, { useCallback, useMemo, useRef } from "react";
import { Text, View } from "react-native";

import { BOTTOM_NAVBAR_HEIGHT } from "@/constants";

export interface BottomSheetControls {
  open: () => void;
  close: () => void;
  isOpen: () => boolean;
}

export interface BottomSheetProps {
  title?: string;
  children?: React.ReactNode;
  enableDynamicSizing?: boolean;
  onReady: (controls: BottomSheetControls) => void;
}

export const BottomSheet = ({ title, onReady, children, enableDynamicSizing }: BottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheetInitial>(null);
  const isOpenRef = useRef(false);
  const snapPoints = useMemo(() => ["40%"], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />
    ),
    [],
  );

  return (
    <View className="absolute top-0 left-0 right-0" style={{ bottom: BOTTOM_NAVBAR_HEIGHT }} pointerEvents="box-none">
      <BottomSheetInitial
        ref={(sheet) => {
          bottomSheetRef.current = sheet;
          if (sheet) {
            onReady({
              open: () => sheet.snapToIndex(0),
              close: () => sheet.close(),
              isOpen: () => isOpenRef.current,
            });
          }
        }}
        onChange={(index) => {
          isOpenRef.current = index >= 0;
        }}
        snapPoints={enableDynamicSizing ? undefined : snapPoints}
        index={-1}
        enablePanDownToClose
        enableDynamicSizing={enableDynamicSizing}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#121212" }}
        handleIndicatorStyle={{ backgroundColor: "#666" }}
      >
        <BottomSheetView className="flex-1 items-center" style={{ padding: 16 }}>
          {title && <Text className="text-dimmed text-base font-medium mb-6">{title}</Text>}
          {children}
        </BottomSheetView>
      </BottomSheetInitial>
    </View>
  );
};
