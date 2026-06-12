# Backlog Spec

`docs/backlog.csv` 是需求状态的唯一真相源。

## 列定义

| 列 | 说明 | 取值 |
|----|------|------|
| id | 需求编号 | REQ-NNN |
| title | 需求标题 | 简短描述 |
| 复杂度 | 规模评估 | S / M / L |
| pipeline_status | 当前阶段 | draft / designing / planning / executing / acceptance / done |
| ux_surface | 是否涉及用户界面/体验 | yes / no |
| 文档 | PRD 目录路径 | docs/requirements/REQ-NNN/ |
| 阻塞原因 | 暂停时填写，解除后清空 | 自由文本 |
| 版本 | 归属版本 | v1.0 / v1.1 等 |
| 备注 | 其他信息 | 自由文本 |

## 复杂度定义

- **S**：单文件或单函数改动，< 1 天工作量。可跳过 designing 和 planning
- **M**：2-3 个文件，跨层改动，1-3 天工作量
- **L**：跨模块，可能涉及架构变更，> 3 天工作量

## 状态流转

```
draft → designing → planning → executing → acceptance → done
```

S 级快捷路径：`draft → executing → acceptance → done`
