<template>
    <Layout>
        <template v-slot:body>
            <div class="main-container">
                <div v-if="isAccess === true">
                    <InfoChange :isAccess.sync="isAccess"/>
                </div>
                <div v-else>
                    <InfoCheck :isAccess.sync="isAccess"/>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import InfoChange from "./InfoChange";
    import InfoCheck from "./InfoCheck";

    export default {
        name: "Info",
        components: {Layout, InfoChange, InfoCheck},
        data() {
            return {
                isAccess: false
            }
        }
    }
</script>

<style src="./Info.css" scoped>
</style>
