<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TasktimelineChart from './components/TasktimelineChart.vue'
import TaskTable from './components/TaskTable.vue'
import CreateTaskForm from './components/CreateTaskForm.vue'

</script>

<template>
  
  <HelloWorld />
  <TasktimelineChart />
  <TaskTable />
  <CreateTaskForm />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
