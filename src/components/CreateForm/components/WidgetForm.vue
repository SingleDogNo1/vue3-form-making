<template>
  <div class="h-full" :style="{ width: data.config.width, margin: 'auto' }">
    <el-form
      class="h-full relative"
      :size="data.config.size"
      label-suffix=": "
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
    >
      <div
        v-if="data.list.length === 0"
        class="absolute w-full text-center h-5 top-1/2 mt-2.5 text-lg text-placeholder"
      >
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
import { defineComponent, reactive, toRefs, getCurrentInstance, onMounted, nextTick } from 'vue'
import {cloneDeep} from 'lodash'
import { useI18n } from 'vue-i18n'
import type { Widget, FormConfig } from '../types'

export default defineComponent({
  name: 'widgetFormContainer',
  props: {
    data: {
      type: Object,
      required: true
    },
    select: {
      type: Object,
      required: true
    }
  },
  emits: ['foo'],
  setup(props, ctx) {
    const {t} = useI18n()
    const emitter = getCurrentInstance()?.appContext.config.globalProperties.emitter
    const message = getCurrentInstance()?.appContext.config.globalProperties.$message

    message.warning('123131')

    const state = reactive({})

    function handleWidgetAdd() {
      console.log('handleWidgetAdd :>> ', 'handleWidgetAdd')
    }

    function addWidget(list: FormConfig['list'], widget: Widget, isTable: boolean = false) {
      if (
        isTable && ['grid', 'table', 'tabs', 'divider'].includes(widget.type)) {
        message.warning(t('message.noPut'))
        return false
      }
    }

    function handleWidgetUpdate() {
      console.log('handleWidgetUpdate :>> ', 'handleWidgetUpdate')
    }

    onMounted(() => {
      document.body.ondrop = function (event) {
        let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
        if (isFirefox) {
          event.preventDefault()
          event.stopPropagation()
        }
      }

      emitter.on('on-field-add', (item: Widget) => {

      console.log(item, props.data, props.select)

      const key = new Date().getTime() + ''
      let widgetItem = cloneDeep({
        ...item,
        options: {
          ...item.options,
          remoteFunc: 'func_' + key,
          remoteOption: 'option_' + key
        },
        key,
        model: item.type + '_' + key,
        rules: []
      })
      addWidget(props.data.list, widgetItem)

      nextTick(() => {
        emitter.emit('on-history-add')
      })
    })


    })

    return {
      ...toRefs(state),
      handleWidgetAdd,
      handleWidgetUpdate
    }
  }
})
</script>

<style scoped lang="scss"></style>
