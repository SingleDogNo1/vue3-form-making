<template>
  <div class="about">
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'about',
  setup(props, ctx) {
    const state = reactive({
      msg: 'about'
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="scss">
.about {
}
</style>
