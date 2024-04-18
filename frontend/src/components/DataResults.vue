<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>
                        <h3>Data Analyst</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in transformedData" :key="index">
                    <td>{{ row.id }}</td>
                    <td>{{ dataResults(row) }}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'DataResults',
    props: {
        transformedData: Array
    },
    methods: {
        dataResults(row) {
            return this.collectAllCounts(row);
        },

        dataPersonality(row) {
            const personalityTypes = ["INTJ", "INTP", "ISTJ", "ISTP"];
            return this.countTypes(row, personalityTypes);
        },

        dataEnnegram(row) {
            const ennegramTypes = ["5", "1", "9"];
            return this.countTypes(row, ennegramTypes);
        },

        datamUserPersona(row) {
            const mUserPTypes = ["Steadiness", "Conscientiousness"];
            return this.countTypes(row, mUserPTypes);
        },

        datasUserPersona(row) {
            const sUserPTypes = ["Openness", "Conscientiousness"];
            return this.countTypes(row, sUserPTypes);
        },

        countTypes(row, types) {
            let count = 0;
            Object.values(row).forEach(value => {
                if (types.includes(value)) {
                    count++;
                }
            });
            return count;
        },

        collectAllCounts(row) {
            const totalSum =
                this.dataPersonality(row) +
                this.dataEnnegram(row) +
                this.datamUserPersona(row) +
                this.datasUserPersona(row);
            return (totalSum / 16) * 100;
        }
    }
};
</script>