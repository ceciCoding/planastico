<script setup>
  const props = defineProps({
    direction: {
      type: String,
      default: 'left',
    },
  });
</script>

<template>
  <svg
    class="icon-chevron"
    :class="`icon-chevron--${props.direction}`"
    width="10"
    height="18"
    viewBox="0 0 10 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.33768 1.77107C8.70877 2.16145 8.70877 2.77418 8.33768 3.16457L4.10044 7.62205C3.36654 8.3941 3.36654 9.6059 4.10044 10.3779L8.33768 14.8354C8.70877 15.2258 8.70877 15.8386 8.33768 16.2289C7.93902 16.6483 7.2704 16.6483 6.87174 16.2289L1.30986 10.3779C0.575956 9.6059 0.575958 8.3941 1.30986 7.62205L6.87175 1.77106C7.27041 1.35168 7.93902 1.35168 8.33768 1.77107Z"
      fill="#20263A"
    />
  </svg>
</template>

<style scoped>
  .icon-chevron {
    transition: transform 0.1s ease-in-out;
  }

  .icon-chevron--right {
    transform: rotate(180deg);
  }

  .icon-chevron--down {
    transform: rotate(90deg);
  }

  .icon-chevron--up {
    transform: rotate(-90deg);
  }
</style>
