<template>
  <div>
    <pre>message: {{ message }}</pre>
    <a href="https://vitejs.dev" target="_blank">
      <img src="./assets/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  component: {
    HelloWorld,
  },
  data() {
    return {
      message: null,
    };
  },
  mounted() {
    // Access ipcRenderer via window.require to avoid context isolation issues
    const { ipcRenderer } = window.require("electron");

    // Listen for the message from the main process
    ipcRenderer.on("response-data", (event, data) => {
      console.log("Received from main process:", data.message);
    });

    ipcRenderer.send("from-main");
  },
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
