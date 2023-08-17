<script setup lang="ts">
import {onMounted, ref} from 'vue'

defineProps<{ msg: string }>()

let client
const handler = () => {
  client = import.meta.hot
  console.log('------------client: ', client)
  if (client) {
    client.on('my:greetings', (data) => {
      console.log(data.msg) // hello
    })
  }
}

const sendMsg = () => {
  client.send('hello', { msg: 'Hey!' + Date.now() })
}

onMounted(() => {
  handler()
})


const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
   <button @click="sendMsg">send msg</button>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
