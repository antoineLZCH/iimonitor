<template>
  <v-flex pa-2 xs12 sm4>
    <v-card>
      <v-card-title class="secondary headline black--text">{{ project.title }}</v-card-title>
      <v-card-text class="py-6">
        <p>
          <strong>Description :</strong>
          {{ project.desc }}
        </p>
        <p>
          <strong>Active Tasks:</strong>
          {{ project.tasks.filter(task => !task.done).length }}
        </p>
        <p>
          <strong>Completed Tasks:</strong>
          {{ project.tasks.filter(task => task.done).length }}
        </p>
        <p>
          <strong>Total Tasks:</strong>
          {{ project.tasks.length }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <nuxt-link to="/">
          <v-btn text :to="/project/ + project.id">Open project</v-btn>
        </nuxt-link>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["project"]
};
</script>
