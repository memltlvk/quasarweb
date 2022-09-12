<template>
  <q-card class="feedback-card">

      <q-form @submit="onSubmit" @reset="onReset">
        <div class="feedback-form">
          <div class="feedback-form-item-header text-h6">
            <q-card class="q-px-md q-mb-md bg-brown-10 text-white">Feedback</q-card>
          </div>

          <q-input
            class="feedback-form-item q-mb-md"
            filled
            v-model="enquiry.name"
            label="Name"
            hint="Name and surname"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            class="feedback-form-item q-mb-md"
            filled
            v-model="enquiry.address"
            label="Address"
            hint="Address"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            class="feedback-form-item q-mb-md"
            filled
            v-model="enquiry.city"
            label="City"
            hint="City"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            class="feedback-form-item q-mb-md"
            filled
            v-model="enquiry.state"
            label="State"
            hint="State"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            class="feedback-form-item q-mb-md"
            filled
            type="number"
            v-model="enquiry.pincode"
            label="Pincode"
            hint="Pincode"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Please type the Pincode',
              (val) =>
                (val > 100000 && val < 999999) ||
                'Please type 6 digit Pincode',
            ]"
          />

          <q-input
            class="feedback-form-item q-mb-md"
            filled
            v-model="enquiry.country"
            label="Country"
            hint="Country"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            class="feedback-form-item q-mb-md"
            filled
            v-model="enquiry.email"
            label="Email"
            hint="Email"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            class="feedback-form-item q-mb-md"
            filled
            type="number"
            v-model="enquiry.phone"
            label="Phone"
            hint="Phone"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Please type the Phone Number',
              (val) =>
                (val > 1000000000 && val < 9999999999) ||
                'Please type 10 digit Phone number',
            ]"
          />

          <div class="feedback-form-item-footer">
            <q-btn
              push
              label="Submit"
              type="submit"
              color="brown-10"
            />
            <q-btn
              push
              label="Reset"
              type="reset"
              color="negative"
              class="q-ml-sm"
            />
          </div>
        </div>
      </q-form>

    <!-- resize observer for the persons card -->
    <q-resize-observer @resize="onFeedbackCardResize" />
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

import { useQuasar, colors } from "quasar";

// import { functionExec } from "./functions.js";

import _ from "lodash";

// import cssData from "./css/cssStructure.json";

export default defineComponent({
  name: "FeedbackFormComponent",

  props: {
    colors: {
      type: Object,
      default() {
        return {
          bg: "",
          infobg: "",
          infotext: "",
          contactbg: "",
          contacttext: "",
        };
      },
    },
    displayArea: {
      type: Object,
      default() {
        return {
          width: 256,
          height: 256,
          "font-size": 16,
        };
      },
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const $q = useQuasar();

    const feedbackCardWidth = ref(
      props.displayArea.width / props.displayArea["font-size"]
    );

    const enquiry = ref(
      {
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        phone: "",
        email: "",
      },
    );

    function isValid(val) {
      if (typeof val === "undefined") {
        return false;
      } else if (val === null) {
        return false;
      } else {
        return true;
      }
    }

    function onFeedbackCardResize(size) {
      feedbackCardWidth.value = size.width / props.displayArea["font-size"];

      console.log("screen width = ", ($q.screen.width / 16));
      console.log("resized formWidth = ", feedbackCardWidth.value);

      // void documentUpdateDim(feedbackCardWidth.value);
    }

    function documentUpdateDim(baseParameter) {
      // update the document with the current cssData variables

      console.log("Document Update!");
    }

    function onSubmit() {
      console.log("enquiry = ", enquiry.value);
    }

    function onReset() {
      enquiry.value = {
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        phone: "",
        email: "",
      };
    }

    onMounted(() => {
      // void documentUpdateDim(cardWidth.value);
    });

    return {
      enquiry,
      onSubmit,
      onReset,
      onFeedbackCardResize,
      documentUpdateDim,
    };
  }
});
</script>

<style scoped lang="scss">
@font-face {
  font-family: BarlowCondensed;
  src: url("../../css/fonts/BarlowCondensed-Medium.ttf") format("truetype");
}

$accentbg: radial-gradient(circle, lighten($accent, 5%) 0%, $accent 100%);

.bordered {
  border: 1px solid red;
}

// **********

/* ***** Default Settings Start ***** */
.feedback-card {
  background-color: white;

  width: 100%;

  padding: 1rem;

  max-width: 62rem;
}
.feedback-form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: 100%;

  min-width: 14rem;
  max-width: 62rem;

  row-gap: 1rem;
  column-gap: 1rem;
}

.feedback-form-item {
  flex: 100%;
}

.feedback-form-item-header {
  flex: 100%;
}

.feedback-form-item-footer {
  flex: 100%;
}

/* ***** Default Settings End ***** */

@media only screen and (min-width: 32rem) {
  .feedback-form-item {
    flex: 40%;
  }

  .feedback-form-item-header {
    flex: 100%;
  }

  .feedback-form-item-footer {
    flex: 100%;
  }
}

</style>
