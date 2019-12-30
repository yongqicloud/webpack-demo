<template>
<div>
  <div>你好</div>
  <img :src="img" alt="">
</div>
</template>

<script>
import img from '../assets/img01.jpg'
export default { 
  data(){
    return{
      img
    }
  }
}
</script>

<style>

</style>