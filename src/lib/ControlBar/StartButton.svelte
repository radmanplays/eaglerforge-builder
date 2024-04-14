<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function event() {
        dispatch("click");
    }
</script>

<button on:click={event} id="start">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"/></svg>
</button>

<style>
    #start {
        cursor: pointer;
        height: 75%;
        width: 30px;
        text-align: center;
        margin-top: 5px;
        border: none;
        background-color: transparent;
        border-radius: 3px;
    }

    #start:hover{
        background-color: #a0a0a038;
    }

    #start:active{
        background-color: #c0c0c038;
    }

    #start path {
        fill: #206110;
    }

    :global(body.dark) #start path {
        fill: #3e9b27;
    }

    #start svg {
        height: 15px;
        vertical-align: middle;
    }
</style>
