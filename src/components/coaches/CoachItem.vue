<template>
<li>
    <h2> {{fullName}}</h2>
    <h3> {{hourlyRate}}/hour</h3>
    <div>
        <base-badge v-for="area in areas" :key="area" :title="area" :type="area"></base-badge>
    </div>
    <div class="actions">
        <base-button link :to="contactLink" mode="flat"> Contact </base-button> 
        <base-button link :to="detailLink"> Detail </base-button>
    </div>
</li>
</template>

<script>
import BaseBadge from '../ui/BaseBadge.vue';
import BaseButton from '../ui/BaseButton.vue';
export default {
  components: { BaseButton, BaseBadge },
    props:['id','firstName','lastName','hourlyRate','areas'],
    computed:{
        fullName(){
            return this.firstName + this.lastName;
        },
        contactLink(){
            return '/coaches/' + this.id + '/contact';
        },
        detailLink(){
            return this.$route.path + '/' + this.id;
        }
    }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}
h3 {
  font-size: 1.5rem;
}
h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>