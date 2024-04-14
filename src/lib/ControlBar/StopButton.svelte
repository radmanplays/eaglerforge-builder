<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function event() {
        dispatch("click");
    }
</script>

<button on:click={event} id="stop">
    <svg width="15px" height="15px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-octagon-fill"><path d="M11.107 0a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146A.5.5 0 0 1 4.893 0h6.214z"/></svg>
</button>

<style>
    #stop {
        cursor: pointer;
        height: 75%;
        width: 30px;
        text-align: center;
        margin-top: 5px;
        border: none;
        background-color: transparent;
        border-radius: 3px;
    }

    #stop:hover{
        background-color: #a0a0a038;
    }

    #stop:active{
        background-color: #c0c0c038;
    }

    #stop path {
        fill: #ff0000;
    }

    #stop svg {
        height: 15px;
        vertical-align: middle;
        transform: translateX(-0.5px);
    }
</style>