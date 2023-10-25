import { defineStore } from "pinia";

const usePopupStore = defineStore("PopupStore", {
  state: () => ({
    isActive: false,
    currentComponent: null,
    componentData: null,
  }),
  actions: {
    // Utils
    openPopup() {
      this.isActive = true;
    },
    closePopup() {
      this.isActive = false;
    },
    setComponent(component) {
      this.currentComponent = component;
    },
    clearComponent() {
      this.currentComponent = null;
    },
    setComponentData(data) {
      this.componentData = data;
    },
    clearComponentData() {
      this.componentData = null;
    },
    // Serious functions
    setActivePopup(component, data) {
      this.setComponent(component);
      this.setComponentData(data);
      this.openPopup();
    },
    closeActivePopup() {
      this.closePopup();
      this.clearComponent();
      this.clearComponentData();
    },
  },
});

export default usePopupStore;
