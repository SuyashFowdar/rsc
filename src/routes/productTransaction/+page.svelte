<script>
    let val = '';
</script>

<!--<svelte:head>-->
<!--    <title>{ modelTitle }</title>-->
<!--    <meta name="description" content="About this app"/>-->
<!--</svelte:head>-->

<form class="m-4 p-4 list-container">
    <div class="input-group mb-3">
        <span class="input-group-text" id="Product">Product</span>
        <input type="text" class="form-control" placeholder="Product">
    </div>
    <div class="input-group mb-3">
        <span class="input-group-text" id="Amount">Amount</span>
        <input type="text" class="form-control" placeholder="Amount">
    </div>
    <div class="input-group mb-3">
        <span class="input-group-text" id="Date">Date</span>
        <input type="text" class="form-control" placeholder="Date">
    </div>
    <div class="input-group mb-3">
        <span class="input-group-text" id="Transactions">Transactions</span>
        <input type="text" class="form-control" placeholder="Transactions">
    </div>
    <div class="input-group mb-3">
        <span class="input-group-text" id="Details">Details</span>
        <input type="text" class="form-control" placeholder="Details">
    </div>
    <div class="d-flex justify-content-center">
        <button class="btn btn-primary me-2" type="submit">Save</button>
        <button class="btn btn-outline-primary" type="button" on:click={ () => { history.back(); }}>Cancel</button>
    </div>
</form>

<style>
    .list-container {
        border: 1px solid rgb(200, 200, 200);
        border-radius: 5px;
        margin-bottom: 10px;
        overflow: hidden;
        min-height: calc(100vh - 150px);
        --list-container-width: 0px;
    }

    .overflow-control {
        overflow-x: auto;
    }

    .list-title {
        font-weight: bold;
        text-transform: capitalize;
        padding: 5px 10px;
        background-color: rgb(200, 200, 200);
        white-space: nowrap;
    }

    .list-container article {
        padding: 7px;
    }

    .list-container article:nth-of-type(even) {
        background-color: #cfe2ff;
    }

    .list-container article,
    .list-container .list-title {
        width: var(--list-container-width);
        min-width: calc(100vw - 3.1rem);
    }

    .error {
        --bs-toast-bg: rgb(255, 97, 97);
        --bs-toast-header-bg: rgb(255, 97, 97);
    }

    .success {
        --bs-toast-bg: rgb(97, 255, 97);
        --bs-toast-header-bg: rgb(97, 255, 97);
    }

    .btn-group-lg > .btn {
        --bs-btn-font-size: 1rem;
    }

    .grid-header {
        margin-left: 50px;
    }

    .grid-header div {
        padding-left: 10px; /* padding of inputs */
        min-width: 200px;
        max-width: 200px;
        margin-right: 10px;
        display: flex;
    }

    .grid-header div i:first-of-type {
        margin-left: auto;
        margin-right: 10px;
    }

    .import-xl {
        width: 500px;
        margin-top: 7px;
        margin-left: 120px;
    }

    .import-xl .form-control,
    .import-xl .input-group-text {
        border-color: rgb(150, 150, 150);
        background-color: transparent;
    }
</style>
