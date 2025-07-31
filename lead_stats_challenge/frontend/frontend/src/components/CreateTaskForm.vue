
<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const form = ref({
  title: '',
  description: '',
  priority: '',
  status: '',
  dueDate: null as string | null,
  assignedTo: '',
  tags: '', // Agora é string
  estimatedHours: null as number | null,
})

async function submitForm() {
  try {
    const payload = {
      ...form.value,
      dueDate: form.value.dueDate || null,
      estimatedHours: form.value.estimatedHours || null,
      tags: form.value.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0),
    }

    console.log('Payload:', JSON.stringify(payload, null, 2))
    await axios.post('http://localhost:3000/api/createTask', payload)
    alert('Task created successfully!')
    location.reload()

    // Reset
    form.value = {
      title: '',
      description: '',
      priority: '',
      status: '',
      dueDate: null,
      assignedTo: '',
      tags: '',
      estimatedHours: null,
    }
  } catch (error) {
    console.error('Failed to submit:', error)
  }
}

</script>


<template>
  <div class="form-container">
    <h2 class="form-title">📋 Create New Task</h2>
    
    <form @submit.prevent="submitForm" class="form-grid">
      <div class="form-group">
        <label>Title</label>
        <input v-model="form.title" type="text" required />
      </div>

      <div class="form-group">
        <label>Description</label>
        <textarea v-model="form.description" rows="3" required></textarea>
      </div>

      <div class="form-group">
        <label>Priority</label>
        <select v-model="form.priority" required>
          <option disabled value="">Select priority</option>
          <option value="HIGH">🔴 High</option>
          <option value="MEDIUM">🟠 Medium</option>
          <option value="LOW">🟢 Low</option>
        </select>
      </div>

      <div class="form-group">
        <label>Status</label>
        <select v-model="form.status" required>
          <option disabled value="">Select status</option>
          <option value="TODO">📌 TODO</option>
          <option value="IN_PROGRESS">🚧 In Progress</option>
          <option value="DONE">✅ Done</option>
        </select>
      </div>

      <div class="form-group">
        <label>Due Date</label>
        <input v-model="form.dueDate" type="datetime-local" required />
      </div>

      <div class="form-group">
        <label>Assigned To</label>
        <input v-model="form.assignedTo" type="text" />
      </div>

      <div class="form-group">
        <label>Estimated Hours</label>
        <input v-model.number="form.estimatedHours" type="number" min="0" required />
      </div>

      <div class="form-group full-width">
        <label>Tags <small>(separated by commas)</small></label>
        <input
            v-model="form.tags"
            type="text"
            placeholder="ex: devops, automation, github-actions"
        />
        </div>
        
        

      <div class="form-actions full-width">
        <button type="submit">➕ Create Task</button>
      </div>
    </form>
  </div>
</template>



<style scoped>
.form-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.full-width {
  grid-column: 1 / -1;
}

label {
  font-weight: 600;
  margin-bottom: 0.3rem;
}

input,
textarea,
select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
}

button[type="submit"] {
  background-color: #5a4fcf;
  color: white;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

button[type="submit"]:hover {
  background-color: #443abf;
}

.tag-list {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  background-color: #e0e7ff;
  color: #1e3a8a;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
}

.remove-btn {
  background: none;
  border: none;
  color: red;
  font-size: 1rem;
  margin-left: 4px;
  cursor: pointer;
}
</style>
