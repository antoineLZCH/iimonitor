<template>
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
</template>
