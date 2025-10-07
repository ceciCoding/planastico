<script setup>
const emit = defineEmits(['cancel', 'accept']);
</script>

<template>
  <div class="form-actions-group">
    <FormActionButton type="cancel" @cancel="emit('cancel')"/>
    <FormActionButton @accept="emit('accept')"/>
  </div>
</template>

<style lang="scss">
.form-actions-group {
  display: flex;
  width: 100%;
}
</style>