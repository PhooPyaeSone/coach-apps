<template>
<div>
    <base-dialog :show="!!error" title="Fetch Error Log" @close="handleError">
        <p>{{error}}</p>
    </base-dialog>
   <base-card>
     <header>
        <h2>Request Received</h2>
     </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="!isLoading && hasRequests">
      <request-item v-for="req in receivedRequests" 
      :key="req.id" 
      :email="req.email" 
      :message="req.message"></request-item>
      </ul>
      <h3 v-else>No Received Requests at the moment!</h3>
   </base-card>
</div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue'
export default {
    components:{RequestItem},
    data(){
      return {
        isLoading: false,
        error : null,
      }
    },
    computed:{
        receivedRequests(){
          return this.$store.getters['request/requests'];
        },
        hasRequests(){
          return this.$store.getters['request/hasRequests'];
        }
    },
    methods:{
      async loadRequests(){
        this.isLoading = true;
        try {
         await this.$store.dispatch('request/fetchRequests');
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
      this.loadRequests();
    }
}
</script>
<style scoped>
header{
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>