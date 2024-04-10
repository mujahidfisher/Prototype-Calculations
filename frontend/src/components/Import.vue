<template>
  <div class="hello">
    <h1>Import</h1>
    <div id="upload-form">
      <h2>Upload XLSX File</h2>
      <form @submit.prevent="uploadFile">
        <div>
          <label for="file">Choose an XLSX file:</label>
          <input type="file" id="file" name="file" accept=".xlsx" @change="handleFileChange">
        </div>
        <br>
        <button type="submit">Upload</button>
      </form>
    </div>

    <div id="data-container" v-if="uploadedData.length > 0">
      <h2>Uploaded Data</h2>
      <table>
        <thead>
          <tr>
            <th v-for="(value, key) in uploadedData[0]" :key="key">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in uploadedData" :key="index">
            <td v-for="(value, key) in row" :key="key">{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Import',
  data() {
    return {
      selectedFile: null
    };
  },
  computed: {
    uploadedData() {
      return this.$store.getters.uploadedData;
    }
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadFile() {
      if (!this.selectedFile) {
        alert("Please select a file.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", this.selectedFile);

        const response = await fetch("https://prototype-calculations.onrender.com/upload", {
          method: "POST",
          body: formData
        });

        if (!response.ok) {
          throw new Error("Upload failed.");
        }

        const data = await response.json();
        this.$store.commit("setUploadedData", data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
}
</script>

<style scoped></style>
