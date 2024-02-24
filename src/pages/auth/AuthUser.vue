 <template>
    <base-card>
       <div>
        <base-dialog  title="Error Alert" :show="!!error" @close="handleClose">{{error}}</base-dialog>
        <base-spinner v-if="isLoading"></base-spinner>
        <form @submit.prevent="submitForm">
            <div class="form-control">
                <label for="email">Email</label>
                <input type="email" name="email" v-model.trim="email.val" @blur="clearInvalidity('email')">
            </div>
            <p v-if="!email.validity">Please check your email!</p>
            <div class="form-control">
                <label for="password">Password</label>
                <input type="password" name="passwor" v-model.trim="password.val" @blur="clearInvalidity('password')">
            </div>
            <p v-if="!password.validity">Please check your password!</p>
            <base-button>{{login}}</base-button>
            <base-button type="button" mode="flat" @click="switchModeAuth">{{switchModeLabel}}</base-button>
        </form>
       </div>
    </base-card>
</template>
<script>
export default {
    data(){
        return {
            email: {
                val : "",
                validity: true
            },
            password: {
                val : "",
                validity: true
            },
            isFormValid: true,
            mode: 'login',
            isLoading : false,
            error : null
        }
    },
    computed:{
        login(){
            if(this.mode === "login"){
                return "Login";
            }
            else{
                return "Sign Up";
            }
        },
        switchModeLabel(){
            if(this.mode === "login"){
                return "SignUp Instead";
            }
            else{
                return "Login Instead";
            }
        }
    },
    methods: {
        clearInvalidity(input){
        this[input].validity = true;
        },
        formValidation(){
            this.isFormValid = true;
            if(this.email.val === "" || !this.email.val.includes("@")){
                this.email.validity = false;
                this.isFormValid = false;
            }
            if(this.password.val === "" || this.password.val.length < 6){
                this.password.validity = false;
                this.isFormValid = false;
            }
        },
        async submitForm(){
            this.isLoading = true;
            this.formValidation();
            const actionPayload = {
                email : this.email.val,
                password:this.password.val
            };
            try {
                if(this.mode === "login"){
                    await this.$store.dispatch('logIn',actionPayload);
                }else{
                    await this.$store.dispatch('signUp',actionPayload);
                }
                const redirectURlData = "/" + (this.$route.query.redirect || 'coaches');
                this.$router.replace(redirectURlData);
            } catch (error) {
                console.log(error.response);
                this.error = error;
            }
            this.isLoading = false;
        },
        switchModeAuth(){
            if(this.mode === "login"){
                this.mode ="SignUp";
            }else {
                this.mode = "login";
            }
        },
        handleClose(){
            this.error = null;
        }
        
    }
}
</script>
<style scoped>
form {
  margin: 1rem;
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