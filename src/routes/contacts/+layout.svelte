<script>
    import Footer from "$lib/Footer/Footer.svelte";
    import Header from "$lib/Header/Header.svelte";
</script>

<div class="flex w-full flex-col min-h-screen">
    <Header />
    <div class="flex-grow">
        <slot />
    </div>
    <Footer />
</div>

 