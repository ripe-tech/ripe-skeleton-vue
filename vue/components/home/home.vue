<template>
    <div class="home">
        Hello World
        <link-ripe
            v-bind:text="'Go to field'"
            v-bind:href="'/field'"
        />
    </div>
</template>

<style scoped>
.home {
    user-select: none;
}
</style>

<script>
export const Home = {
    name: "home"
};

export default Home;
</script>
