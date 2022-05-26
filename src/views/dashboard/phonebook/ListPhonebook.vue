<template>
  <section id="content-wrapper">
    <div class="row mb-3">
      <div class="col-lg-12 d-flex justify-content-between">
        <h4>List Of Phonebook</h4>
        <div>
          <router-link
            type="button"
            class="btn btn-primary me-2"
            to="/dashboard/phonebooks/uploads/excel"
            >Upload Excel</router-link
          >
          <router-link
            type="button"
            class="btn btn-primary me-2"
            to="/dashboard/phonebooks/create"
            >Create New Phonebook</router-link
          >
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body pt-4">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile Number</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="phonebook in phonebooks" :key="phonebook._id">
                    <td>{{ phonebook.name }}</td>
                    <td>{{ phonebook.email }}</td>
                    <td>{{ phonebook.mobile_number }}</td>
                    <td>{{ phonebook.created_at }}</td>
                    <td>{{ phonebook.updated_at }}</td>
                    <td>
                      <router-link
                        class="text-link"
                        :to="'/dashboard/phonebooks/update/' + phonebook._id"
                      >
                        <font-awesome-icon
                          class="me-3"
                          :icon="['fas', 'pen-to-square']"
                        />
                      </router-link>

                      <font-awesome-icon
                        class="me-3"
                        :icon="['fas', 'trash-can']"
                        @click="onDeletePhonebook($event, phonebook._id)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import PhonebookService from "@/services/PhonebookService";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export default {
  name: "ListPhonebook",
  components: {},
  setup() {
    const state = reactive({
      pageNumber: 1,
      pageLimit: 10,
      searchKeyword: "",
      phonebooks: [],
    });

    const phonebookService = new PhonebookService();

    /**
     * Get phonebooks available
     */
    const getPhonebooks = async () => {
      const result = await phonebookService.get(
        state.pageNumber,
        state.pageLimit,
        state.searchKeyword
      );

      state.phonebooks = result.data;
    };

    /**
     * Delete phonebook
     */
    const onDeletePhonebook = (event, id) => {
      Swal.fire({
        title: "Are you sure want to delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          phonebookService.delete(id).then((result) => {
            if (result.success !== true) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            } else {
              getPhonebooks();

              Swal.fire(
                "Deleted!",
                "Phonebook has been successfully deleted.",
                "success"
              );
            }
          });
        }
      });
    };

    onMounted(() => {
      getPhonebooks();
    });

    return {
      ...toRefs(state),
      onDeletePhonebook,
    };
  },
};
</script>
