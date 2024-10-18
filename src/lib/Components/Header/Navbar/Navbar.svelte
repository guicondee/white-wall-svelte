<script>
    import { page } from "$app/stores";
    import LogoWitheWall from "../../../../assets/logo-whitewall.png";
    import Logout from "svelte-material-icons/Logout.svelte";
    const items = [
        {
            href: "/login",
            label: "Sair",
        },
    ];

    function handleLogOut() {
        localStorage.removeItem("authToken");
        localStorage.removeItem("contacts");
    }
</script>

<nav class="bg-white shadow-md border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://whitewall.dev/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={LogoWitheWall} class="h-8" alt="LogoWitheWall Logo" />
        </a>

        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            {#if $page.url.pathname === "/login"}
                <div></div>
            {:else}
                <ul
                    class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0"
                >
                    {#each items as { href, label }}
                        <li>
                            <div class="items-center gap-1 flex">
                                <span class="block py-2 text-gray-500">{label}</span>
                                <a
                                    on:click={() => handleLogOut()}
                                    {href}
                                    class="block text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0"
                                >
                                    <Logout width={20} height={20} color="#6b7280" />
                                </a>
                            </div>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
</nav>
