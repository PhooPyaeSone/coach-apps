<template>
         <form @submit.prevent="contactCoach">
            <div class="form-control" :class="{invalid :!email.isValid}" >
                <label for="email"> Your email Adress</label>
                <input type="text" id="email" v-model.trim="email.val" @blur="clearInValidity('email')">
                <p v-if="!email.isValid"> Check your email! </p>
            </div>
             <div class="form-control" :class="{invalid : !message.isValid}" >
                <label for="message"> Message </label>
                <textarea id="message" rows="5" v-model.trim="message.val" @blur="clearInValidity('message')"></textarea>
                <p v-if="!message.isValid">Message must be filled!</p>
            </div>
            <div class="actions">
                <base-button>Send Message</base-button>
            </div>
            <p v-if="!isFormValid" class="error">Check your information!</p>
         </form>
</template>

<script>
export default {
    data(){
      return {
        email : {
            val : "",
            isValid : true
        },
        message: {
            val : "",
            isValid : true
        },
        isFormValid : true
      }
    },
    methods:{
        clearInValidity(input){
            this[input].isValid = true;
        },
        formValidation(){
            this.isFormValid = true;
            if(this.email.val === "" || !this.email.val.includes('@') ){
                this.email.isValid = false;
                this.isFormValid = false;
            }
            if(this.message.val === ""){
                this.message.isValid = false;
                this.isFormValid = false;
            }
        },
        contactCoach(){
            this.formValidation();
            if(!this.isFormValid){
                return;
            }
            const formData = {
                coachId : this.$route.params.id,
                email : this.email.val,
                message : this.message.val
            }

            // console.log(formData);
            this.$store.dispatch('request/addRequest',formData);
            this.$router.replace('/request');

        }
    }
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>