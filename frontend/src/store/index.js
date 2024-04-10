import { createStore } from "vuex";

export default createStore({
  state: {
    uploadedData: [],
  },
  getters: {
    uploadedData: (state) => state.uploadedData,
  },
  mutations: {
    setUploadedData(state, data) {
      state.uploadedData = data;
    },
  },
  actions: {
    async uploadFile({ commit }, file) {
      try {
        let formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed.");
        }

        const data = await response.json();
        commit("setUploadedData", data);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
  modules: {},
});
