<template>
  <v-layout row wrap>
    <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
  </v-layout>
</template>

<script>
import ProjectCard from "~/components/ProjectCard";
import { fireDb } from "~/plugins/firebase.js";
export default {
  components: {
    ProjectCard
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

