# React 中的"调度"机制详解

## 🎯 "调度"是什么意思？

### 调度的含义

**"调度"（Schedule）** 是指将任务**存储起来**，在**适当的时机**再执行，而不是立即执行。

### 类比理解

```javascript
// 类比：任务列表

// 1. 调度（存储任务）
const taskList = [];
taskList.push(() => console.log('任务1'));
taskList.push(() => console.log('任务2'));

// 2. 执行（在适当的时机执行）
taskList.forEach(task => task());
```

## 🔍 useEffect 的调度机制

### 1. 协调阶段：调度 useEffect

#### 什么是调度？

```javascript
// 协调阶段：调度 useEffect（存储，不执行）

function scheduleEffect(effect) {
  // 1. 创建 Effect 对象
  const effectObject = {
    tag: 'useEffect',
    create: effect.create,      // useEffect 的回调函数
    deps: effect.deps,          // 依赖数组
    destroy: null,              // 清理函数（稍后设置）
    next: null                  // 下一个 Effect
  };
  
  // 2. 存储到 Fiber 节点的 updateQueue
  if (!fiberNode.updateQueue) {
    fiberNode.updateQueue = {
      lastEffect: null,
      effects: []
    };
  }
  
  // 3. 添加到 Effect 链表
  const lastEffect = fiberNode.updateQueue.lastEffect;
  if (lastEffect === null) {
    fiberNode.updateQueue.lastEffect = effectObject;
    effectObject.next = effectObject;  // 循环链表
  } else {
    const firstEffect = lastEffect.next;
    lastEffect.next = effectObject;
    effectObject.next = firstEffect;
    fiberNode.updateQueue.lastEffect = effectObject;
  }
  
  // 注意：此时不执行 effect.create()
  // 只是存储起来
}
```

#### 实际代码示例

```typescript
// 组件代码
function Component() {
  useEffect(() => {
    console.log('useEffect 执行了');
  }, []);
  
  return <div>Content</div>;
}
```

**协调阶段的过程**：

```javascript
// 协调阶段：调度 useEffect

function renderComponent(fiberNode) {
  // 1. 执行组件函数
  const result = fiberNode.type();
  // result = <div>Content</div>
  
  // 2. 收集 useEffect
  const effects = collectEffects(fiberNode);
  // effects = [{
  //   create: () => console.log('useEffect 执行了'),
  //   deps: []
  // }]
  
  // 3. 调度 useEffect（存储，不执行）
  effects.forEach(effect => {
    scheduleEffect(fiberNode, effect);
    // 将 effect 存储到 fiberNode.updateQueue
    // 此时不执行 effect.create()
  });
  
  return result;
}
```

### 2. 提交阶段：执行 useEffect

#### 何时执行？

```javascript
// 提交阶段：Passive Effects（执行 useEffect）

function schedulePassiveEffects(root) {
  // 1. 收集所有需要执行的 Effect
  const effects = collectPassiveEffects(root);
  
  // 2. 调度执行（异步执行）
  scheduleCallback(NormalPriority, () => {
    // 3. 执行所有 Effect
    effects.forEach(effect => {
      // 4. 执行清理函数（如果有）
      if (effect.destroy) {
        effect.destroy();
      }
      
      // 5. 执行 Effect 回调
      const destroy = effect.create();
      
      // 6. 存储清理函数
      effect.destroy = destroy;
    });
  });
}
```

#### 实际代码示例

```javascript
// 提交阶段：Passive Effects

function commitRoot(fiberRoot) {
  // 1. Before Mutation
  commitBeforeMutationEffects(fiberRoot);
  // 调度 useEffect（不执行）
  
  // 2. Mutation
  commitMutationEffects(fiberRoot);
  // 操作 DOM
  
  // 3. Layout
  commitLayoutEffects(fiberRoot);
  // 执行 useLayoutEffect
  
  // 4. Passive Effects
  schedulePassiveEffects(fiberRoot);
  // 执行 useEffect ✅
}
```

## 📊 完整流程

### 时间线

```
协调阶段（Render Phase）
  ↓
  执行组件函数
  ↓
  收集 useEffect
  ↓
  调度 useEffect（存储到 updateQueue）
  ↓
  不执行 effect.create()
  ↓
协调阶段完成
  ↓
提交阶段（Commit Phase）
  ↓
  Before Mutation
  ↓
  Mutation
  ↓
  Layout
  ↓
  Passive Effects
  ↓
  收集所有 Effect
  ↓
  执行 effect.create() ✅
  ↓
  存储清理函数
  ↓
完成
```

## 🔑 关键理解点

### 1. 调度 = 存储

