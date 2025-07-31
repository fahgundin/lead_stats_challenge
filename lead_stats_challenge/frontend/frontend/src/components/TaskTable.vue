<script setup lang="ts">
import { ref, computed } from 'vue'

import { useQuery, } from "@tanstack/vue-query";
import axios from 'axios'


type Task = {
  id: number
  title: string
  description: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  createdAt: string
  dueDate: string
  assignedTo: String
  tags: String[]
  estimatedHours: number
}

const fetchTasks = async () => {
  const { data } = await axios.get('http://localhost:3000/api/getTasks')
  return data
}

function returnQuery() {
  const { data } = useQuery<Task[]>(
    {queryKey:['tasks'], queryFn: fetchTasks});
  return data
}

// Dados simulados
const tasks = returnQuery()


const selectedPriority = ref('')
const startDate = ref('')
const endDate = ref('')
const selectedStatus = ref('')
const selectedTag = ref('')



const filteredTasks = computed(() => {
  if (!tasks.value) return []

  

  return tasks.value.filter(task => {
    

    const matchesPriority = selectedPriority.value === '' || task.priority === selectedPriority.value
    const matchesStatus = selectedStatus.value === '' || task.status === selectedStatus.value
    const matchesTag = selectedTag.value === '' || task.tags.includes(selectedTag.value)
    const matchesStart = startDate.value === '' || task.createdAt >= startDate.value
    const matchesEnd = endDate.value === '' || task.createdAt <= endDate.value

    return matchesPriority && matchesStatus && matchesTag && matchesStart && matchesEnd
  })
  })


    async function updateStatus(taskId: number, newStatus: string) {
    try {
      await fetch(`http://localhost:3000/api/updateTaskStatus/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      location.reload();
      
    } catch (error) {
      console.error( error)
    }
  }
  function handleDelete(id: number) {
      const deleteUrl = `http://localhost:3000/api/deleteTask/${id}`
        try {
          fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          
          })
          location.reload();
        }catch(error){
          console.log(error)
        }
  } 

</script>

<template>
  
  <div class="task-table-container">
    <div class="filters">
      <label>
        Priority:
        <select v-model="selectedPriority">
          <option value="">All</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </label>

      <label>
        De:
        <input type="date" v-model="startDate" />
      </label>

      <label>
        Até:
        <input type="date" v-model="endDate" />
      </label>
      <label>
      Status: 
      <select v-model="selectedStatus">
        <option value="">ALL</option>
        <option value="TODO">TO DO</option>
        <option value="IN_PROGRESS">IN PR</option>
        <option value="DONE">DONE</option>
      </select>
    </label>

    <label>
      Tag:
      <input type="text" v-model="selectedTag" placeholder="Digite uma tag" />
    </label>
    </div>

    <table class="task-table">
      <thead>
        <tr>
          <th>Task</th>
          <th>Description</th>
          <th>Assignet TO</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Date</th>
          <th>Due Date</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in filteredTasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.assignedTo }}</td>
          <td>{{ task.priority }}</td>
          
          <td>
            <select v-model="task.status" @change="updateStatus(task.id, task.status)">
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
            </select>
          </td>
          <td>{{ task.createdAt.split("T")[0] }}</td>
          <td>{{ task.dueDate.split("T")[0] }}</td>
          <td>{{ task.tags.join(', ') }}</td>
          <td>
            <button @click="handleDelete(task.id)">Delete</button>
             <!-- <button >Delete</button> -->
          </td>
        </tr>
        <tr v-if="filteredTasks.length === 0">
          <td colspan="3">No Task Found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.task-table-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.filters label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
}

.task-table th,
.task-table td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}

.task-table th {
  background-color: #f4f4f4;
}
</style>
