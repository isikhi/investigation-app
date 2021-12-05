<template>
  <div>
    <el-upload
      class='upload-demo'
      action=''
      accept='text/csv'
      :show-file-list='false'
      name='files'
      :submit='beforeUpload'
      :on-remove='handleRemove'
      :before-remove='beforeRemove'
      :before-upload='beforeUpload'
      :file-list='fileList'>
      <el-button size='small' type='primary'>Select File</el-button>
    </el-upload>
    <el-row v-if='fileList.length'>
      <column-investigation-property-select :columns='csvHeaders' @column-property-map='columnPropertyMapHandler' />
    </el-row>
    <el-button v-if='canUpload' @click='upload' type='success'> Upload</el-button>
  </div>
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
import ColumnInvestigationPropertySelect from './ColumnInvestigationPropertySelect';

export default Vue.extend({
  name: 'UploadInvestigation',
  components: {
    ColumnInvestigationPropertySelect
  },
  data() {
    return {
      canUpload: false,
      fileList: [],
      preparedFileList: [],
      preparedCsvHeaders: [],
      sliceCsvLineLimit: 10000,
      csvHeaders: [],
      header: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
    },
    async divideCsvBySliceLimit(file) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      return new Promise((resolve) => {
        this.$papa.parse(file, {
          header: false,
          complete: function(results) {
            that.csvHeaders = results.data[0];
            results.data.forEach((e, i) => {
              if (i === 0) {
                return Vue.set(that.fileList, 0, [that.csvHeaders]);
              }
              const divideIdx = parseInt((i / that.sliceCsvLineLimit).toString(), 10);
              that.fileList[divideIdx] ? that.fileList[divideIdx].push(e) : Vue.set(that.fileList, divideIdx, [that.csvHeaders, e]);
            });
            return resolve(that.fileList);
          }
        });
      });
    },
    createFormData() {
      const formData = new FormData();
      this.preparedFileList.forEach(file => {
        formData.append('files', file);
      });
      return formData;
    },
    columnPropertyMapHandler(columnPropertyMap) {
      this.csvHeaders.forEach((column) => {
        this.preparedCsvHeaders.push(columnPropertyMap[column]);
      });
      this.canUpload = true;
    },
    prepareFileList() {
      for (let csvFile of this.fileList) {
        csvFile[0] = this.preparedCsvHeaders
        let unparsed = this.$papa.unparse(csvFile, {
          header: false
        });
        const blob = new Blob([unparsed], { type: 'text/csv' });
        const csvFilename = `${Date.now()}_${Math.random().toString(16).substring(5)}.csv`;
        const file = new File([blob], csvFilename, {
          type: 'text/csv'
        });
        this.preparedFileList.push(file);
      }
    },
    async beforeUpload(file) {
      await this.divideCsvBySliceLimit(file);
      return false;
    },
    clear() {
      this.canUpload = false;
      this.fileList = [];
      this.preparedFileList = [];
      this.preparedCsvHeaders = [];
      /** @todo: fetch from process env */
      this.sliceCsvLineLimit = 10000;
      this.csvHeaders = [];
      this.header = [];
    },
    upload() {
      this.prepareFileList()
      const formData = this.createFormData();
      const that = this;
      axios.post('http://localhost:3333/v0/investigation', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function() {
        that.clear();
      }, function(error) {
      });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfer of ${file.name} ?`);
    }
  }
});
</script>
