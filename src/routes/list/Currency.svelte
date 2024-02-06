<script>
    import {beforeUpdate} from "svelte";

    export let val, isInput, attr, filter, placeholder, type;

    let formattedValue, showNum = false;

    beforeUpdate(() => {
        formattedValue = getFormattedValue();
    });

    function getFormattedValue() {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'MUR',
            minimumFractionDigits: 2,
        }).format(val || 0);
    };

    function onFormatClick() {
        showNum = true;
        setTimeout(() => {
            document.getElementById('num-' + attr).select();
        });
    };

    function onValChange() {
        formattedValue = getFormattedValue();
        showNum = false;
    };

</script>
{#if isInput}
    {#if showNum}
        <input type="number" class="form-control { type === 'data' ? 'transparent-border' : '' }" id="num-{ attr }" bind:value={ val } on:blur={ onValChange } on:keyup={ () => { filter() } }>
    {:else}
        <input type="text" class="form-control { type === 'data' ? 'transparent-border' : '' }" bind:value={ formattedValue } on:click={ onFormatClick } placeholder={ placeholder }>
    {/if}
{:else}
    { formattedValue }
{/if}
<style>
    .form-control {
        border-color: rgb(150, 150, 150);
        background-color: transparent;
    }

    .transparent-border.form-control {
        border-color: transparent;
        background-color: transparent;
    }


    .transparent-border.form-control:hover,
    .transparent-border.form-control:active {
        border-color: rgb(150, 150, 150);
    }
</style>