<script>
    import ListItem from '../ListItem.svelte';
    import _ from 'lodash';
    import {page} from '$app/stores';
    import {browser} from '$app/environment';
    import {onMount} from "svelte";
    import {put, uploadFile, remove} from '../../../lib/utils/http.js';

    export let data;

    let list = [],
        originalList = [],
        importData = [],
        schema = {},
        dropdownDataByModelById = {},
        filterItem = {},
        newItem = {},
        showFilter = false,
        loading = false,
        error = null,
        modelTitle = '',
        defaultCompanyId = browser ? localStorage.selectedCompanyId : 0,
        listContainerWidth = 0,
        importModal, model, toastBootstrap, toastTitle, toastMessage, toastType, fileInput;

    onMount(() => {
        toastBootstrap = document.getElementById('liveToast');

        const unsubscribe = page.subscribe((value) => {
            originalList = data.originalList;
            schema = data.schema;
            dropdownDataByModelById = data.dropdownDataByModelById;
            modelTitle = _.startCase(data.modelName);
            reset();
            listContainerWidth = (_.keys(schema).length * 210) + 200;
        });

        return () => {
            unsubscribe();
        };
    })

    function showToast() {
        setTimeout(() => {
            new bootstrap.Toast(toastBootstrap).show();
        });
    };

    function showModal() {
        if (!importModal) {
            importModal = new bootstrap.Modal(document.getElementById('importModal'));
        }

        importModal.show();
    };

    function save() {
        const arrToSave = [];

        if (!_.isEmpty(newItem) && (_.keys(newItem).length > 1 || !newItem.company)) {
            arrToSave.push(newItem);
        }

        _.each(list, item => {
            const originalItem = _.find(originalList, {id: item.id});
            if (!_.isEqual(item, originalItem)) {
                arrToSave.push(item);
            }
        });

        if (arrToSave.length) {
            put('/list/' + data.modelName, arrToSave)
                .then(response => {
                    if (response.err) {
                        toastType = 'error';
                        toastTitle = 'Error!';
                        toastMessage = 'There has been an error!';
                    } else {
                        toastType = 'success';
                        toastTitle = 'Success!';
                        toastMessage = 'Successfully saved';

                        if (response.created && response.created.length) {
                            originalList = _.concat(originalList, response.created);
                        }

                        if (response.updated && response.updated.length) {
                            _.each(response.updated, updatedItem => {
                                _.each(originalList, (item, itemIndex) => {
                                    if (item.id === updatedItem.id) originalList[itemIndex] = updatedItem;
                                });
                            });
                        }

                        reset();
                    }
                    showToast();
                });
        }

    };

    function saveImport(index) {
        if (importData.length) {
            put('/list/' + data.modelName, importData)
                .then(response => {
                    if (response.err) {
                        toastType = 'error';
                        toastTitle = 'Error!';
                        toastMessage = 'There has been an error!';
                    } else {
                        toastType = 'success';
                        toastTitle = 'Success!';
                        toastMessage = 'Successfully saved';
                        list[index] = response;

                        if (response.created && response.created.length) {
                            originalList = _.concat(originalList, response.created);
                        }

                        reset();
                        importModal.hide();
                    }
                    showToast();
                });
        }
    };

    function closeModal() {
        importModal.hide();
        reset();
    };

    function filter() {
        list = _.cloneDeep(_.filter(originalList, (listItem) => {
            return _.every(filterItem, (val, attr) => {
                if (!schema[attr]) {
                    return false;
                }

                switch (schema[attr].type) {
                    case 'String':
                        return _.lowerCase(listItem[attr]).includes(_.lowerCase(val));
                        break;
                    case 'Number':
                    case 'Date':
                        return _.toString(listItem[attr]).includes(_.toString(val));
                        break;
                    case 'ObjectId':
                        return listItem[attr] === val;
                        break;
                    case 'Array':
                        return _.every(val, filterSubListItem => _.includes(listItem[attr], filterSubListItem));
                        break;
                    default:
                        return false;
                        break;
                }
            });
        }));

        orderList();
    }

    function setDefaultCompany(item, filter) {
        if (!_.isEmpty(defaultCompanyId) && !_.isEmpty(schema.company)) {
            if (schema.company.type === 'ObjectId') {
                item.company = defaultCompanyId;
            } else if (schema.company.type === 'Array') {
                item.company = [defaultCompanyId];
            }

            if (filter) filter();
        }
    };

    function handleFileChange() {
        const selectedFile = fileInput.files[0];

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            uploadFile('/list/' + data.modelName, formData)
                .then(response => {
                    importData = response;
                })
        }
    };

    function orderList(attr, order) {
        const attrList = [], orderList = [];

        if (attr) {
            schema[attr].sort = schema[attr].sort === order ? null : order;
        }

        _.each(schema, (val, attr) => {
            if (val.sort) {
                attrList.push(attr);
                orderList.push(val.sort);
            }
        });

        if (attrList.length) {
            list = _.orderBy(list, attrList, orderList);
        } else if (attr) {
            filter();
        }

    };

    function reset() {
        list = _.cloneDeep(originalList);
        newItem = {};
        filterItem = {};
        importData = [];
        if (fileInput) fileInput.value = null;
        setDefaultCompany(newItem);
        setDefaultCompany(filterItem);
        filter();
    };

    function removeItem(index) {
        if (confirm(`Do you wish to delete ${data.modelName}?`)) {
            const originalIndex = _.findIndex(originalList, {id: list[index].id});

            remove('/list/' + data.modelName, [list[index].id]).then((response) => {
                if (response.err) {
                    toastType = 'error';
                    toastTitle = 'Error!';
                    toastMessage = 'There has been an error!';
                } else {
                    toastType = 'success';
                    toastTitle = 'Success!';
                    toastMessage = 'Successfully deleted';

                    originalList.splice(originalIndex, 1);

                    reset();
                }
                showToast();
            });
        }
    }
