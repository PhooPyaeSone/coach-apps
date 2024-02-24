<template>
<div>
    <base-dialog :show="!!error" title="Fetch Error Log" @close="handleError">
        <p>{{error}}</p>
    </base-dialog>
    <section>
            <coach-filter @update-filter="changeFilters"></coach-filter>
    </section>
    <base-card>
    <section>
        <div class="controls">
            <base-button mode="flat" @click="loadCoaches"> Refresh </base-button>
            <base-button link to="/auth2?redirect=register" v-if="!isLoggedIn"> Login to register as a coach </base-button>
            <base-button link to="/register" v-if="isLoggedIn && !isCoach && !isLoading"> Register as a coach </base-button>
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasCoaches">
            <coach-item v-for="coach in filteredCoaches" 
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :hourlyRate="coach.hourlyRate"
            :areas="coach.areas"
            ></coach-item>
        </ul>
        <p v-else> No Coaches here! </p>
    </section>
    </base-card>
</div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
export default {
    components:{CoachItem, BaseButton,CoachFilter},
    data(){
        return {
            isLoading: false,
            error : null,
            activeFilter :{
                'frontend': true,
                'backend' :true,
                'career' : true
            }
        }
    },
    computed:{
        isLoggedIn(){
            return this.$store.getters.isAuthenticated;
        },
        filteredCoaches(){
            const coaches = this.$store.getters['coach/coaches'];
            return coaches.filter((coach) =>{
                if(this.activeFilter.frontend && coach.areas.includes('frontend')){
                    return true;
                }
                if(this.activeFilter.backend && coach.areas.includes('backend')){
                    return true;
                }
                if(this.activeFilter.career && coach.areas.includes('career')){
                    return true;
                }
                return false;
            });
        },
        hasCoaches(){
            return !this.isLoading && this.$store.getters['coach/hasCoaches'];
        },
        isCoach(){
            return this.$store.getters['coach/isCoach'];
        }
    },
    methods:{
        changeFilters(updatedFilters){
            this.activeFilter = updatedFilters;
        },
        async loadCoaches(){
           this.isLoading = true;
           try {
            await this.$store.dispatch('coach/loadCoaches');
           } catch (error) {
             this.error = error;
           }
           this.isLoading = false;
        },
        handleError(){
            this.error = null;
        }
    },
    created(){
        this.loadCoaches();
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>