<script>
    //import EaglerForge from "$lib/EaglerCraft/EaglerCraft.svelte";

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function event() {
        dispatch("click");
    }

</script>
<div id="EaglerCraftInstance">
    <slot />
</div>

<style>
    #EaglerCraftInstance{
        width: 100%;
        height: calc(100% - 40px);
        background-color: #eeeeee;
    }
    :global(body.dark) #EaglerCraftInstance{
        background-color: #000000;
    }
</style>
