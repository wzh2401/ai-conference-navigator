import { Speaker } from "./types";

export const speakers: Speaker[] = [
  {
    id: "zhang-wei",
    name: "张伟",
    title: "AI创业者 / 前字节跳动产品总监",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=zhangwei&backgroundColor=1e293b",
    audioSrc: "/audio/zhang-wei.mp3",
    dao: [
      {
        quote: "AI不是工具，它是你团队里最便宜的实习生",
        explanation: "很多人把AI当搜索引擎用，其实AI更像一个随时待命、永不抱怨的初级员工，你给它明确任务它就能帮你完成大量重复性工作，释放你的精力去做真正需要判断力的事。",
        timestamp: "00:03:45",
      },
      {
        quote: "普通人用AI做加法，高手用AI做乘法",
        explanation: "加法是用AI提升效率，比如写作更快；乘法是用AI重构业务模型，让一个人能做十个人的事，甚至开创新的商业模式。两者之间有质的差别。",
        timestamp: "00:12:20",
      },
      {
        quote: "未来竞争力不是你懂多少，而是你能调动多少",
        explanation: "知识本身已经被AI商品化了，真正稀缺的是整合资源、驾驭AI的能力。会用AI的人能调动海量知识和工具，而不会用的人则被替代。",
        timestamp: "00:28:10",
      },
    ],
    fa: [
      {
        title: "三步提示词框架",
        description: "让AI输出质量提升80%的结构化提问法",
        content: "第一步：定义角色——告诉AI它是谁，比如「你是一位有10年经验的营销策划」\n第二步：描述背景——给出足够的上下文，包括目标用户、产品特点、竞争环境\n第三步：明确输出——指定格式、字数、风格，比如「输出3个方案，每个100字，用列表格式」",
        timestamp: "00:18:33",
      },
      {
        title: "AI项目冷启动模型",
        description: "从想法到第一个付费用户的最短路径",
        content: "验证阶段（1周）：用AI生成落地页和产品描述，投放小额广告测试市场反应\n构建阶段（2-4周）：用No-code工具+AI搭建MVP，不写一行代码\n增长阶段：用AI自动化内容生产、客服回复、数据分析",
        timestamp: "00:35:50",
      },
    ],
    shu: [
      {
        step: 1,
        title: "用AI批量生产内容",
        description: "准备5-10个种子内容样本，让AI学习你的风格，然后批量生成变体。每天30分钟可产出普通人一周的内容量。",
        tools: ["Claude", "ChatGPT", "Notion AI"],
        timestamp: "00:42:15",
      },
      {
        step: 2,
        title: "构建个人AI工作流",
        description: "用Zapier或Make将AI工具串联起来，实现：收到邮件→AI自动分类→生成回复草稿→推送到手机审核。减少70%邮件处理时间。",
        tools: ["Zapier", "Make", "Gmail"],
        timestamp: "00:48:30",
      },
      {
        step: 3,
        title: "AI辅助决策分析",
        description: "遇到复杂决策时，把所有已知信息喂给AI，让它扮演不同角色（乐观派、悲观派、中立分析师）给出多角度分析，再由你做最终判断。",
        tools: ["Claude", "ChatGPT"],
        timestamp: "00:55:00",
      },
      {
        step: 4,
        title: "打造AI知识库",
        description: "把你的行业资料、客户反馈、历史案例上传到AI知识库，让AI基于你的专属数据回答问题，而不是通用知识。",
        tools: ["Notion", "Dify", "FastGPT"],
        timestamp: "01:02:40",
      },
    ],
    qi: [
      {
        name: "Claude",
        category: "AI对话",
        description: "Anthropic出品，长文处理和逻辑推理能力强，适合复杂任务分析和内容创作",
        url: "https://claude.ai",
      },
      {
        name: "Midjourney",
        category: "图像生成",
        description: "目前最流行的AI图像生成工具，出图质量高，适合营销素材和创意设计",
        url: "https://midjourney.com",
      },
      {
        name: "Dify",
        category: "AI应用开发",
        description: "国内团队出品的开源AI应用构建平台，可以不写代码搭建AI工作流和知识库",
        url: "https://dify.ai",
      },
      {
        name: "Zapier",
        category: "自动化工具",
        description: "连接5000+应用的自动化平台，将AI工具与日常软件串联，实现工作流自动化",
        url: "https://zapier.com",
      },
      {
        name: "Notion AI",
        category: "知识管理",
        description: "内置AI的笔记和项目管理工具，可直接在文档中调用AI写作、总结、翻译",
        url: "https://notion.so",
      },
    ],
  },
  {
    id: "li-na",
    name: "李娜",
    title: "独立内容创作者 / 年入百万自媒体",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=lina&backgroundColor=1e293b",
    audioSrc: "/audio/li-na.mp3",
    dao: [
      {
        quote: "流量不是目的，信任才是资产",
        explanation: "很多人追求播放量和粉丝数，但真正值钱的是粉丝对你的信任。10万高信任粉丝比100万泛粉丝更有商业价值，因为他们会为你的推荐付钱。",
        timestamp: "00:05:20",
      },
      {
        quote: "内容创作的本质是持续降低读者的决策成本",
        explanation: "好内容不是展示你有多厉害，而是帮读者在某个领域做出更好的决策。你帮他们省下的时间和认知负担，就是他们愿意关注你的理由。",
        timestamp: "00:19:45",
      },
      {
        quote: "AI时代最值钱的是你独特的人生经历和视角",
        explanation: "AI可以写出技术正确的文章，但无法复制你的真实故事、失败经历和个人洞察。这些才是算法无法替代的内容护城河。",
        timestamp: "00:33:10",
      },
    ],
    fa: [
      {
        title: "内容飞轮模型",
        description: "一份内容，七个平台，三十天持续发酵",
        content: "核心内容：每周1篇深度文章（2000字以上）\n拆解层：将核心内容拆成5-7条短视频脚本\n分发层：同步到抖音、视频号、B站、小红书、公众号\n互动层：收集评论中的高频问题，作为下一篇内容的选题\n沉淀层：每月整理成合集或电子书",
        timestamp: "00:25:30",
      },
    ],
    shu: [
      {
        step: 1,
        title: "选题公式：痛点+人群+解决方案",
        description: "每个爆款内容都满足这个公式。先找到目标人群最痛的问题，再提供一个具体可执行的解决方案，标题直接点明。",
        tools: ["微信指数", "百度热搜", "抖音热点"],
        timestamp: "00:40:00",
      },
      {
        step: 2,
        title: "AI辅助内容生产SOP",
        description: "①用AI头脑风暴10个选题→②人工筛选1个→③AI生成大纲→④人工加入个人故事和数据→⑤AI润色和排版→⑥人工审核发布",
        tools: ["Claude", "秘塔AI搜索"],
        timestamp: "00:46:20",
      },
      {
        step: 3,
        title: "私域转化三步走",
        description: "公域引流（免费干货）→私域沉淀（社群/公众号）→产品转化（课程/咨询/带货）。每个环节都要设计钩子，让用户自然流向下一步。",
        tools: ["企业微信", "小鹅通", "有赞"],
        timestamp: "00:58:15",
      },
    ],
    qi: [
      {
        name: "秘塔AI搜索",
        category: "AI搜索",
        description: "无广告的AI搜索引擎，适合内容创作者快速调研、核实数据和寻找素材",
        url: "https://metaso.cn",
      },
      {
        name: "小鹅通",
        category: "知识变现",
        description: "国内主流知识付费平台，支持课程、训练营、社群等多种变现形式",
        url: "https://xiaoe-tech.com",
      },
      {
        name: "剪映",
        category: "视频剪辑",
        description: "字节跳动出品的视频剪辑工具，内置AI字幕、AI配音等功能，适合自媒体快速出片",
      },
      {
        name: "即梦AI",
        category: "视频生成",
        description: "字节跳动出品的AI视频生成工具，可用文字或图片生成短视频片段",
        url: "https://jimeng.jianying.com",
      },
    ],
  },
  {
    id: "wang-peng",
    name: "王鹏",
    title: "电商操盘手 / AI+电商实践者",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=wangpeng&backgroundColor=1e293b",
    audioSrc: "/audio/wang-peng.mp3",
    dao: [
      {
        quote: "电商的下半场是供应链+AI的结合",
        explanation: "纯流量打法已经卷到极致，未来的竞争力在于用AI优化供应链效率——从选品、定价到库存管理，每个环节都有AI介入的空间。",
        timestamp: "00:08:15",
      },
      {
        quote: "消费者买的不是产品，是解决方案和情绪价值",
        explanation: "在AI帮助下，卖家可以快速生产大量产品描述，但真正打动人的是「这个产品能帮我解决什么具体问题」和「买它让我感觉更好」。AI可以帮你分析，但洞察需要人来完成。",
        timestamp: "00:22:40",
      },
    ],
    fa: [
      {
        title: "AI选品五维分析法",
        description: "用AI替代人工，快速筛选出高潜力产品",
        content: "维度一：市场规模（月搜索量>10万）\n维度二：竞争程度（头部卖家月销<5000）\n维度三：利润空间（毛利率>50%）\n维度四：差评分析（竞品差评揭示改进机会）\n维度五：趋势预测（Google Trends连续3个月上升）\n用AI自动抓取和分析这五个维度的数据，每天可筛选500+产品",
        timestamp: "00:30:00",
      },
      {
        title: "AI客服自动化模型",
        description: "将80%客服问题自动化处理，人工只处理复杂投诉",
        content: "搭建知识库：收集历史客服记录，整理成FAQ\n训练AI：用知识库训练专属客服AI\n接入渠道：对接旺旺、微信、抖音等客服入口\n人工兜底：AI无法处理的转人工，同时记录为新的训练数据",
        timestamp: "00:45:10",
      },
    ],
    shu: [
      {
        step: 1,
        title: "用AI批量生成产品描述",
        description: "准备产品参数表格，让AI按照品类最佳实践生成详情页文案。一个SKU原来需要2小时，现在10分钟。",
        tools: ["Claude", "ChatGPT"],
        timestamp: "00:52:30",
      },
      {
        step: 2,
        title: "竞品差评挖金矿",
        description: "抓取竞品Top差评，让AI分析共性问题，找出你可以改进的产品机会或差异化卖点。",
        tools: ["八爪鱼采集器", "Claude"],
        timestamp: "01:00:45",
      },
      {
        step: 3,
        title: "AI定价策略优化",
        description: "将历史销售数据、竞品价格、库存情况喂给AI，让它推荐最优定价策略。测试表明AI建议的动态定价比固定定价提升15-20%利润。",
        tools: ["Python", "Claude API", "Excel"],
        timestamp: "01:08:20",
      },
    ],
    qi: [
      {
        name: "八爪鱼采集器",
        category: "数据采集",
        description: "可视化网页数据爬取工具，不需要编程基础，适合采集竞品数据和市场调研",
        url: "https://www.bazhuayu.com",
      },
      {
        name: "店小秘",
        category: "电商工具",
        description: "跨境电商ERP系统，支持多平台订单管理、库存同步、物流追踪",
        url: "https://www.dianxiaomi.com",
      },
      {
        name: "Google Trends",
        category: "趋势分析",
        description: "谷歌免费趋势分析工具，可查看关键词搜索热度变化，用于选品和市场预测",
        url: "https://trends.google.com",
      },
    ],
  },
];
