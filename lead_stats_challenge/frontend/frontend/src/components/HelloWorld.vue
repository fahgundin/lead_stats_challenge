

<script setup lang="ts">

  import { useQuery } from '@tanstack/vue-query'
  import axios from 'axios'
  import {  computed } from 'vue'

  const fetchTasks = async () => {
  const { data } = await axios.get('http://localhost:3000/api/getTasksPriorityNumber')
    return data
  }

  function returnQuery() {
    const { data } = useQuery(
      {queryKey:['prioritys'], queryFn: fetchTasks});
    return data
  }
  const prioritys = returnQuery()

  const highUrgency = computed(() => prioritys.value?.HIGH ?? 0)
  const mediumUrgency = computed(() => prioritys.value?.MEDIUM ?? 0)
  const lowUrgency = computed(() => prioritys.value?.LOW ?? 0)
</script>


<template>
  <div class="overview-cards">
    <div class="b-card-demo high">
      <div class="b-card-title">🔴 HIGH PRIORITY</div>
      <div class="b-card-subtitle">Critical Tasks</div>
      <div class="b-card-text">
        Total: {{ highUrgency }}
      </div>
    </div>

    <div class="b-card-demo medium">
      <div class="b-card-title">🟠 MEDIUM PRIORITY</div>
      <div class="b-card-subtitle">Important Tasks</div>
      <div class="b-card-text">
        Total: {{ mediumUrgency }}
      </div>
    </div>

    <div class="b-card-demo low">
      <div class="b-card-title">🟢 LOW PRIORITY</div>
      <div class="b-card-subtitle">Not priority Tasks</div>
      <div class="b-card-text">
        Total: {{ lowUrgency }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.overview-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin: 2rem auto;
  padding: 0 1rem;
}

.b-card-demo {
  border: 1px solid #ccc;
  border-left-width: 6px;
  border-radius: 12px;
  padding: 1rem;
  flex: 1 1 180px;
  max-width: 220px;
  min-width: 150px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.2s ease;
}

.b-card-demo:hover {
  transform: translateY(-4px);
}

.b-card-title {
  font-weight: bold;
  font-size: 1.1rem;
}

.high {
  border-left-color: red;
}
.medium {
  border-left-color: orange;
}
.low {
  border-left-color: green;
}
</style>