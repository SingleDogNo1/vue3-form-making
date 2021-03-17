import { defineComponent } from 'vue';
<template>
  <div class="form-config-container">
    <el-form label-position="top" size="small">
      <el-form-item :label="$t('config.form.width')">
        <el-input v-model="data.width" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('config.form.labelPosition.title')">
        <el-radio-group v-model="data.labelPosition" :key="data.labelPosition">
          <el-radio-button label="left">{{ $t('config.form.labelPosition.left') }}</el-radio-button>
          <el-radio-button label="right">
            {{ $t('config.form.labelPosition.right') }}
          </el-radio-button>
          <el-radio-button label="top">{{ $t('config.form.labelPosition.top') }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('config.form.labelWidth')">
        <el-input-number v-model="data.labelWidth" :min="0" :max="200" :step="10" />
      </el-form-item>
      <el-form-item :label="$t('config.form.size')">
        <el-radio-group v-model="data.size">
          <el-radio-button label="medium">medium</el-radio-button>
          <el-radio-button label="small">small</el-radio-button>
          <el-radio-button label="mini">mini</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('config.form.customClass')">
        <el-input v-model="data.customClass" clearable></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, PropType } from 'vue'
import { Form } from '../types';

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Form['config']>,
      required: true
    }
  },
  setup(props) {
    watch(
      () => props.data.labelPosition,
      val => {
        if (val == 'top') {
          props.data.layout = 'vertical'
          props.data.labelCol = 0
        } else {
          props.data.layout = 'horizontal'
          props.data.labelCol = 3
        }
      }
    )
  }
})
</script>
