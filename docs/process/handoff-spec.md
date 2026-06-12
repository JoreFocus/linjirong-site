# Handoff Spec

Session 结束时，Conductor 必须在 `docs/progress.md` 的 `Latest Handoff` 区块写入以下 4 个字段：

```
**当前状态**：[需求 ID + 所处阶段 + 一句话描述当前进展]
**已完成**：[本 Session 完成的具体 task 列表]
**下一步**：[下一个 Session 应执行的第一个动作，要具体到角色和任务]
**注意事项**：[阻塞原因 / 待 PM 决策的事项 / 技术风险提示]
```

## 要求

- **可接续性**：下一个 Session 只读 Latest Handoff 就知道从哪开始，不需要回看聊天记录
- **具体性**：「下一步」必须是可执行的动作，如「委派 Architect 做 REQ-002 的技术设计」，而不是「继续推进」
- **及时性**：每次 Session 结束前必须更新，不能遗漏
