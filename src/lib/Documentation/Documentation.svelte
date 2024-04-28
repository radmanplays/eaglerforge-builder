<script>
    //import EaglerForge from "$lib/EaglerCraft/EaglerCraft.svelte";

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function event() {
        dispatch("click");
    }

</script>
<div id="documentation" opened="false">
    <button onclick="closeDoc()" id="closeDocButton" opened="false">×</button>
</div>

<style>
    #documentation{
        position: absolute;
        right: 0;
        height: calc(100% - 16px);
        width: 0%;
        z-index: 1;
        transition: width 0.5s ease-out;
        border: none;
        background-color: #f9f9f9;
    }

    :global(body.dark) #documentation{
        background-color: #111111;
    }

    #documentation:not([opened="false"]){
        border-left: 1px solid #c6c6c6;
        width: 35%;
    }

    :global(body.dark) #documentation:not([opened="false"]){
        border-left: 1px solid #575757;
    }


    #closeDocButton {
        position: absolute;
        border: 0px;
        background-color: transparent;
        width: 40px;
        height: 40px;
        cursor: pointer;
        top: 10px;
        right: 10px;
        transform: translateX(100px);
        font-size: 2rem;
        transition: transform 0.5s ease-out;
        color: #000;
    }

    #closeDocButton:not([opened="false"]) {
        transform: translate(0px);
    }

    :global(body.dark) #closeDocButton {
        color: #fff;
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