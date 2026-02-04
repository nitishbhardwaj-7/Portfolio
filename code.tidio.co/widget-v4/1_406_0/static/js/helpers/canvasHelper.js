import { getDocumentRef } from "./focusManager";

export function measureTextWidthInCanvas(text, fontStyles) {
  const documentRef = getDocumentRef();
  if (!documentRef?.createElement) {
    return 0;
  }
  const canvas =
    "OffscreenCanvas" in window
      ? new OffscreenCanvas(500, 100)
      : documentRef.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = fontStyles;
  return Math.ceil(ctx.measureText(text).width);
}
