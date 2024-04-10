<template>
  <div class="hello">
    <h1>Import</h1>
    <div id="upload-form">
      <h2>Upload XLSX File</h2>
      <form @submit.prevent="uploadFile">
        <div>
          <label for="file">Choose an XLSX file:</label>
          <input type="file" id="file" name="file" accept=".xlsx" v-on="selectedFile">
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
    async uploadFile() {
      if (!this.selectedFile) {
        alert("Please select a file.");
        console.log("success");
        return;
      }

      this.$store.dispatch('uploadFile', this.selectedFile);
    }
  }
}
</script>

<style scoped></style>
