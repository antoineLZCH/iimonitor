<template>
  <v-layout row wrap>
    <v-col cols="8" class="d-flex flex-wrap">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </v-col>
    <v-col col="4">
      <Pomodoro></Pomodoro>
    </v-col>
  </v-layout>
</template>

<script>
import ProjectCard from "~/components/ProjectCard";
import { fireDb } from "~/plugins/firebase.js";
import Pomodoro from "~/components/Pomodoro";
export default {
  components: {
    ProjectCard,
    Pomodoro
  },
  data() {
    return {
      projects: []
    };
  },
  beforeMount() {
    this.getProjects();
  },
  methods: {
    async getProjects() {
      const ref = fireDb.collection("projects");
      try {
        const { docs } = await ref.get();
        this.projects = docs.map(doc => {
          const { id } = doc;
          const data = doc.data();
          return { id, ...data };
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

