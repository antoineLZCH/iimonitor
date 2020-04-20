<template>
  <v-layout>
    <v-flex>
      <h2 class="display-1 text-uppercase">{{ project.title }}</h2>
      <p>{{ project.desc }}</p>
      <h3 class="headline">Tasks</h3>
      <v-list two-line v-for="task in project.tasks" :key="task.id" class="item">
        <v-list-item>
          <v-list-item-action>
            <v-btn icon @click="weightUp(task)">
              <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn icon @click="weightDown(task)">
              <v-icon>keyboard_arrow_down</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              class="ml-4"
              :class="(task.done) ? 'done' : ''"
              @click="toggleDone(task.id)"
            >{{ task.todo }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn text color="error" @click="removeTask(task)">Remove</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    project() {
      this.$store.commit("sortByWeight", this.$route.params.id);
      return this.$store.state.projects.find(
        p => p.id === this.$route.params.id
      );
    }
  },
  methods: {
    toggleDone(id) {
      this.$store.commit("toggleDone", {
        id: this.$route.params.id,
        task: {
          id: id
        }
      });
    },
    removeTask(task) {
      this.$store.commit("removeTask", {
        id: this.$route.params.id,
        task: task
      });
      this.$toast.show("Success deleting task !");
    },
    weightUp(task) {
      this.$store.commit("weightUp", {
        id: this.$route.params.id,
        task: task
      });
    },
    weightDown(task) {
      this.$store.commit("weightDown", {
        id: this.$route.params.id,
        task: task
      });
    }
  }
};
</script>

<style lang="scss">
.done {
  text-decoration: line-through;
}
.item {
  margin-bottom: 8px;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    background-color: rgba(#ee7f00, 1);
  }
  to {
    background-color: rgba(#ee7f00, 0);
  }
}
</style>
