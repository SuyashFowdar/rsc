<script>
    import _ from 'lodash';
    import { onMount, createEventDispatcher } from "svelte";
    import Currency from './Currency.svelte';

    const dispatch = createEventDispatcher(),
        currencyAttrList = ['incoming', 'outgoing', 'buyingPrice', 'sellingPrice'];

    export let schema, dropdownDataByModelById, item, filter, type, setDefaultCompany, model;

    let filterValue = '',
        dropdownFilter = _.cloneDeep(dropdownDataByModelById);

    onMount(() => {
        if (setDefaultCompany) {
            setDefaultCompany(item);
        }
    });

    function selectOneSubItem(subItemAttr, attr) {
        item[attr] = dropdownDataByModelById[schema[attr].model][subItemAttr].id;
        filter();
    };

    function selectSubItem(subItemAttr, attr) {
        if (!item[attr] || !item[attr].hasOwnProperty('length')) {
            item[attr] = [];
        }

        if (_.indexOf(item[attr], dropdownDataByModelById[schema[attr].model][subItemAttr].id) < 0) {
            item[attr] = _.concat(item[attr], dropdownDataByModelById[schema[attr].model][subItemAttr].id);
        } else {
            item[attr] = _.filter(item[attr], subItem => {
                return subItem !== dropdownDataByModelById[schema[attr].model][subItemAttr].id;
            });
        }

        filter();
    };

    function filterDropdown(model) {
        dropdownFilter = {
            [model]: {}
        };

        _.forEach(dropdownDataByModelById[model], (dropdownItem, itemAttr) => {
            if (_.lowerCase(dropdownItem.title).includes(_.lowerCase(filterValue))) {
                dropdownFilter[model][itemAttr] = dropdownItem;
            }
        });
    };
</script>

