<template>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
        <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog :show="!isLoading && sent" title="Sent" @close="handleSent">
        <p>Sent successfully</p>
    </base-dialog>
    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="email">Your E-Mail</label>
            <input type="email" id="email" v-model.trim="email">
        </div>
        <div class="form-control">
            <label for="message">Message</label>
            <textarea id="message" rows="5" v-model.trim="message"></textarea>
        </div>
        <p class="errors" v-if="!formIsValid">Please enter a valid email and non-empty message</p>
        <div class="actions">
            <base-button>Send Message</base-button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRequestsStore } from '@/stores/requests'

const email = ref('')
const message = ref('')
const formIsValid = ref(true)
const isLoading = ref(false)
const error = ref(null)
const sent = ref(false)

const route = useRoute()
const router = useRouter()
const requestsStore = useRequestsStore()

async function submitForm() {
    formIsValid.value = true
    isLoading.value = true

    if (
        email.value.trim() === '' ||
        !email.value.includes('@') ||
        message.value.trim() === ''
    ) {
        formIsValid.value = false
        isLoading.value = false
        return
    }

    try {
        await requestsStore.contactCoach({
            email: email.value,
            message: message.value,
            coachId: route.params.id
        })

        email.value = '',
        message.value = '',
        sent.value = true
    } catch (err) {
        error.value = err.message || 'Failed to send request'
    } finally {
        isLoading.value = false
    }
}

function handleError() {
    error.value = null
}

function handleSent() {
    sent.value = false
}
</script>

<style scoped>
form {
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>