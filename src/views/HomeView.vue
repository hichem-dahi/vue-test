<template>
  <v-container>
    <v-row>
      <v-col
        ><div v-if="filteredContacts" class="display-1">
          {{ filteredContacts.length }} contact(s)
        </div></v-col
      >
      <v-col>
        <v-text-field
          label="Search..."
          outlined
          prepend-inner-icon="mdi-magnify"
          v-model="searchStr"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="3"
        v-for="contact in filteredContacts"
        :key="contact.id.value"
      >
        <ContactCard v-if="info && contact" :contact="contact" :info="info">
        </ContactCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { Contact, Info } from "@/models/models";
import ContactCard from "@/components/ContactCard.vue";
import * as _ from "lodash";

const url = ref(process.env.VUE_APP_API as string);
const contacts = ref<Contact[] | null>(null);
const info = ref<Info | null>(null);
let searchStr = ref<string>("");

onMounted(async () => {
  const { error, data } = await useFetch(`${url.value}?results=100`)
    .get()
    .json();
  if (!error.value) {
    contacts.value = data.value.results;
    info.value = data.value.info;
  }
});

const filteredContacts = computed(() =>
  _.filter(contacts.value, (el: Contact) => {
    return _.includes(
      _.lowerCase(el.name.first + el.name.last),
      _.lowerCase(searchStr.value)
    );
  })
);
</script>
