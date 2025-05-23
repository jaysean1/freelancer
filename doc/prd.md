# loadshift chrome extension demo

## 简介
我需要制作一款 loadshift 网站的chrome extension，用于产品面试时候的功能演示
loadshift是一家提供卡车运输服务的网站，用户可以发布卡车运输任务，卡车司机可以接单并完成运输任务
我需要面试的是loadshift的用户增长产品经理的职位
我需要在demo中体现出我对于用户增长的思考，以及我对于loadshift的用户增长的策略

## 功能说明
- 功能不需要使用真实数据，所有数据和流程均使用mock的方式实现，不需要调用真实的api相关服务

- 我需要通过一个chrome extension来实现demo，插件主要是面向卡车司机的，通过llm,并且调用相关的mcp工具来帮助卡车司机更快得找到运输任务，并安排自己的运输计划。chrome extension需要实现的功能包括：
    - 用户上传自己的卡车信息，以及输入自己希望的运输任务，比如时间，货物类型，重量，货物数量等
    - 完成输入后，点击‘find perfect match’，进去分析页面
    - 分析页面内顶部展示进度条，进度包含：
        - 分析用户需求
        - 搜索匹配的运输任务
        - 获取任务详情
        - 匹配用户需求
        - 生成运输计划
    - 进度条完成后，下方展示运输计划列表：
    - 点击具体的运输计划，进入运输计划详情页面
    - 运输计划详情页内，展示通过大模型分析后的具体分析结果，在结果页面中除了基础的运输信息外，重点展示大模型的分析结果，包括：
        - 成本分析：根据卡车的类型，卡车的载重，卡车的油耗等因素，运输的距离，运输货物的重量等因素计算出运输任务的总成本。
        - 天气分析：根据运输的路线，展示沿途的天气情况，包括温度，湿度，风速，降雨等因素。进行出行安全评估
        - 交通/时长分析：根据运输的路线，分析需要运输的时长，展示沿途的交通情况，包括交通拥堵，交通事故等因素。分析运输路线的可行性，给出建议的运输路线。
        - 总结：根据以上分析，给出运输计划的建议，包括运输路线，运输时长，运输成本等因素。
        - 发起bid的按钮，点击后，跳转到loadshift的网站，完成bid的流程
  
## 功能详情
# Loadshift Chrome插件Demo功能详情设计 

## 核心目标

- 通过智能化工具提升卡车司机的工作效率与盈利能力，从而增强用户粘性，驱动Loadshift平台的用户增长。

## 插件主界面 (Popup UI)

- 目的： 快速收集司机需求，提供个性化体验，降低使用门槛。
  - 卡车信息上传/管理：
    - 功能： 用户首次使用时，引导上传卡车信息：车型（如：平板车、冷藏车、厢式货车）、车牌号（可选，用于个性化）、最大载重 (吨)、油耗 (升/百公里或$/公里)、车辆长度/高度/宽度（用于特定任务匹配）。
    - 支持保存多辆卡车信息，并可以为每辆卡车设置一个昵称（如：“我的大家伙”、“省油小能手”）。
    - 允许编辑和删除已保存的卡车信息。
  - 运输任务偏好输入：
    - 功能： 出发地/目的地： 文本输入， (mock阶段可简化为文本输入)。
    - 📍期望出发时间/日期范围： 日期选择器。
    - 货物类型： 下拉菜单或标签选择（如：普货、建材、冷链食品、危险品 - mock数据中体现差异性）。
    - 货物重量 (吨)： 数字输入，可关联卡车载重进行提示。
    - ⚖️货物数量/体积 (可选)： 根据货物类型决定是否需要。
    - 其他偏好 (可选)： 如“期望最短路线”、“避开高速”、“夜间运输优先”等，通过勾选或标签实现。
  - “Find Perfect Match” (寻找完美匹配) 按钮：
    - 功能： 点击后，收集当前表单所有信息，跳转到分析页面。
- 注意：页面内所有输入框，都必须有mock数据，便于功能演示，不需要手动进行输入


## 分析页面

