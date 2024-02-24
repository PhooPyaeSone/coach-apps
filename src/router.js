// import { defineAsyncComponent } from "vue";
import { createRouter,createWebHistory } from "vue-router";
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import CoachContact from './pages/request/CoachContact.vue';
import RequestReceived from './pages/request/RequestReceived.vue';
import AuthUser from './pages/auth/AuthUser.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

// const CoachDetail = defineAsyncComponent(()=>import('./pages/coaches/CoachDetail.vue'));
// const CoachRegistration = defineAsyncComponent(()=>import('./pages/coaches/CoachRegistration.vue'));
// const CoachContact = defineAsyncComponent(()=>import('./pages/request/CoachContact.vue'));
// const RequestReceived = defineAsyncComponent(()=>import('./pages/request/RequestReceived.vue'));
// const AuthUser = defineAsyncComponent(()=>import('./pages/auth/AuthUser.vue'));

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/',redirect: '/coaches'},
        {path: '/coaches',component: CoachesList},
        {path: '/coaches/:id',component: CoachDetail,
        props: true,
        children:
        [
            {path:'contact',component: CoachContact}
        ]},
        {path: '/register',component: CoachRegistration, meta: { requiresAuth: true },},
        {path: '/request',component: RequestReceived,meta: { requiresAuth: true },},
        {path: '/auth2',component: AuthUser,meta: { requiresunAuth: true },},
        {path: '/:notFound(.*)',component: NotFound},
    ]
});
router.beforeEach((to, _2, next) => {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated){
        next('/auth2');
    }else if(to.meta.requiresunAuth && store.getters.isAuthenticated){
        next('/coaches');
    }
    else {
        next();
    }
  });
export default router;