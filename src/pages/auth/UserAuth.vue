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

<script>

export default{
    data() {
        return {
            email: {
                val: '',
                isValid: true
            },
            password: {
                val: '',
                isValid: true
            },
            formIsValid: true,
            mode: 'login',
            isLoading: false,
            error: null
        };
    },
    computed: {
        submitButtonCaption() {
            if (this.mode === 'login') {
                return 'Login';
            } else {
                return 'Signup';
            }
        },
        switchModeButtonCaption() {
            if (this.mode === 'login') {
                return 'Signup instead';
            } else {
                return 'Login instead';
            }
        }
    },
    methods: {
        clearValidity(input) {
            this[input].isValid = true
        },
        validateForm() {
            this.formIsValid = true;
            if (this.email.val === '' && !this.email.val.includes('@') ) {
                this.email.isValid = false;
                this.formIsValid = false;
            }
            if (this.password.val === '' || this.password.val.length < 6) {
                this.password.isValid = false;
                this.formIsValid = false;
            }
        },
        async submitForm() {
            this.validateForm();

            if (!this.formIsValid) {
                return;
            }
            
            this.isLoading = true;

            try {
                if (this.mode === 'login') {
                    // ...
                } else {
                    await this.$store.dispatch('signup', {
                        email: this.email.val,
                        password: this.password.val
                    });
                }
            } catch (err) {
                this.error = err.message || 'Failed to authenticate, try later';
            }


            this.isLoading = false;
        },
        switchAuthMode() {
            if (this.mode === 'login') {
                this.mode = 'signup';
            } else {
                this.mode = 'login';
            }
        },
        handleError() {
            this.error = null;
        }
        
    }
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