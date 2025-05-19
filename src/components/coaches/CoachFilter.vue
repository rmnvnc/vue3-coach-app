<template>
    <base-card>
        <h2>Find your coach</h2>
        <span class="filter-option">
            <input type="checkbox" id="frontend" checked @change="setFilter"/>
            <label for="frontend">Frontend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="backend" checked @change="setFilter"/>
            <label for="backend">Backend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="career" checked @change="setFilter"/>
            <label for="career">Career</label>
        </span>
    </base-card>
</template>

<script setup>
    import { reactive } from 'vue'

    const emit = defineEmits(['change-filter'])

    const filters = reactive({
    frontend: true,
    backend: true,
    career: true
    })

    function setFilter(event) {
        const inputId = event.target.id
        const isActive = event.target.checked

        filters[inputId] = isActive

        emit('change-filter', { ...filters })
    }
</script>

<style scoped>
h2 {
  margin: 0.5rem 0 1rem 0;
}

.filter-option {
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
  gap: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}

.filter-option input[type="checkbox"] {
  appearance: none;
  width: 1.1rem;
  height: 1.1rem;
  border: 2px solid var(--color-primary);
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}

.filter-option input[type="checkbox"]:checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.filter-option input[type="checkbox"]::after {
  content: "";
  position: absolute;
  top: 1px;
  left: 4px;
  width: 4px;
  height: 8px;
  border: solid var(--color-inverted-text);
  border-width: 0 2px 2px 0;
  opacity: 0;
  transform: rotate(45deg) scale(0.8);
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.filter-option input[type="checkbox"]:checked::after {
  opacity: 1;
  transform: rotate(45deg) scale(1);
}

.filter-option label {
  user-select: none;
  cursor: pointer;
}

</style>