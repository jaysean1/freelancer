# design rules

1. 用户体验分析：先分析这个app的主要功能和用户需求，确定核心交互逻辑。
2. 高保真 UI 设计：作为 UI 设计师，设计贴近真实小程序设计规范的界面，使用现代化的 UI 元素，使其具有良好的视觉体验。
3. HTML 原型实现：使用 HTML + Tailwind CSS (或 Bootstrap) 生成所有原型界面，并使用 FontAwesome (或其他开源 UI 组件) 让界更加精美、接近真实的 App 设计。
4. 拆分代码文件，保持结构清晰：
    - 设计合理的目录结构：使用/public,/app 等不同的目录去存放不同的文件。
5. 每个界面应作为独立的 HTML 文件存放，例如 home.html、profile.html、settings.html 等：
6. 使用index.html 作为主入口，不直接写入所有界面的 HTML 代码，而是使用 iframe 的方式嵌入这些 HTML 片段，并将所有页面直接平铺示在 index 页面中，而不是跳转链接。
7. 在index 的页面内，为每个功能页面增加页面名称以及简单的功能说明。并使用分割线区分每个不同类型的功能页面。便于阅读。
8. 真实感增强：
    - 使用真实的 UI 图片，而非占位符图片 (可从 Unsplash、Pexels、Apple 官方 UI 资源中选择)。
    - 使用lucide icon 组件库为产品添加icon
9. 请按照以上要求生成完整的 HTML 代码，并确保其可用于实际开发。