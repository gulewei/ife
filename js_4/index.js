window.onload = function () {
  var
    inputBox = $('input'),
    leftIn = $('.left-in'),
    leftOut = $('.left-out'),
    rightIn = $('.right-in'),
    rightOut = $('.right-out'),
    outputBox = $('.output'),
    VAL = '';

  // 检查数字输入，除去非数字字符
  inputBox.oninput = function () {
    var val = this.value
    VAL = checkNum(val)
    this.value = VAL
  }

  // 左侧入
  leftIn.onclick = function () {
    if (VAL) {
      outputBox.insertBefore(createCube(VAL), outputBox.childNodes[0])
    } else {
      alert('输入内容不能为空')
    }
  }

  // 右侧入
  rightIn.onclick = function () {
    if (VAL) {
      outputBox.append(createCube(VAL))
    } else {
      alert('输入内容不能为空')
    }
  }

  // 左侧出
  leftOut.onclick = function () {
    var item = document.getElementsByClassName('cube')[0]
    outputBox.removeChild(item)
  }

  // 右侧出
  rightOut.onclick = function () {
    var items = document.getElementsByClassName('cube')
    var lastId = items.length - 1
    outputBox.removeChild(items[lastId])
  }

  // 删除点击元素
  outputBox.onclick = function (event) {
    var target = event.target
    outputBox.removeChild(target)
  }

}

// 创建队列节点
function createCube(n) {
  var div = document.createElement('div')
  div.className = 'cube'
  div.innerText = n
  return div
}

// 选择器函数
function $(selector) {
  return document.querySelectorAll(selector)[0]
}

function checkNum(val) {
  return val.replace(/\D/g, '');
}