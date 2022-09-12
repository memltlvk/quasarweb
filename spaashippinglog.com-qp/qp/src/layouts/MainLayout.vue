<template>
  <div style="background-image: url('/assets/logistics_bg.jpg')">
    <q-layout view="hhh lpr fff">
      <q-header elevated class="bg-accent">
        <q-toolbar class="top-toolbar">
          <q-btn
            class="text-white"
            dense
            flat
            round
            icon="menu"
            @click="toggleLeftDrawer"
          />

          <q-toolbar-title>
            <div style="height: 4.3rem">
              <img
                src="../assets/spaa-logo.png"
                style="padding-top: 0.5rem; padding-bottom: 1rem; height: 100%"
              />
            </div>
          </q-toolbar-title>

          <div class="q-gutter-sm">
            <q-btn
              v-for="navlink in navlinks"
              :key="navlink.no"
              class="text-brown-10 tp-menu"
              :icon="navlink.icon"
              :label="navlink.label"
              stack
              glossy
              color="white"
              size="sm"
              :to="navlink.link"
            />
          </div>

          <div style="width: 10px">&nbsp;</div>

          <q-btn
            class="text-white"
            dense
            flat
            round
            icon="menu"
            @click="toggleRightDrawer"
          />
        </q-toolbar>
      </q-header>

      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" :width="250">
        <!-- drawer content -->

        <div class="side-drawer" style="height: 100%">
          <q-list>
            <q-item
              v-for="navlink in navlinks"
              :key="navlink.no"
              active-class="tab-active text-white shadow-1 rounded-borders"
              :to="navlink.link"
              exact
              class="q-ma-md inactive text-grey-9"
              clickable
              v-ripple
            >
              <q-item-section>
                <div>
                  <q-icon
                    :name="navlink.icon"
                    style="font-size: 2em"
                  />&nbsp;&nbsp;&nbsp;{{ navlink.label }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-drawer>

      <q-drawer
        show-if-above
        v-model="rightDrawerOpen"
        side="right"
        :width="250"
      >
        <!-- drawer content -->

        <div class="side-drawer" style="height: 100%">
          <q-card class="q-ma-md right-panel">

            <div class="col q-mx-md q-pt-md">
              <q-card class="bg-white">
                <img
                  src="../assets/spaa-logo.png"
                />
              </q-card>
            </div>

            <div class="q-px-md q-py-sm">
              <div class="q-pb-xs text-h6 text-white" v-html="cname"></div>
              <q-separator dark />
              <div class="q-py-xs text-caption fb" v-html="address"></div>
              <q-separator dark />
              <div class="q-pt-xs text-caption fb" v-html="tel"></div>
            </div>

          </q-card>

          <q-card class="q-ma-md q-pa-sm right-panel">

            <div>
              <location-component>

              </location-component>
            </div>

          </q-card>

          <q-card class="q-ma-md q-pa-sm right-panel">

            <div class="text-h6 q-pa-sm">
              <p>Viewport : {{ viewport.width }} x {{ viewport.height }}</p>
              <p>Font-Size : {{ viewport["font-size"] }}</p>
            </div>

          </q-card>

        </div>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>

      <q-footer elevated class="bg-transparent">
        <q-toolbar class="bottom-toolbar">
          <q-toolbar-title>

            <div class="footer">

              <div class="footer-list-column">
                <div
                  v-for="navlink in navlinks"
                  :key="navlink.no"
                  class="fitems"
                >
                    <a class="fitems" :href="navlink.link">{{ navlink.label }}</a>
                </div>
                <div class="fitems">&nbsp;</div>
                <div class="fitems">&nbsp;</div>
              </div>

              <div class="footer-list-column">
                <div class="fitems" v-html="address1"></div>
                <div class="fitems" v-html="address2"></div>
                <div class="fitems" v-html="address3"></div>
                <div class="fitems" v-html="address4"></div>

                <q-separator dark />

                <div class="fitems" v-html="tel1"></div>
                <div class="fitems" v-html="tel2"></div>
              </div>

              <div class="footer-image-column">

                <location-component>

                </location-component>

              </div>

            </div>

            <q-separator dark />

            <div class="text-center fb q-pt-xs text-caption">
              &#169; {{ copyright }}
            </div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>

    <!-- resize observer for the div -->
    <!-- <q-resize-observer @resize="onDivResize" /> -->
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";

import { useQuasar, colors } from "quasar";

import LocationComponent from "../components/LocationComponent/LocationComponent.vue";


export default defineComponent({
  name: "MainLayout",

  components: {
    LocationComponent,
  },

  setup() {
    const $q = useQuasar();

    const viewport = {
      width: $q.screen.width,
      height: $q.screen.height,
      "font-size": 16, // TODO: query and set
    };

    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    const navlinks = ref([
      {
        no: "1",
        name: "home",
        link: "/",
        icon: "home",
        label: "Home",
      },
      {
        no: "2",
        name: "services",
        link: "/services",
        icon: "support_agent",
        label: "Services",
      },
      {
        no: "3",
        name: "clients",
        link: "/clients",
        icon: "lan",
        label: "Clients",
      },
      {
        no: "4",
        name: "contactus",
        link: "/contactus",
        icon: "contact_phone",
        label: "Contact Us",
      },
    ]);

    const cname = "Spaa Shipping & Logistics Pvt Ltd";

    const address =
      "\
    Doshi Plaza, <br>\
    76, Thambu Chetty Street,<br>\
    Parrys, Chennai - 600001,<br>\
    Tamilnadu, INDIA.";

    const address1 =
      "Doshi Plaza,";

    const address2 =
      "76, Thambu Chetty Street,";

    const address3 =
      "Parrys, Chennai - 600001,";

    const address4 =
      "Tamilnadu, INDIA.";

    const tel =
      '\
    <span class="material-icons">call</span> : +91 44 42317779 <br>\
    <span class="material-icons">email</span> : madhavanv@spaashippinglog.com';

    const tel1 =
      '<span class="material-icons">call</span> : +91 44 42317779';

    const tel2 =
      '<span class="material-icons">email</span> : madhavanv@spaashippinglog.com';

    const copyright = "Spaa Shipping & Logistics Pvt Ltd";

    function closeDrawers() {
      leftDrawerOpen.value = false;
      rightDrawerOpen.value = false;
    }

    onMounted(() => {
      // actions to do on mount

      closeDrawers();
    })

    return {
      viewport,

      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },

      navlinks,

      closeDrawers,

      cname,
      address,
      address1,
      address2,
      address3,
      address4,
      tel,
      tel1,
      tel2,
      copyright,
    };
  },
});
</script>

