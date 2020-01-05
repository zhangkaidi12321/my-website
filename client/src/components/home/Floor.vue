<!-- Floor -->
<template>
  <div>
    <svg height="400" width="1000">
      <defs>
        <linearGradient id="line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color: rgb(255, 255, 0); stop-opacity: 1" />
          <stop offset="100%" style="stop-color: rgb(255, 0, 0); stop-opacity: 1" />
        </linearGradient>
      </defs>
      <polyline
        class="poly"
        style="fill: white; stroke: url(#line); stroke-width: 4;"
        :points="coordinate"
      />
      <path stroke="pink" stroke-width="3" fill="none" :d="girl" />
      <path stroke="black" stroke-width="2" fill="none"
        stroke-dasharray="10,10" d="M 105,40 L 135,40"
      />
      <!-- <path stroke="black" stroke-width="2" fill="none"
        d="M 120,40 m 0,0 h 10 Z"
      /> -->
      <path stroke="blue" stroke-width="3" fill="none" :d="boy" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Floor',
  components: {},

  data() {
    return {
      coordinate: '', boy: '', girl: ''
    }
  },

  created() {
    this.coordinate = this.createCoordinate(10, 100)
    this.boy = this.createBoy(880, 320, 20, 20)
    this.girl = this.createGirl(120, 40, 20, 20)
  },

  mounted() {},

  methods: {
    createCoordinate(x, y) {
      let xys = `${x},${y}`
      for (let i = 0; i < 100; i++) {
        if (y >= 380) {
          x += 230
          xys += ` ${x},${y}`
          break
        }
        if (i === 0) {
          x += 230
        }
        if (i % 2 === 0 && i !== 0) {
          x += 40
        } else if (i % 2 !== 0) {
          y += 20
        }
        xys += ` ${x},${y}`
      }
      return xys
    },

    createBoy(cx, cy, rx, ry) {
      // let b = 'M 800,300 a 20,20 0 1 0 40 0 a 20,20 0 1 0 -40 0';
      return 'M ' + (cx - rx) + ',' + cy
        + ' a ' + rx + ',' + ry + ' 0 1 0 ' + 2 * rx + ',0'
        + ' a ' + rx + ',' + ry + ' 0 1 0 ' + (-2 * rx) + ',0 ' + 'Z'
    },

    createGirl(cx, cy, rx, ry) {
      return 'M ' + (cx - rx) + ',' + cy
        + ' a ' + rx + ',' + ry + ' 0 1 0 ' + 2 * rx + ',0'
        + ' a ' + rx + ',' + ry + ' 0 1 0 ' + (-2 * rx) + ',0 ' + 'Z'
    }
  },

  computed: {}
}

</script>
<style lang='less' scoped>
.poly {
  stroke-dasharray: 1300; stroke-dashoffset: 0; animation: dash 5s linear;
}
@keyframes dash { from { stroke-dashoffset: -1300; } to { stroke-dashoffset: 0; } }
</style>