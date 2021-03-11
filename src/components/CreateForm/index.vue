<template>
  <el-container class="form-making h-full bg-white border border-border">
    <el-aside width="250px" class="pt-2">
      <div class="widget-title p-2 text-sm">{{ $t('components.basic.title') }}</div>
      <draggable
        tag="ul"
        class="p-2 pt-0 grid grid-cols-2 gap-1"
        v-model="basicWidgets"
        v-bind="{
          group: { name: 'widget', pull: 'clone', put: false },
          sort: false,
          ghostClass: 'ghost'
        }"
        item-key="type"
      >
        <template #item="{ element }">
          <li
            @click="handleField(element)"
            class="text-xs h-8 bg-background flex items-center cursor-move"
            :class="{ 'no-put': element.type == 'divider' }"
          >
            <i class="icon iconfont m-2" :class="element.icon"></i>
            <span>{{ element.name }}</span>
          </li>
        </template>
      </draggable>

      <div class="widget-title p-2 text-sm">{{ $t('components.advance.title') }}</div>
      <draggable
        tag="ul"
        class="p-2 pt-0 grid grid-cols-2 gap-1"
        v-model="advanceWidgets"
        v-bind="{
          group: { name: 'widget', pull: 'clone', put: false },
          sort: false,
          ghostClass: 'ghost'
        }"
        item-key="type"
      >
        <template #item="{ element }">
          <li
            @click="handleField(element)"
            class="text-xs h-8 bg-background flex items-center cursor-move"
            :class="{ 'no-put': element.type == 'divider' }"
          >
            <i class="icon iconfont m-2" :class="element.icon"></i>
            <span>{{ element.name }}</span>
          </li>
        </template>
      </draggable>

      <div class="widget-title p-2 text-sm">{{ $t('components.advance.title') }}</div>
      <draggable
        tag="ul"
        class="p-2 pt-0 grid grid-cols-2 gap-1"
        v-model="layoutWidgets"
        v-bind="{
          group: { name: 'widget', pull: 'clone', put: false },
          sort: false,
          ghostClass: 'ghost'
        }"
        item-key="type"
      >
        <template #item="{ element }">
          <li
            @click="handleField(element)"
            class="text-xs h-8 bg-background flex items-center cursor-move"
            :class="{ 'no-put': element.type == 'divider' }"
          >
            <i class="icon iconfont m-2" :class="element.icon"></i>
            <span>{{ element.name }}</span>
          </li>
        </template>
      </draggable>
    </el-aside>
    <el-container direction="vertical" class="border-l border-r border-border">
      <header class="h-11 pl-4 pr-4 border-b border-border text-right">
        <slot name="action"></slot>
        <el-button
          class="ml-2"
          type="text"
          :disabled="!undo"
          icon="el-icon-back"
          @click="handleUndo"
        >
          {{ $t('actions.undo') }}
        </el-button>
        <el-button type="text" :disabled="!redo" icon="el-icon-right" @click="handleRedo">
          {{ $t('actions.redo') }}
        </el-button>
        <el-button v-if="upload" type="text" icon="el-icon-upload2" @click="handleUpload">
          {{ $t('actions.import') }}
        </el-button>
        <el-button v-if="clearable" type="text" icon="el-icon-delete" @click="handleClear">
          {{ $t('actions.clear') }}
        </el-button>
        <el-button v-if="preview" type="text" icon="el-icon-view" @click="handlePreview">
          {{ $t('actions.preview') }}
        </el-button>
        <el-button
          v-if="generateJson"
          type="text"
          icon="el-icon-tickets"
          @click="handleGenerateJson"
        >
          {{ $t('actions.json') }}
        </el-button>
        <el-button
          v-if="generateCode"
          type="text"
          icon="el-icon-document"
          @click="handleGenerateCode"
        >
          {{ $t('actions.code') }}
        </el-button>
      </header>
      <el-container :class="{ empty: widgetForm.list.length === 0 }"> hello,world </el-container>
    </el-container>
    <el-aside width="250px">
      <header class="h-11 border-b border-border flex">
        <div
          class="widget-item flex-1 text-center text-sm h-full flex items-center justify-center cursor-pointer"
          :class="{ active: configTab === 'widget' }"
          @click="handleConfigSelect('widget')"
        >
          {{ $t('config.widget.title') }}
        </div>
        <div
          class="widget-item flex-1 text-center text-sm h-full flex items-center justify-center cursor-pointer"
          :class="{ active: configTab == 'form' }"
          @click="handleConfigSelect('form')"
        >
          {{ $t('config.form.title') }}
        </div>
      </header>
      <el-container>
        <div v-show="configTab === 'widget'">widget</div>
        <div v-show="configTab === 'form'">form</div>
      </el-container>
    </el-aside>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { basicWidgets, layoutWidgets, advanceWidgets } from './widgetsConfig'
import type { Widget, FormConfig } from './types'

interface State {
  basicWidgets: Widget[]
  layoutWidgets: Widget[]
  advanceWidgets: Widget[]
  undo: boolean
  redo: boolean
  widgetForm: FormConfig
  configTab: 'widget' | 'form'
}

export default defineComponent({
  name: 'form-container',
  props: {
    upload: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    preview: {
      type: Boolean,
      default: true
    },
    generateJson: {
      type: Boolean,
      default: true
    },
    generateCode: {
      type: Boolean,
      default: true
    }
  },
  setup(props, ctx) {
    const { t } = useI18n()
    const state = reactive<State>({
      basicWidgets: [],
      layoutWidgets: [],
      advanceWidgets: [],
      undo: false,
      redo: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small',
          customClass: '',
          labelCol: 3,
          width: '100%'
        }
      },
      configTab: 'widget'
    })

    function reloadComponents() {
      state.basicWidgets = basicWidgets.map(value => ({
        ...value,
        name: t(`components.fields.${value.type}`)
      }))
      state.layoutWidgets = layoutWidgets.map(value => ({
        ...value,
        name: t(`components.fields.${value.type}`)
      }))
      state.advanceWidgets = advanceWidgets.map(value => ({
        ...value,
        name: t(`components.fields.${value.type}`)
      }))
    }

    function handleField(element: Widget) {
      console.log('element :>> ', element)
    }

    function handleUndo() {
      console.log('undo :>> ', 'undo')
    }
    function handleRedo() {
      console.log('redo :>> ', 'redo')
    }
    function handleUpload() {
      console.log('upload :>> ', 'upload')
    }
    function handleClear() {
      console.log('clear :>> ', 'clear')
    }
    function handlePreview() {
      console.log('preview :>> ', 'preview')
    }
    function handleGenerateJson() {
      console.log('generateJson :>> ', 'generateJson')
    }
    function handleGenerateCode() {
      console.log('generateCode :>> ', 'generateCode')
    }
    function handleConfigSelect(value: State['configTab']) {
      state.configTab = value
    }

    reloadComponents()
    return {
      ...toRefs(state),
      handleField,
      handleUndo,
      handleRedo,
      handleUpload,
      handleClear,
      handlePreview,
      handleGenerateJson,
      handleGenerateCode,
      handleConfigSelect
    }
  }
})
</script>

<style scoped lang="scss">
.widget-item {
  position: relative;
  &.active {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: $--theme-color;
      height: 2px;
    }
  }
}
</style>
