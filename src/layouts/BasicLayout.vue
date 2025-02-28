<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobleHeader />
      </a-layout-header>
      <a-layout>
        <div class="sider">
          <GlobalSider />
        </div>
        <a-layout-content class="content">
          <router-view />
        </a-layout-content>
      </a-layout>
      <a-layout-footer class="footer">
        <a href="https://github.com/WanAnUncommon" target="_blank">WanAn</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import GlobleHeader from '@/components/GlobalHeader.vue'
import GlobalSider from '@/components/GlobalSider.vue'
</script>
<style scoped>
#basicLayout .header {
  padding-inline: 20px;
  color: unset;
  background: white;
  margin-bottom: 1px;
}

#basicLayout .sider {
  background: #fff;
  border-right: 0.5px solid #eee;
}

#basicLayout :deep(.ant-menu-root) {
  border-bottom: none !important;
  border-inline-end: none !important;
}

#basicLayout .footer {
  background: #efefef;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px;
  text-align: center;
}

#basicLayout .content {
  padding: 20px;
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 30px;
}
</style>
