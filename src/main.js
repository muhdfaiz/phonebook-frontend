import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap";

/* Import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* Import specific icons */
import {
  faAddressBook,
  faBars,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

/* Import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* Add icons to the library */
library.add(faAddressBook, faBars, faTrashCan, faPenToSquare);

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