</script>

<svelte:head>
    <title>{ modelTitle }</title>
    <meta name="description" content="About this app"/>
</svelte:head>

<div class="m-4">
    <div class="mb-3 btn-group btn-group-lg">
        <button class="btn btn-outline-primary" type="button" on:click={ save }>
            <i class="fa-regular fa-floppy-disk"></i>
            Save
        </button>
        <button class="btn btn-outline-primary" type="button" on:click={ reset }>
            <i class="fa-solid fa-arrow-rotate-right"></i>
            Reset
        </button>
        <button class="btn btn-outline-primary" type="button" on:click={ showModal }>
            <i class="fa-regular fa-share-from-square"></i>
            Import
        </button>
        <button class="btn { showFilter ? 'btn-primary' : ' btn-outline-primary' }" type="button"
                on:click={ () => { showFilter = !showFilter } }>
            <i class="fa-solid fa-filter"></i>
            Filter
        </button>
    </div>
    {#if loading}
        <h2 class="d-flex w-100 justify-content-center">Loading...</h2>
    {:else if error}
        <h2 class="d-flex w-100 justify-content-center">{ error }</h2>
    {:else if list }
        <div class="list-container d-flex" style="--list-container-width: {listContainerWidth}px;">
            <div class="overflow-control">
                <article>
                    {#if data.link}
                        <a href={data.link}>
                            <button class="btn btn-outline-primary" type="button">
                                <i class="fa-regular fa-add"></i>
                                New { modelTitle }
                            </button>
                        </a>
                    {:else}
                        <ListItem schema={ schema }
                                  dropdownDataByModelById={ dropdownDataByModelById }
                                  item={ newItem }
                                  filter={ () => {} }
                                  setDefaultCompany={ setDefaultCompany }
                                  model={ data.modelName }
                                  type="new"/>
                    {/if}
                </article>
                <div class="list-title">
                    <div class="grid-header d-flex">
                        {#each _.keys(schema) as attr, attrIndex}
                            <div>
                                <span>{ _.startCase(attr) }</span>
                                <i class="fa-circle-down { schema[attr].sort === 'asc' ? 'fa-solid' : 'fa-regular' }"
                                   on:click={ () => { orderList(attr, 'asc') } }></i>
                                <i class="fa-circle-up { schema[attr].sort === 'desc' ? 'fa-solid' : 'fa-regular' }"
                                   on:click={ () => { orderList(attr, 'desc') } }></i>
                            </div>
                        {/each}
                    </div>
                    {#if showFilter}
                        <div class="my-1">
                            <ListItem schema={ schema }
                                      dropdownDataByModelById={ dropdownDataByModelById }
                                      item={ filterItem }
                                      filter={ filter }
                                      type="filter"
                                      model={ data.modelName }
                                      setDefaultCompany={ setDefaultCompany }/>
                        </div>
                    {/if}
                </div>
                <div>
                    {#each list as item, itemIndex}
                        <article>
                            <ListItem schema={ schema }
                                      dropdownDataByModelById={ dropdownDataByModelById }
                                      item={ item }
                                      filter={ () => {} }
                                      type="data"
                                      on:remove={ () => { removeItem(itemIndex) } }/>
                        </article>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
    <!-- Toast -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" class="toast { toastType }" role="alert" aria-live="assertive" aria-atomic="true"
             data-bs-delay="3000">
            <div class="toast-header">
                <strong class="me-auto">{ toastTitle }</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                { toastMessage }
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="importModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Import { model } list from excel</h1>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-2">
                        <input type="file" class="form-control" id="inputGroupFile01" bind:this={fileInput}
                               on:change={handleFileChange}>
                    </div>
                    {#if importData.length}
                        <div class="list-container d-flex" style="--list-container-width: {listContainerWidth}px;">
                            <div class="overflow-control">
                                <div class="list-title d-flex grid-header">
                                    {#each _.keys(schema) as attr, attrIndex}
                                        <div>
                                            <span>{ _.startCase(attr) }</span>
                                        </div>
                                    {/each}
                                </div>
                                {#each importData as item, itemIndex}
                                    <article>
                                        <ListItem schema={ schema }
                                                  dropdownDataByModelById={ dropdownDataByModelById }
                                                  item={ item }
                                                  filter={ () => {} }
                                                  type="data"/>
                                    </article>
                                {/each}
                            </div>
                        </div>
                    {/if}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" on:click={ closeModal }>Close</button>
                    <button type="button" class="btn btn-primary" on:click={ saveImport }>Save</button>
                </div>
            </div>
        </div>
    </div>
</div>
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
        background-color: rgb(75, 75, 75);
        white-space: nowrap;
    }

    .list-container article {
        padding: 7px;
    }

    .list-container article:nth-of-type(even) {
        background-color: rgb(50, 50, 50);
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
