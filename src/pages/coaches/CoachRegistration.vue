<template>
    <section>
        <base-card>
        <h2>Register as a coach now!</h2>
        <coach-form @submit-coach="registerCoach"></coach-form>
        </base-card>
    </section>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";
export default {
    components:{CoachForm},
    methods:{
        registerCoach(formData){
            // console.log(formData);
            this.$store.dispatch('coach/register',formData);
            this.$router.replace('/coaches');
        }
    }
}
</script>