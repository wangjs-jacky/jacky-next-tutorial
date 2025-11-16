# 事件监听器：window vs document 和选项说明

## 📚 目录

1. [window vs document 的区别](#window-vs-document-的区别)
2. [passive: true 详解](#passive-true-详解)
3. [once: true 详解](#once-true-详解)
4. [实际应用示例](#实际应用示例)

---

## window vs document 的区别

### 基本概念

- **`window`**：代表浏览器窗口对象，是整个浏览器环境的顶层对象
- **`document`**：代表 HTML 文档对象，是 window 的一个属性

### 事件监听的区别

#### 使用 `window` 的事件

这些事件是**窗口级别**的，适合在 `window` 上监听：

```javascript
// ✅ 滚动事件 - 窗口滚动
window.addEventListener('scroll', handler);

// ✅ 点击事件 - 窗口内任意位置点击
window.addEventListener('click', handler);

// ✅ 键盘事件 - 窗口内任意位置按键
window.addEventListener('keydown', handler);

// ✅ 页面卸载 - 窗口关闭/导航
window.addEventListener('beforeunload', handler);

// ✅ 窗口大小变化
window.addEventListener('resize', handler);
```

#### 使用 `document` 的事件

这些事件是**文档级别**的，适合在 `document` 上监听：

```javascript
// ✅ 页面可见性变化 - 只在 document 上可用
document.addEventListener('visibilitychange', handler);

// ✅ DOM 内容加载完成
document.addEventListener('DOMContentLoaded', handler);

// ✅ 文档点击（事件冒泡到 document）
document.addEventListener('click', handler);
```

### 为什么 visibilitychange 只能用 document？

`visibilitychange` 事件是 **Page Visibility API** 的一部分，它专门设计为在 `document` 对象上触发，用于检测文档的可见性状态。这个事件不会在 `window` 上触发。

```javascript
// ✅ 正确
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('页面隐藏了');
  } else {
    console.log('页面显示了');
  }
});

// ❌ 错误 - visibilitychange 不会在 window 上触发
window.addEventListener('visibilitychange', handler); // 不会工作
```

### 事件冒泡的影响

有些事件（如 `click`）可以在 `window` 和 `document` 上都能监听，因为事件会冒泡：

```javascript
// 这两种方式都能监听到页面内的点击
window.addEventListener('click', handler);   // ✅ 可以
document.addEventListener('click', handler); // ✅ 也可以
```

但通常建议：
- 窗口级别的事件用 `window`
- 文档级别的事件用 `document`

---

## passive: true 详解

### 什么是 passive 事件监听器？

`passive: true` 告诉浏览器：**这个事件监听器不会调用 `preventDefault()`**。

### 为什么需要 passive？

#### 性能问题

当浏览器处理滚动事件时，它需要知道：
- 是否有事件监听器会调用 `preventDefault()`？
- 如果有，浏览器必须等待事件处理完成才能滚动
- 这会导致滚动卡顿

#### 解决方案

```javascript
// ❌ 没有 passive - 浏览器必须等待，可能导致滚动卡顿
window.addEventListener('scroll', (e) => {
  // 浏览器不知道这里会不会调用 preventDefault()
  // 所以必须等待事件处理完成才能滚动
  console.log('滚动中...');
});

// ✅ 使用 passive: true - 浏览器可以立即滚动，性能更好
window.addEventListener('scroll', (e) => {
  // 浏览器知道这里不会调用 preventDefault()
  // 可以立即滚动，不需要等待
  console.log('滚动中...');
}, { passive: true });
```

### passive 的限制

如果设置了 `passive: true`，**不能在事件处理函数中调用 `preventDefault()`**：

```javascript
// ⚠️ 这样会报错
window.addEventListener('scroll', (e) => {
  e.preventDefault(); // ❌ 错误！passive 监听器不能调用 preventDefault()
}, { passive: true });

// ✅ 正确 - 不使用 passive，可以调用 preventDefault()
window.addEventListener('scroll', (e) => {
  e.preventDefault(); // ✅ 可以
});
```

### 浏览器默认行为

现代浏览器（Chrome 51+, Firefox 49+）对某些事件（如 `touchstart`、`touchmove`、`wheel`、`mousewheel`）**默认启用 passive**，以提升性能。

### 性能对比

```javascript
// 测试：1000 次滚动事件

// 没有 passive：~16ms 延迟
window.addEventListener('scroll', handler);
// 结果：滚动可能卡顿

// 有 passive：~0ms 延迟
window.addEventListener('scroll', handler, { passive: true });
// 结果：滚动流畅
```

---

## once: true 详解

### 什么是 once 事件监听器？

`once: true` 表示事件监听器**只会执行一次**，执行后自动移除。

### 基本用法

```javascript
// ✅ 使用 once: true
window.addEventListener('click', () => {
  console.log('只会执行一次');
}, { once: true });

// 等价于：
let hasExecuted = false;
window.addEventListener('click', () => {
  if (hasExecuted) return;
  hasExecuted = true;
  console.log('只会执行一次');
  window.removeEventListener('click', handler);
});
```

### 使用场景

#### 1. 用户首次交互检测

```javascript
// 只需要检测一次用户交互
window.addEventListener('click', () => {
  console.log('用户首次点击');
  // 停止 LCP 测量
}, { once: true });
```

#### 2. 一次性初始化

```javascript
// 页面加载完成后只执行一次
window.addEventListener('load', () => {
  initializeApp(); // 只执行一次
}, { once: true });
```

#### 3. 清理资源

```javascript
// 不需要手动移除，自动清理
window.addEventListener('beforeunload', () => {
  saveData(); // 只执行一次
}, { once: true });
```

### 与手动移除的区别

```javascript
// 方式 1：使用 once: true（推荐）
window.addEventListener('click', handler, { once: true });
// 执行一次后自动移除，无需手动清理

// 方式 2：手动移除
const handler = () => {
  console.log('执行一次');
  window.removeEventListener('click', handler); // 需要手动移除
};
window.addEventListener('click', handler);
```

### 注意事项

1. **自动移除**：使用 `once: true` 后，不需要手动调用 `removeEventListener`
2. **内存管理**：适合只需要触发一次的场景，避免内存泄漏
3. **清理函数**：在 React 的 `useEffect` 清理函数中，仍然可以尝试移除（不会报错）

```javascript
useEffect(() => {
  const handler = () => console.log('执行一次');
  
  window.addEventListener('click', handler, { once: true });
  
  return () => {
    // 即使使用了 once: true，这里也可以尝试移除
    // removeEventListener 对已移除的监听器不会报错
    window.removeEventListener('click', handler);
  };
}, []);
```

---

## 实际应用示例

### LCP 监控中的使用

```javascript
// 滚动事件：需要持续监听，但不需要 preventDefault，使用 passive
window.addEventListener('scroll', handleInteraction, { passive: true });

// 点击事件：只需要检测一次用户交互，使用 once
window.addEventListener('click', handleInteraction, { once: true });

// 键盘事件：只需要检测一次用户交互，使用 once
window.addEventListener('keydown', handleInteraction, { once: true });

// 页面卸载：标准事件，无选项
window.addEventListener('beforeunload', handleUnload);

// 可见性变化：文档级别事件，必须在 document 上
document.addEventListener('visibilitychange', handleVisibilityChange);
```

### 选择指南

| 场景 | window/document | passive | once | 说明 |
|------|----------------|---------|------|------|
| 滚动监听 | window | ✅ | ❌ | 需要 passive 优化性能 |
| 用户首次交互 | window | ❌ | ✅ | 只需要检测一次 |
| 页面卸载 | window | ❌ | ❌ | 标准事件 |
| 可见性变化 | document | ❌ | ❌ | 只能在 document 上 |
| 持续监听点击 | window/document | ❌ | ❌ | 需要持续监听 |

---

## 总结

### window vs document

- **window**：窗口级别事件（scroll、click、resize、beforeunload）
- **document**：文档级别事件（visibilitychange、DOMContentLoaded）
- **visibilitychange** 只能在 `document` 上使用

### passive: true

- **作用**：告诉浏览器不会调用 `preventDefault()`
- **好处**：提升滚动等事件的性能
- **限制**：不能调用 `preventDefault()`
- **适用**：scroll、touchstart、touchmove 等事件

### once: true

- **作用**：事件监听器只执行一次，自动移除
- **好处**：简化代码，自动清理，避免内存泄漏
- **适用**：只需要触发一次的场景（首次交互、初始化等）

### 最佳实践

1. **滚动事件**：总是使用 `passive: true`
2. **一次性监听**：使用 `once: true` 简化代码
3. **正确选择目标**：窗口事件用 `window`，文档事件用 `document`
4. **清理资源**：即使使用 `once: true`，清理函数中也可以尝试移除（不会报错）

