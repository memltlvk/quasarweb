<template>
  <q-card id="mainCard" class="persons-card">
    <div class="person-card-section">

      <div class="person-image-div">
          <q-img :src="person.image" class="person-image" />
      </div>

      <div class="info-div">
        <div class="person-info-div">
          <div class="person-name">{{ person.name }}</div>

          <div class="separator">
            <q-separator color="accent" />
          </div>

          <div class="person-title">
            <span class="icon-style">
              <q-icon name="assignment_ind" />
            </span>
            {{ person.title }}
          </div>
        </div>

        <div class="person-contact-div">
          <div class="phone-div">
            <span class="icon-style">
              <q-icon name="call" />
            </span>
            {{ person.phone }}
          </div>

          <div class="email-div">
            <span class="icon-style">
              <q-icon name="email" />
            </span>
            {{ person.email }}
          </div>
        </div>
      </div>

      <div class="email-div-full-span">
        <span class="icon-style">
          <q-icon name="email" />
        </span>
        &nbsp;{{ person.email }}
      </div>
    </div>

    <!-- resize observer for the persons card -->
    <q-resize-observer @resize="onCardResize" />
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

import { useQuasar, colors } from "quasar";

import { functionExec } from "./functions.js";

import _ from "lodash";

import cssData from "./css/cssStructure.json";

export default defineComponent({
  name: "PersonCardComponent",

  props: {
    person: {
      type: Object,
      default() {
        return {
          no: 1,
          image: "",
          title: "",
          name: "",
          phone: "",
          email: "",
        };
      },
    },
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

    const cardWidth = ref(
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

    function onCardResize(size) {
      cardWidth.value = size.width / props.displayArea["font-size"];

      // console.log("\n---------------");
      // console.log("screen width = ", ($q.screen.width / 16));
      // console.log("resized cardWidth =", cardWidth.value);
      // console.log("---------------\n");

      // console.log("cssData =", cssData);

      void documentUpdateDim(cardWidth.value);
    }

    function documentUpdateDim(baseParameter) {
      // update the document with the current cssData variables

      // loop through the datasets and select the correct dataset
      for (let i = 0; i < cssData.datasets.length; ++i) {
        let currentItem = cssData.datasets[i];

        if ((baseParameter >= currentItem.minBaseParameterValue) &&
            (baseParameter <= currentItem.maxBaseParameterValue)) {
          // dataset found
          // console.log("found dataset =", currentItem.name);

          // loop through the vars
          currentItem.vars.forEach(function(varval) {
            // console.log("varval =",varval);

            // call the function to find the current value
            let CurrentCssClass = cssData["cssVariables"][varval.var]["cssClass"];
            let currentValue = functionExec(varval.fname,varval.fparams,baseParameter);

            // set the current value into to css variable in the document
            const elems = document.getElementsByClassName(CurrentCssClass);

            // console.log("cssClass =", CurrentCssClass);
            // console.log("--"+ varval.var," = ",currentValue);

            for (let i = 0; i < elems.length; i++) {
              elems[i].style.setProperty(
                "--" + varval.var,
                currentValue,
                "important"
              );
            }
          })
          break;
        }
      }
    }

    onMounted(() => {
      // void documentUpdateDim(cardWidth.value);
    });

    return {
      onCardResize,
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

/* ***** Variables Declaration Start ***** */

        .persons-card {
          --backgroundImageFile: url("/assets/personal-card.png");
        }
        .person-card-section {
          --normalFontSize: 0.7rem;
          --cardTopPadding: 2.5rem;
          --cardBottomPadding: 2.5rem;
          --cardLeftPadding: 1rem;
          --cardRightPadding: 1rem;
          }

        .person-image-div {
          --imageDivWidth: 6rem;
          --personImageDivFlexValue: 100%;
          }

        .person-image {
          --imageWidth: 4.5rem;
          }

        .info-div {
          --infoDivFlexValue: 100%;
        }

        .person-info-div {
          --infodivTopMargin: 1.3rem;
          --infodivBottomMargin: 0.7rem;
          }

        .person-contact-div {
          --personContactDivPaddingLeft: 0rem;
        }

        .person-name {
          --personNameFontSize: 1rem;
          }

        .separator {
          --separatorMarginTop: 0rem;
          --separatorMarginBottom: 0rem;
          }

        .icon-style {
          --iconFontSize: 1.2rem;
          }

        .phone-div {
          --phonedivBottomMargin: 0rem;
          }

        .email-div{
          --emailDivDisplayValue: flex;
        }

        .email-div-full-span {
          --emailDivFullSpanDisplayValue: none;
        }

/* ***** Variables Declaration End ***** */

/* ***** Default Settings Start ***** */
.persons-card {
  background-image: url("/assets/personal-card.png");
  background-size: cover;

  width: 100%;

  max-width: 30rem;
  min-width: 14rem;

  padding-left: 1rem;
  padding-right: 1rem;
}

.person-card-section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: center;
  align-content: center;

  justify-items: center;
  align-items: center;

  text-align: center;
  font-weight: bold;
  color: $accent;

  row-gap: 1rem;
  column-gap: 1rem;
}

.person-image-div {
  z-index: 3;

  flex: 100%;

  align-self: center;
  justify-self: center;

  width: 4.5rem;
}

.person-image {
  z-index: 4;

  flex: 100%;

  width: 4.5rem;
}

.info-div {
  flex: 100%;
}

.person-info-div {
  flex: 100%;
  z-index: 1;
}

.person-name {
  font-weight: bold;
}

.person-title {
  font-weight: bold;
}

.person-contact-div {
  flex: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  padding-left: 0rem;
}

// .icon-style {
// }

.phone-div {
  flex: 100%;
}

.email-div {
  display: flex;

  flex: 100%;

  justify-content: center;
  align-items: center;

  text-align: center;

  hyphens: auto;
}

.email-div-full-span {
  display: none;

  flex: 100%;

  justify-content: center;
  align-items: center;
}

/* ***** Default Settings End ***** */

/* ***** Variables Application Start ***** */

        .persons-card {
          background-image: var(--backgroundImageFile);
          }

        .person-card-section {
          font-size: var(--normalFontSize);
          padding-top: var(--cardTopPadding);
          padding-bottom: var(--cardBottomPadding);
          padding-left: var(--cardLeftPadding);
          padding-right: var(--cardRightPadding);
          }

        .person-image-div {
          width: var(--imageDivWidth);
          flex: var(--personImageDivFlexValue);
          }

        .person-image {
          width: var(--imageWidth);
          }

        .info-div {
          flex: var(--infoDivFlexValue);
          }

        .person-info-div {
          margin-top: var(--infodivTopMargin);
          margin-bottom: var(--infodivBottomMargin);
          }

        .person-contact-div {
          padding-left: var(--personContactDivPaddingLeft);
          }

        .person-name {
          font-size: var(--personNameFontSize);
          }

        .separator {
          margin-top: var(--separatorMarginTop);
          margin-bottom: var(--separatorMarginBottom);
          }

        .icon-style {
          font-size: var(--iconFontSize);
          }

        .phone-div {
          margin-bottom: var(--phonedivBottomMargin);
          }

        .email-div {
          display: var(--emailDivDisplayValue);
        }

        .email-div-full-span {
          display: var(--emailDivFullSpanDisplayValue);
        }

/* ***** Variables Application End ***** */

</style>
