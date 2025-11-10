# React Fiber 的工作循环和组件生命周期

## 🎯 React Fiber 的工作循环

### 两个主要阶段

React Fiber 的工作循环包括**两个主要阶段**：

1. **协调阶段（Reconciliation/Render Phase）**
   - 也称为 Render Phase
   - 可中断的
   - 不直接操作 DOM

2. **提交阶段（Commit Phase）**
   - 不可中断的
   - 直接操作 DOM
   - 执行副作用

### mounted 不是 Fiber 阶段

**mounted 是组件的生命周期状态**，不是 Fiber 的工作阶段。

## 🔍 详细解析

### 1. 协调阶段（Reconciliation/Render Phase）

#### 特点

- **可中断**：可以被高优先级任务打断
- **不操作 DOM**：只计算变化
- **可以重复**：可能执行多次

#### 主要工作

```javascript
// 协调阶段的工作（简化）

function reconcileChildren(current, workInProgress, nextChildren) {
  // 1. 比较新旧 Fiber 节点（diff）
  // 2. 标记需要更新的节点
  // 3. 创建新的 Fiber 节点
  // 4. 建立 Fiber 树结构
}
```

#### 具体步骤

```javascript
// 协调阶段的具体步骤

function renderPhase(fiberNode) {
  // 1. 开始工作
  beginWork(fiberNode);
  
  // 2. 处理子节点
  if (fiberNode.child) {
    renderPhase(fiberNode.child);
  }
  
  // 3. 完成工作
  completeWork(fiberNode);
  
  // 4. 处理兄弟节点
  if (fiberNode.sibling) {
    renderPhase(fiberNode.sibling);
  }
}
```

### 2. 提交阶段（Commit Phase）

#### 特点

- **不可中断**：必须一次性完成
- **操作 DOM**：直接修改 DOM
- **执行副作用**：调用 useEffect、useLayoutEffect 等

#### 主要工作

```javascript
// 提交阶段的工作（简化）

function commitRoot(root) {
  // 1. 提交前（Before Mutation）
  commitBeforeMutationEffects(root);
  
  // 2. 提交（Mutation）
  commitMutationEffects(root);
  
  // 3. 提交后（Layout）
  commitLayoutEffects(root);
  
  // 4. 副作用（Passive Effects）
  schedulePassiveEffects(root);
}
```

#### 具体步骤

```javascript
// 提交阶段的三个子阶段

// 1. Before Mutation（提交前）
function commitBeforeMutationEffects(root) {
  // 执行 getSnapshotBeforeUpdate
  // 调度 useEffect
}

// 2. Mutation（提交）
function commitMutationEffects(root) {
  // 操作 DOM
  // 删除旧节点
  // 插入新节点
  // 更新属性
}

// 3. Layout（提交后）
function commitLayoutEffects(root) {
  // 执行 useLayoutEffect
  // 执行 componentDidMount/Update
  // 更新 refs
}
```

## 📊 完整的工作循环

### Fiber 工作循环

```javascript
// React Fiber 的完整工作循环

function workLoop() {
  while (workInProgress !== null && !shouldYield()) {
    // 协调阶段
    workInProgress = performUnitOfWork(workInProgress);
  }
  
  if (workInProgress === null) {
    // 协调阶段完成，进入提交阶段
    commitRoot(root);
  }
}

// 执行工作单元
function performUnitOfWork(fiberNode) {
  // 1. 开始工作（协调阶段）
  const next = beginWork(fiberNode);
  
  if (next === null) {
    // 2. 完成工作（协调阶段）
    completeUnitOfWork(fiberNode);
  }
  
  return next;
}
```

### 时间线

```
开始
  ↓
协调阶段（Render Phase）
  ├─ beginWork
  ├─ 处理子节点
  ├─ completeWork
  └─ 处理兄弟节点
  ↓
协调阶段完成
  ↓
提交阶段（Commit Phase）
  ├─ Before Mutation
  ├─ Mutation（操作 DOM）
  ├─ Layout
  └─ Passive Effects（useEffect）
  ↓
完成
```

## 🔑 组件生命周期状态

### mounted 是什么？

**mounted 是组件的生命周期状态**，不是 Fiber 的工作阶段。

### 组件生命周期状态

```javascript
// 组件的生命周期状态

const ComponentLifecycle = {
  // 1. 未挂载（Unmounted）
  UNMOUNTED: 'unmounted',
  
  // 2. 挂载中（Mounting）
  MOUNTING: 'mounting',
  
  // 3. 已挂载（Mounted）
  MOUNTED: 'mounted',
  
  // 4. 更新中（Updating）
  UPDATING: 'updating',
  
  // 5. 卸载中（Unmounting）
  UNMOUNTING: 'unmounting'
};
```

### 组件挂载过程

```javascript
// 组件挂载过程（简化）

function mountComponent(fiberNode) {
  // 1. 标记为挂载中
  fiberNode.mode = 'mounting';
  
  // 2. 创建组件实例
  const instance = createInstance(fiberNode);
  
  // 3. 初始化状态
  initializeState(fiberNode);
  
  // 4. 渲染组件
  const children = renderComponent(fiberNode);
  
  // 5. 协调子节点
  reconcileChildren(fiberNode, children);
  
  // 6. 标记为已挂载
  fiberNode.mode = 'mounted';
}
```

## 🎨 水合过程中的阶段

