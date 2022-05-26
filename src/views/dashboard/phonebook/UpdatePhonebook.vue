<template>
  <section id="content-wrapper">
    <div class="row mb-3">
      <div class="col-lg-12">
        <h4>Update Phonebook</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body pt-4">
            <alert-component
              v-if="alertMessage"
              :type="alertType"
              :message="alertMessage"
              @close="onAlertMessageClose"
            ></alert-component>

            <form>
              <div class="mb-4 row">
                <label for="name" class="col-2 col-form-label">Name</label>
                <div class="col-md-6 col-lg-5">
                  <input
                    id="name"
                    v-model="name"
                    name="name"
                    type="text"
                    class="form-control"
                  />
                  <div v-if="v$.name.$error" class="error mt-2">
                    {{ displayVuelidateError(v$.name.$errors, "Name") }}
                  </div>
                </div>
              </div>

              <div class="mb-4 row">
                <label for="email" class="col-2 col-form-label">Email</label>
                <div class="col-md-6 col-lg-5">
                  <input
                    id="email"
                    v-model="email"
                    name="email"
                    type="email"
                    class="form-control"
                  />
                  <div v-if="v$.email.$error" class="error mt-2">
                    {{ displayVuelidateError(v$.email.$errors, "Email") }}
                  </div>
                </div>
              </div>

              <div class="row mb-4">
                <label for="inputPassword" class="col-2 col-form-label"
                  >Mobile Number</label
                >
                <div class="col-md-6 col-lg-5">
                  <input
                    id="mobile_number"
                    v-model="mobileNumber"
                    name="mobile_number"
                    type="text"
                    class="form-control"
                  />
                  <div v-if="v$.mobileNumber.$error" class="error mt-2">
                    {{
                      displayVuelidateError(
                        v$.mobileNumber.$errors,
                        "Mobile number"
                      )
                    }}
                  </div>
                </div>
              </div>
              <div class="row mt-3 mb-2">
                <div class="col-md-6 col-lg-7 text-end">
                  <router-link
                    type="button"
                    class="btn btn-secondary me-2"
                    to="/dashboard/phonebooks"
                    >Go Back</router-link
                  >
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="onUpdatePhonebook"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, computed, reactive, toRefs } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  numeric,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import { displayVuelidateError } from "../../../helper/helper";
import AlertComponent from "../../../components/Alert.vue";
import PhonebookService from "../../../services/PhonebookService";
import { useRoute } from "vue-router";

export default {
  name: "UpdatePhonebook",
  components: {
    AlertComponent,
  },
  setup() {
    const state = reactive({
      name: "",
      email: "",
      mobileNumber: "",
      alertType: "",
      alertMessage: "",
    });

    const rules = computed(() => ({
      name: { required },
      email: { required, email },
      mobileNumber: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(12),
        containsValidMobileNumber: helpers.withMessage(
          () => `Mobile number is invalid`,
          (value) => /^(01)[0-46-9]*[0-9]{7,8}$/.test(value)
        ),
      },
    }));

    const route = useRoute();
    const id = route.params.id;
    const v$ = useVuelidate(rules, state);

    const phonebookService = new PhonebookService();

    /**
     * Clear alert message when the alert close.
     */
    const onAlertMessageClose = () => {
      state.alertType = "";
      state.alertMessage = "";
    };

    /**
     * Get phonebook by ID
     */
    const getPhonebook = async () => {
      const result = await phonebookService.find(id);

      state.name = result.data.name;
      state.email = result.data.email;
      state.mobileNumber = result.data.mobile_number;
    };

    /**
     * Update existing phonebook
     */
    const onUpdatePhonebook = () => {
      v$.value.$validate();

      let error = v$.value.$error ? true : false;

      if (error) {
        return;
      }

      phonebookService
        .update(id, state.name, state.email, state.mobileNumber)
        .then((result) => {
          if (result.status !== 200) {
            if (result.response !== undefined) {
              state.alertType = "danger";
              state.alertMessage = result.response.data.error;
            }
          } else {
            state.alertType = "success";
            state.alertMessage = "Successfully updated phonebook";
          }
        });
    };

    onMounted(() => {
      getPhonebook();
    });

    return {
      v$,
      ...toRefs(state),
      displayVuelidateError,
      onAlertMessageClose,
      onUpdatePhonebook,
    };
  },
};
</script>
