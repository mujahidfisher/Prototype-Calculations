<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>
                        <h3>SEO Specialist</h3>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in transformedData" :key="index">
                    <td>{{ seoResults(row) }}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'SEOSpecialistResults',
    props: {
        transformedData: Array
    },
    methods: {
        seoResults(row) {
            return this.collectAllCounts(row);
        },

        seoPersonality(row) {
            const personalityTypes = ["ISTJ", "INTJ", "ISTP", "INTP"];
            return this.countTypes(row, personalityTypes);
        },

        seoEnnegram(row) {
            const ennegramTypes = ["1", "5", "9"];
            return this.countTypes(row, ennegramTypes);
        },

        seoMUserPersona(row) {
            const mUserPTypes = ["Steadiness", "Conscientiousness"];
            return this.countTypes(row, mUserPTypes);
        },

        seoSUserPersona(row) {
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
            const totalSum = this.seoPersonality(row) +
                this.seoEnnegram(row) +
                this.seoMUserPersona(row) +
                this.seoSUserPersona(row);
            return (totalSum / 16) * 100;
        }
    }
};
</script>

