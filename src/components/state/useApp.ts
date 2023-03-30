import React, { useRef, useState } from "react";

export default function useApp() {
  const sceneRef = useRef<any | null>(null);

  return { sceneRef };
}
