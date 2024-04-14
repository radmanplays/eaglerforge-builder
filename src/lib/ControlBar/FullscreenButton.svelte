<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function event() {
        dispatch("click");
    }
</script>

<link href="//use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet" />

<button on:click={event} id="fullscreenButton">
    <slot />
</button>
<style>
    #fullscreenButton {
        border: 0px;
        background-color: transparent;
        float: right;
        width: 40px;
        height: 100%;
        cursor: pointer;
    }

    :global(.fa.fa-expand, .fa.fa-compress) {
        vertical-align: text-bottom;
        font-size: large;
        color: #000;
    }
    :global(body.dark .fa.fa-expand, body.dark .fa.fa-compress) {
        color: #e9e9e9;
    }
</style>