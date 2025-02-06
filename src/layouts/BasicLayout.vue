<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header"><GlobleHeader/></a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/WanAnUncommon" target="_blank">WanAn</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import GlobleHeader from "@/components/GlobalHeader.vue";
</script>
<style scoped>
#basicLayout .header{
  padding-inline: 20px;
  color: unset;
  background: white;
  margin-bottom: 8px;
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
