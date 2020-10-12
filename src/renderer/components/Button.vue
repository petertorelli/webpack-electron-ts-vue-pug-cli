<template lang="pug">
  button.type <slot/>
</template>

<script>
  //<button :class="type"><slot/></Button>
export default {
  name: 'Button',
  props: [ 'type' ]
}

</script>
<style scoped>
button.primary {
background: blue;
color: white;
}
</style>