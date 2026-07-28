<template>
  <div class="playground-metrics" aria-live="polite">
    <div v-for="item in items" :key="item.label">
      <span>{{ item.label }}</span>
      <strong :data-testid="item.testId">{{ item.value }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  items: Array<{
    label: string;
    value: string | number;
    testId?: string;
  }>;
}>();
</script>

<style scoped lang="less">
.playground-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(90px, 1fr));
  gap: 10px;
}

.playground-metrics > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  background: var(--td-bg-color-secondarycontainer, #f3f5f7);
  border-radius: 6px;
}

.playground-metrics span {
  color: var(--td-text-color-secondary, #667085);
  font-size: 11px;
}

.playground-metrics strong {
  font:
    600 13px/1.2 ui-monospace,
    SFMono-Regular,
    Menlo,
    monospace;
}

@media (max-width: 560px) {
  .playground-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
