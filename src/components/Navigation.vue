<template>
  <div class="card relative z-2">
      <Menubar :model="items"><img alt="logo" src="https://primefaces.org/cdn/primevue/images/logo.svg" height="40" class="mr-2" /></Menubar>
  </div>
  <button type="button" @click="showModal = true">Set Name</button>
  <div class="ModalWrapper">
    <Modal
        v-model="showModal"
        title="Set Your Name"
        wrapper-class="animate__animated modal-wrapper"
        :in-class=modalIn
        :out-class=modalOut
        bg-class="animate__animated"
        :bg-in-class=bgIn
        :bg-out-class=bgOut>
        <div class="modalForm">
          <InputText type="text" v-model="userName" placeholder="Enter your name" />
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
    const userName = ref();

    const saveName = () => {
      if (userName.value) {
        localStorage.setItem("userName", userName.value);
      }
      showModal.value = false;
    };

    const skipName = () => {
      localStorage.setItem("userName", "User");
    };

    const updateLocalStorage = () => {
      localStorage.setItem("userName", userName.value!);
    };

    const items = ref([
    {
        label: 'Timestamp Maker',
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
    {
        label: 'Timestamp Maker',
        
    },
    {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
    }
]);

    onMounted(() => {
      const storedName = localStorage.getItem("userName");
      if (storedName) {
        userName.value = storedName;
        showModal.value = false;
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
      userName,
      saveName,
      skipName,
      updateLocalStorage
    };
  },
};
</script>

<style>
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