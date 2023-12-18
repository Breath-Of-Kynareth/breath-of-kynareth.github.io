<template>
    <Navigation />

    <div class="grid nested-grid grid-nogutter container">
      <div class="col-12 sm:col-12">
        <Dropdown filter name="roster-select" id="roster-select" v-model="rosterSelector" 
          :options=rosters placeholder="Select Roster"/>
      </div>
      <label for="leader">Select Time</label>
      <div class="col-12 sm:col-12 selector-container">
        <Dropdown filter name="timezone-select" id="timezone-select" v-model="timezone" 
          :options=timezones placeholder="Select a Timezone" class="timezone-picker" />
        <VueDatePicker class ="dp__theme_dark date-picker " :dark="true" v-model="date" :is-24="false" week-start="0" 
          :timezone="timezone" :text-input="textInputOptions" @update:model-value="generateTimestamp" />
      </div>
      <label for="leader">Set Limit</label>
      <div class="col-12 sm:col-12">
        <Dropdown filter name="rank-select" id="rank-select" v-model="rankSelector" 
          :options=ranks placeholder="Select Rank Limit"/>
      </div>
    </div>
    <div class="formgrid grid container">
        <div class="field col">
            <label for="trial">Trial</label>
            <input id="trial" v-model="trial" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col">
            <label for="leader">Leader</label>
            <input id="leader" v-model="leader" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
    </div>
    <div class="formgrid grid container">
        <div class="field col">
            <label for="dps">Num DPS</label>
            <input id="dps" v-model="dps" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col">
            <label for="healers">Num Healers</label>
            <input id="healers" v-model="healers" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col">
            <label for="tanks">Num Tanks</label>
            <input id="tanks" v-model="tanks" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
    </div>
    <div class="formgrid grid container">
        <div class="field col-12">
            <label for="memo">Memo</label>
            <textarea id="memo" v-model="memo" type="text" rows="4" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"></textarea>
        </div>
        <button @click="createNewRoster()" class="copy-button">Submit</button>
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
  import { notify } from "@kyvg/vue3-notification";
  
  export default {
    components: { VueDatePicker, Dropdown, Navigation },
    setup() {
      const date = ref(new Date());
      const timezone = ref();
      const timezones = timeZonesNames;
      const generatedTimestamp = ref();
      const textInputOptions = {};
      const rosterSelector = ref();
      const rankSelector = ref();
      const ranks = ["None"];
      const rosters = ["Create New"];
      const leader = ref();
      const trial = ref();
      const dps = ref();
      const healers = ref();
      const tanks = ref();
      const memo = ref();

      const generateTimestamp = () => {
        const formatDate = new Date(date.value)
        const utcTimestamp = Math.floor((formatDate.getTime()) / 1000);
        generatedTimestamp.value = utcTimestamp;
      };

      const createNewRoster = () => {
        notify({ type: "info", title: 'No Yet Ready', text: "This functionality is not yet ready! Come back later!" });
        console.log(roster);
      }
  
      onMounted(() => {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        timezone.value = userTimezone;
        generateTimestamp();
        dps.value = "8";
        healers.value="2";
        tanks.value="2";
        memo.value="None";
        const storedName = localStorage.getItem("bokToken");
        if (!storedName || storedName === 'None') {
            notify({ type: "error", title: 'No Token Set', text: "Please generate a token and set it in the Set Token button in the navbar menu." });
        }
      });
  
  
      return {
        date,
        timezones,
        timezone,
        generatedTimestamp,
        textInputOptions,
        rosterSelector,
        rankSelector,
        ranks,
        rosters,
        leader,
        trial,
        dps,
        healers,
        tanks,
        memo,
        generateTimestamp,
        createNewRoster
      }
    }
  }
  </script>
  
  <style scoped>
    .container {
      padding: 20px;
      width: 33.33%;
    }
  
    /* Desktop layout (1/3 of the screen horizontally) */
    @media (min-width: 768px) {
      .container {
        margin-left: auto;
        margin-right: auto;
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