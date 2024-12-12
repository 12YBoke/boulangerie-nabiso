"use client";

import useExtensionIdStore from "@/store/extension-id-store";
import useStore from "@/hooks/useStore";

export function useCurrentExtension() {
  const extensionId = useStore(
    useExtensionIdStore,
    (state) => state.extensionId
  );

  return extensionId;
}
