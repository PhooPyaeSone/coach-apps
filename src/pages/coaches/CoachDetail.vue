<template>
<div>
    <section>
        <base-card>
            <h2>{{fullName}}</h2>
            <p> ${{rate}}/hour </p>
        </base-card>
    </section>
    <section>
        <base-card>
            <h2>Interested? Reach out now!</h2>
            <base-button link :to="contactLink"> Contact </base-button>
            <coach-contact></coach-contact>
        </base-card>
    </section>
    <section>
        <base-card>
        <base-badge v-for="area in areas" :key="area" :title="area" :type="area"> </base-badge>
        <p>{{description}}</p>
        </base-card>
    </section>
</div>
</template>

<script>
import CoachContact from '../request/CoachContact.vue';
export default {
    components:{CoachContact},
    props: ['id'],
    data(){
        return {
            selectedCoach: []
        }
    },
    computed:{
        fullName(){
            return this.selectedCoach.firstName + this.selectedCoach.lastName;
        },
        rate(){
            return this.selectedCoach.hourlyRate;
        },
        areas(){
            return this.selectedCoach.areas;
        },
        contactLink(){
            return this.$route.path + '/' + this.id + '/contact';
        },
        description(){
            return this.selectedCoach.description;
        }

    },
    created(){
         this.selectedCoach = this.$store.getters['coach/coaches'].find((coach) => coach.id === this.id)
    }
}
</script>