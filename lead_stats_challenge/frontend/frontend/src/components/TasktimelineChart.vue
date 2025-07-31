<script setup lang="ts">
import { Line } from 'vue-chartjs'
import axios from 'axios'
import { computed } from 'vue'
import { useQuery } from "@tanstack/vue-query"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const fetchTasks = async () => {
  const { data } = await axios.get('http://localhost:3000/api/getTasksPerDay')
  return data
}

// useQuery deve estar fora do computed
const { data: rawData } = useQuery({
  queryKey: ['dates'],
  queryFn: fetchTasks
})

const chartData = computed(() => {
  if (!rawData.value) return null

  const labels = Object.keys(rawData.value)
  const data = Object.values(rawData.value).map(Number)

  return {
    labels,
    datasets: [
      {
        label: 'Tasks done',
        data,
        borderColor: '#42A5F5',
        backgroundColor: '#90CAF9',
        fill: false,
        tension: 0.3,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Tasks per day'
    }
  }
}
</script>

<template>
  
  <div style="max-width: 600px; margin: auto;">
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />
  </div>
</template>
