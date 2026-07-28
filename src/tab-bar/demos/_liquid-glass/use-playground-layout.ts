import { onBeforeUnmount, onMounted, ref, watch, Ref } from 'vue';

interface PlaygroundLayoutOptions {
  panelMinWidth?: number;
  gap?: number;
}

export function usePlaygroundLayout(previewWidth: Ref<number>, options: PlaygroundLayoutOptions = {}) {
  const { panelMinWidth = 420, gap = 20 } = options;
  const layoutElement = ref<HTMLElement>();
  const stacked = ref(false);
  let layoutObserver: ResizeObserver | undefined;

  const updateLayoutMode = () => {
    const element = layoutElement.value;
    if (!element) return;
    stacked.value = element.clientWidth - previewWidth.value - gap < panelMinWidth;
  };

  onMounted(() => {
    updateLayoutMode();
    window.addEventListener('resize', updateLayoutMode);
    if (!layoutElement.value || typeof ResizeObserver === 'undefined') return;
    layoutObserver = new ResizeObserver(updateLayoutMode);
    layoutObserver.observe(layoutElement.value);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateLayoutMode);
    layoutObserver?.disconnect();
  });

  watch(previewWidth, updateLayoutMode);

  return { layoutElement, stacked };
}
