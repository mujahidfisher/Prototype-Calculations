<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>
                        <h3>Network and Support Technician</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in transformedData" :key="index">
                    <td>{{ networkResults(row) }}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'NetworkResults',
    props: {
        transformedData: Array
    },
    methods: {
        networkResults(row) {
            return this.collectAllCounts(row);
        },

        networkPersonality(row) {
            const personalityTypes = ["ISTJ", "ISFJ", "ISTP", "ISFP"];
            return this.countTypes(row, personalityTypes);
        },

        networkEnnegram(row) {
            const ennegramTypes = ["1", "2", "9", "4"];
            return this.countTypes(row, ennegramTypes);
        },

        networkmUserPersona(row) {
            const mUserPTypes = ["Steadiness", "Conscientiousness"];
            return this.countTypes(row, mUserPTypes);
        },

        networksUserPersona(row) {
            const sUserPTypes = ["Conscientiousness", "Agreeableness", "Openness"];
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
                this.networkPersonality(row) +
                this.networkEnnegram(row) +
                this.networkmUserPersona(row) +
                this.networksUserPersona(row);
            return (totalSum / 16) * 100;
        }
    }
};
</script>