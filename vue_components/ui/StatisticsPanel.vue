<script setup lang="ts">
import StatsCard from './StatsCard.vue'
</script>
<template>
  <div class="space-y-4">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard title="Total Messages" value="0" icon="div" />
      <StatsCard title="Active Patterns" value="0" icon="div" />
      <StatsCard title="Total Sources" value="0" icon="div" />
      <StatsCard title="Categories" value="0" icon="div" />
    </div>
    <div class="text-center text-muted-foreground">Statistics charts not implemented</div>
  </div>
</template>
