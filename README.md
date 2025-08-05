# Edu3D

[![GitHub stars](https://img.shields.io/github/stars/eipes/edu3d?style=social)](https://github.com/eipes/edu3d/stargazers)
[![Fork](https://img.shields.io/github/forks/eipes/edu3d?style=social)](https://github.com/eipes/edu3d/fork)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

一个开源的 3D 知识点动画库，旨在通过交互式网页动画，让中小学知识（如数学、物理、生物等）变得生动、直观、易于理解。

[**➡️ 访问线上站点**](https://eipes.github.io/edu3d/)  <!-- 替换成你的 Vercel 或 GitHub Pages 链接 -->

![Project Screenshot](./public/assets/project-screenshot.png)
<!-- 建议你截一张最终页面的图片，放在这个位置，并命名为 project-screenshot.png -->

---

## ✨ 项目理念

我们相信，复杂抽象的知识点（如立体几何、行星运动、分子结构）可以通过 3D 可视化变得简单。本项目旨在创建一个由全球开发者社区共同构建和维护的知识动画库，为学生、教师和所有热爱学习的人提供免费、高质量的学习资源。

*   **开源协作**：任何人都可以贡献自己的 3D 动画作品。
*   **简单易用**：无需注册，通过简单的 GitHub Pull Request 即可完成贡献。
*   **技术开放**：你可以使用任何你喜欢的 Web 3D 技术（Three.js, Babylon.js, WebGL 等）来创作。
*   **完全免费**：所有内容和代码均在 MIT 许可下开源。

## 🚀 如何贡献你的作品

贡献一个 3D 动画非常简单！你只需要创建一个 HTML 文件和一些描述信息。

### 步骤 1: Fork 本仓库

点击本页面右上角的 **Fork** 按钮，将此项目复制到你自己的 GitHub 账户下。

### 步骤 2: 克隆你的 Fork

将你 Fork 的仓库克隆到本地：

```bash
git clone https://github.com/eipes/edu3d.git
cd edu3d
```

### 步骤 3: 创建你的贡献内容

1. 在 contributions 目录下，为你的作品创建一个新的文件夹。文件夹名称应使用简短的英文或拼音，例如 pythagorean-theorem 或 ziyouluoti。

```
contributions/
└── pythagorean-theorem/  <-- 这是你的新文件夹
```

2. 在你的文件夹中，创建以下两个必须的文件：

* index.html: 这是你的 3D 动画网页。它可以是完全独立的，所有 CSS 和 JS 最好内联或放在同一文件夹下，以确保其可移植性。

* manifest.json: 描述你的作品的元数据。

3. manifest.json 文件格式如下，请务必填写完整：

```
{
  "title": "勾股定理的可视化证明",
  "description": "通过一个 3D 动画演示切割和重组正方形面积来证明 a² + b² = c²。",
  "author_github": "your-github-username",
  "tags": ["数学", "几何", "初中", "勾股定理"],
  "subject": "数学",
  "grade_level": ["初中"]
}
```

* title: 作品的标题。

* description: 对作品的简短描述。

* author_github: 你的 GitHub 用户名，用于展示作者信息。

* tags: 相关的关键词标签，便于搜索。

* subject: 所属学科 (如: 数学, 物理, 化学, 生物)。

* grade_level: 适用年级 (如: 小学, 初中, 高中)。


### 步骤 4: 提交 Pull Request

将你的改动提交，并向上游（原始仓库）发起一个 Pull Request。

```
git add .
git commit -m "feat: add pythagorean theorem demo"
git push origin main
```

然后回到你的 GitHub 页面，点击 "Contribute" -> "Open pull request"。

我们会审核你的提交。一旦合并，你的作品就会通过自动化流程被构建、生成缩略图，并最终展示在我们的网站上！

## 💡 灵感清单 & 待办任务 (To-Do List)

我们整理了一些非常适合用 3D 动画来呈现的知识点，希望能给你带来灵感。如果你正在寻找可以贡献的点子，不妨从这里开始！

当然，这个列表远非全部，我们更欢迎你提出并实现自己的创意！

如果你决定开始制作列表中的某个项目，可以先创建一个 Issue 来认领它，这样可以避免和其他人重复工作。

### 📐 数学 (Mathematics)

* 立体几何

  * 圆锥/圆柱/球体的体积推导（刘徽割圆术、卡瓦列里原理）。

  * 柏拉图多面体（正四面体、正六面体、正八面体等）的展开与闭合。

  * 莫比乌斯环的特性展示（一只蚂蚁在上面爬行）。



* 微积分

  * 定积分的黎曼和可视化（从矩形逼近到曲线下面积）。

  * 极限的概念（ε-δ 定义的可视化）。

  * 二元函数的 3D 曲面图（例如 z = x² + y²）。



* 线性代数

  * 向量的点乘与叉乘的几何意义。

  * 矩阵变换（旋转、缩放、错切）对一个 3D 模型的影响。



### 🔬 物理 (Physics)

* 力学

  * 行星运动与开普勒三定律。

  * 单摆与双摆的运动轨迹（展示混沌现象）。

  * 陀螺仪的进动现象。



* 电磁学

  * 电磁场与磁感线的 3D 可视化（围绕条形磁铁或通电导线）。

  * 发电机与电动机的工作原理。

  * 电磁波的传播（电场和磁场正交振动前进）。



* 光学

  * 光的衍射与干涉现象（如杨氏双缝干涉）。

  * 棱镜分光（色散现象）。



### 🧪 化学 (Chemistry)

* 分子结构

  * 常见分子的 3D 模型（水、甲烷、乙醇、苯环）。

  * sp, sp², sp³ 杂化轨道的空间构型。

  * 手性异构体的对映关系（像照镜子一样）。



* 晶体结构

  * 氯化钠（NaCl）或金刚石的晶胞结构。

  * 金属晶体的不同堆积方式（体心立方、面心立方）。



### 🧬 生物 (Biology)

* 分子生物学

  * DNA 双螺旋结构的交互式展示（可以旋转、缩放、查看碱基对）。

  * 蛋白质的折叠过程（从肽链到空间结构）。



* 细胞生物学

  * 动物/植物细胞的 3D 模型及主要细胞器。

  * 细胞膜的流动镶嵌模型。



* 人体生理学

  * 心脏的搏动与血液循环。

  * 神经冲动在轴突上的传导。



## 🪐 天文与地理 (Astronomy & Geography)

* 地球公转与四季的形成（地轴倾斜的影响）。

* 日食与月食的成因与动态过程。

* 板块构造与大陆漂移的动画。
