window.onload = function () {
  var
    inputBox = $('input'),
    leftIn = $('.left-in'),
    leftOut = $('.left-out'),
    rightIn = $('.right-in'),
    rightOut = $('.right-out'),
    outputBox = $('.output');

  Object.defineProperty(state, 'val', {
    set: function (newVal) {
      // 检查数字
      var val = checkNum(newVal)
      val = Number(val)
      // 检查范围
      if (val > 100) {
        val = 100
      } else if (val < 10) {
        val = 10
      }
      // 修改input.value
      inputBox.value = val
      this._val = val
    },
    get: function () {
      return this._val
    }
  })

  Object.defineProperty(state, 'arr', {
    set: function (newVal) {
      // 限定数量
      if (newVal.length > 60) {
        alert('队列元素数量最多限制为60个')
        return
      }
      // 跟新dom节点
      var fragment = document.createDocumentFragment()
      newVal.map(function (x) {
        var item = createCube(x)
        fragment.appendChild(item)
      })
      outputBox.innerHTML = ''
      outputBox.appendChild(fragment)
      this._arr = newVal
    },
    get: function () {
      return this._arr
    }
  })

  // 初始值
  state.val = inputBox.value
  state.arr = [10, 3, 7, 12, 11]

  // 绑定input.value 到 state.val
  inputBox.oninput = function () {
    state.val = this.value
  }

  // 左侧入
  leftIn.onclick = function () {
    state.arr.unshift(state.val)
    state.arr = state.arr
  }

  // 右侧入
  rightIn.onclick = function () {
    state.arr.push(state.val)
    state.arr = state.arr    
  }

  // 左侧出
  leftOut.onclick = function () {
    state.arr.shift(state.val)
    state.arr = state.arr    
  }

  // 右侧出
  rightOut.onclick = function () {
    state.arr.pop(state.val)
    state.arr = state.arr    
  }

  // 删除点击元素
  outputBox.onclick = function (event) {
    var target = event.target
    var list = outputBox.getElementsByClassName('cube')
    var index = getIndex(list, target)
    state.arr.splice(index, 1)
    state.arr = state.arr
  }
}

var state = {}

// 获取一个元素在列表中的索引
function getIndex(list, item) {
  var newList = Array.prototype.slice.call(list)
  return newList.indexOf(item)
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

// 过滤非数字字符
function checkNum(val) {
  return val.replace(/\D/g, '');
}

// 数组排序
function sort(arr) {
  
}