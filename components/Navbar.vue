<template>
  <nav>
    <v-toolbar>
      <nuxt-link to="/">
        <v-toolbar-title class="grey--text text-uppercase font-weight-light">
          <span class="secondary--text font-weight-black">IIM</span>onitor
        </v-toolbar-title>
      </nuxt-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          text
          class="secondary-button"
          @click="projectDialog = !projectDialog"
          v-if="!isProjectPage"
        >Create Project</v-btn>
        <v-btn text class="secondary-button" @click="taskDialog = !taskDialog" v-else>Create Task</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-dialog width="768" v-model="projectDialog">
      <v-card>
        <v-card-title>Create a new project</v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="title"></v-text-field>
          <v-text-field label="Short description" v-model="desc"></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="projectDialog = false">Close</v-btn>
          <v-btn text color="secondary" @click="createProject">Create Project</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog width="768" v-model="taskDialog">
      <v-card>
        <v-card-title>Create a new task</v-card-title>
        <v-card-text>
          <v-text-field label="Task" v-model="task"></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="taskDialog = false">Close</v-btn>
          <v-btn text color="secondary" @click="createTask">Create Task</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </nav>
</template>

<script>
import { fireDb, fieldValue } from "~/plugins/firebase.js";
import { createId } from "~/helpers/helpers";
export default {
  data() {
    return {
      isProjectPage: false,
      projectDialog: false,
      taskDialog: false,
      title: "",
      desc: "",
      task: ""
    };
  },
  methods: {
    async createProject() {
      let id = createId();
      const ref = fireDb.collection("projects").doc(id);
      const document = {
        id: id,
        title: this.title,
        desc: this.desc,
        tasks: []
      };
      try {
        await ref.set(document);
        this.$toast.show("Success creating project !");
      } catch (e) {
        console.error(e);
        this.$toast.show("Something went wrong.");
      }
      this.projectDialog = false;
      this.title = "";
      this.desc = "";
    },
    async createTask() {
      const ref = fireDb.collection("projects").doc(this.$route.params.id);
      try {
        await ref.update({ tasks: fieldValue.arrayUnion(this.task) });
        this.$toast.show("Success creating task !");
      } catch (e) {
        console.error(e);
      }
      this.taskDialog = false;
      this.task = "";
    }
  },
  watch: {
    $route() {
      this.isProjectPage = this.$route.name == "project-id" ? true : false;
    }
  }
};
</script>
