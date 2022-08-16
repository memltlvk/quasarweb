<template>
  <q-page class="flex flex-start q-gutter-md">
    <div style="border: 1px solid red; width: 100%">
      <q-img src="/assets/home.png" class="heroImage" />
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";

import { useQuasar } from "quasar";

export default defineComponent({
  name: "IndexPage",

  components: {},

  setup() {
    const $q = useQuasar();
    const screenWidth = $q.screen.width;
  },
});
</script>

<style lang="scss" scoped>
.heroImage {
  width: 100%;
}
</style>
