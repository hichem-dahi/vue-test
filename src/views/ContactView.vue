<template>
  <div class="wrapper">
    <v-btn text class="my-3" to="/">
      <v-icon left> mdi-arrow-left </v-icon>
      go back to contact list
    </v-btn>
    <v-card class="card" v-if="contact">
      <v-container>
        <v-row no-gutters
          ><v-col>
            <v-img contain :src="contact.picture.large"></v-img>
          </v-col>
          <v-col>
            <v-card-title class="display-1">{{
              `${contact.name.first} ${contact.name.last}`
            }}</v-card-title>
            <v-card-text>
              <div class="d-flex my-3">
                <v-icon>mdi-phone</v-icon>
                <div class="ml-5">
                  <div class="text--secondary">Phone</div>
                  <div>{{ contact.phone }}</div>
                </div>
              </div>
              <div class="d-flex my-3">
                <v-icon>mdi-cake</v-icon>
                <div class="ml-5">
                  <div class="text--secondary">Birth Date</div>
                  <div>{{ birthdate }}</div>
                </div>
              </div>
              <div class="d-flex my-3">
                <v-icon>mdi-card-account-details</v-icon>
                <div class="ml-5">
                  <div class="text--secondary">Social number</div>
                  <div>{{ contact.id.value }}</div>
                </div>
              </div>
              <div class="d-flex my-3">
                <v-icon>mdi-earth</v-icon>
                <div class="ml-5">
                  <div class="text--secondary">Country</div>
                  <div>{{ contact.location.country }}</div>
                </div>
              </div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router/composables";
import { Contact } from "@/models/models";
import { useFetch } from "@vueuse/core";
import dayjs from "dayjs";

const url = ref(process.env.VUE_APP_API as string);
const route = useRoute();
const contact = ref<Contact | null>(null);

onMounted(async () => {
  const seed = route.params.seed;
  if (seed) {
    const { data } = await useFetch(`${url.value}?seed=${seed}`).get().json();
    contact.value = data.value.results[0];
  }
});

const birthdate = computed(() =>
  contact.value ? dayjs(contact.value.dob.date).format("DD/MM/YYYY") : ""
);
</script>
<style>
.wrapper {
  width: 50%;
  margin: 0 auto 0 auto;
}
</style>
