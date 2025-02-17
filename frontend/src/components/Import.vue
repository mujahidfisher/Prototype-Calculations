<!-- Import.vue -->
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

    <div>
      <label for="filter-id">Filter by ID:</label>
      <input type="number" id="filter-id" v-model="filterId">
      <button @click="applyFilter">Double click Filter</button>
    </div>
    <button @click="clearLocalStorage">clear save data</button>

    <div id="data-container" v-if="transformedData.length > 0">
      <h2>Uploaded Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in transformedData" :key="index">
            <td v-for="(value, key) in row" :key="key">{{ value }}</td>
          </tr>
        </tbody>
      </table>
      <h2>Results</h2>
      <div class="table-responsive-xxl">
        <table class="table table-striped">
          <WebDeveloperResults :transformedData="transformedData" />
          <SeoSpecialistResults :transformedData="transformedData" />
          <CloudResults :transformedData="transformedData" />
          <DataResults :transformedData="transformedData" />
          <FlagsResults :transformedData="transformedData" />
          <NetworkResults :transformedData="transformedData" />
          <ProjectAdminResults :transformedData="transformedData" />
          <SecurityAdminResults :transformedData="transformedData" />
          <SoftwareResults :transformedData="transformedData" />
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import WebDeveloperResults from './WebDevResults.vue';
import SeoSpecialistResults from './SEOResults.vue'
import CloudResults from './CloudResults.vue'
import DataResults from './DataResults.vue'
import FlagsResults from './FlagsResults.vue'
import NetworkResults from './NetworkResults.vue'
import ProjectAdminResults from './ProjectAdminResults.vue'
import SecurityAdminResults from './SecurityAdminResults.vue'
import SoftwareResults from './SoftwareResults.vue'
export default {
  name: 'Import',
  data() {
    return {
      selectedFile: null,
      headers: ['First Name', 'Last Name', 'Personality Type 1', 'Personality Type 2', 'Personality Type 3', 'Personality Type 4', 'Enneagram', 'Main User Persona', 'Secondary User Persona'],
      transformedData: [],
      filterId: null
    };
  },
  components: {
    WebDeveloperResults,
    SeoSpecialistResults,
    CloudResults,
    DataResults,
    FlagsResults,
    NetworkResults,
    ProjectAdminResults,
    SecurityAdminResults,
    SoftwareResults
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    loadFromLocalStorage() {
      const savedData = localStorage.getItem('importedData');
      if (savedData) {
        this.transformedData = JSON.parse(savedData);
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('importedData', JSON.stringify(this.transformedData));
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
          throw new Error("Upload failed. Please try again.");
        }

        const excelData = await response.json();
        console.log('Excel Data:', excelData);
        if (Array.isArray(excelData)) {
          this.transformedData = this.transformExcelData(excelData);
          this.saveToLocalStorage();
          console.log('Transformed Data:', this.transformedData);
        } else {
          throw new Error("Invalid data received from server.");
        }

        document.getElementById("file").value = "";
      } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
      }
    },
    transformExcelData(data) {
      const headersRow = data[1];
      const firstNameIndex = Object.values(headersRow).findIndex(header => header === 'firstName');
      const lastNameIndex = Object.values(headersRow).findIndex(header => header === 'lastName');
      const Ptype1Index = Object.values(headersRow).findIndex(header => header === 'personalityType1');
      const Ptype2Index = Object.values(headersRow).findIndex(header => header === 'personalityType2');
      const Ptype3Index = Object.values(headersRow).findIndex(header => header === 'personalityType3');
      const Ptype4Index = Object.values(headersRow).findIndex(header => header === 'personalityType4');
      const enneagramIndex = Object.values(headersRow).findIndex(header => header === 'enneagram');
      const mainUpersona = Object.values(headersRow).findIndex(header => header === 'mainUserPersona');
      const secondaryUpersona = Object.values(headersRow).findIndex(header => header === 'secondaryUserPersona');
      return data.slice(2).map((row, index) => ({
        id: index + 1,
        firstName: row[`column_${firstNameIndex + 2}`],
        lastName: row[`column_${lastNameIndex + 2}`],
        personalityType1: row[`column_${Ptype1Index + 2}`],
        personalityType2: row[`column_${Ptype2Index + 2}`],
        personalityType3: row[`column_${Ptype3Index + 2}`],
        personalityType4: row[`column_${Ptype4Index + 2}`],
        enneagram: row[`column_${enneagramIndex + 2}`],
        mainUserPersona: row[`column_${mainUpersona + 2}`],
        secondaryUserPersona: row[`column_${secondaryUpersona + 2}`]
      }));
    },
    applyFilter() {
      if (!this.filterId) {
        this.loadFromLocalStorage();
        return;
      }
      if (this.transformedData.length === 0) {
        this.loadFromLocalStorage();
      }
      this.transformedData = this.transformedData.filter(row => row.id === parseInt(this.filterId));
    },
    mounted() {
      this.loadFromLocalStorage();
    },
    clearLocalStorage() {
      localStorage.removeItem('importedData');
      this.transformedData = []; 
    },
  }
}
</script>

<style scoped>
.table {
  width: 100% !important;
}
</style>
