<template>
  <q-page class="flex flex-start q-gutter-md">
    <div style="width: 100%; height: 100%; border: 1px solid red">
      <q-img :src="heroImage" class="heroImage" />
    </div>
    <div style="width: 100%; height: 100%; border: 1px solid red">
      <q-card id="mainCard">
        <div class="col-12">
          <div
            id="descriptionText"
            style="
              width: 35%;
              position: absolute;
              top: 1rem;
              left: 1.5rem;
              z-index: 1000;
              font-size: 1.1rem;
            "
            v-html="desctext"
          ></div>

          <div>
            <img :src="shipHome" style="width: 100%"/>
          </div>
        </div>

        <!-- resize observer for the main card -->
        <q-resize-observer @resize="onHomeCardResize" />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import { colors } from "quasar";

import { useQuasar } from "quasar";

export default defineComponent({
  name: "IndexPage",

  components: {},

  setup() {
    const $q = useQuasar();
    const screenWidth = $q.screen.width;
    const browserDefaultFontSize = 16;

    // setting the color from palette
    const { getPaletteColor } = colors;

    const paletteColorAccent = getPaletteColor("accent");
    const paletteColorBrown = getPaletteColor("brown-10");
    const paletteColorWarning = getPaletteColor("warning");

    const homeCardWidth = ref(0);

    let heroImage = ref("/assets/home.png");
    let shipHome = ref("/assets/ship_home.png");

    const desctext =
      '<p>Founders of <span class="cc">Spaa Shippinglog Pvt Ltd</span> have been in the Exim and Logistics Industry for more than 25 years. They have accumulated this experience in their service, making the <span class="cc">Spaa Shippinglog Pvt Ltd</span> a leading service provider in the Exim and Logistics Industry.</p> \
    <p>We have access to a robust infrastructure of good fleet of trucks and yards, supported by a highly motivated, long serving staff. We have acquired full recognition by the Government of India Customs Department.</p> \
    <p>Naturally, <span class="cc">Spaa Shippinglog Pvt Ltd</span> have attracted, served and retained an esteemed clientele. But like every able organisation, we strive to expand without resting on our laurels. We would be delighted to have you as our esteemed partner in this journey. </p> \
    <p>To get a robust, reliable link in your supply chain, please <a style="color: yellow" href="/#/contactus">Contact us</a></p> \
    \
    <style> \
    p { \
      color: white; \
      font-weight: bold; \
      text-shadow: 0.125rem 0.125rem 0.25rem #000000; \
    } \
    .cc { \
      color: ' +
      paletteColorBrown +
      '; \
      background-color: yellow; \
      font-weight: bold; \
    } \
    </style>';

    function onHomeCardResize(size) {
      homeCardWidth.value = size.width / browserDefaultFontSize;

      console.log("\n***************");
      console.log("screen width = ", ($q.screen.width / 16));
      console.log("resized homeCardWidth = ", homeCardWidth.value);
      console.log("***************\n");

      // calculate font size for description text
      let fontSizeValue = (1.1 / 85) * homeCardWidth.value;

      if ($q.screen.width < $q.screen.height) {
        fontSizeValue = (0.53 / 16) * homeCardWidth.value;
      }

      let fontSizeString = fontSizeValue.toString() + "rem";

      // derive the width of the description text
      let widthString = '0%';

      if ($q.screen.width > $q.screen.height) {
        widthString = '35%';
      } else {
        widthString = "80%";
      }

      // console.log("font-size = ", fontSizeString);
      // console.log("width = ", widthString);

      void setDescTextStructure(fontSizeString,widthString);
      void setHeroImage();
      void setShipHome();
    }

    function setDescTextStructure(fontSizeString,widthString) {
      const elems = document.getElementById("descriptionText");

      // console.log("elems = ", elems);

      // set the font size in the description text
      elems.style.setProperty(
        "font-size",
        fontSizeString,
        "important"
      );

      // set the width of the description text
      elems.style.setProperty(
        "width",
        widthString,
        "important"
      );
    }

    function setHeroImage() {
    // set the hero image
      // console.log("Current heroImage = ", heroImage.value);

      if ($q.screen.width > $q.screen.height) {
        heroImage.value = "/assets/home.png";
      } else {
        heroImage.value = "/assets/home1.png";
      }

      // console.log("New heroImage = ", heroImage.value);
    }

    function setShipHome() {
    // set the hero image
      // console.log("Current shipHome = ", shipHome.value);

      if ($q.screen.width > $q.screen.height) {
        shipHome.value = "/assets/ship_home.png";
      } else {
        shipHome.value = "/assets/ship_home1.png";
      }

      // console.log("New shipHome = ", shipHome.value);
    }

    return {
      desctext,
      heroImage,
      shipHome,
      onHomeCardResize
    }
  },
});
</script>

<style lang="scss" scoped>
.heroImage {
  width: 100%;
}
</style>
