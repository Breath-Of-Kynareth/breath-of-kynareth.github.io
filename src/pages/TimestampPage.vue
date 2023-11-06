<template>
  <Navigation />
  <div class="container">
    <div class="col-12 sm:col-12 selector-container">
      <Dropdown filter name="timezone-select" id="timezone-select" v-model="timezone" 
        :options=timezones placeholder="Select a Timezone" class="timezone-picker" />
      <VueDatePicker class ="dp__theme_dark date-picker " :dark="true" v-model="date" :is-24="false" week-start="0" 
        :timezone="timezone" :text-input="textInputOptions" @update:model-value="generateTimestamp" />
    </div>
    <div>
      <div class="grid nested-grid">
        <div class="col-12" v-for="row in getRows()" :key="row.id" :formatted="row.formatted">       
          <div class="grid">
            <div class="xl:col-5 col-12">
              <div class="text-center p-1 border-round-sm bg-primary font-bold">
                <button @click="copyToClipboard(row.id)" class="copy-button">
                  <font-awesome-icon :icon="['fas','clipboard']" size="lg" style="color: #2f8a02" />
                </button>
                {{ row.id }}
              </div>
            </div>
            <div class="xl:col-6 col-12 m-2">
              <div class="text-center p-1 border-round-sm bg-primary font-bold m-0">
                {{ formatedDiscordTimestamps(row.formatted) }}
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref, onMounted } from 'vue';
import { timeZonesNames} from "@vvo/tzdb";
import Dropdown from 'primevue/dropdown';
import Navigation from '../components/Navigation.vue';
// @ts-ignore
import { DateTime } from "luxon";

export default {
  components: { VueDatePicker, Dropdown, Navigation },
  setup() {
    const date = ref(new Date());
    const timezone = ref();
    const timezones = timeZonesNames;
    const generatedTimestamp = ref()
    const textInputOptions = {}

    const getRows = () => {
      return [
        { id: `<t:${generatedTimestamp.value}:d>`,formatted: 'd' },
        { id: `<t:${generatedTimestamp.value}:D>`,formatted: 'D'  },
        { id: `<t:${generatedTimestamp.value}:t>`,formatted: 't'  },
        { id: `<t:${generatedTimestamp.value}:T>`,formatted: 'T'  },
        { id: `<t:${generatedTimestamp.value}:f>`,formatted: 'f'  },
        { id: `<t:${generatedTimestamp.value}:F>`,formatted: 'F'  },
        { id: `<t:${generatedTimestamp.value}:r>`,formatted: 'R'  },
        { id: `${generatedTimestamp.value}`, formatted: '0' },
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

    const formatedDiscordTimestamps = (formatChoice: string) => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const dateTime = new Date(parseInt(generatedTimestamp.value) * 1000);
      // dateTime.getHours() >= 12 ? 'PM' : 'AM'
      dateTime.getMinutes() < 10 ? '0' +  dateTime.getMinutes() : dateTime.getMinutes()

      switch(formatChoice){
        case 'd':
          return `${ dateTime.getMonth()+1 }/${ dateTime.getDate() }/${ dateTime.getFullYear() }`;
        case 'D':
          return `${ months[dateTime.getMonth()] } ${ dateTime.getDate() }, ${ dateTime.getFullYear() }`;
        case 't':
          return `${ dateTime.getHours() % 12 }:${ dateTime.getMinutes() < 10 ? '0' +  dateTime.getMinutes() : dateTime.getMinutes() }
           ${ dateTime.getHours() >= 12 ? 'PM' : 'AM' }`;
        case 'T':
          return `${ dateTime.getHours() % 12 }:${ dateTime.getMinutes() < 10 ? '0' +  dateTime.getMinutes() : dateTime.getMinutes() }:00 
          ${ dateTime.getHours() >= 12 ? 'PM' : 'AM' }`;
        case 'f':
          return `${ months[dateTime.getMonth()] } ${ dateTime.getDate() }, ${ dateTime.getFullYear() } 
          ${ dateTime.getHours() % 12 }:${ dateTime.getMinutes() < 10 ? '0' +  dateTime.getMinutes() : dateTime.getMinutes()}`;
        case 'F':
          return `${ weekdays[dateTime.getDay()] }, ${ months[dateTime.getMonth()] } ${ dateTime.getDate() }, ${ dateTime.getFullYear() } 
          ${ dateTime.getHours() % 12 }:${ dateTime.getMinutes() < 10 ? '0' +  dateTime.getMinutes() : dateTime.getMinutes() }`;
        case 'R':
          return 'In x minutes/ x Hours Ago'; // TODO: Figure out the implementation of this feature in here.
        case '0':
          return generatedTimestamp.value;
      }
    }

    onMounted(() => {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      timezone.value = userTimezone;
      generateTimestamp();
    });


    return {
      date,
      timezones,
      timezone,
      generatedTimestamp,
      textInputOptions,
      generateTimestamp,
      copyToClipboard,
      getRows,
      formatedDiscordTimestamps 
    }
  }
}
</script>

<style scoped>
  .container {
    padding: 20px;
  }

  /* Desktop layout (1/3 of the screen horizontally) */
  @media (min-width: 768px) {
    .container {
      width: 33.33%;
      margin: auto;
    }
    .selector-container{
      align-items: center;
      display: flex;
    }
    .timezone-picker{
      width: 50%;
    }
    .date-picker{
      width: 50%;
    }
  }

  /* Mobile layout (full width horizontally) */
  @media (max-width: 767px) {
    .container {
      width: 100%;
      height: auto;
    }
  }
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