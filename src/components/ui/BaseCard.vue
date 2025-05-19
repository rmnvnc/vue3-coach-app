<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
.card {
    border-radius: var(--radius-base);
    box-shadow: var(--shadow-base);
    background-color: var(--color-surface);
    padding: 2rem;
    margin: 2rem auto;
    max-width: 40rem;
}

@media (max-width: 768px) {
    .card {
        border-radius: var(--radius-small);
    }
}

@media (max-width: 768px) {
  .card {
    padding: 1rem;
  }
}
</style>