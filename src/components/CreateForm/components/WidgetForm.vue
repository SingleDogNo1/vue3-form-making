<template>
  <div class="h-full" :style="{ width: data.config.width, margin: 'auto' }">
    <el-form
      class="h-full relative"
      :size="data.config.size"
      label-suffix=": "
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
    >
      <div v-if="data.list.length === 0" class="absolute w-full text-center h-5 top-1/2 mt-2.5 text-lg text-placeholder">
        {{ $t('description.containerEmpty') }}
      </div>
      <draggable
        class="h-full"
        tag="transition-group"
        :component-data="{
          tag: 'div',
          type: 'transition',
          name: 'fade'
        }"
        v-model="data.list"
        v-bind="{ group: 'widget', ghostClass: 'ghost', animation: 0, handle: '.drag-widget' }"
        @add="handleWidgetAdd"
        @update="handleWidgetUpdate"
        item-key="key"
      >
        <template #item="{ element, index }">
            <div v-if="element.type === 'table'">
              <span class="drag-widget">table</span>
              <span>{{ element }}</span>
              <span>{{ index }}</span>
            </div>

            <div v-else-if="element.type === 'tabs'">
              <span>tabs</span>
              <span>{{ element }}</span>
              <span>{{ index }}</span>
            </div>

            <div v-else-if="element.type === 'grid'">
              <span>grid</span>
              <span>{{ element }}</span>
              <span>{{ index }}</span>
            </div>

            <div v-else>
              <span class="drag-widget">other</span>
              <span>{{ element }}</span>
              <span>{{ index }}</span>
            </div>
        </template>
      </draggable>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'widgetFormContainer',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const state = reactive({
    })

    function handleWidgetAdd() {
      console.log('handleWidgetAdd :>> ', 'handleWidgetAdd')
    }

    function handleWidgetUpdate() {
      console.log('handleWidgetUpdate :>> ', 'handleWidgetUpdate')
    }

    return {
      ...toRefs(state),
      handleWidgetAdd,
      handleWidgetUpdate
    }
  }
})
</script>

<style scoped lang="scss"></style>
