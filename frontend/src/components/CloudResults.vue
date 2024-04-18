<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>
                        <h3>Cloud Practitioner</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in transformedData" :key="index">
                    <td>{{ row.id }}</td>
                    <td>{{ cloudResults(row) }}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'CloudResults',
    props: {
        transformedData: Array
    },
    methods: {
        cloudResults(row) {
            return this.collectAllCounts(row);
        },

        cloudPersonality(row) {
            const personalityTypes = ["INTJ", "INTP", "ISTJ", "ISTP"];
            return this.countTypes(row, personalityTypes);
        },

        cloudEnnegram(row) {
            const ennegramTypes = ["5", "1", "9"];
            return this.countTypes(row, ennegramTypes);
        },

        cloudmUserPersona(row) {
            const mUserPTypes = ["Steadiness", "Conscientiousness"];
            return this.countTypes(row, mUserPTypes);
        },

        cloudsUserPersona(row) {
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
                this.cloudPersonality(row) +
                this.cloudEnnegram(row) +
                this.cloudmUserPersona(row) +
                this.cloudsUserPersona(row);
            return (totalSum / 16) * 100;
        }
    }
};
</script>