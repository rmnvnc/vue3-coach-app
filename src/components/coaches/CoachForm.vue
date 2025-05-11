<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid: !firstName.isValid}">
            <label for="firstname">Firstname</label>
            <p v-if="!firstName.isValid">First name must not be empty</p>
            <input type="text" id="firstname" v-model.trim="firstName.val" @blur="clearValidity('firstName')">
        </div>
        <div class="form-control" :class="{invalid: !lastName.isValid}">
            <label for="lasttname">Lastname</label>
            <p v-if="!lastName.isValid">Last name must not be empty</p>
            <input type="text" id="lasttname" v-model.trim="lastName.val" @blur="clearValidity('lastName')">
        </div>
        <div class="form-control" :class="{invalid: !description.isValid}">
            <label for="desctiprion">Description</label>
            <p v-if="!description.isValid">Description must not be empty</p>
            <textarea id="desctiprion" rows="5" v-model.trim="description.val" @blur="clearValidity('description')"></textarea>
        </div>
        <div class="form-control" :class="{invalid: !areas.isValid}">
            <h3>Areas of expertice</h3>
            <p v-if="!areas.isValid">Areas must not be empty</p>
            <div>
                <input type="checkbox" id="frontend" value="frontend" v-model="areas.val" @blur="clearValidity('areas')">
                <label for="frontend">Frontend Development</label>
            </div>
            <div>
                <input type="checkbox" id="backend" value="backend" v-model="areas.val" @blur="clearValidity('areas')">
                <label for="backend">Backend Development</label>
            </div>
            <div>
                <input type="checkbox" id="career" value="career" v-model="areas.val" @blur="clearValidity('areas')">
                <label for="career">Career Advisory</label>
            </div>
        </div>
        <div class="form-control" :class="{invalid: !rate.isValid}">
            <label for="rate">Hourly rate</label>
            <p v-if="!rate.isValid">Areas must not be empty</p>
            <input type="number" id="rate" v-model.number="rate.val" @blur="clearValidity('rate')">
        </div>
        <p v-if="!formIsValid">Please fix the above erros and submit again.</p>
        <base-button>Register</base-button>
    </form>
</template>

<script setup>
    import { reactive, ref } from 'vue'

    const emit = defineEmits(['save-data'])

    const firstName = reactive({ val: '', isValid: true })
    const lastName = reactive({ val: '', isValid: true })
    const description = reactive({ val: '', isValid: true })
    const rate = reactive({ val: null, isValid: true })
    const areas = reactive({ val: [], isValid: true })

    const formIsValid = ref(true)

    function clearValidity(input) {
        switch (input) {
            case 'firstName':
                firstName.isValid = true
            break
            case 'lastName':
                lastName.isValid = true
            break
            case 'description':
                description.isValid = true
            break
            case 'rate':
                rate.isValid = true
            break
            case 'areas':
                areas.isValid = true
            break
        }
    }

    function validateForm() {
        formIsValid.value = true

        if (firstName.val === '') {
            firstName.isValid = false
            formIsValid.value = false
        }
        if (lastName.val === '') {
            lastName.isValid = false
            formIsValid.value = false
        }
        if (description.val === '') {
            description.isValid = false
            formIsValid.value = false
        }
        if (!rate.val || rate.val < 0) {
            rate.isValid = false
            formIsValid.value = false
        }
        if (areas.val.length === 0) {
            areas.isValid = false
            formIsValid.value = false
        }
    }

    function submitForm() {
        validateForm()

        if (!formIsValid.value) return

        const formData = {
            first: firstName.val,
            last: lastName.val,
            desc: description.val,
            rate: rate.val,
            areas: areas.val
        }

        emit('save-data', formData)
    }
</script>

<style  scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label,
.invalid h3,
.invalid p {
  color: red;
}

.invalid p {
    margin-block: .25rem;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>