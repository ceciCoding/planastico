<script setup>
const props = defineProps({
  direction: {
    type: String,
    default: "left",
  },
});
</script>

<template>
  <svg
    class="icon-arrow"
    :class="`icon-arrow--${props.direction}`"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.23922 9C5.34831 9 4.90214 10.0771 5.53211 10.7071L8.71247 13.8875C9.10497 14.28 9.10215 14.9172 8.70619 15.3062C8.31517 15.6904 7.68758 15.6876 7.29997 15.3L0.707106 8.70711C0.316582 8.31658 0.316583 7.68342 0.707107 7.29289L7.29997 0.700027C7.68759 0.312414 8.31517 0.309638 8.70619 0.693805C9.10215 1.08281 9.10497 1.72003 8.71247 2.11253L5.53211 5.29289C4.90214 5.92286 5.34831 7 6.23921 7H15C15.5523 7 16 7.44772 16 8C16 8.55229 15.5523 9 15 9H6.23922Z"
      fill="#20263A"
    />
  </svg>
</template>

<style scoped>

.icon-arrow--right {
  transform: rotate(180deg);
}
</style>
