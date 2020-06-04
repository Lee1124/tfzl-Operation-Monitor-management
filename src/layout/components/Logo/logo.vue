//侧边导航
<template>
    <img :src="logoUrl" class="logoImg" alt="logo">
</template>
<script>
export default {
    name:'logo',
    data(){
        return{
            logoUrl:require('@/assets/images/logo.png')
        }
    }
}
</script>
<style type='scoped' lang="scss">
 @import "~@/assets/styles/variables.scss";
    .logoImg {
        width: 100%;
        height: 100%;
        max-width: 100px;
        max-height: 100px;
    }
</style>