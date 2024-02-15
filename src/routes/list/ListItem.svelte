<script>
    import _ from 'lodash';
    import { onMount, createEventDispatcher } from 'svelte';
    import ItemAttr from './ItemAttr.svelte';

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
        <ItemAttr schema={ schema }
                  dropdownDataByModelById={ dropdownDataByModelById }
                  item={ item }
                  filter={ filter }
                  setDefaultCompany={ setDefaultCompany }
                  model={ model }
                  type={ type }
                  attr={ attr }
                  attrIndex={ attrIndex } />
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