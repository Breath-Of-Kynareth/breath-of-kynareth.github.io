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
    <div class="grid">
      <div class="col-12" v-for="row in getRows(generatedTimestamp)" :key="row.id">
        <div class="text-center p-3 border-round-sm bg-primary font-bold">
          {{ row.id }}
          <button @click="copyToClipboard(row.id)">
            <font-awesome-icon :icon="['fas','clipboard']" flip style="color: #2f8a02" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref, onMounted, watch } from 'vue';
import { timeZonesNames} from "@vvo/tzdb";
import Dropdown from 'primevue/dropdown';


export default {
  components: { VueDatePicker, Dropdown },
  setup() {
    const date = ref(new Date());
    const timezone = ref();
    const timezones = timeZonesNames;
    const generatedTimestamp = ref()


    const textInputOptions = {}

    watch(generatedTimestamp.value, async () =>{
      getRows();
    })

    const getRows = () => {



      return [
        { id: `<t:${generatedTimestamp.value}:d>` },
        { id: `<t:${generatedTimestamp.value}:D>` },
        { id: `<t:${generatedTimestamp.value}:t>` },
        { id: `<t:${generatedTimestamp.value}:T>` },
        { id: `<t:${generatedTimestamp.value}:f>` },
        { id: `<t:${generatedTimestamp.value}:F>` },
        { id: `<t:${generatedTimestamp.value}:r>` },
        { id: `${generatedTimestamp.value}` },
      ]
    }

    const generateTimestamp = () => {
      const formatDate = new Date(date.value)
      const utcTimestamp = Math.floor((formatDate.getTime()) / 1000);
      generatedTimestamp.value = utcTimestamp;
    };

    const copyToClipboard = (value: string) => {
      navigator.clipboard.writeText(value);
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
      textInputOptions,
      getRows
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