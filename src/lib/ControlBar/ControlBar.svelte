<script>
    import StartButton from "$lib/ControlBar/StartButton.svelte";
    import StopButton from "$lib/ControlBar/StopButton.svelte";

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function event() {
        dispatch("click");
    }
</script>

<div id="ControlBar">
    <slot />
</div>

<style>
    #ControlBar{
        width: calc(100% - 10px);
        height: 40px;
        padding-left: 10px;
        background-color: #ddd;
    }
    :global(body.dark) #ControlBar{
        background-color: #313131;
    }
</style>