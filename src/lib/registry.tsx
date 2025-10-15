// lib/registry.tsx
"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create a ServerStyleSheet once per request
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    // Inject the server-collected styles into the HTML during SSR
    return <>{sheet.getStyleElement()}</>;
  });

  // Wrap children in the StyleSheetManager to collect styles on the server
  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
}
