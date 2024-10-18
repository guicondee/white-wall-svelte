<script>
    import Footer from "$lib/Components/Footer/Footer.svelte";
    import Header from "$lib/Components/Header/Header.svelte";
    import "../app.css";
</script>

<div class="flex w-full flex-col min-h-screen">
    <Header />
    <div class="flex-grow">
        <slot />
    </div>
    <Footer />
</div>