<style lang="scss" scoped>
$accentlt: lighten($accent, 10%);
$accentinactive: lighten($accent, 50%);

$purplebg: radial-gradient(
  circle,
  lighten($deep-purple-10, 20%) 0%,
  $deep-purple-10 100%
);

$purplebglt: radial-gradient(
  circle,
  lighten($deep-purple-10, 60%) 0%,
  lighten($deep-purple-10, 40%) 100%
);

.tab-active {
  background: $purplebg !important;
  color: white !important;
}

.inactive {
  background: $purplebglt;
  font-weight: bold;
  border-radius: 0.25rem;
  margin-top: 1rem;
  margin-right: 1rem;
}

.top-toolbar {
  width: 100%;
  background: #7f0000;
}

.bottom-toolbar {
  width: 100%;
  background: $purplebg;
  color: white;
}

.right-panel {
  background: $purplebg;
  color: white;
}

.side-drawer {
  background-image: url("/assets/logistics_bg.jpg");
  overflow: hidden;
}

.fb {
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
}

.footer {
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-items: center;
  align-items: baseline;
}

.footer-list-column {
  flex: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: 100%;
  height: 100%;

  row-gap: 0.4rem;

  padding: 1rem;

  border-bottom: 1px solid white;
}

.fitems {
  flex: 100%;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  width: 100%;

  border: 1px solid transparent;
}

.footer-image-column {
  @extend .footer-list-column;

  align-self: flex-start;
  border: none;
}

.tp-menu {
  display: none;
}

.material-icons {
  font-family: "Material Icons";
  font-weight: bold;
  font-style: normal;
  font-size: 1rem !important; /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}

@media only screen and (min-width: 24rem) {
  .footer-list-column {
    flex: 30%;
  }
}

@media only screen and (min-width: 32rem) {
  .footer-list-column {
    flex: 15%;

    border-right: 1px solid white;
    border-bottom: none;
  }

  .footer-image-column {
    border: none;
  }

  .fitems {
    font-size: 0.7rem;
  }
}

@media only screen and (min-width: 48rem) {
  .fitems {
    font-size: 0.75rem;
  }
  .tp-menu {
    display: inline-block;
    width: 6rem;
    color: #7f0000;
    background-color: white;
  }
}
</style>
