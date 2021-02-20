/**
 * >=min && <=max * @param min max function getrandom (min, max) { return + math.floor(math.random() (max - 1)) } class thumbsupani imglist="[]" context width="0" height="0" scanning="false" renderlist="[]" scaletime="0.1" 放大时间百分比 constructor () this.loadimages() const canvas="document.getElementById('thumbUpCanvas')" this.context="canvas.getContext('2d')" this.width="canvas.width" this.height="canvas.height" 加载点赞时移动的 icon loadimages let images="[]" for (let i="1;" <="26;" i++) images.push(`${ }.png`) promiseall="[]" images.foreach(src> {
      const p = new Promise(resolve => {
        const img = new Image
        img.onerror = img.onload = resolve.bind(null, img)
        img.src = `https://zju123.oss-cn-hangzhou.aliyuncs.com/storage/thumb-icon/${ src }`
      })
      promiseAll.push(p)
    })
    Promise.all(promiseAll).then(imgList => {
      this.imgList = imgList.filter(d => {
        return d && d.width > 0
      })
      if (this.imgList.length === 0) {
        return 'imgList load all error'
      }
    })
  }

  // 计算 icon 的移动轨迹
  createRender () {
    if (this.imgList.length === 0) return null
    const basicScale = [0.6, 0.9, 1.2][getRandom(0, 2)]

    const getScale = diffTime => {
      if (diffTime < this.scaleTime) {
        return +((diffTime / this.scaleTime).toFixed(2)) * basicScale
      } else {
        return basicScale
      }
    }
    const context = this.context
    // 随机读取一个图片来渲染
    const image = this.imgList[getRandom(0, this.imgList.length - 1)]
    const offset = 30
    const basicX = this.width / 2 + getRandom(-offset, offset)
    const angle = getRandom(4, 8)  // icon 左右缓动幅度，随机
    let ratio = getRandom(35, 45) * (getRandom(0, 1) ? 1 : -1)  // 控制 icon 左右移动的范围区间
    const getTranslateX = diffTime => {
      if (diffTime < this.scaleTime) {  // 放大期间，不进行摇摆位移
        return basicX
      } else {
        return basicX + ratio * Math.sin(angle * (diffTime - this.scaleTime))
      }
    }

    const getTranslateY = diffTime => {
      return image.height / 2 + (this.height - image.height / 2) * (1 - diffTime)
    }

    const fadeOutStage = getRandom(14, 18) / 100
    const getAlpha = diffTime => {
      let left = 1 - +diffTime
      if (left > fadeOutStage) {
        return 1
      } else {
        return 1 - +((fadeOutStage - left) / fadeOutStage).toFixed(2)
      }
    }

    return diffTime => {
      // 差值满了，即结束了 0 -> 1
      if (diffTime >= 1) return true
      context.save()
      const scale = getScale(diffTime)
      const translateX = getTranslateX(diffTime)
      const translateY = getTranslateY(diffTime)
      context.translate(translateX, translateY)
      context.scale(scale, scale)
      context.globalAlpha = getAlpha(diffTime)
      context.drawImage(
        image,
        -image.width / 2,
        -image.height / 2,
        // image.width,
        // image.height
        image.width * 1.5,
        image.height * 1.5
      )
      context.restore()
    }
  }

  scan () {
    this.context.clearRect(0, 0, this.width, this.height)
    this.context.fillStyle = 'transparent'
    this.context.fillRect(0, 0, 100, 400)
    let index = 0
    let length = this.renderList.length
    if (length > 0) {
      requestFrame(this.scan.bind(this))
      this.scanning = true
    } else {
      this.scanning = false
    }
    while (index < length) {
      const child = this.renderList[index]
      if (!child || !child.render || child.render.call(null, (Date.now() - child.timestamp) / child.duration)) {
        // 结束了，删除该动画
        this.renderList.splice(index, 1)
        length--
      } else {
        // continue
        index++
      }
    }
  }

  // 开始添加移动的 icon
  start () {
    const render = this.createRender()
    const duration = getRandom(1800, 2600)  // 移动时长区间
    this.renderList.push({
      render,
      duration,
      timestamp: Date.now()
    })
    if (!this.scanning) {
      this.scanning = true
      requestFrame(this.scan.bind(this))
    }
    return this
  }
}

function requestFrame (cb) {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )(cb)
}


export default ThumbsUpAni
</=max>