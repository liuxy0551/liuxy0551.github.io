---
title: html2canvas 配合 jspdf 导出含有 echarts 图表的 pdf
urlname: html2canvas-jspdf
tags:
  - 其他
categories:
  - 前端
author: liuxy0551
copyright: true
date: 2020-10-11 17:39:04
updated: 2020-10-11 17:39:04
---


&emsp;&emsp;最近有个导出 pdf 的需求，内容区域含有 echarts 图表，记录一下处理的代码。

<!--more-->

&emsp;&emsp;本篇随笔和另一篇 <a href="https://liuxianyu.cn/article/window-print-canvas-image.html" target="_black">使用 window.print() 时将 DOM 中的 canvas 转为 image</a> 是同一个问题的处理记录。


``` javascript
// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default{
  install (Vue, options) {
    Vue.prototype.getPdf = title => {
      let target = document.querySelector('#pdfDom')

      html2Canvas(target, {
        allowTaint: true,
        scale: 1.2 // 用于渲染的比例尺，默认为浏览器设备像素比率。
      }).then(canvas => {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        // A4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        let pageHeight = contentWidth / 595.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 505
        let imgHeight = 505 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')

        if (leftHeight < pageHeight) { // 单页
          PDF.addImage(pageData, 'JPEG', 45, 60, imgWidth, imgHeight) // 45 left, 60 top
        } else { // 多页
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(`${ title }.pdf`)
      })
    }
  }
}
```

<br>

>**注意**
使用`html2canvas`时可参考官方文档 <a href="http://html2canvas.hertzen.com/configuration" target="_black">http://html2canvas.hertzen.com/configuration</a>