<div class="d-flex">
    <div style="width: 50px;">
        {#if type === 'data'}
            <button class="btn btn-danger" type="button" on:click={() => {dispatch('remove')}}>
                <i class="fa-regular fa-trash-can"></i>
            </button>
        {/if}
    </div>
    {#each _.keys(schema) as attr, attrIndex}
        <div class="list-input input-group d-flex">
            {#if currencyAttrList.includes(attr)}
                <Currency bind:val={ item[attr] } isInput={ true } attr={ attr } filter={ filter } type={ type }
                          placeholder={ _.startCase((attrIndex === 0 && model ? `${type} ${model} ` : '') + attr) } />
            {:else if schema[attr].type === 'String'}
                <input type="text"
                       class="form-control { type === 'data' ? 'transparent-border' : '' }"
                       placeholder={ _.startCase((attrIndex === 0 && model ? `${type} ${model} ` : '') + attr) }
                       bind:value={ item[attr] }
                       on:keyup={ () => { filter() } }>
            {:else if schema[attr].type === 'Number'}
                <input type="number"
                       class="form-control { type === 'data' ? 'transparent-border' : '' }"
                       placeholder={ _.startCase((attrIndex === 0 && model ? `${type} ${model} ` : '') + attr) }
                       aria-describedby="basic-addon1"
                       bind:value={ item[attr] }
                       on:keyup={ () => { filter() } }>
            {:else if schema[attr].type === 'Date'}
                <input type="date"
                       class="form-control { type === 'data' ? 'transparent-border' : '' }"
                       aria-describedby="basic-addon1"
                       placeholder={ _.startCase((attrIndex === 0 && model ? `${type} ${model} ` : '') + attr) }
                       bind:value={ item[attr] }
                       on:change={ () => { filter() } }>
            {:else if schema[attr].type === 'ObjectId' && dropdownDataByModelById[schema[attr].model] &&
            !_.isEmpty(dropdownDataByModelById[schema[attr].model])}
                <div class="dropdown flex-fill d-flex">
                    <button class="btn dropdown-toggle flex-fill dropdown-title { type === 'data' ? 'transparent-border' : '' }"
                            type="button"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            aria-expanded="false">
                        {#if item[attr]}
                            { dropdownDataByModelById[schema[attr].model][item[attr]].title }
                        {:else}
                            Select { _.startCase((attrIndex === 0 && model ? `${type} ${model} ` : '') + attr) }...
                        {/if}
                    </button>
                    <div class="dropdown-menu" style="width: 100%;">
                        <div class="input-group mb-3 me-3 d-flex">
                            <span class="input-group-text" id="filter">Filter</span>
                            <input type="text"
                                   class="form-control"
                                   aria-describedby="filter"
                                   bind:value={ filterValue }
                                   on:keyup={ () => { filterDropdown(schema[attr].model) } }>
                        </div>
                        <div class="list-group">
                            {#each _.keys(dropdownFilter[schema[attr].model]) as subItemAttr, subItemAttrIndex}
                                <button type="button"
                                        class="list-group-item list-group-item-action {
                                            item[attr] && item[attr] ===
                                            dropdownDataByModelById[schema[attr].model][subItemAttr].id ? 'active' : ''
                                        }"
                                        aria-current="true"
                                        on:click={ () => { selectOneSubItem(subItemAttr, attr) } }>
                                    { dropdownDataByModelById[schema[attr].model][subItemAttr].title }
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>
            {:else if schema[attr].type === 'Array' && dropdownDataByModelById[schema[attr].model] &&
            !_.isEmpty(dropdownDataByModelById[schema[attr].model])}
                <div class="dropdown flex-fill d-flex">
                    <button class="btn dropdown-toggle flex-fill dropdown-title { type === 'data' ? 'transparent-border' : '' }"
                            type="button"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            aria-expanded="false">
                        {#if item[attr] && item[attr].length}
                            {#each item[attr] as itemAttr2, itemAttr2Index}
                                {#if itemAttr2Index},{/if}
                                {#if dropdownDataByModelById[schema[attr].model][itemAttr2]}
                                    { dropdownDataByModelById[schema[attr].model][itemAttr2].title }
                                {/if}
                            {/each}
                        {:else}
                            Select { _.startCase((attrIndex === 0 && model ? `${type} ${model} ` : '') + attr) }...
                        {/if}
                    </button>
                    <div class="dropdown-menu" style="width: 100%;">
                        <div class="input-group mb-3 me-3 d-flex">
                            <span class="input-group-text" id="filter">Filter</span>
                            <input type="text"
                                   class="form-control"
                                   aria-describedby="filter"
                                   bind:value={ filterValue }
                                   on:keyup={ () => { filterDropdown(schema[attr].model) } }>
                        </div>
                        <div class="list-group">
                            {#each _.keys(dropdownFilter[schema[attr].model]) as subItemAttr, subItemAttrIndex}
                                <button type="button"
                                        class="list-group-item list-group-item-action {
                                            item[attr] &&
                                            item[attr].includes(dropdownDataByModelById[
                                                schema[attr].model][subItemAttr].id) ? 'active' : ''
                                        }"
                                        aria-current="true"
                                        on:click={ () => { selectSubItem(subItemAttr, attr) } }>
                                    { dropdownDataByModelById[schema[attr].model][subItemAttr].title }
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    {/each}
</div>
<style>
    .dropdown-title {
        text-overflow: ellipsis !important;
        overflow: hidden !important;
        white-space: nowrap !important;
        width: 50px;
    }

    .input-group-text {
        --bs-tertiary-bg: rgb(200, 200, 200);
    }

    .button-container {
        width: 180px;
    }

    .button-container button,
    .button-container div {
        width: 50px;
        margin-right: 10px;
    }

    .form-control,
    .dropdown-toggle.btn {
        border-color: rgb(150, 150, 150);
        background-color: transparent;
    }

    .transparent-border.form-control {
        border-color: transparent;
        background-color: transparent;
    }

    .transparent-border.dropdown-toggle.btn {
        border-color: transparent;
    }

    .transparent-border.form-control:hover,
    .transparent-border.form-control:active {
        border-color: rgb(150, 150, 150);
    }

    .transparent-border.dropdown-toggle.btn:hover,
    .transparent-border.dropdown-toggle.btn:active,
    .transparent-border.dropdown-toggle.btn:focus {
        border-color: rgb(150, 150, 150);
    }

    .list-input.input-group {
        min-width: 200px;
        max-width: 200px;
        margin-right: 10px;
    }

    .dropdown-menu {
        box-shadow: 0 0 10px;
        padding: 10px;
    }
</style>