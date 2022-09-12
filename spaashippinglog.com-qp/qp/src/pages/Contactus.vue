<template>
  <q-page class="flex flex-center">
    <div class="display-area">

      <div class="persons-column">
        <div
          v-for="person in persons"
          :key="person.no"
          class="persons-column-item"
        >
          <person-card-component
            :person="person"
            :displayArea="displayArea"
          >
          </person-card-component>
        </div>
      </div>

      <div class="location-column">
        <location-component>

        </location-component>
      </div>

      <div class="feedback-column">
        <div class="feedback-column-item">
          <feedback-form-component>
          </feedback-form-component>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

import { useQuasar, colors } from "quasar";

import PersonCardComponent from "../components/PersonCardComponent/PersonCardComponent.vue";
import FeedbackFormComponent from "../components/FeedbackFormComponent/FeedbackFormComponent.vue";
import LocationComponent from "../components/LocationComponent/LocationComponent.vue";

export default defineComponent({
  name: "ContactUsPage",

  components: {
    PersonCardComponent,
    FeedbackFormComponent,
    LocationComponent,
  },

  setup() {
    const $q = useQuasar();

    const viewport = {
      width: $q.screen.width,
      height: $q.screen.height,
      "font-size": 16, // TODO: query and set
    };

    const displayArea = ref({
      width: $q.screen.width,
      height: $q.screen.height,
      "font-size": 16, // TODO: query and set
    });

    // console.log("displayArea set to =", displayArea.value);

    const persons = [
      {
        no: 1,
        image: "../assets/photo_placeholder.jpg",
        title: "Operations Manager",
        name: "V.Madhavan",
        phone: "+91 8925021222",
        email: "madhavanv@spaashippinglog.com",
      },
    ];

    return {
      persons,
      displayArea,
    };
  },
});
</script>

<style lang="scss" scoped>
@font-face {
  font-family: BarlowCondensed;
  src: url("../css/fonts/BarlowCondensed-Medium.ttf") format("truetype");
}

$accentbg: radial-gradient(circle, lighten($accent, 5%) 0%, $accent 100%);

.bordered {
  border: 1px solid red;
}

.display-area {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: center;
  align-content: center;

  justify-items: center;
  align-items: center;

  width: 100%;
  height: auto;

  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;

  row-gap: 1rem;
  column-gap: 1rem;
}

.persons-column {
  flex: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: center;
  align-content: center;

  justify-items: center;
  align-items: center;

  min-width: 14rem;

  row-gap: 1rem;
  column-gap: 1rem;
}

.persons-column-item {
  flex: 100%;
}

.location-column {
  flex: 100%;

  min-width: 14rem;

  width: 100%;
  height: 100%;
}

.feedback-column {
  flex: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  justify-content: center;
  align-items: center;

  column-gap: 1rem;

  min-width: 14rem;
  max-width: 62rem;
}

.feedback-column-item {
  flex: 100%;
}

@media only screen and (min-width: 32rem) {
  .persons-column {
    flex: 48%;
  }
  .persons-column-item {
    flex: 100%;
  }

  .location-column {
    flex: 48%;
  }

  .feedback-column {
    flex: 100%;
  }

  .feedback-column-item {
    flex: 100%;
  }
}

@media only screen and (min-width: 64rem) {
  .persons-column {
    flex: 49%;
  }
  .persons-column-item {
    flex: 100%;
  }

  .location-column {
    flex: 49%;
  }

  .feedback-column {
    flex: 100%;
  }

  .feedback-column-item {
    flex: 100%;
  }
}
</style>
