/**
 * ICT设备数据
 * 包含设备名称、图片URL、描述和功能
 */
const ictDevices = [
    {
        id: 1,
        name: "无线路由器",
        image: "./images/router.svg",
        description: "连接多个网络，实现数据包转发并提供无线接入的网络设备",
        function: "负责不同网络之间的数据转发，提供Wi-Fi无线连接，是家庭和企业网络的核心设备"
    },
    {
        id: 2,
        name: "交换机",
        image: "./images/switch.svg",
        description: "连接多个设备，实现数据帧转发的网络设备",
        function: "在同一网络内部转发数据，提供设备间的通信能力"
    },
    {
        id: 4,
        name: "网线",
        image: "./images/network_cable.svg",
        description: "连接网络设备的物理介质，用于传输数据信号",
        function: "提供设备间的物理连接，传输网络数据包"
    },
    {
        id: 5,
        name: "存储设备",
        image: "./images/storage.svg",
        description: "用于存储和管理数据的专用设备",
        function: "提供大容量数据存储"
    },
    {
        id: 8,
        name: "打印机",
        image: "./images/printer.svg",
        description: "将电子文档转换为纸质文档的设备",
        function: "输出文档、图像和照片，支持多种打印格式和质量"
    },
    {
        id: 9,
        name: "网络摄像头",
        image: "./images/webcam.svg",
        description: "通过网络传输视频和图像的摄像设备",
        function: "用于视频会议、安防监控和远程教学等场景"
    },
    {
        id: 10,
        name: "无线接入点",
        image: "./images/access_point.svg",
        description: "提供无线网络接入的设备",
        function: "扩展无线网络覆盖范围，提供Wi-Fi连接服务"
    },
    {
        id: 11,
        name: "硬盘录像机",
        image: "./images/nvr.svg",
        description: "用于记录和存储视频监控数据的专用设备",
        function: "连接多个摄像头，实时记录、存储和管理视频监控数据"
    }
];

/**
 * 问答游戏的问题数据
 */
