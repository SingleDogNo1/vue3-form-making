<template>
  <div>
    <el-form-item
      class="widget-view"
      v-if="element && element.key && element.type != 'divider'"
      :class="{
        active: selectWidget.key == element.key,
        is_req: element.options.required,
        is_hidden: element.options.hidden
      }"
      :label="element.name"
      :label-width="element.options.isLabelWidth ? element.options.labelWidth + 'px' : ''"
      @click.stop="handleSelectWidget(index)"
    >
      <widget-element-item :element="element" :is-table="false" :key="element.key" />

      <div class="widget-view-action" v-if="selectWidget.key == element.key">
        <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)"></i>
        <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
      </div>

      <div class="widget-view-drag" v-if="selectWidget.key == element.key">
        <i class="iconfont icon-drag drag-widget"></i>
      </div>

      <div class="widget-view-model" v-if="element.options.dataBind">
        <span>{{ element.model }}</span>
      </div>
    </el-form-item>

    <div
      class="widget-view no-put"
      v-if="element && element.key && element.type == 'divider'"
      :class="{ active: selectWidget.key == element.key, is_hidden: element.options.hidden }"
      @click.stop="handleSelectWidget(index)"
      style="padding-bottom: 0"
    >
      <el-divider :content-position="element.options.contentPosition">
        {{ element.name }}
      </el-divider>

      <div class="widget-view-action" v-if="selectWidget.key == element.key">
        <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)"></i>
        <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
      </div>

      <div class="widget-view-drag" v-if="selectWidget.key == element.key">
        <i class="iconfont icon-drag drag-widget"></i>
      </div>

      <div class="widget-view-model" v-if="element.options.dataBind">
        <span>{{ element.model }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, getCurrentInstance, nextTick, watch } from 'vue'
import WidgetElementItem from './WidgetElementItem.vue'
import { cloneDeep } from 'lodash'
import { Widget } from '../types'

interface State {
  selectWidget: Widget | {}
}

export default defineComponent({
  props: ['element', 'select', 'index', 'data'],
  components: {
    WidgetElementItem
  },
  emits: ['select-change', 'on-history-add'],
  setup(props, context) {
    // main.ts 定义全局 emitter
    const emitter = getCurrentInstance()?.appContext.config.globalProperties.emitter

    const state = reactive<State>({
      selectWidget: {}
    })
    state.selectWidget = props.select

    function handleSelectWidget(index: number) {
      state.selectWidget = props.data.list[index]
    }

    function handleWidgetDelete(index: number) {
      if (props.data.list.length == 1) {
        context.emit('select-change', -1)
      } else {
        if (props.data.list.length - 1 == index) {
          context.emit('select-change', index - 1)
        } else {
          context.emit('select-change', index)
        }
      }
      nextTick(() => {
        props.data.list.splice(index, 1)
        setTimeout(() => {
          emitter.emit('on-history-add')
        }, 20)
      })
    }

    function handleWidgetClone(index: number) {
      const key = new Date().getTime() + ''
      let cloneData = {
        ...cloneDeep(props.data.list[index]),
        key,
        model: props.data.list[index].type + key
      }
      props.data.list.splice(index + 1, 0, cloneData)
      nextTick(() => {
        state.selectWidget = props.data.list[index + 1]
        emitter.emit('on-history-add')
      })
    }

    watch(
      () => props.select,
      val => {
        state.selectWidget = val
      }
    )

    watch(
      () => state.selectWidget,
      val => {
        emitter.emit('update:select', val)
      },
      {
        deep: true
      }
    )

    return {
      ...toRefs(state),
      handleSelectWidget,
      handleWidgetDelete,
      handleWidgetClone
    }
  }
})
</script>

<style lang="scss" scoped>
.widget-view {
  padding-bottom: 18px;
  position: relative;
  border: 1px dashed rgba(170, 170, 170, 0.5);
  background-color: rgba(236, 245, 255, 0.3);
  margin: 2px;
  overflow: hidden;

  ::v-deep(.el-form-item__content) {
    position: static;
  }

  &.is_req {
    ::v-deep(.el-form-item__label)::before {
      content: '*';
      color: $--theme-color-error;
      margin-right: 4px;
    }
  }

  &.is_hidden {
    background: $--theme-color-disabled;
  }

  .widget-view-action {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 28px;
    line-height: 28px;
    background: $--theme-color;
    z-index: 9;

    i {
      font-size: 14px;
      color: #fff;
      margin: 0 5px;
      cursor: pointer;
    }
  }

  .widget-view-drag {
    position: absolute;
    left: -2px;
    top: -2px;
    bottom: -18px;
    height: 28px;
    line-height: 28px;
    background: $--theme-color;
    z-index: 9;

    i {
      font-size: 14px;
      color: #fff;
      margin: 0 5px;
      cursor: move;
    }
  }

  .widget-view-model {
    position: absolute;
    top: -8px;
    right: 3px;
    font-size: 12px;
    color: $--theme-color-success;
    z-index: 9;
    font-weight: 500;
  }

  &::after {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: block;
    z-index: 8;
    content: '';
  }

  &:hover {
    background: $--background-color-default;
    outline: 1px solid $--theme-color;
    outline-offset: 0;

    &.active {
      outline: 2px solid $--theme-color;
      border: 1px solid $--theme-color;
      outline-offset: 0;
    }

    .widget-view-drag {
      display: block;
    }
  }

  &.active {
    outline: 2px solid $--theme-color;
    border: 1px solid $--theme-color;
  }

  &.ghost {
    background: $--theme-color-error;
    border: 2px solid $--theme-color-error;
    outline-width: 0;
    height: 3px;
    box-sizing: border-box;
    font-size: 0;
    content: '';
    overflow: hidden;
    padding: 0;
    margin: 2px;
  }
}
</style>
