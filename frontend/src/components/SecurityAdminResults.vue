<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>
                        <h3>Security Administrator</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in transformedData" :key="index">
                    <td>{{ row.id }}</td>
                    <td>{{ securityAdminResults(row) }}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'SecurityAdminResults',
    props: {
        transformedData: Array
    },
    methods: {
        securityAdminResults(row) {
            return this.collectAllCounts(row);
        },

        securityAdminPersonality(row) {
            const personalityTypes = ["ISTJ", "INTJ", "ISFP", "ISTP"];
            return this.countTypes(row, personalityTypes);
        },

        securityAdminEnnegram(row) {
            const ennegramTypes = ["1", "5", "9", "4"];
            return this.countTypes(row, ennegramTypes);
        },

        securityAdminmUserPersona(row) {
            const mUserPTypes = ["Steadiness", "Conscientiousness"];
            return this.countTypes(row, mUserPTypes);
        },

        securityAdminsUserPersona(row) {
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
                this.securityAdminPersonality(row) +
                this.securityAdminEnnegram(row) +
                this.securityAdminmUserPersona(row) +
                this.securityAdminsUserPersona(row);
            return (totalSum / 16) * 100;
        }
    }
};
</script>