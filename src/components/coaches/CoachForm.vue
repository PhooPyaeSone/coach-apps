<template>
    <form @submit.prevent="submitFormData">
        <div class="form-control" :class="{invalid : !first.isValid}">
            <label for="firstName">FirstName</label>
            <input type="text" id="firstName" v-model.trim="first.val" @blur="clearInvalidity('first')">
            <p v-if="!first.isValid">First Name must be filled!</p>
        </div>
        <div class="form-control" :class="{invalid :!last.isValid}">
            <label for="lastName">LastName</label>
            <input type="text" id="lastName" v-model.trim="last.val" @blur="clearInvalidity('last')">
            <p v-if="!last.isValid">Last Name must be filled!</p>
        </div>
        <div class="form-control" :class="{invalid :!desc.isValid}">
            <label for="description">Description</label>
            <textarea rows="4" id="description" v-model.trim="desc.val" @blur="clearInvalidity('desc')"/>
            <p v-if="!desc.isValid">Description Name must be filled!</p>
        </div>
        <div class="form-control" :class="{invalid : !rate.isValid}">
            <label for="rate">Rate</label>
            <input type="text" id="rate" v-model.number="rate.val" @blur="clearInvalidity('rate')">
            <p v-if="!rate.isValid">Rate must be filled!</p>
        </div>
        <div>
            <h2>Expertise</h2>
            <div class="form-control" :class="{invalid : !areas.isValid}">
                <input type="checkbox" id="frontend" value="frontend" v-model="areas.val"  @blur="clearInvalidity('areas')">
                <label for="frontend"> Frontend </label>
            </div>
            <div class="form-control" :class="{invalid : !areas.isValid}">
                <input type="checkbox" id="backend" value="backend" v-model="areas.val"  @blur="clearInvalidity('areas')">
                <label for="backend"> Backend </label>
            </div>
            <div class="form-control" :class="{invalid : !areas.isValid}">
                <input type="checkbox" id="career" value="career" v-model="areas.val"  @blur="clearInvalidity('areas')">
                <label for="career"> Career </label>
            </div>
            <p v-if="!areas.isValid">One of these expertises must be checked!</p>
        </div>
        <div class="form-control">
           <base-button> Register </base-button>
        </div>
        <p v-if="!isFormValid">Please fill above information!</p>
    </form>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';
export default {
  components: { BaseButton },
    emits:['submit-coach'],
    data(){
        return {
            first : {
                val : "",
                isValid : true
            },
            last : {
                val : "",
                isValid : true
            },
            desc: {
                val : "",
                isValid : true
            },
            rate: {
                val : null,
                isValid : true
            },
            areas : {
                val :[],
                isValid : true
            },
            isFormValid : true,
        }
    },
    methods:{
        clearInvalidity(input){
            this[input].isValid = true;
        },
        formValidation(){
            this.isFormValid = true;
            if(this.first.val === ""){
                this.first.isValid = false;
                this.isFormValid = false;
            }
            if(this.last.val === ""){
                this.last.isValid = false;
                this.isFormValid = false;
            }
            if(this.desc.val === ""){
                this.desc.isValid = false;
                this.isFormValid = false;
            }
            if( this.rate.val === null || this.rate.val < 0 ){
                this.rate.isValid = false;
                this.isFormValid = false;
            }
            if(!this.areas.length == 0){
                this.areas.isValid = false;
                this.isFormValid = false;
            }
        },
        submitFormData(){
            this.formValidation();
            if(this.isFormValid === false){
                return;
            }
            const formData = {
                first : this.first.val,
                last  : this.last.val,
                desc  : this.desc.val,
                rate  : this.rate.val,
                areas : this.areas.val
            }
         this.$emit('submit-coach',formData);
        }
    }
}
</script>

<style scoped>
.form-control {
  margin: 1.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>