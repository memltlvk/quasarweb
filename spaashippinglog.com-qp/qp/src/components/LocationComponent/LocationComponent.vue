<template>
  <q-card class="location-card">

    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.041812028454!2d80.28742731409706!3d13.09653669077399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f451754e633%3A0x9f2193c5fbc8ff36!2sDoshi%20Plaza!5e0!3m2!1sen!2sin!4v1661360418271!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style="border: 0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>

  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

import { useQuasar, colors } from "quasar";

export default defineComponent({
  name: "LocationComponent",

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

    const locationCardWidth = ref(
      props.displayArea.width / props.displayArea["font-size"]
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
.location-card {
  background-color: white;

  width: 100%;

  max-width: 62rem;
}

</style>