- 目的： 在等待分析结果时，通过进度条维持用户注意力，并初步展示AI分析的价值。
  - 顶部动态进度条：
    - 阶段展示：➡️ 分析用户需求 (Analyzing Your Needs)： 快速完成，表示系统已理解输入。
    - ➡️ 搜索匹配的运输任务 (Searching for Matching Loads)： 模拟搜索过程，进度条可稍作停留。
    - ➡️ 获取任务详情 (Fetching Load Details)： 模拟API调用获取具体任务信息。
    - ➡️ 智能匹配与评估 (Smart Matching & Assessing)： 模拟LLM根据用户需求和卡车信息进行深层匹配。
    - ➡️ 生成运输计划 (Generating Transport Plans)： 模拟LLM整合信息，输出最终方案。
  - 视觉与提示：
    - 每个阶段配上简约图标。
    - 进度条下方可附带一句话动态提示，如：“正在为您筛选高价值订单...”、“考虑您的油耗为您优化路线...”
    - 注意，在进度条加载过程中，下方需要有运输计划加载的骨架图
  - 进度条完成后，下方展示运输计划列表 (mock数据)：
    - 列表项概要信息：
      - 任务标题/编号： (例如：“悉尼到墨尔本 - 电子产品运输”)
      - 预计利润： (mock一个吸引人的数字，如 “预估利润：$XXX - $YYY”)
      - 主要路线： (例如：“悉尼 → 堪培拉 → 墨尔本”)
      - 总里程与预估时长： (例如：“约 880公里，预计 10-12 小时”)
    - ⏱️匹配度评分 (可选)： (例如：“AI匹配度：★★★★★”)
    - 交互： 点击任一计划，进入详情页。

## 运输计划详情页面

- 目的： 集中展示LLM的分析能力，提供全面、有价值的决策支持信息，打动用户。
  - 基础运输信息 (回顾)：
    - 任务名称/编号
    - 发货方/收货方 (mock名称)
    - 货物描述 (类型、重量、体积)
    - 装货/卸货地点要求的时间窗口
  - LLM分析结果模块 (重点！)：
    - 💰 成本分析 (Cost Analysis)：
      - 输入因素 (后台模拟计算逻辑)：卡车油耗 (用户输入)当前平均油价 (mock一个参考值)运输总里程 (根据路线估算)预估路桥费 (mock一个参考值，可根据路线复杂性调整)货物重量对油耗的影响因子 (简单模拟，如重货油耗增加X%)车辆日常维护成本分摊 (mock一个小额固定值或按里程计算)
      - 展示内容：
        - 总预估成本： $XXX
        - 成本构成饼图/列表：燃油费：$AAA (占比XX%)路桥费：$BBB (占比YY%)维护保养：$CCC (占比ZZ%)
        - 盈利预测 (如果可以mock一个任务报价)： 任务报价 - 总预估成本 = 预估利润
    - 🌦️ 天气分析 (Weather Analysis)：
      - 输入因素 (后台模拟逻辑)：运输路线 (主要城市节点)运输日期/时间段
      - 展示内容：
        - 路线沿途天气概览： 以列表或时间轴形式展示主要途经城市在运输时间段内的天气预报 (mock数据：温度、湿度、风速、降雨概率、天气图标)。
        - 出行安全评估：“整体天气良好，适合出行。”“注意！墨尔本地区预计有中雨，请提前做好防雨准备，谨慎驾驶。”“途经地区可能有大风，请注意行车安全。”
    - 🚦 交通/时长分析 (Traffic & Duration Analysis)：
      - 输入因素 (后台模拟逻辑)：运输路线出发时间 (考虑高峰期因素)
      - 展示内容：
        - 预估总运输时长： XX 小时 (可包含休息时间估算)
        - 建议路线图 (静态图片或简单SVG示意图)： 标记起点、终点、主要途经点。
        - 沿途交通状况提要 (mock)：“M31高速公路XX路段可能存在日常拥堵，建议在X点前通过。”“近期G12国道有道路维修，可能造成短时延误。”“整体路况良好，按计划行驶即可。”
        - 路线可行性评估与建议：“此路线为最优选择，兼顾里程与时间。”“备选路线B：里程增加30公里，但可避开XX拥堵点，高峰期可考虑。” (mock一个备选项)
    - 📝 总结与建议 (Summary & Recommendations)：
      - 综合评估： “这是一个高价值的运输任务，AI综合评分4.8/5.0。”
      - 核心建议：“建议接单！预估利润可观。”“最佳出发时间：XX月XX日 上午XX点，以避开早高峰。”“首选路线：XXX → YYY → ZZZ，总成本约 $ABC。”“请注意墨尔本的降雨天气，并检查轮胎状况。”
    - “发起Bid” (Initiate Bid) 按钮：
      - 功能： 点击后，跳转到Loadshift网站对应的任务页面 (mock阶段可跳转到Loadshift首页或一个固定的mock任务页)。
      - 固定跳转到页面，地址：https://www.loadshift.com.au/projects/car/Toyota-Rav-Hybrid-39431525/details
      
    