<template>
  <create-form />
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useStore } from '@/store'
import CreateForm from '@/components/CreateForm/index.vue'

export default defineComponent({
  name: 'home',
  components: {
    CreateForm
  },
  setup(props, ctx) {
    const store = useStore()

    const num = computed(() => store.state.num)

    const state = reactive({
      msg: 'home'
    })

    function add() {
      store.commit('ADD_NUM')
    }

    return {
      ...toRefs(state),
      num,
      add
    }
  }
})
</script>

<style scoped lang="scss">
.home {
  color: red;
}
</style>
