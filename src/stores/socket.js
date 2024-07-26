import { ref } from "vue";
import { defineStore } from "pinia";
import { io } from "socket.io-client";

const useSocketStore = defineStore(
  "socket",
  {
    state: () => ({
      socket: ref(null),
      rooms: ref([]),
      roomID: ref(null),
      userOnlineList: ref([]),
    }),

    getters: {},

    actions: {
      clear() {
        this.$reset();
      },

      initializeSocket() {
        this.socket = io("http://localhost:8181/");

        this.socket.on("connect", () => {
          console.log(this.socket.id);
        });

        const data = {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2YTI5ODM5ZjdkZGJjMWY4YzllOWQ1MyIsInN0dWRlbnRDb2RlIjoiMjAyMjYwMjEyOSIsInN0dWRlbnROYW1lIjoidXNlciIsInN0dWRlbnRDbGFzcyI6IjIwMjFESEtUUE0wMiIsInN0dWRlbnRQaG9uZSI6IjAzODM0MjA2MjMiLCJzdHVkZW50SG9tZXRvd24iOiJObyBpbmZvcm1hdGlvbiIsInBhc3N3b3JkIjoiJDJiJDEwJEFEWXg5RVFQZkFKMGhIUGVQaEJKdHVFc1VXOWljYnlnRmsxWU1CUlJINHFYY1BheGowcDVxIiwicm9sZSI6InVzZXIiLCJpc09ubGluZSI6ZmFsc2UsInN0YXR1cyI6MCwiY3JlYXRlZEF0IjoiMjAyNC0wNy0yNVQxODoyMzo1My4xNThaIiwidXBkYXRlZEF0IjoiMjAyNC0wNy0yNVQxODoyMzo1My4xNThaIiwiX192IjowfSwiaWF0IjoxNzIxOTM3OTk0LCJleHAiOjE3MjMyMzM5OTR99",
          command: 1000,
        };

        this.socket.on("login", (data) => {
          console.log(data);
        });

        // this.socket.emit("login", this.socket, data);

        this.socket.on("connect_error", (err) => {
          // the reason of the error, for example "xhr poll error"
          console.log(err.message);

          // some additional description, for example the status code of the initial HTTP response
          console.log(err.description);

          // some additional context, for example the XMLHttpRequest object
          console.log(err.context);
        });
      },

      async disconnectSocket() {
        console.log("this.socket :>> ", this.socket);
        if (this.socket) {
          await this.socket.disconnect();
        }
      },
    },
  },
  {
    persist: true,
  }
);

export default useSocketStore;
