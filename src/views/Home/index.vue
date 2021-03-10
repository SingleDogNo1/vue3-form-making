<template>
  <div class="home">
    <div>{{ msg }}</div>
    <button @click="add">{{ num }}</button>
    <hello-world msg="13213213" />
    {{$t('actions.add')}}

    <el-button type="primary">adlak;</el-button>
    <br />
    <button type="primary" class="h-32 block mx-auto bg-blue-600 bg-opacity-100">1111</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useStore } from '@/store'
import HelloWorld from '@/components/HelloWorld.vue'

export default defineComponent({
  name: 'home',
  components: {
    HelloWorld
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
