<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>
                        <h3>Flags</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in transformedData" :key="index">
                    <td>{{ flagsResults(row) }}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'FlagsResults',
    props: {
        transformedData: Array
    },
    methods: {
        flagsResults(row) {
            return this.collectAllCounts(row);
        },

        flagsPersonality(row) {
            const personalityTypes = ["ENTJ"];
            return this.countTypes(row, personalityTypes);
        },

        flagsEnnegram(row) {
            const ennegramTypes = ["3", "6", "7", "8"];
            return this.countTypes(row, ennegramTypes);
        },

        flagsmUserPersona(row) {
            const mUserPTypes = ["Influence", "Dominance"];
            return this.countTypes(row, mUserPTypes);
        },

        flagssUserPersona(row) {
            const sUserPTypes = ["Neuroticism", "Extraversion"];
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
                this.flagsPersonality(row) +
                this.flagsEnnegram(row) +
                this.flagsmUserPersona(row) +
                this.flagssUserPersona(row);
            return (totalSum / 16) * 100;
        }
    }
};
</script>