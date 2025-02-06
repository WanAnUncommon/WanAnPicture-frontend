<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import {healthUsingGet} from "@/api/mainController.ts";

healthUsingGet().then((res)=>{
  console.log(res.data.data)
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
