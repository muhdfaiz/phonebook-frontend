<template>
  <section id="content-wrapper">
    <div class="row mb-3">
      <div class="col-lg-12">
        <h4>Create New Phonebook</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body pt-4">
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
                    @click="onCreateNewPhonebook"
                  >
                    Create
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
import { computed, reactive, toRefs } from "vue";
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
import PhonebookService from "../../../services/PhonebookService";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useRouter } from "vue-router";

export default {
  name: "CreatePhonebook",
  setup() {
    const state = reactive({
      name: "",
      email: "",
      mobileNumber: "",
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

    const router = useRouter();
    const v$ = useVuelidate(rules, state);

    const phonebookService = new PhonebookService();

    /**
     * Create new phonebook
     */
    const onCreateNewPhonebook = () => {
      v$.value.$validate();

      let error = v$.value.$error ? true : false;

      if (error) {
        return;
      }

      phonebookService
        .create(state.name, state.email, state.mobileNumber)
        .then((result) => {
          if (result.status !== 200) {
            if (result.response !== undefined) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          } else {
            Swal.fire(
              "Success!",
              "Your phonebook successfully created.",
              "success"
            ).then(function () {
              router.push("/dashboard/phonebooks");
            });
          }
        });
    };

    return {
      v$,
      ...toRefs(state),
      displayVuelidateError,
      onCreateNewPhonebook,
    };
  },
};
</script>
