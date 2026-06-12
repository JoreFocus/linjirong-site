# Progress Spec

`docs/progress.md` 是运行态入口，每次 Session 开始必读。

## 4 个区块

### Now
当前正在推进的需求 ID + 所处阶段。只有一个焦点。

### Next
下一个应推进的需求（优先级最高的 draft 或 paused 条目）。

### Current Plan
当前需求的 Phase / Task 执行清单。Conductor 在 planning 阶段创建，executing 阶段逐步勾选。

格式：
```
### REQ-NNN
- Phase 1: [Phase 目标]
  - [x] task 1.1（已完成）
  - [ ] task 1.2（待做）
- Phase 2: [Phase 目标]
  - [ ] task 2.1
```

### Latest Handoff
Session 结束时更新，确保下一个 Session 可无歧义接续。见 handoff-spec.md。
