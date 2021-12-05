<template>
  <div class='home'>
    <img alt='Vue logo' src='../assets/logo.png'/>
    <el-button @click='openFilterDialog'> Add Filters</el-button>
    <el-dialog
      :visible.sync='filterDialogVisible'
      :before-close='closeFilterDialog'
      append-to-body
      width='80%'>
      <InvestigationFilter :search-conditions='searchQuery.conditions || []'
                           @get-search-conditions='updateSearchConditions'/>
    </el-dialog>
    <el-button @click='search'>Search</el-button>
    <div v-if="loading"> Loading... It will take a few seconds.</div>
    <InvestigationInspectTable :data="investigationList"/>
  </div>
</template>

<script>
import Vue from 'vue';
import InvestigationFilter from '../components/InvestigationFilter.vue';
import InvestigationInspectTable from '../components/InvestigationInspectTable.vue';
import {investigationFields} from '../constants/investigation.model';
import axios from 'axios';

export default Vue.extend({
  name: 'Home',
  components: {
    InvestigationFilter,
    InvestigationInspectTable
  },
  data() {
    return {
      investigationList: [],
      loading: false,
      filterDialogVisible: false,
      searchQuery: {
        operator: 'and',
        conditions: []
      }
    };
  },
  methods: {
    openFilterDialog() {
      this.filterDialogVisible = true;
    },
    closeFilterDialog() {
      this.filterDialogVisible = false;
    },
    updateSearchConditions(searchFilters) {
      this.searchQuery.conditions = JSON.parse(JSON.stringify(searchFilters));
    },
    getDateQuery([first, second]) {
      if (!first || !second) {
        return {};
      }
      let startDate = new Date(first);
      let endDate = new Date(second);
      if (startDate.getTime() > endDate.getTime()) {
        [startDate, endDate] = [endDate, startDate];
      }
      return {
        startDate: startDate,
        endDate: endDate.toISOString(),
      };
    },
    getQuery(field, value) {
      return {
        [field]: value
      };
    },
    search() {
      const query = {};
      this.searchQuery.conditions.forEach(condition => {
        switch (condition.field) {
          case investigationFields.date: {
            Object.assign(query, this.getDateQuery(condition.value));
            break;
          }
          default:
            Object.assign(query, this.getQuery(condition.field, condition.value));
        }
      });
      this.loading = true
      this.$message.info('Loading...')
      axios.get('http://localhost:3333/v0/investigation', {
        params: query
      }).then((r) => {
        this.investigationList = r.data.data
      }).catch((err) => {
        this.$message.error(err.response.data.message)
      }).finally(() => {
        this.loading = false
      })
    }
  }
});
</script>
