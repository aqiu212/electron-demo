<template>
  <div>
    我是首页

    <button @click="goTest">打开测试页面</button>
  </div>
</template>

<script>
export default {
  methods: {
    goTest() {
      console.log('test')
    }
  }
}
</script>

<style lang="less" scoped>

</style>