<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>
                        <h3>Software Engineer</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in transformedData" :key="index">
                    <td>{{ softwareResults(row) }}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'SoftwareResults',
    props: {
        transformedData: Array
    },
    methods: {
        softwareResults(row) {
            return this.collectAllCounts(row);
        },

        softwarePersonality(row) {
            const personalityTypes = ["INTP", "INTJ", "ISTP", "ISFP"];
            return this.countTypes(row, personalityTypes);
        },

        softwareEnnegram(row) {
            const ennegramTypes = ["5", "9", "4"];
            return this.countTypes(row, ennegramTypes);
        },

        softwaremUserPersona(row) {
            const mUserPTypes = ["Steadiness", "Conscientiousness"];
            return this.countTypes(row, mUserPTypes);
        },

        softwaresUserPersona(row) {
            const sUserPTypes = ["Conscientiousness", "Openness"];
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
                this.softwarePersonality(row) +
                this.softwareEnnegram(row) +
                this.softwaremUserPersona(row) +
                this.softwaresUserPersona(row);
            return (totalSum / 16) * 100;
        }
    }
};
</script>