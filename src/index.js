import React from "react";
import './index.less'
import imgSrc from './bs_yk01d.png'

const a = React.createElement('div')
console.log(a)

const img = document.createElement('img')
img.src = imgSrc

document.body.append(img)