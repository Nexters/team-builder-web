<template>
    <div>
        <b-card class="box-card" v-for="user in users" :key="user.id">
            <div slot="header">
                <span>{{ user.username }}</span>
            </div>
            <div class="row">
                <div style="width: 30%">
                    {{ user.username }}
                </div>
                <div style="width: 30%">
                    {{ user.email }}
                </div>
                <div style="width: 40%">
                    {{ user.phone }}
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "AllUser",
		props: ['users']
    }
</script>

<style scoped>
    body {
        font-family: "Noto Sans";
    }

    .box-card {
        width: 70%;
        margin: 20px auto;
    }

    .card-body {
        padding: 10px 0 ;
    }
</style>