const quizQuestions = [
    {
        deviceId: 1,
        question: "无线路由器的主要功能是什么？",
        options: [
            "连接多个网络，实现数据包转发并提供Wi-Fi接入",
            "仅提供无线网络接入",
            "存储和管理数据",
            "过滤网络流量，阻止未授权访问"
        ],
        correctAnswer: 0
    },
    {
        deviceId: 11,
        question: "硬盘录像机的主要功能是什么？",
        options: [
            "提供无线网络接入",
            "连接多个摄像头，记录和存储视频数据",
            "处理复杂的图像编辑任务",
            "加速网络数据传输"
        ],
        correctAnswer: 1
    },
    {
        deviceId: 11,
        question: "硬盘录像机通常应用于哪些场景？",
        options: [
            "家庭娱乐系统",
            "办公文档处理",
            "安防监控系统",
            "网络游戏加速"
        ],
        correctAnswer: 2
    },
    {
        deviceId: 11,
        question: "硬盘录像机与普通存储设备的主要区别是什么？",
        options: [
            "硬盘录像机专门用于视频数据的记录和管理",
            "硬盘录像机的存储容量更大",
            "硬盘录像机的价格更便宜",
            "硬盘录像机只能存储特定格式的文件"
        ],
        correctAnswer: 0
    },
    {
        deviceId: 11,
        question: "硬盘录像机可以通过哪些方式存储视频？",
        options: [
            "只能使用内置硬盘存储",
            "只能使用云存储",
            "可以使用内置硬盘、外接硬盘或网络存储",
            "只能使用存储卡"
        ],
        correctAnswer: 2
    },
    {
        deviceId: 11,
        question: "硬盘录像机的视频回放功能主要用于什么？",
        options: [
            "编辑视频内容",
            "查看历史监控记录，进行事件追溯",
            "提高视频质量",
            "加快视频传输速度"
        ],
        correctAnswer: 1
    },
    {
        deviceId: 1,
        question: "无线路由器在家庭网络中的作用是什么？",
        options: [
            "连接电脑与打印机",
            "连接家庭网络与互联网并提供Wi-Fi覆盖",
            "加快电脑运行速度",
            "存储家庭照片和视频"
        ],
        correctAnswer: 1
    },
    {
        deviceId: 2,
        question: "交换机与老式网络设备相比有什么优势？",
        options: [
            "价格更便宜",
            "体积更小巧",
            "能够智能分配数据，让网络更流畅",
            "可以无线连接设备"
        ],
        correctAnswer: 2
    },
    {
        deviceId: 2,
        question: "交换机与无线路由器的主要区别是什么？",
        options: [
            "交换机主要用于连接同一网络内的多台设备，无线路由器用于连接不同网络并提供Wi-Fi",
            "交换机只能有线连接，无线路由器可以提供无线连接",
            "交换机适合家庭使用，无线路由器适合企业使用",
            "交换机比无线路由器速度更快"
        ],
        correctAnswer: 0
    },
    {
        deviceId: 5,
        question: "存储设备的主要用途是什么？",
        options: [
            "处理数据",
            "传输数据",
            "存储和管理数据",
            "过滤数据"
        ],
        correctAnswer: 2
    },
    {
        deviceId: 5,
        question: "以下哪种不是常见的存储设备类型？",
        options: [
            "直接连接到电脑的外部硬盘",
            "通过网络访问的共享存储设备",
            "专业的大型存储系统",
            "量子存储阵列（这是虚构的）"
        ],
        correctAnswer: 3
    },
    {
        deviceId: 4,
        question: "为什么有些网络设备需要使用网线连接？",
        options: [
            "网线连接比无线连接更稳定且速度更快",
            "网线更便宜",
            "网线使用更方便",
            "网线可以提供更多功能"
        ],
        correctAnswer: 0
    },
    {
        deviceId: 4,
        question: "常见的网线类型有哪些？",
        options: [
            "同轴电缆和光纤",
            "双绞线和光纤",
            "同轴电缆和双绞线",
            "单模光纤和多模光纤"
        ],
        correctAnswer: 1
    },
    {
        deviceId: 8,
        question: "打印机的主要功能是什么？",
        options: [
            "扫描文档",
            "将电子文档转换为纸质文档",
            "编辑文档",
            "存储文档"
        ],
        correctAnswer: 1
    },
    {
        deviceId: 9,
        question: "网络摄像头常用于哪些场景？",
        options: [
            "数据存储",
            "网络连接",
            "视频会议和安防监控",
            "文档打印"
        ],
        correctAnswer: 2
    },
    {
        deviceId: 10,
        question: "无线接入点的主要作用是什么？",
        options: [
            "提供有线网络连接",
            "扩展无线网络覆盖范围",
            "存储数据",
            "处理复杂计算任务"
        ],
        correctAnswer: 1
    },
    {
        deviceId: 10,
        question: "无线接入点（AP）与家用无线路由器的主要区别是什么？",
        options: [
            "无线接入点只能提供无线连接，家用路由器可以提供有线和无线连接",
            "无线接入点只能连接一个设备，家用路由器可以连接多个设备",
            "无线接入点主要用于扩展无线信号覆盖范围，家用路由器还能分配上网地址",
            "无线接入点只能在室内使用，家用路由器可以在室外使用"
        ],
        correctAnswer: 2
    },
    {
        deviceId: 9,
        question: "网络摄像头的主要特点是什么？",
        options: [
            "只能在本地存储视频",
            "不需要网络连接即可工作",
            "可以通过网络远程访问和控制",
            "只能拍摄静态图像"
        ],
        correctAnswer: 2
    },
    {
        deviceId: 4,
        question: "网线的传输速度主要由什么决定？",
        options: [
            "网线的颜色",
            "网线的长度",
            "网线的型号和质量",
            "网线的品牌"
        ],
        correctAnswer: 2
    },
    {
        deviceId: 4,
        question: "为什么有些网线比其他网线传输速度更快？",
        options: [
            "因为它们的颜色不同",
            "因为它们的长度更短",
            "因为它们的内部结构和材质更好",
            "因为它们的品牌更知名"
        ],
        correctAnswer: 2
    },
    {
        deviceId: 4,
        question: "网线两端常用的接口类型是什么？",
        options: [
            "USB接口",
            "HDMI接口",
            "RJ45接口",
            "VGA接口"
        ],
        correctAnswer: 2
    }
];