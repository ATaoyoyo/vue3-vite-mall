<template>
  <div class="VerificationImg">
    <canvas ref="verify" :width="width" :height="height" @click="handDraw" />
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, toRefs } from 'vue'

export default {
  name: 'VerificationImg',

  components: {},

  setup() {
    const state = reactive({
      width: 120,
      height: 40,
      pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
      imgCode: '',
    })

    const verify = ref(null)

    onMounted(() => {
      state.imgCode = draw()
    })

    const handDraw = () => {
      state.imgCode = draw()
    }

    const randomNumber = (min, max) => {
      return parseInt(Math.random() * (max - min) + min)
    }

    const randomColor = (min, max) => {
      const r = randomNumber(min, max)
      const g = randomNumber(min, max)
      const b = randomNumber(min, max)

      return `rgb(${r}, ${g}, ${b})`
    }

    const draw = () => {
      const ctx = verify.value.getContext('2d')

      ctx.fillStyle = randomColor(180, 230)

      ctx.fillRect(0, 0, state.width, state.height)

      let imgCode = ''

      for (let i = 0; i < 4; i++) {
        const text = state.pool[randomNumber(0, state.pool.length)]

        imgCode += text

        const fontSize = randomNumber(18, 40)
        const deg = randomNumber(-30, 30)
        /*
         * 绘制文字并让四个文字在不同的位置显示的思路 :
         * 1、定义字体
         * 2、定义对齐方式
         * 3、填充不同的颜色
         * 4、保存当前的状态（以防止以上的状态受影响）
         * 5、平移translate()
         * 6、旋转 rotate()
         * 7、填充文字
         * 8、restore出栈
         * */
        ctx.font = fontSize + 'px Simhei'
        ctx.textBaseline = 'top'
        ctx.fillStyle = randomColor(80, 150)

        /*
         * save() 方法把当前状态的一份拷贝压入到一个保存图像状态的栈中。
         * 这就允许您临时地改变图像状态，
         * 然后，通过调用 restore() 来恢复以前的值。
         * save是入栈，restore是出栈。
         * 用来保存Canvas的状态。save之后，可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作。 restore：用来恢复Canvas之前保存的状态。防止save后对Canvas执行的操作对后续的绘制有影响。
         *
         * */
        ctx.save()
        ctx.translate(30 * i + 15, 15)
        ctx.rotate((deg * Math.PI) / 180)
        // fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色。
        // 请使用 font 属性来定义字体和字号，并使用 fillStyle 属性以另一种颜色/渐变来渲染文本。
        // context.fillText(text,x,y,maxWidth);
        ctx.fillText(text, -15 + 5, -15)
        ctx.restore()
      }
      // 5.随机产生5条干扰线,干扰线的颜色要浅一点
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(randomNumber(0, state.width), randomNumber(0, state.height))
        ctx.lineTo(randomNumber(0, state.width), randomNumber(0, state.height))
        ctx.strokeStyle = randomColor(180, 230)
        ctx.closePath()
        ctx.stroke()
      }
      // 6.随机产生40个干扰的小点
      for (let i = 0; i < 40; i++) {
        ctx.beginPath()
        ctx.arc(randomNumber(0, state.width), randomNumber(0, state.height), 1, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fillStyle = randomColor(150, 200)
        ctx.fill()
      }

      return imgCode
    }

    return { ...toRefs(state), handDraw, verify }
  },
}
</script>

<style lang="less" scoped>
.VerificationImg {
  height: 40px;
  canvas {
    cursor: pointer;
  }
}
</style>
