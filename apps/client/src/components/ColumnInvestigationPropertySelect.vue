<template>
  <el-row>
    <el-col :span='4' :key='columnIdx' v-for='(column, columnIdx) in columns'>
      <el-row>
        <el-col>
          {{ column }}
        </el-col>
        <el-col>
          <el-select v-model='columnPropertyMap[column]' placeholder='Select' @change='columnPropertyChanged'>
            <el-option
              v-for='item in options'
              :key='item.value'
              :label='item.label'
              :value='item.value'>
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import Vue from 'vue';
import { investigationFields } from '../constants/investigation.model';
import { camelCaseToWord } from '../filters/string-manipulation';

/**
 * @todo fetch options from backend and use filter for humanize(backend has no route for this -yet-)
 */
export default Vue.extend({
  data() {
    return {
      columnPropertyMap: {},
      selectedOptions: [],
      options: []
    };
  },
  created() {
    Object.values(investigationFields).forEach(val => {
      const label = camelCaseToWord(val);
      this.options.push({
        value: val,
        label: label
      });
    });
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    columnPropertyChanged() {
      const selectedProperties = Object.values(this.columnPropertyMap);
      const hasDuplicates = this.hasDuplicates(selectedProperties);
      if (hasDuplicates) {
        this.$message.error('Duplicated column detected. Every column should match one property');
      }
      if (!hasDuplicates && selectedProperties.length === this.options.length) {
        this.$emit('column-property-map', this.columnPropertyMap);
      }
    },
    hasDuplicates(array) {
      return (new Set(array)).size !== array.length;
    }
  }
});
</script>
