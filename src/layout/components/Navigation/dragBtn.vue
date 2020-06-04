<template>
    <div class="dragBtn" @click.stop="rollBtn(icon)">
        <svg-icon :icon-class='icon'></svg-icon>
    </div>
</template>

<script>
export default {
    name:'dragBtn',
    props:{
        icon:{
            type:String,
            default:'you-turn'
        }
    },
    methods:{
        rollBtn(iconName){
            this.$emit('clickEvent',iconName)
        }
    }
}
</script>

<style lang="scss" scoped>
    .dragBtn {
        display: inline-block;
        width: 48px;
        background: #F2F2F2;
        text-align: center;
        color: #222;
        font-size: 18px;
        cursor: pointer;
        transition: all .2s;
    }
    .dragBtn:hover{
        background: #E5E5E5;
    }
</style>