<template>
    <base-card>
        <h2>Find your coach</h2>
        <span class="filter-option">
            <input type="checkbox" id="frontend" checked @change="setFilter">
            <label for="frontend">Frontend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="backend" checked @change="setFilter">
            <label for="frontend">Backend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="career" checked @change="setFilter">
            <label for="frontend">Career</label>
        </span>
    </base-card>
</template>

<script>
export default {
    emits:['update-filter'],
    data(){
        return {
            filtered:{
                'frontend': true,
                'backend' :true,
                'career' : true
            }
        }
    },
    methods:{
        setFilter(event){
            const filteredId = event.target.id;
            const filteredCheck = event.target.checked;
            const updatedFilters = {
                ...this.filtered,
                [filteredId]: filteredCheck
            };
            this.filtered = updatedFilters;
            this.$emit('update-filter',updatedFilters);
        }
    }
}
</script>