```javascript
// 调度就是存储，不执行

// 协调阶段
scheduleEffect(effect);
// 将 effect 存储到 fiberNode.updateQueue
// 不执行 effect.create()

// 提交阶段
executeEffects(effects);
// 从 updateQueue 取出 effect
// 执行 effect.create()
```

### 2. 为什么需要调度？

```javascript
// 为什么需要调度？

// 1. 协调阶段可能被中断
// 如果立即执行 useEffect，可能会在错误的时机执行

// 2. 需要批量执行
// 多个 useEffect 可以批量执行，提高性能

// 3. 需要正确的执行顺序
// 在提交阶段执行，确保 DOM 已经更新
```

### 3. 存储在哪里？

```javascript
// useEffect 存储在哪里？

// 存储在 Fiber 节点的 updateQueue 中

fiberNode.updateQueue = {
  lastEffect: effectObject,  // 最后一个 Effect
  effects: [                 // Effect 数组
    {
      tag: 'useEffect',
      create: () => console.log('执行了'),
      deps: [],
      destroy: null,
      next: effectObject2
    },
    {
      tag: 'useEffect',
      create: () => console.log('执行了2'),
      deps: [],
      destroy: null,
      next: effectObject  // 循环链表
    }
  ]
};
```

## 🎨 实际示例

### 完整的 useEffect 流程

```typescript
// 组件代码
function Component() {
  useEffect(() => {
    console.log('useEffect 1');
  }, []);
  
  useEffect(() => {
    console.log('useEffect 2');
  }, []);
  
  return <div>Content</div>;
}
```

#### 协调阶段：调度

```javascript
// 协调阶段：调度 useEffect

function renderComponent(fiberNode) {
  // 1. 执行组件函数
  const result = Component();
  
  // 2. 收集 useEffect
  const effects = [
    { create: () => console.log('useEffect 1'), deps: [] },
    { create: () => console.log('useEffect 2'), deps: [] }
  ];
  
  // 3. 调度 useEffect（存储）
  effects.forEach(effect => {
    scheduleEffect(fiberNode, effect);
    // 存储到 fiberNode.updateQueue
    // 此时不执行
  });
  
  return result;
}
```

#### 提交阶段：执行

```javascript
// 提交阶段：执行 useEffect

function schedulePassiveEffects(fiberRoot) {
  // 1. 收集所有 Effect
  const effects = collectPassiveEffects(fiberRoot);
  // effects = [
  //   { create: () => console.log('useEffect 1'), deps: [] },
  //   { create: () => console.log('useEffect 2'), deps: [] }
  // ]
  
  // 2. 调度执行（异步）
  scheduleCallback(NormalPriority, () => {
    // 3. 执行所有 Effect
    effects.forEach(effect => {
      effect.create();  // 执行
      // 输出: 'useEffect 1'
      // 输出: 'useEffect 2'
    });
  });
}
```

## 📈 调度机制的优势

### 1. 批量执行

```javascript
// 批量执行多个 useEffect

// 协调阶段：调度多个 useEffect
scheduleEffect(effect1);
scheduleEffect(effect2);
scheduleEffect(effect3);

// 提交阶段：批量执行
executeEffects([effect1, effect2, effect3]);
// 一次性执行所有 Effect，提高性能
```

### 2. 正确的执行时机

```javascript
// 在正确的时机执行

// 协调阶段：调度
scheduleEffect(effect);
// DOM 可能还没有更新

// 提交阶段：执行
executeEffects(effects);
// DOM 已经更新，可以安全执行
```

### 3. 可中断性

```javascript
// 协调阶段可能被中断

// 协调阶段：调度
scheduleEffect(effect);
// 如果被中断，Effect 已经存储，不会丢失

// 提交阶段：执行
executeEffects(effects);
// 即使协调阶段被中断，Effect 仍然可以执行
```

## 🎯 总结

### "调度"的含义

1. **调度 = 存储**
   - 将 useEffect 存储到 Fiber 节点的 updateQueue
   - 不立即执行

2. **执行 = 在适当的时机执行**
   - 在提交阶段的 Passive Effects 子阶段执行
   - 确保 DOM 已经更新

### 完整流程

```
协调阶段：
  执行组件函数
  ↓
  收集 useEffect
  ↓
  调度 useEffect（存储到 updateQueue）
  ↓
  不执行

提交阶段：
  收集所有 Effect
  ↓
  执行 effect.create() ✅
  ↓
  存储清理函数
```

### 关键理解

- **调度**：将 useEffect 存储到 updateQueue，不执行
- **执行**：在提交阶段的 Passive Effects 子阶段执行
- **为什么需要调度**：确保在正确的时机执行，可以批量执行，提高性能

**所以"调度"就是将函数存储起来，在提交阶段的 Passive Effects 再执行！**

