<template>
  <v-card :hover="true" v-if="contact" @click="goContactPage">
    <v-img :src="contact.picture.large"></v-img>
    <v-card-title>{{ fullname }}</v-card-title>
    <v-card-text class="d-flex align-center">
      <v-icon class="pr-3"> mdi-email </v-icon>
      <div>{{ contact.email || "" }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Contact, Info } from "@/models/models";
import { computed } from "vue";
import { useRouter } from "vue-router/composables";

const router = useRouter();
// eslint-disable-next-line no-undef
const props = defineProps<{
  contact: Contact;
  info: Info;
}>();

const fullname = computed(
  () => `${props.contact.name.first} ${props.contact.name.last}` || ""
);
function goContactPage() {
  router.push({ name: "Contact", params: { seed: props.info.seed } });
}
</script>
