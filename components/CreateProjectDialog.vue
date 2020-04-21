<template>
  <v-dialog width="768" v-model="show">
    <v-card>
      <v-card-title>Create a new project</v-card-title>
      <v-card-text>
        <v-text-field label="Title" v-model="title"></v-text-field>
        <v-text-field label="Short description" v-model="desc"></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click.stop="show=false">Close</v-btn>
        <v-btn text color="secondary" @click="emitCreateProject()">Create Project</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import eventHub from "~/plugins/eventHub";
export default {
  data() {
    return {
      title: "",
      desc: "",
      show: false
    };
  },
  methods: {
    emitCreateProject() {
      this.$emit("createProject", {
        title: this.title,
        desc: this.desc
      });
    }
  }
};
</script>
