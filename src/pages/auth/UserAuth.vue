<template>
    <div>
        <base-dialog :show="!!error" title="An error occured" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-dialog :show="isLoading" title="Authenticating..." fixed>
            <base-spinner></base-spinner>
        </base-dialog>
        <base-card>
            <form @submit.prevent="submitForm">
                <div class="form-control" :class="{invalid: !email.isValid}">
                    <label for="email">E-mail</label>
                    <p v-if="!email.isValid">Please enter a valid email.</p>
                    <input type="email" id="email" v-model.trim="email.val" @blur="clearValidity('email')">
                </div>
                <div class="form-control" :class="{invalid: !password.isValid}">
                    <label for="password">Password</label>
                    <p v-if="!password.isValid">Password must be at least 6 characters long.</p>
                    <input type="password" id="password" v-model.trim="password.val" @blur="clearValidity('password')">
                </div>
                <base-button>{{submitButtonCaption}}</base-button>
                <base-button type="button" @click="switchAuthMode" mode="flat">{{switchModeButtonCaption}}</base-button>

            </form>
        </base-card>
    </div>
</template>

<script setup> 
    import {reactive, ref, computed} from 'vue';
    import { useAuthStore } from '@/stores/auth';
    import { useRouter, useRoute } from 'vue-router'

    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const email = reactive({
        val: '',
        isValid: true
    })
    const password = reactive({
        val: '',
        isValid: true
    })
    const formIsValid = ref(true)
    const mode = ref('login')
    const isLoading = ref(false)
    const error = ref(null)

    const submitButtonCaption = computed(() => {
        if (mode.value === 'login') {
            return 'Login';
        } else {
            return 'Signup';
        }
    })

    const switchModeButtonCaption = computed (() => {
        if (mode.value === 'login') {
            return 'Signup instead';
        } else {
            return 'Login instead';
        }
    })

    function clearValidity(input) {
        [input].isValid = true;
    }

    function validateForm() {
        formIsValid.value = true;
        if (email.val === '' && !email.val.includes('@') ) {
            email.isValid = false;
            formIsValid.value = false;
        }
        if (password.val === '' || password.val.length < 6) {
            password.isValid = false;
            formIsValid.value = false;
        }
    }

    function switchAuthMode() {
        if (mode.value === 'login') {
            mode.value = 'signup';
        } else {
            mode.value = 'login';
        }
     }
    function handleError() {
        error.value = null;
    }

    const submitForm = async () => {
        validateForm();

        if (!formIsValid.value) {
            return;
        }
        
        isLoading.value = true;

        const actionPayload = {
            email: email.val,
            password: password.val
        };

        try {
            if (mode.value === 'login') {
                await auth.login(actionPayload);
               
            } else {
                await auth.signup(actionPayload);
            }
            const redirectURl = '/' + (route.query.redirect || 'coaches');
            router.replace(redirectURl)
        } catch (err) {
            error.value = err.message || 'Failed to authenticate, try later';
        }
        isLoading.value = false;
    }
</script>

<style scoped>
form {
    margin: 1rem;
}

.form-control {
  margin-bottom: 1rem;
}

.form-control p {
    margin-block: .25rem;
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

.invalid p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>