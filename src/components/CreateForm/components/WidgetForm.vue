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
import { cloneDeep } from 'lodash'
import { useI18n } from 'vue-i18n'
import type { Widget, FormConfig } from '../types'

interface State {
  selectWidget: Widget | null
}

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
    const { t } = useI18n()
    // main.ts 定义全局 emitter
    const emitter = getCurrentInstance()?.appContext.config.globalProperties.emitter
    // element-ui 定义全局 $message
    const message = getCurrentInstance()?.appContext.config.globalProperties.$message

    message.warning('123131')

    const state = reactive<State>({
      selectWidget: null
    })

    state.selectWidget = props.select as Widget

    function handleWidgetAdd({ newIndex }: any) {
      console.log('newIndex :>> ', newIndex)
      //为拖拽到容器的元素添加唯一 key
      const key = new Date().getTime() + ''
      console.log('key :>> ', key)
      const item: Widget = cloneDeep(props.data.list[newIndex])
      console.log('item :>> ', item)

      props.data.list[newIndex] = {
        ...item,
        key,
        options: {
          ...item.options,
          remoteFunc: item.options.remoteFunc || 'func_' + key,
          remoteOption: item.options.remoteOption || 'option_' + key
        },
        model: item.type + '_' + key,
        rules: item.rules ? [...item.rules] : []
      }

      state.selectWidget = props.data.list[newIndex]

      nextTick(() => {
        emitter.emit('on-history-add')
      })
    }

    function addWidget(list: FormConfig['list'], widget: Widget, isTable: boolean = false) {
      if (isTable && ['grid', 'table', 'tabs', 'divider'].includes(widget.type)) {
        message.warning(t('message.noPut'))
        return false
      }

      if (state.selectWidget?.key) {
        const index = list.findIndex(item => item.key == state.selectWidget?.key)
        if (index >= 0) {
          list.splice(index + 1, 0, widget)
          state.selectWidget = list[index + 1]
        } else {
          list.forEach(item => {
            if (item.type === 'grid') {
              item.columns?.forEach(column => {
                addWidget(column.list, widget)
              })
            }

            if (item.type === 'table') {
              addWidget(item.tableColumns!, widget, true)
            }

            if (item.type === 'tabs') {
              item.tabs?.forEach(tab => {
                addWidget(tab.list, widget)
              })
            }
          })
        }
      } else {
        list.push(widget)
        state.selectWidget = list[list.length - 1]
      }
    }

    function handleWidgetUpdate() {
      nextTick(() => {
        emitter.emit('on-history-add')
      })
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
