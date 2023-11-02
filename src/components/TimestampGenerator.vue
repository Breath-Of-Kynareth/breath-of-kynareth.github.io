<template>
  <!--<h1>Discord Timestamp Generator</h1>-->
  <div>
    <Dropdown filter name="timezone-select" id="timezone-select" v-model="timezone" 
      :options=timezones placeholder="Select a Timezone" class="w-full md:w-14rem" />
  </div>
  <div>
    <VueDatePicker class ="dp__theme_dark" :dark="true" v-model="date" :is-24="false" week-start="0" 
      :timezone="timezone" :text-input="textInputOptions" @update:model-value="generateTimestamp" />
  </div>
  <div>
    <input id="timestampbox" v-model="generatedTimestamp" readonly />
    <button @click="copyToClipboard">
      <font-awesome-icon :icon="['fas', 'clipboard']" flip style="color: #2f8a02;"  />
    </button>
  </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref, onMounted } from 'vue';
import { timeZonesNames} from "@vvo/tzdb";
import Dropdown from 'primevue/dropdown';


export default {
  components: { VueDatePicker, Dropdown },
  setup() {
    const date = ref(new Date());
    const timezone = ref();
    const timezones = timeZonesNames;
    const generatedTimestamp = ref();

    const textInputOptions = {}

    const generateTimestamp = () => {
      const formatDate = new Date(date.value)
      const utcTimestamp = Math.floor((formatDate.getTime()) / 1000);
      generatedTimestamp.value = `<t:${utcTimestamp}:F>`;
    };

    const copyToClipboard = () => {
      navigator.clipboard.writeText(generatedTimestamp.value);
    };

    onMounted(() => {
      // Detect timezone and set it as default
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      timezone.value = userTimezone;
      generateTimestamp();
    });


    return {
      date,
      timezones,
      timezone,
      generateTimestamp,
      copyToClipboard,
      generatedTimestamp,
      textInputOptions
    }
  }
}
</script>

<style scoped>
.dp__theme_dark {
    --dp-background-color: #212121;
    --dp-text-color: #fff;
    --dp-hover-color: #484848;
    --dp-hover-text-color: #fff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #005cb2;
    --dp-primary-disabled-color: #61a8ea;
    --dp-primary-text-color: #fff;
    --dp-secondary-color: #a9a9a9;
    --dp-border-color: #2d2d2d;
    --dp-menu-border-color: #2d2d2d;
    --dp-border-color-hover: #aaaeb7;
    --dp-disabled-color: #737373;
    --dp-disabled-color-text: #d0d0d0;
    --dp-scroll-bar-background: #212121;
    --dp-scroll-bar-color: #484848;
    --dp-success-color: #00701a;
    --dp-success-color-disabled: #428f59;
    --dp-icon-color: #959595;
    --dp-danger-color: #e53935;
    --dp-marker-color: #e53935;
    --dp-tooltip-color: #3e3e3e;
    --dp-highlight-color: rgb(0 92 178 / 20%);
    --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
    --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
    --dp-range-between-border-color: var(--dp-hover-color, #fff);
}
</style>