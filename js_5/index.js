window.onload = function () {
  var
    inputBox = $('input'),
    leftIn = $('.left-in'),
    leftOut = $('.left-out'),
    rightIn = $('.right-in'),
    rightOut = $('.right-out'),
    outputBox = $('.output'),
    sort = $('.sort');

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
      newVal.map(function (x, i) {
        var item = createCube(x)
        item.setAttribute('data-index', i)
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
  state.arr = [10, 3, 7, 12, 11, 22, 37, 15, 28, 36, 45, 57, 21, 31]

  // 绑定input.value 到 state.val
  inputBox.oninput = function () {
    state.val = this.value
  }

  // 左侧入
  leftIn.onclick = function () {
    state.arr = [state.val].concat(state.arr)
  }

  // 右侧入
  rightIn.onclick = function () {
    state.arr = state.arr.concat([state.val])
  }

  // 左侧出
  leftOut.onclick = function () {
    state.arr = state.arr.slice(1)
  }

  // 右侧出
  rightOut.onclick = function () {
    var len = state.arr.length
    state.arr = state.arr.slice(0, len - 1)
  }

  // 删除点击元素
  outputBox.onclick = function (event) {
    var target = event.target
    var list = outputBox.getElementsByClassName('cube')
    var index = getIndex(list, target)
    state.arr.splice(index, 1)
    state.arr = state.arr
  }

  // 排序
  sort.onclick = function () {
    var record = qSort.call(state.arr, (a, b) => b - a)
    var duration = 5000
    play(record, duration)
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
  var li = document.createElement('li')
  var liInner = document.createElement('div')
  li.className = 'cube'
  liInner.className = 'cube-inner'
  li.appendChild(liInner)
  li.setAttribute('data-value', n)
  liInner.style.height = (100 - n) + '%'
  return li
}

// 选择器函数
function $(selector) {
  return document.querySelectorAll(selector)[0]
}

// 过滤非数字字符
function checkNum(val) {
  return val.replace(/\D/g, '');
}

// 快排 (from winter's gist)
function qSort(compare) {
  var record = []
  var swap = (p1, p2) => {
    var tmp = this[p1]
    this[p1] = this[p2]
    this[p2] = tmp
    record.push(this.slice(0))
  }
  var sortRange = (start, end) => {
    var midValue = this[start]
    var p1 = start, p2 = end - 1
    while (p1 < p2) {
      swap(p1, p1 + 1)
      while (compare(this[p1], midValue) <= 0 && p1 < p2) {
        swap(p1, p2--)
      }
      p1++
    }
    if (start < p1 - 1)
      sortRange(start, p1)
    if (p1 < end - 1)
      sortRange(p1, end)

  }
  sortRange(0, this.length)
  return record
}

// 播放
function play(record, duration) {
  var len = record.length
  if (len === 0)
    return
  var i = 0
  var timer = setInterval(function () {
    if (i >= len - 1)
      clearInterval(timer)
    state.arr = record[i]
    // console.log('record', record[i])
    i++
  }, duration / len)
}