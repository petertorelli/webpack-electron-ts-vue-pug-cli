<template lang="pug">
  div#app
    h2 Static
    button Hello
    h2 Dynamically
    div(ref='container')
      button(@click="onClick") Click to insert
</template>

<script>
import Vue from 'vue'
import Button from './components/Button'
export default {
  name: 'app',
  components: { Button },
  methods: {
    onClick() {
      var ComponentClass = Vue.extend(Button)
      var instance = new ComponentClass({
          propsData: { type: 'primary' }
      })
      instance.$slots.default = ['Click me!']
      instance.$mount() // pass nothing
//         console.log(this.$refs)
      this.$refs.container.appendChild(instance.$el)
    }
  }
}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
