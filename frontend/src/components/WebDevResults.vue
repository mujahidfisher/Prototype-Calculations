<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>
                        <h3>Web Developer</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in transformedData" :key="index">
                    <td>{{ webDevResults(row) }}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'WebDeveloperResults',
    props: {
        transformedData: Array
    },
    methods: {
        webDevResults(row) {
            return this.collectAllCounts(row);
        },

        webDevPersonality(row) {
            const personalityTypes = ["INFP", "INTP", "ENFP", "ENTP"];
            return this.countTypes(row, personalityTypes);
        },

        webDevEnnegram(row) {
            const ennegramTypes = ["4", "5", "7"];
            return this.countTypes(row, ennegramTypes);
        },

        webDevmUserPersona(row) {
            const mUserPTypes = ["Influence", "Conscientiousness", "Dominance"];
            return this.countTypes(row, mUserPTypes);
        },

        webDevsUserPersona(row) {
            const sUserPTypes = ["Openness", "Extraversion"];
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
                this.webDevPersonality(row) +
                this.webDevEnnegram(row) +
                this.webDevmUserPersona(row) +
                this.webDevsUserPersona(row);
            return (totalSum / 16) * 100;
        }
    }
};
</script>
