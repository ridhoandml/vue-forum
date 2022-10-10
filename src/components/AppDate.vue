<script setup lang="ts">
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedDate from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedDate);

const props = defineProps<{
  timestamp: number;
}>();

const diffForHumans = (timestamp: number) => dayjs.unix(timestamp).fromNow();
const humanFriendlyDate = (timestamp: number) =>
  dayjs.unix(timestamp).format("llll");
</script>

<template>
  <span :title="humanFriendlyDate(props.timestamp)">
    {{ diffForHumans(props.timestamp) }}
  </span>
</template>
