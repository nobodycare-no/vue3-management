module.exports = {
    menus: [
        {
            path: "/",
            name: "首页",
            icon: "House"
        },
        {
            path: "/project",
            name: "项目基础信息",
            icon: "Histogram"
        },
        {
            path: "/tunnel",
            name: "隧道设计信息",
            icon: "PieChart"
        },
        {
            path: "/work",
            name: "工作监督管理",
            icon: "Connection"
        },
        {
            path: "/build",
            name: "施工监控检测",
            icon: "Notification",
            children: [
                {
                    path: "/plan",
                    name: "检测计划"
                },
                {
                    path: "/section",
                    name: "切面检测"
                }
            ]
        },
        {
            path: "/geological",
            name: "超前地质预报",
            icon: "TrendCharts"
        },
        {
            path: "/system",
            name: "系统信息管理",
            icon: "Tools"
        }
    ]
}