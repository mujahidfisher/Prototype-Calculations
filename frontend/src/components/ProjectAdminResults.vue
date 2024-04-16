<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>
                        <h3>Project Administrator</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in transformedData" :key="index">
                    <td>{{ projectAdminResults(row) }}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'ProjectAdminResults',
    props: {
        transformedData: Array
    },
    methods: {
        projectAdminResults(row) {
            return this.collectAllCounts(row);
        },

        projectAdminPersonality(row) {
            const personalityTypes = ["ESFJ", "ISFJ", "ISTJ", "ESTJ"];
            return this.countTypes(row, personalityTypes);
        },

        projectAdminEnnegram(row) {
            const ennegramTypes = ["1", "2", "8"];
            return this.countTypes(row, ennegramTypes);
        },

        projectAdminmUserPersona(row) {
            const mUserPTypes = ["Steadiness", "Conscientiousness", "Dominance"];
            return this.countTypes(row, mUserPTypes);
        },

        projectAdminsUserPersona(row) {
            const sUserPTypes = ["Conscientiousness", "Agreeableness"];
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
                this.projectAdminPersonality(row) +
                this.projectAdminEnnegram(row) +
                this.projectAdminmUserPersona(row) +
                this.projectAdminsUserPersona(row);
            return (totalSum / 16) * 100;
        }
    }
};
</script>