<template>
  <div class="px-thumb-up thumb-up">
    <canvas id="thumbUpCanvas" class="canvas" width="200" height="400" />

    <div class="thumb-up-icon" oncontextmenu='self.event.returnValue=false'
         @touchstart="addStart" @touchend="addStop" @touchmove="addStop"
         @mousedown="addStart" @mouseup="addStop" @mouseout="addStop" @click="thumbUp"></div>
  </div>
</template>

<script>
  import ThumbsUpAni from '../portal/canvas'

  export default {
    name: 'ThumbUp',
    data() {
      return {
        thumbsUpAni: null,
        timer: null
      }
    },
    methods: {
      // 添加 icon
      thumbUp () {
        this.thumbsUpAni.start()
      },
      // 持续添加 icon
      addStart () {
        this.timer && this.addStop()
        this.timer = setInterval(() => {
          this.thumbUp()
        }, 80)
      },
      // 停止添加 icon
      addStop () {
        clearInterval(this.timer)
      }
    },
    mounted () {
      this.thumbsUpAni = new ThumbsUpAni()
    }
  }
</script>

<style lang="scss" scoped>
  .thumb-up-icon {
    background-image: url("../../assets/images/map/thumb-up.png");
    background-size: cover;
  }
  @media screen and (min-width: 768px) {
    .px-thumb-up {
      overflow: hidden;
      &.thumb-up {
        position: absolute;
        right: 16%;
        transform: translate(-50%, -100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        .canvas {
          width: 100px;
          height: 200px;
        }

        .thumb-up-icon {
          width: 50px;
          height: 50px;
          cursor: pointer;
          -webkit-user-drag: none;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .thumb-up {
      overflow: initial;
      position: absolute;
      right: 0;
      transform: translate(0, -70%);
      display: flex;
      flex-direction: column;
      align-items: center;
      .canvas {
        width: 200px;
        height: 400px;
      }

      .thumb-up-icon {
        width: 90px;
        height: 90px;
      }
    }
  }
</style>
