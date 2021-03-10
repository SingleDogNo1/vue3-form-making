<template>
  <div class="form-container">
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'form-container',
  setup(props, ctx) {
    const state = reactive({
      msg: 'form-container'
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="scss">
.form-container {
}
</style>
