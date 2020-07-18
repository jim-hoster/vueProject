<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 头部插槽 -->
        <slot name="header"></slot>
      </div>
      <!-- 主内容插槽 -->
      <slot name="content"></slot>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>