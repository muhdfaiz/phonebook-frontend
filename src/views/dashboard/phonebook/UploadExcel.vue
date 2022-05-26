<template>
  <section id="content-wrapper">
    <div class="row mb-3">
      <div class="col-lg-12">
        <h4>Upload Phonebook From Excel</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body pt-4">
            <form>
              <div class="mb-4 row">
                <label for="name" class="col-2 col-form-label">File</label>
                <div class="col-md-6 col-lg-5">
                  <input
                    id="file"
                    ref="file"
                    name="file"
                    type="file"
                    class="form-control"
                  />
                  <div id="emailHelp" class="form-text">
                    Refer the sample file
                    <a href="/PhoneBooks.xlsx">here</a>. Maximum file size is
                    5MB.
                  </div>
                  <div v-if="error" class="error">
                    {{ error }}
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
                    @click="onUploadExcel"
                  >
                    Upload
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
import { ref, reactive, toRefs } from "vue";
import PhonebookService from "../../../services/PhonebookService";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useRouter } from "vue-router";

export default {
  name: "CreatePhonebook",
  setup() {
    const file = ref(null);

    const state = reactive({
      error: "",
    });

    const router = useRouter();
    const phonebookService = new PhonebookService();

    /**
     * Import phonebook from excel file
     */
    const onUploadExcel = () => {
      const files = file.value.files;

      // Validate file has been select or not.
      if (files.length <= 0) {
        state.error = "File is required";
        return;
      }

      // Validate file type
      if (
        files[0].type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        state.error = "The file you want to upload must be an excel file";
        return;
      }

      // Validate filesize
      if (files[0].size > 5000000) {
        state.error = "Please upload file less than 5MB";
        return;
      }

      phonebookService.upload(files[0]).then((result) => {
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
            "Successfully import phonebooks from excel file.",
            "success"
          ).then(function () {
            router.push("/dashboard/phonebooks");
          });
        }
      });
    };

    return {
      ...toRefs(state),
      file,
      onUploadExcel,
    };
  },
};
</script>
