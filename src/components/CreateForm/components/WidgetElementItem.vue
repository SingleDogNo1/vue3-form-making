<template>
  <el-input
    v-if="element.type == 'input'"
    v-model="element.options.defaultValue"
    :style="{ width: isTable ? '100%' : element.options.width }"
    :placeholder="element.options.placeholder"
    :disabled="element.options.disabled"
    :show-password="element.options.showPassword"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: '',
    props: ['element', 'isTable'],
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello, '
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>
