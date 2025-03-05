<template>
  <div class="flex flex-col space-y-3">
    <div class="button-container">
      <button @click="formatAsJson" class="cyber-button">To JSON</button>
      <button @click="formatAsYaml" class="cyber-button">To YAML</button>
    </div>
    <div
      class="border border-[var(--neon-blue)] bg-black text-[var(--neon-blue)] shadow-sm"
    >
      <div class="h-4 w-full bg-[var(--neon-blue)]"></div>
      <textarea
        v-model="localContent"
        class="cyber-textarea p-3 text-lg"
        placeholder="Paste your JSON or YAML here..."
        @drop.prevent="handleDrop"
        @dragover.prevent
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import yaml from 'js-yaml'
import { ref, watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const localContent = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    localContent.value = newValue
  },
)

watch(localContent, (newValue) => {
  emit('update:modelValue', newValue)
})

const formatOptions = [
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'toml', label: 'TOML' },
]

const formatAsJson = () => {
  try {
    let parsed
    // Try parsing as JSON first
    try {
      parsed = JSON.parse(localContent.value)
    } catch {
      // If JSON parsing fails, try parsing as YAML
      parsed = yaml.load(localContent.value)
    }
    localContent.value = JSON.stringify(parsed, null, 2)
  } catch (error) {
    alert('Invalid JSON or YAML format')
  }
}

const formatAsYaml = () => {
  try {
    let parsed
    try {
      parsed = JSON.parse(localContent.value)
    } catch {
      parsed = yaml.load(localContent.value)
    }
    localContent.value = yaml.dump(parsed, { indent: 2 })
  } catch (error) {
    alert('Invalid JSON or YAML format')
  }
}

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      localContent.value = e.target.result
    }
    reader.readAsText(file)
  }
}
</script>

<style>
.cyber-textarea {
  width: 100%;
  min-height: 400px;
  font-family: 'Courier New', Courier, monospace;
  background-color: rgba(0, 0, 0, 0.9);
  outline: none;
  line-height: 1.5;
  resize: vertical;
  transition: all 0.3s ease;
}

.cyber-textarea:focus {
  outline: none;
  border-color: var(--neon-pink);
  background-color: rgba(255, 255, 255, 0.06);
}

.button-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cyber-button {
  background-color: transparent;
  border: 1px solid var(--neon-pink);
  color: var(--neon-pink);
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 0 5px var(--neon-pink);
}

.cyber-button:hover {
  background-color: var(--neon-pink);
  color: black;
  box-shadow:
    0 0 10px var(--neon-pink),
    0 0 20px var(--neon-pink);
}

@media (max-width: 640px) {
  .cyber-textarea {
    min-height: 300px;
    font-size: 0.875rem;
  }

  .cyber-button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
