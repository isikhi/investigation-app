<script>
import Vue from 'vue'
import { camelCaseToWord, capitalizeFirst } from './string-manipulation'
export default Vue.extend({
  name: 'StringManipulations'
})

Vue.filter('camelCaseToWord', camelCaseToWord)
Vue.filter('capitalizeFirst', capitalizeFirst)
</script>
