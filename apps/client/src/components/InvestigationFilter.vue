<template>
  <div>
    <el-row style='margin-top: 30px;' :key='index' v-for='(currentFilterValues, index) in currentFilters'>
      <el-col :span='4'>
        <el-select v-model='currentFilterValues.field' placeholder='Field' @change='filterFieldSelected(index)'>
          <el-option
            v-for='(item, idx) in fields'
            :key='idx'
            :label='item | camelCaseToWord'
            :value='item'>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span='4'>
        <el-select v-model='currentFilterValues.operator' placeholder='Operator'>
          <el-option
            v-for='item in currentFilterValues.selectableOperators'
            :key='item'
            :label='item | capitalizeFirst'
            :value='item'>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span='4'>
        <div v-if='currentFilterValues.field === investigationFields.date'>
          <div class='block'>
            <span class='demonstration'>Start Date</span>
            <el-date-picker
              v-model='currentFilterValues.value[0]'
              type='datetime'
              placeholder='Select date and time'>
            </el-date-picker>
          </div>
          <div class='block'>
            <span class='demonstration'>End Date</span>
            <el-date-picker
              v-model='currentFilterValues.value[1]'
              type='datetime'
              placeholder='Select date and time'>
            </el-date-picker>
          </div>
        </div>
        <div v-else-if='currentFilterValues.field === investigationFields.tags'>
          <el-input-tag v-model='currentFilterValues.value' :placeholder='currentFilterValues.field | camelCaseToWord'/>
        </div>
        <div v-else>
          <el-input v-model='currentFilterValues.value' :placeholder='currentFilterValues.field | camelCaseToWord' />
        </div>
      </el-col>
      <el-col :span='2'>
        <el-button @click='addOrRemoveFromFilter(index)'>{{ currentFilterValues.added ? 'AND' : 'ADD' }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  investigationFieldDataType,
  investigationFields,
  investigationFieldsSearchOperators
} from '../constants/investigation.model';
import camelCaseToWord from '../filters/string-manipulation.filters';
import {ElInputTag} from 'el-input-tag'

export default Vue.extend({
  name: 'InvestigationFilter',
  // eslint-disable-next-line vue/no-unused-components
  components: { camelCaseToWord, ElInputTag },
  data() {
    return {
      investigationFields: investigationFields,
      currentFilters: [{
        field: '',
        operator: '',
        value: '',
        selectableOperators: []
      }],
      fieldConditionOperatorsByOperator: {},
      fields: Object.values(investigationFields)
    };
  },
  props: {
    searchConditions: {
      type: Array,
      default: () => []
    }
  },
  created() {
    const { data, date, ...equalInvestigationFields } = investigationFields;
    this.fieldConditionOperatorsByOperator[investigationFieldsSearchOperators.equal] = Object.values(equalInvestigationFields);
    this.fieldConditionOperatorsByOperator[investigationFieldsSearchOperators.contains] = data;
    this.fieldConditionOperatorsByOperator[investigationFieldsSearchOperators.between] = date;
  },
  methods: {
    filterFieldSelected(index) {
      this.currentFilters[index].selectableOperators = [];
      this.currentFilters[index].operator = '';
      this.currentFilters[index].value = investigationFieldDataType[this.currentFilters[index].field];

      Object.keys(this.fieldConditionOperatorsByOperator).forEach(k => {
        if (this.fieldConditionOperatorsByOperator[k].includes(this.currentFilters[index].field)) {
          this.currentFilters[index].selectableOperators.push(k);
        }
      });
    },
    setValueByFieldDataType(index) {

    },
    checkFilterIsValid(filterObj) {
      return Object.keys(filterObj).every(k => filterObj[k].length);
    },
    addOrRemoveFromFilter(index) {
      this.currentFilters[index].added ? this.removeFromFilter(index) : this.addToFilter(index);
    },
    removeFromFilter(index) {
      this.currentFilters.splice(index, 1);
      this.searchConditions.splice(index, 1);
    },
    addToFilter(index) {
      if (!this.checkFilterIsValid(this.currentFilters[index])) {
        return this.$message.error('Filter values should not be empty.');
      }
      this.searchConditions.push({ ...this.currentFilters[index] });
      this.currentFilters[index].added = true;
      this.currentFilters.push({
        field: '',
        operator: '',
        value: '',
        selectableOperators: []
      });
      this.updateSearchConditions();
    },
    updateSearchConditions() {
      this.$emit('get-search-conditions', this.searchConditions);
    }
  }
});
</script>

<style scoped>

</style>