### 水合过程

```javascript
// 水合过程中的阶段

function hydrateRoot(container, element) {
  // 1. 协调阶段（水合）
  const fiberRoot = createFiberRoot(container);
  const workInProgress = createWorkInProgress(fiberRoot.current);
  
  // 2. 协调阶段：建立关联
  workInProgress.child = reconcileHydration(
    container,
    workInProgress.child,
    element
  );
  
  // 3. 协调阶段完成
  fiberRoot.current = workInProgress;
  
  // 4. 提交阶段：操作 DOM
  commitRoot(fiberRoot);
  
  return fiberRoot;
}
```

### 水合中的协调阶段

```javascript
// 水合中的协调阶段

function reconcileHydration(domNode, fiberNode, element) {
  // 1. 建立 DOM ↔ Fiber 关联
  fiberNode.stateNode = domNode;
  domNode.__reactFiber = fiberNode;
  
  // 2. 处理子节点
  let childDOM = domNode.firstChild;
  let childElement = element.props.children;
  
  while (childDOM && childElement) {
    const childFiber = reconcileHydration(
      childDOM,
      createFiber(childElement),
      childElement
    );
    
    if (!fiberNode.child) {
      fiberNode.child = childFiber;
    }
    
    childDOM = childDOM.nextSibling;
    childElement = childElement.next;
  }
  
  return fiberNode;
}
```

### 水合中的提交阶段

```javascript
// 水合中的提交阶段

function commitRoot(fiberRoot) {
  // 1. Before Mutation
  commitBeforeMutationEffects(fiberRoot);
  
  // 2. Mutation（操作 DOM）
  commitMutationEffects(fiberRoot);
  // 此时 DOM 已经更新
  
  // 3. Layout
  commitLayoutEffects(fiberRoot);
  // 此时组件已经挂载（mounted）
  
  // 4. Passive Effects
  schedulePassiveEffects(fiberRoot);
  // 此时 useEffect 可以执行
}
```

## 📈 完整的时间线

### 水合过程的时间线

```
开始水合
  ↓
协调阶段（Render Phase）
  ├─ 建立 DOM ↔ Fiber 关联
  ├─ 初始化状态
  ├─ 创建 Fiber 树
  └─ 标记需要更新的节点
  ↓
协调阶段完成
  ↓
提交阶段（Commit Phase）
  ├─ Before Mutation
  │   └─ 调度 useEffect
  ├─ Mutation
  │   └─ 操作 DOM（如果需要）
  ├─ Layout
  │   ├─ 执行 useLayoutEffect
  │   └─ 组件挂载（mounted）✅
  └─ Passive Effects
      └─ 执行 useEffect ✅
  ↓
水合完成
```

## 🎯 关键理解点

### 1. Fiber 的两个阶段

- **协调阶段（Render Phase）**：可中断，不操作 DOM
- **提交阶段（Commit Phase）**：不可中断，操作 DOM

### 2. mounted 是组件状态

- **mounted** 不是 Fiber 的工作阶段
- 而是组件的生命周期状态
- 在提交阶段的 Layout 子阶段，组件变为 mounted

### 3. useEffect 的执行时机

```javascript
// useEffect 的执行时机

// 1. 协调阶段：调度 useEffect
scheduleEffect(effect);

// 2. 提交阶段：Before Mutation
commitBeforeMutationEffects(root);
// 调度 useEffect（不执行）

// 3. 提交阶段：Layout
commitLayoutEffects(root);
// 组件挂载（mounted）✅

// 4. 提交阶段：Passive Effects
schedulePassiveEffects(root);
// 执行 useEffect ✅
```

## 🔧 修正之前的理解

### 之前的错误理解

```javascript
// ❌ 错误理解
function hydrateComponent(fiberNode) {
  // 建立关联
  // 初始化状态
  // 添加事件
  // 标记为已挂载  ← 这里不对
  fiberNode.mode = 'mounted';
  
  // 调度 useEffect
  scheduleEffect(() => {
    // useEffect 执行
  });
}
```

### 正确的理解

```javascript
// ✅ 正确理解
function hydrateRoot(container, element) {
  // 1. 协调阶段
  const fiberRoot = createFiberRoot(container);
  const workInProgress = reconcileHydration(container, element);
  
  // 2. 提交阶段
  commitRoot(fiberRoot);
  // 在 commitLayoutEffects 中，组件变为 mounted
  // 在 schedulePassiveEffects 中，useEffect 执行
}
```

## 🎯 总结

### React Fiber 的工作循环

1. **协调阶段（Render Phase）**
   - 可中断
   - 不操作 DOM
   - 计算变化

2. **提交阶段（Commit Phase）**
   - 不可中断
   - 操作 DOM
   - 执行副作用

### mounted 是什么？

- **mounted** 是组件的生命周期状态
- 不是 Fiber 的工作阶段
- 在提交阶段的 Layout 子阶段，组件变为 mounted

### useEffect 的执行时机

- 在协调阶段被调度
- 在提交阶段的 Passive Effects 子阶段执行
- 此时组件已经是 mounted 状态

### 水合过程

```
协调阶段（建立关联）
  ↓
提交阶段（操作 DOM）
  ↓
Layout（组件挂载，mounted）✅
  ↓
Passive Effects（useEffect 执行）✅
```

**所以 useEffect 执行时，组件已经是 mounted 状态，水合已经完成！**

