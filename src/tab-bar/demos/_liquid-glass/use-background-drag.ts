import { ref } from 'vue';

interface BackgroundDragOptions {
  maxOffset?: number;
  ignoredSelector?: string;
}

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
}

export function useBackgroundDrag(options: BackgroundDragOptions = {}) {
  const { maxOffset = 160, ignoredSelector = '.t-tab-bar' } = options;
  const backgroundDragging = ref(false);
  const backgroundOffsetX = ref(0);
  const backgroundOffsetY = ref(0);
  let dragState: DragState | undefined;

  const clampOffset = (value: number) => Math.min(Math.max(value, -maxOffset), maxOffset);

  const startBackgroundDrag = (event: PointerEvent) => {
    if (event.target instanceof Element && event.target.closest(ignoredSelector)) return;

    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture(event.pointerId);
    backgroundDragging.value = true;
    dragState = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: backgroundOffsetX.value,
      offsetY: backgroundOffsetY.value,
    };
  };

  const moveBackground = (event: PointerEvent) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    backgroundOffsetX.value = clampOffset(dragState.offsetX + event.clientX - dragState.startX);
    backgroundOffsetY.value = clampOffset(dragState.offsetY + event.clientY - dragState.startY);
  };

  const stopBackgroundDrag = (event: PointerEvent) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const target = event.currentTarget as HTMLElement;
    if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
    backgroundDragging.value = false;
    dragState = undefined;
  };

  const resetBackgroundPosition = () => {
    backgroundOffsetX.value = 0;
    backgroundOffsetY.value = 0;
  };

  return {
    backgroundDragging,
    backgroundOffsetX,
    backgroundOffsetY,
    startBackgroundDrag,
    moveBackground,
    stopBackgroundDrag,
    resetBackgroundPosition,
  };
}
