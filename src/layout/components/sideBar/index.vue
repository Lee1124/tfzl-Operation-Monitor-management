//侧边导航
<template>
    <div class="sideBar_index">
        <sideNavList />
    </div>
</template>

<script>
import sideNavList from './sideNavList'
export default {
    name:'sideBar',
    components:{
        sideNavList
    },
    data(){
        return {

        }
    },
    computed:{
        showLogo(){
            return true
        }
    }
}
</script>

<style lang="scss" type='scoped'>

    .sideBar_index{
        width: 100%;
        height: 100%;
    }
</style>