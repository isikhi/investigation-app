<template>
  <div>
    <el-table :data='data'>
      <el-table-column :key='idx' v-for='(field, idx) in Object.values(investigationFields)'
                       :label='field | camelCaseToWord' width='200'>
        <template slot-scope='scope'>
          {{ scope.row[field] }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from 'vue';
import { investigationFields } from '../constants/investigation.model';

export default Vue.extend({
  name: 'InvestigationInspectTable',
  components: {},
  data() {
    return {
      investigationFields: investigationFields
    };
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
});
</script>

<style scoped>

</style>
