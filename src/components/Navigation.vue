<template>
    <div class="card relative z-2">
        <Menubar :model="items" class="myMenu">
          <template #item="{ label, item, props, root, hasSubmenu }">
              <router-link v-if="item.route" v-slot="routerProps" :to="item.route" custom>
                  <a :href="routerProps.href" v-bind="props.action" @click="routerProps.navigate">
                      <span v-bind="props.icon" />
                      <span v-bind="props.label">{{ label }}</span>
                  </a>
              </router-link>
              <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                  <span v-bind="props.icon" />
                  <span v-bind="props.label">{{ label }}</span>
                  <span :class="[hasSubmenu && (root ? 'pi pi-fw pi-angle-down' : 'pi pi-fw pi-angle-right')]" v-bind="props.submenuicon" />
              </a>
          </template>
        </Menubar>
    </div>
  <div class="ModalWrapper">
    <Modal
        v-model="showModal"
        title="Set Your Token"
        wrapper-class="animate__animated modal-wrapper"
        :in-class=modalIn
        :out-class=modalOut
        bg-class="animate__animated"
        :bg-in-class=bgIn
        :bg-out-class=bgOut>
        <div class="modalForm">
          <InputText type="text" v-model="bokToken" placeholder="Enter your Token" />
          <br>
          <button @click="saveName">Submit</button>
        </div>
      </Modal>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
// @ts-ignore
import { Modal, useModal } from '@kouts/vue-modal';
import InputText from 'primevue/inputtext';
import Menubar from 'primevue/menubar';

export default {
  components: { InputText, Menubar },
  setup() {

    const { show } = useModal()
    const modalIn = 'animate__backInDown';
    const modalOut = 'animate__backOutUp';
    const bgIn = 'animate__fadeInUp';
    const bgOut = 'animate__fadeOutDown';

    const showModal = ref(false);
    const bokToken = ref();

    const saveName = () => {
      if (bokToken.value) {
        localStorage.setItem("bokToken", bokToken.value);
        bokToken.value = null;
      }
      showModal.value = false;
    };

    const setShowModal = () => {
      showModal.value = true;
    }

    const items = ref([
    {
      label: 'Home',
      route: '/',
      icon: 'pi pi-fw pi-home'
    },
    {
      label: 'Rosters',
      route: '/rosters',
      icon: 'pi pi-fw pi-copy'
    },
    {
        label: 'Timestamp Maker',
        route: '/timestamp',
        icon: 'pi pi-fw pi-history'
        
    },
    {
        label: 'Set Token',
        icon: 'pi pi-fw pi-unlock',
        command: () => setShowModal()
    }
]);

    onMounted(() => {
      const storedName = localStorage.getItem("bokToken");
      if (storedName !== "None") {
        showModal.value = false;
      } else {
        localStorage.setItem("bokToken", "None");
      }
    });

    return {
      items,
      modalIn,
      modalOut,
      bgIn,
      bgOut,
      show,
      showModal,
      bokToken,
      saveName,
      setShowModal
    };
  },
};
</script>

<style>

.myMenu li.wijmo-wijmenu-parent > a {
	text-align: right;
}

.myMenu ul:first-child > li.wijmo-wijmenu-parent > a > span,
.myMenu ul:first-child > li.wijmo-wijmenu-parent > a > span > span {
	float: left !important;
}

.myMenu li.wijmo-wijmenu-parent > a > span,
.myMenu li.wijmo-wijmenu-parent > a > span > span {
	float: none !important;
	display: inline-block;
	vertical-align: bottom;
}

.vm-titlebar{
  background-color: #403b4f;
}
.vm-content{
  background-color: #403b4f;
}
.modal-wrapper {
  display: flex;
  align-items: center;
}
.modal-wrapper .vm {
  top: auto;
}

.modalForm{
  text-align: center;
  text-justify: center;
}
</style>


<!--
Multi-option menu save.

    {
        label: 'Rosters',
        items: [
            {
                label: 'New',
                icon: 'pi pi-fw pi-plus',
                items: [
                    {
                        label: 'Bookmark',
                        icon: 'pi pi-fw pi-bookmark'
                    },
                    {
                        label: 'Video',
                        icon: 'pi pi-fw pi-video'
                    }
                ]
            },
            {
                label: 'Delete',
                icon: 'pi pi-fw pi-trash'
            },
            {
                separator: true
            },
            {
                label: 'Export',
                icon: 'pi pi-fw pi-external-link'
            }
        ]
    },

-->