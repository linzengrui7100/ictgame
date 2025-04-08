/**
 * ICT设备认知游戏 - 游戏逻辑
 */

// 游戏状态变量
let currentScore = 0;
let currentMode = '';
let learnedDevices = [];
let currentLevel = 0; // 当前关卡：0=未开始，1=功能对对碰，2=设备连连看，3=知识大闯关
let levelsCompleted = [false, false, false]; // 记录每个关卡是否完成

// DOM元素
const startScreen = document.getElementById('start-screen');
const matchGame = document.getElementById('match-game');
const quizGame = document.getElementById('quiz-game');
const memoryGame = document.getElementById('memory-game');
const resultScreen = document.getElementById('result-screen');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const deviceLearnedElement = document.getElementById('device-learned');

// 返回按钮元素
const matchBackBtn = document.getElementById('match-back-btn');
const quizBackBtn = document.getElementById('quiz-back-btn');
const memoryBackBtn = document.getElementById('memory-back-btn');

// 按钮元素
const startBtn = document.getElementById('start-btn');
const modeBtns = document.querySelectorAll('.mode-btn');
const playAgainBtn = document.getElementById('play-again-btn');

// 游戏元素
const deviceImagesContainer = document.getElementById('device-images');
const deviceNamesContainer = document.getElementById('device-names');
const quizImageContainer = document.getElementById('quiz-image');
const quizQuestionElement = document.getElementById('quiz-question');
const quizOptionsElement = document.getElementById('quiz-options');
const memoryContainer = document.getElementById('memory-container');

/**
 * 初始化游戏
 */
function initGame() {
    // 重置游戏状态
    currentScore = 0;
    learnedDevices = [];
    currentLevel = 0;
    levelsCompleted = [false, false, false];
    updateScore();
    
    // 创建下一关按钮
    const nextLevelBtn = document.createElement('button');
    nextLevelBtn.id = 'next-level-btn';
    nextLevelBtn.className = 'btn';
    nextLevelBtn.textContent = '进入下一关';
    nextLevelBtn.addEventListener('click', goToNextLevel);
    
    // 添加事件监听器
    startBtn.addEventListener('click', startAdventure);
    playAgainBtn.addEventListener('click', resetGame);
    
    // 添加返回按钮事件监听器 - 在关卡模式下返回会重置游戏
    matchBackBtn.addEventListener('click', resetGame);
    quizBackBtn.addEventListener('click', resetGame);
    memoryBackBtn.addEventListener('click', resetGame);
    
    // 游戏模式选择 - 在非关卡模式下可以单独选择游戏
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 如果正在进行关卡冒险，则忽略单独模式选择
            if (currentLevel > 0) return;
            
            currentMode = btn.dataset.mode;
            switch(currentMode) {
                case 'match':
                    showScreen(matchGame);
                    initMatchGame();
                    break;
                case 'quiz':
                    showScreen(quizGame);
                    initQuizGame();
                    break;
                case 'memory':
                    showScreen(memoryGame);
                    initMemoryGame();
                    break;
            }
        });
    });
}

/**
 * 开始关卡冒险
 */
function startAdventure() {
    // 重置游戏状态
    currentScore = 0;
    learnedDevices = [];
    levelsCompleted = [false, false, false];
    updateScore();
    
    // 设置为第一关：功能对对碰
    currentLevel = 1;
    goToLevel(currentLevel);
}

/**
 * 前往指定关卡
 * @param {number} level - 关卡编号
 */
function goToLevel(level) {
    currentLevel = level;
    
    switch(level) {
        case 1: // 设备连连看
            currentMode = 'match';
            showScreen(matchGame);
            initMatchGame();
            break;
        case 2: // 功能对对碰
            currentMode = 'memory';
            showScreen(memoryGame);
            initMemoryGame();
            break;
        case 3: // 知识大闯关
            currentMode = 'quiz';
            showScreen(quizGame);
            initQuizGame();
            break;
    }
}

/**
 * 显示指定屏幕
 * @param {HTMLElement} screen - 要显示的屏幕元素
 */
function showScreen(screen) {
    // 隐藏所有屏幕
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    // 显示指定屏幕
    screen.classList.add('active');
}

/**
 * 更新分数显示
 */
function updateScore() {
    scoreElement.textContent = currentScore;
    finalScoreElement.textContent = currentScore;
}

/**
 * 添加已学习的设备
 * @param {Object} device - 设备对象
 */
function addLearnedDevice(device) {
    // 检查是否已经学习过该设备
    if (!learnedDevices.some(d => d.id === device.id)) {
        learnedDevices.push(device);
    }
}

/**
 * 完成当前关卡
 */
function completeCurrentLevel() {
    // 标记当前关卡为已完成
    levelsCompleted[currentLevel - 1] = true;
    
    // 创建关卡完成提示
    const levelCompleteMsg = document.createElement('div');
    levelCompleteMsg.className = 'level-complete-message';
    levelCompleteMsg.innerHTML = `
        <h3>恭喜！完成第${currentLevel}关</h3>
        <p>当前分数: ${currentScore}</p>
    `;
    
    // 清除之前的关卡完成消息
    const oldMsg = document.querySelector('.level-complete-message');
    if (oldMsg) {
        oldMsg.remove();
    }
    
    // 添加下一关按钮
    const nextLevelBtn = document.createElement('button');
    nextLevelBtn.className = 'btn';
    nextLevelBtn.textContent = '进入下一关';
    nextLevelBtn.addEventListener('click', goToNextLevel);
    levelCompleteMsg.appendChild(nextLevelBtn);
    
    // 添加到当前屏幕
    const currentScreen = document.querySelector('.screen.active');
    currentScreen.appendChild(levelCompleteMsg);
}

/**
 * 前往下一关
 */
function goToNextLevel() {
    // 移除关卡完成消息
    const levelCompleteMsg = document.querySelector('.level-complete-message');
    if (levelCompleteMsg) {
        levelCompleteMsg.remove();
    }
    
    // 如果所有关卡都完成，显示结果
    if (currentLevel >= 3) {
        showResults();
        return;
    }
    
    // 否则前往下一关
    goToLevel(currentLevel + 1);
}

/**
 * 显示游戏结果
 */
function showResults() {
    // 更新最终分数
    finalScoreElement.textContent = currentScore;
    
    // 清空已学习设备列表
    deviceLearnedElement.innerHTML = '';
    
    // 添加通关勋章
    if (levelsCompleted.every(completed => completed)) {
        const medalElement = document.createElement('div');
        medalElement.className = 'completion-medal';
        medalElement.innerHTML = `
            <div class="medal-icon">🏆</div>
            <h3>恭喜！你已通过全部三关！</h3>
            <p>你是ICT设备认知大师！</p>
        `;
        deviceLearnedElement.appendChild(medalElement);
    }
    
    // 添加已学习设备
    learnedDevices.forEach(device => {
        const deviceItem = document.createElement('div');
        deviceItem.className = 'device-item';
        deviceItem.innerHTML = `
            <img src="${device.image}" alt="${device.name}">
            <div class="device-info">
                <h3>${device.name}</h3>
                <p>${device.description}</p>
            </div>
        `;
        deviceLearnedElement.appendChild(deviceItem);
    });
    
    // 设置下载知识卡片按钮事件
    const downloadCardBtn = document.getElementById('download-card-btn');
    const userNameInput = document.getElementById('user-name');
    
    downloadCardBtn.addEventListener('click', () => {
        generateKnowledgeCard();
    });
    
    // 显示结果屏幕
    showScreen(resultScreen);
    
    // 创建知识卡片预览区域
    if (!document.querySelector('.card-preview')) {
        const cardPreview = document.createElement('div');
        cardPreview.className = 'card-preview';
        cardPreview.innerHTML = `
            <div class="card-preview-content">
                <button class="card-preview-close">&times;</button>
                <h3>知识卡片预览</h3>
                <div class="card-image-container">
                    <img id="card-image" alt="知识卡片">
                </div>
                <button id="download-image-btn" class="btn">下载图片</button>
            </div>
        `;
        document.body.appendChild(cardPreview);
        
        // 添加关闭预览的事件
        const closeBtn = cardPreview.querySelector('.card-preview-close');
        closeBtn.addEventListener('click', () => {
            cardPreview.classList.remove('active');
        });
        
        // 添加下载图片按钮事件
        const downloadImageBtn = document.getElementById('download-image-btn');
        downloadImageBtn.addEventListener('click', downloadKnowledgeCard);
    }
}

/**
 * 重置游戏
 */
function resetGame() {
    // 重置游戏状态
    currentScore = 0;
    currentLevel = 0;
    levelsCompleted = [false, false, false];
    learnedDevices = [];
    updateScore();
    
    // 移除关卡完成消息
    const levelCompleteMsg = document.querySelector('.level-complete-message');
    if (levelCompleteMsg) {
        levelCompleteMsg.remove();
    }
    
    // 显示开始屏幕
    showScreen(startScreen);
}

/**
 * 初始化匹配游戏
 */
function initMatchGame() {
    // 清空容器
    deviceImagesContainer.innerHTML = '';
    deviceNamesContainer.innerHTML = '';
    
    // 随机选择6个设备
    const gameDevices = getRandomDevices(6);
    
    // 创建设备图片元素
    const shuffledImages = [...gameDevices].sort(() => Math.random() - 0.5);
    shuffledImages.forEach(device => {
        const deviceImage = document.createElement('div');
        deviceImage.className = 'device-image';
        deviceImage.dataset.id = device.id;
        deviceImage.innerHTML = `<img src="${device.image}" alt="${device.name}">`;
        deviceImage.addEventListener('dragover', handleDragOver);
        deviceImage.addEventListener('drop', handleDrop);
        deviceImagesContainer.appendChild(deviceImage);
    });
    
    // 创建设备名称元素
    const shuffledNames = [...gameDevices].sort(() => Math.random() - 0.5);
    shuffledNames.forEach(device => {
        const deviceName = document.createElement('div');
        deviceName.className = 'device-name';
        deviceName.dataset.id = device.id;
        deviceName.textContent = device.name;
        deviceName.draggable = true;
        deviceName.addEventListener('dragstart', handleDragStart);
        deviceNamesContainer.appendChild(deviceName);
    });
}

// 拖拽相关变量
let draggedElement = null;

/**
 * 处理拖拽开始事件
 * @param {Event} e - 拖拽事件
 */
function handleDragStart(e) {
    draggedElement = e.target;
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    e.target.classList.add('highlight');
}

/**
 * 处理拖拽经过事件
 * @param {Event} e - 拖拽事件
 */
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

/**
 * 处理放置事件
 * @param {Event} e - 拖拽事件
 */
function handleDrop(e) {
    e.preventDefault();
    
    // 获取拖拽元素和目标元素的ID
    const draggedId = e.dataTransfer.getData('text/plain');
    const targetId = e.target.closest('.device-image').dataset.id;
    
    // 移除高亮效果
    draggedElement.classList.remove('highlight');
    
    // 检查匹配是否正确
    if (draggedId === targetId) {
        // 匹配成功
        draggedElement.classList.add('matched');
        e.target.closest('.device-image').classList.add('matched');
        
        // 增加分数
        currentScore += 10;
        updateScore();
        
        // 添加到已学习设备
        const device = ictDevices.find(d => d.id === parseInt(draggedId));
        addLearnedDevice(device);
        
        // 检查游戏是否结束
        const matchedPairs = document.querySelectorAll('.device-name.matched').length;
        if (matchedPairs === 6) {
            // 所有对都已匹配
            if (currentLevel > 0) {
                // 关卡模式下，完成当前关卡
                setTimeout(() => completeCurrentLevel(), 1000);
            } else {
                // 单独模式下，直接显示结果
                setTimeout(showResults, 1000);
            }
        }
    } else {
        // 匹配失败，减少分数
        currentScore = Math.max(0, currentScore - 5);
        updateScore();
        
        // 显示错误提示
        e.target.closest('.device-image').classList.add('pulse');
        setTimeout(() => {
            e.target.closest('.device-image').classList.remove('pulse');
        }, 500);
    }
}

/**
 * 初始化问答游戏
 */
function initQuizGame() {
    // 当前问题索引
    let currentQuestionIndex = 0;
    
    // 确保每个设备都有题目的问题选择逻辑
    const gameQuestions = getQuestionsForAllDevices();
    
    // 显示第一个问题
    showQuestion(gameQuestions[currentQuestionIndex]);
    
    /**
     * 显示问题
     * @param {Object} questionData - 问题数据
     */
    function showQuestion(questionData) {
        // 获取设备信息
        const device = ictDevices.find(d => d.id === questionData.deviceId);
        
        // 显示设备图片
        quizImageContainer.innerHTML = `<img src="${device.image}" alt="${device.name}">`;
        
        // 显示问题
        quizQuestionElement.textContent = questionData.question;
        
        // 显示选项
        quizOptionsElement.innerHTML = '';
        questionData.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            optionElement.addEventListener('click', () => handleAnswer(index, questionData.correctAnswer, device));
            quizOptionsElement.appendChild(optionElement);
        });
    }
    
    /**
     * 处理答案选择
     * @param {number} selectedIndex - 选择的选项索引
     * @param {number} correctIndex - 正确选项索引
     * @param {Object} device - 设备对象
     */
    function handleAnswer(selectedIndex, correctIndex, device) {
        // 禁用所有选项
        const options = quizOptionsElement.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // 标记正确和错误选项
        options[correctIndex].classList.add('correct');
        if (selectedIndex !== correctIndex) {
            options[selectedIndex].classList.add('incorrect');
        }
        
        // 更新分数
        if (selectedIndex === correctIndex) {
            currentScore += 10;
            addLearnedDevice(device);
        } else {
            currentScore = Math.max(0, currentScore - 5);
        }
        updateScore();
        
        // 延迟后显示下一个问题或结束游戏
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < gameQuestions.length) {
                showQuestion(gameQuestions[currentQuestionIndex]);
            } else {
                if (currentLevel > 0) {
                    // 关卡模式下，完成当前关卡
                    completeCurrentLevel();
                } else {
                    // 单独模式下，直接显示结果
                    showResults();
                }
            }
        }, 1500);
    }
}

/**
 * 初始化功能对对碰游戏
 */
function initMemoryGame() {
    // 清空容器
    memoryContainer.innerHTML = '';
    
    // 创建游戏说明
    const gameInstruction = document.createElement('div');
    gameInstruction.className = 'sort-instruction';
    gameInstruction.innerHTML = '<p>选择设备并匹配其功能描述</p>';
    memoryContainer.appendChild(gameInstruction);
    
    // 创建游戏容器
    const functionMatchContainer = document.createElement('div');
    functionMatchContainer.className = 'function-match-container';
    memoryContainer.appendChild(functionMatchContainer);
    
    // 创建设备列表容器
    const deviceListContainer = document.createElement('div');
    deviceListContainer.className = 'device-list-container';
    functionMatchContainer.appendChild(deviceListContainer);
    
    // 创建功能描述容器
    const functionListContainer = document.createElement('div');
    functionListContainer.className = 'function-list-container';
    functionMatchContainer.appendChild(functionListContainer);
    
    // 创建结果显示区域
    const resultContainer = document.createElement('div');
    resultContainer.className = 'match-result-container';
    resultContainer.innerHTML = '<p>选择一个设备和一个功能进行匹配</p>';
    memoryContainer.appendChild(resultContainer);
    
    // 随机选择6个设备
    const gameDevices = getRandomDevices(6);
    
    // 当前选中的设备和功能
    let selectedDevice = null;
    let selectedFunction = null;
    
    // 已匹配的设备ID
    const matchedDevices = [];
    
    // 创建设备元素
    gameDevices.forEach(device => {
        const deviceElement = document.createElement('div');
        deviceElement.className = 'function-match-device';
        deviceElement.dataset.id = device.id;
        
        const deviceImage = document.createElement('div');
        deviceImage.className = 'device-image-small';
        deviceImage.innerHTML = `<img src="${device.image}" alt="${device.name}">`;
        
        const deviceName = document.createElement('div');
        deviceName.className = 'device-name-small';
        deviceName.textContent = device.name;
        
        deviceElement.appendChild(deviceImage);
        deviceElement.appendChild(deviceName);
        
        // 添加点击事件
        deviceElement.addEventListener('click', () => {
            // 如果设备已匹配，则不响应点击
            if (matchedDevices.includes(device.id)) return;
            
            // 移除之前选中的设备高亮
            document.querySelectorAll('.function-match-device.selected').forEach(el => {
                el.classList.remove('selected');
            });
            
            // 高亮当前选中的设备
            deviceElement.classList.add('selected');
            selectedDevice = device;
            
            // 检查是否可以进行匹配
            checkForMatch();
        });
        
        deviceListContainer.appendChild(deviceElement);
    });
    
    // 创建功能描述元素（打乱顺序）
    const shuffledDevices = [...gameDevices].sort(() => Math.random() - 0.5);
    shuffledDevices.forEach(device => {
        const functionElement = document.createElement('div');
        functionElement.className = 'function-description';
        functionElement.dataset.id = device.id;
        functionElement.textContent = device.function;
        
        // 添加点击事件
        functionElement.addEventListener('click', () => {
            // 如果功能已匹配，则不响应点击
            if (matchedDevices.includes(parseInt(functionElement.dataset.id))) return;
            
            // 移除之前选中的功能高亮
            document.querySelectorAll('.function-description.selected').forEach(el => {
                el.classList.remove('selected');
            });
            
            // 高亮当前选中的功能
            functionElement.classList.add('selected');
            selectedFunction = {
                id: parseInt(functionElement.dataset.id),
                element: functionElement
            };
            
            // 检查是否可以进行匹配
            checkForMatch();
        });
        
        functionListContainer.appendChild(functionElement);
    });
    
    // 连线功能已移除
    
    // 不再需要SVG容器
    
    // 不再需要SVG元素
    
    // 检查匹配
    function checkForMatch() {
        // 如果设备和功能都已选中
        if (selectedDevice && selectedFunction) {
            // 检查匹配是否正确
            if (selectedDevice.id === selectedFunction.id) {
                // 匹配成功
                resultContainer.innerHTML = `<p class="match-success">匹配成功！${selectedDevice.name}的功能正确匹配</p>`;
                
                // 标记已匹配
                const deviceElement = document.querySelector(`.function-match-device[data-id="${selectedDevice.id}"]`);
                deviceElement.classList.add('matched');
                selectedFunction.element.classList.add('matched');
                
                // 添加到已匹配列表
                matchedDevices.push(selectedDevice.id);
                
                // 增加分数
                currentScore += 10;
                updateScore();
                
                // 添加到已学习设备
                addLearnedDevice(selectedDevice);
                
                // 连线功能已移除
                
                // 重置选中状态
                selectedDevice = null;
                selectedFunction = null;
                
                // 检查游戏是否结束
                if (matchedDevices.length === gameDevices.length) {
                    // 所有设备都已匹配
                    resultContainer.innerHTML = '<p class="match-complete">恭喜！你已完成所有匹配</p>';
                    
                    if (currentLevel > 0) {
                        // 关卡模式下，完成当前关卡
                        setTimeout(() => completeCurrentLevel(), 1000);
                    } else {
                        // 单独模式下，直接显示结果
                        setTimeout(showResults, 1000);
                    }
                }
            } else {
                // 匹配失败
                resultContainer.innerHTML = '<p class="match-fail">匹配失败！请重新选择</p>';
                
                // 减少分数
                currentScore = Math.max(0, currentScore - 5);
                updateScore();
                
                // 移除选中状态
                document.querySelectorAll('.function-match-device.selected, .function-description.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                
                // 重置选中状态
                selectedDevice = null;
                selectedFunction = null;
            }
        }
    }
}

// 功能对对碰游戏相关变量
// 这里不再需要拖放相关的变量和函数，因为我们已经改为点击式匹配游戏

/**
 * 显示反馈信息
 * @param {HTMLElement} container - 容器元素
 * @param {boolean} isCorrect - 是否正确
 * @param {string} deviceName - 设备名称
 */
function showFeedback(container, isCorrect, deviceName) {
    const feedback = document.createElement('div');
    feedback.className = isCorrect ? 'feedback correct' : 'feedback incorrect';
    feedback.textContent = isCorrect ? `✓ ${deviceName}分类正确` : `✗ ${deviceName}分类错误`;
    
    container.appendChild(feedback);
    
    // 淡出效果
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => {
            feedback.remove();
        }, 500);
    }, 1500);
}

/**
 * 获取随机设备
 * @param {number} count - 设备数量
 * @returns {Array} - 随机设备数组
 */
function getRandomDevices(count) {
    const shuffled = [...ictDevices].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

/**
 * 获取随机问题
 * @param {number} count - 问题数量
 * @returns {Array} - 随机问题数组
 */
function getRandomQuestions(count) {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

/**
 * 获取包含所有设备的问题
 * @returns {Array} - 包含所有设备的问题数组
 */
function getQuestionsForAllDevices() {
    // 获取所有设备ID
    const deviceIds = ictDevices.map(device => device.id);
    
    // 为每个设备选择一个问题
    const selectedQuestions = [];
    
    deviceIds.forEach(deviceId => {
        // 获取该设备的所有问题
        const deviceQuestions = quizQuestions.filter(q => q.deviceId === deviceId);
        
        // 如果该设备有问题，随机选择一个
        if (deviceQuestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * deviceQuestions.length);
            selectedQuestions.push(deviceQuestions[randomIndex]);
        }
    });
    
    // 如果选择的问题不足6个，从其他问题中随机补充
    if (selectedQuestions.length < 6) {
        // 已选择的设备ID
        const selectedDeviceIds = selectedQuestions.map(q => q.deviceId);
        
        // 过滤出未被选择的问题
        const remainingQuestions = quizQuestions.filter(q => !selectedDeviceIds.includes(q.deviceId));
        
        // 随机排序
        const shuffled = [...remainingQuestions].sort(() => Math.random() - 0.5);
        
        // 补充问题直到达到6个
        const additionalQuestions = shuffled.slice(0, 6 - selectedQuestions.length);
        selectedQuestions.push(...additionalQuestions);
    }
    
    // 随机打乱问题顺序
    return selectedQuestions.sort(() => Math.random() - 0.5);
}

/**
 * 生成知识卡片
 */
function generateKnowledgeCard() {
    try {
        const userName = '匿名用户'; // 移除用户名输入，使用默认名称
        const cardPreview = document.querySelector('.card-preview');
        
        // 显示加载提示
        const loadingMsg = document.createElement('div');
        loadingMsg.style.position = 'fixed';
        loadingMsg.style.top = '50%';
        loadingMsg.style.left = '50%';
        loadingMsg.style.transform = 'translate(-50%, -50%)';
        loadingMsg.style.background = 'rgba(0, 0, 0, 0.7)';
        loadingMsg.style.color = '#66FCF1';
        loadingMsg.style.padding = '15px 20px';
        loadingMsg.style.borderRadius = '5px';
        loadingMsg.style.zIndex = '9999';
        loadingMsg.textContent = '正在生成知识卡片...';
        document.body.appendChild(loadingMsg);
        
        // 创建临时知识卡片元素
        const tempCard = document.createElement('div');
        tempCard.className = 'knowledge-card-template';
        tempCard.style.width = '600px';
        tempCard.style.padding = '30px';
        tempCard.style.background = 'linear-gradient(135deg, #1F2833, #0B0C10)';
        tempCard.style.borderRadius = '10px';
        tempCard.style.border = '2px solid rgba(102, 252, 241, 0.5)';
        tempCard.style.color = '#66FCF1';
        tempCard.style.fontFamily = "'Orbitron', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif";
        tempCard.style.position = 'absolute';
        tempCard.style.left = '-9999px'; // 放在屏幕外，但仍在DOM中
        
        // 添加卡片内容
        let cardContent = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #66FCF1; font-size: 24px; margin-bottom: 10px;">ICT设备认知大师证书</h2>
                <p style="color: #C5C6C7; font-size: 16px;">授予: ${userName}</p>
                <p style="color: #C5C6C7; font-size: 14px;">得分: ${currentScore}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <h3 style="color: #66FCF1; font-size: 18px; margin-bottom: 10px;">已掌握的设备知识:</h3>
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px;">
        `;
        
        // 添加已学习设备
        if (learnedDevices.length > 0) {
            learnedDevices.forEach(device => {
                cardContent += `
                    <div style="background-color: rgba(31, 40, 51, 0.8); border-radius: 8px; padding: 10px; width: 45%; display: flex; align-items: center; gap: 10px; border: 1px solid rgba(102, 252, 241, 0.3);">
                        <img src="${device.image}" alt="${device.name}" style="width: 40px; height: 40px; object-fit: contain;">
                        <div>
                            <h4 style="color: #66FCF1; font-size: 14px; margin: 0 0 5px 0;">${device.name}</h4>
                            <p style="color: #C5C6C7; font-size: 12px; margin: 0;">${device.description}</p>
                        </div>
                    </div>
                `;
            });
        } else {
            // 如果没有学习设备，显示提示信息
            cardContent += `
                <div style="text-align: center; width: 100%; padding: 15px;">
                    <p style="color: #C5C6C7; font-size: 14px;">继续游戏，学习更多ICT设备知识！</p>
                </div>
            `;
        }
        
        cardContent += `
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <p style="color: #C5C6C7; font-size: 12px;">完成时间: ${new Date().toLocaleDateString()}</p>
                <div style="margin-top: 10px;">
                    <span style="color: #66FCF1; font-size: 24px;">🏆</span>
                </div>
            </div>
        `;
        
        tempCard.innerHTML = cardContent;
        document.body.appendChild(tempCard);
        
        // 确保图片加载完成
        const images = tempCard.querySelectorAll('img');
        const imagePromises = [];
        
        images.forEach(img => {
            if (img.complete) return;
            const promise = new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve; // 即使图片加载失败也继续
            });
            imagePromises.push(promise);
        });
        
        // 等待所有图片加载完成后再生成canvas
        Promise.all(imagePromises).then(() => {
            // 使用html2canvas将元素转换为图片
            return html2canvas(tempCard, {
                backgroundColor: null,
                scale: 2, // 提高图片质量
                logging: false,
                useCORS: true, // 允许跨域图片
                allowTaint: true // 允许跨域图片
            });
        }).then(canvas => {
            // 移除加载提示
            document.body.removeChild(loadingMsg);
            
            // 显示预览
            const cardImage = document.getElementById('card-image');
            cardImage.src = canvas.toDataURL('image/png');
            cardPreview.classList.add('active');
            
            // 移除临时元素
            document.body.removeChild(tempCard);
        }).catch(error => {
            console.error('生成知识卡片失败:', error);
            alert('生成知识卡片失败，请重试。错误信息: ' + error.message);
            // 移除加载提示和临时元素
            document.body.removeChild(loadingMsg);
            document.body.removeChild(tempCard);
        });
    } catch (error) {
        console.error('生成知识卡片过程中发生错误:', error);
        alert('生成知识卡片失败，请重试。错误信息: ' + error.message);
        // 移除可能存在的加载提示
        const loadingMsg = document.querySelector('div[style*="正在生成知识卡片"]');
        if (loadingMsg) document.body.removeChild(loadingMsg);
    }
}

/**
 * 下载知识卡片
 */
function downloadKnowledgeCard() {
    try {
        const userName = '匿名用户'; // 移除用户名输入，使用默认名称
        
        // 显示下载提示
        const downloadMsg = document.createElement('div');
        downloadMsg.style.position = 'fixed';
        downloadMsg.style.bottom = '20px';
        downloadMsg.style.left = '50%';
        downloadMsg.style.transform = 'translateX(-50%)';
        downloadMsg.style.background = 'rgba(0, 0, 0, 0.7)';
        downloadMsg.style.color = '#66FCF1';
        downloadMsg.style.padding = '10px 15px';
        downloadMsg.style.borderRadius = '5px';
        downloadMsg.style.zIndex = '9999';
        downloadMsg.textContent = '正在下载知识卡片...';
        document.body.appendChild(downloadMsg);
        
        // 直接重新生成知识卡片内容，而不是尝试从图片转换
        const tempCard = document.createElement('div');
        tempCard.className = 'knowledge-card-template';
        tempCard.style.width = '600px';
        tempCard.style.padding = '30px';
        tempCard.style.background = 'linear-gradient(135deg, #1F2833, #0B0C10)';
        tempCard.style.borderRadius = '10px';
        tempCard.style.border = '2px solid rgba(102, 252, 241, 0.5)';
        tempCard.style.color = '#66FCF1';
        tempCard.style.fontFamily = "'Orbitron', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif";
        tempCard.style.position = 'absolute';
        tempCard.style.left = '-9999px'; // 放在屏幕外，但仍在DOM中
        
        // 添加卡片内容
        let cardContent = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #66FCF1; font-size: 24px; margin-bottom: 10px;">ICT设备认知大师证书</h2>
                <p style="color: #C5C6C7; font-size: 16px;">授予: ${userName}</p>
                <p style="color: #C5C6C7; font-size: 14px;">得分: ${currentScore}</p>
            </div>
            <div style="margin-bottom: 20px;">
                <h3 style="color: #66FCF1; font-size: 18px; margin-bottom: 10px;">已掌握的设备知识:</h3>
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px;">
        `;
        
        // 添加已学习设备
        if (learnedDevices.length > 0) {
            learnedDevices.forEach(device => {
                cardContent += `
                    <div style="background-color: rgba(31, 40, 51, 0.8); border-radius: 8px; padding: 10px; width: 45%; display: flex; align-items: center; gap: 10px; border: 1px solid rgba(102, 252, 241, 0.3);">
                        <img src="${device.image}" alt="${device.name}" style="width: 40px; height: 40px; object-fit: contain;">
                        <div>
                            <h4 style="color: #66FCF1; font-size: 14px; margin: 0 0 5px 0;">${device.name}</h4>
                            <p style="color: #C5C6C7; font-size: 12px; margin: 0;">${device.description}</p>
                        </div>
                    </div>
                `;
            });
        } else {
            // 如果没有学习设备，显示提示信息
            cardContent += `
                <div style="text-align: center; width: 100%; padding: 15px;">
                    <p style="color: #C5C6C7; font-size: 14px;">继续游戏，学习更多ICT设备知识！</p>
                </div>
            `;
        }
        
        cardContent += `
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <p style="color: #C5C6C7; font-size: 12px;">完成时间: ${new Date().toLocaleDateString()}</p>
                <div style="margin-top: 10px;">
                    <span style="color: #66FCF1; font-size: 24px;">🏆</span>
                </div>
            </div>
        `;
        
        tempCard.innerHTML = cardContent;
        document.body.appendChild(tempCard);
        
        // 使用html2canvas直接生成新的卡片
        html2canvas(tempCard, {
            backgroundColor: null,
            scale: 2, // 提高图片质量
            logging: false,
            useCORS: true, // 允许跨域图片
            allowTaint: true // 允许跨域图片
        }).then(canvas => {
            // 从canvas获取安全的数据URL
            const safeDataUrl = canvas.toDataURL('image/png');
            
            // 创建下载链接
            const downloadLink = document.createElement('a');
            downloadLink.href = safeDataUrl;
            downloadLink.download = `ICT设备认知证书_${userName}_${new Date().getTime()}.png`;
            document.body.appendChild(downloadLink);
            
            // 点击下载链接
            downloadLink.click();
            
            // 移除下载链接、提示和临时元素
            setTimeout(() => {
                document.body.removeChild(downloadLink);
                document.body.removeChild(downloadMsg);
                document.body.removeChild(tempCard);
            }, 2000);
        }).catch(error => {
            console.error('生成知识卡片失败:', error);
            alert('下载知识卡片失败，请重试。错误信息: ' + error.message);
            document.body.removeChild(downloadMsg);
            document.body.removeChild(tempCard);
        });
    } catch (error) {
        console.error('下载知识卡片失败:', error);
        alert('下载知识卡片失败，请重试。错误信息: ' + error.message);
        // 移除可能存在的加载提示
        const loadingMsg = document.querySelector('div[style*="正在生成知识卡片"]');
        if (loadingMsg) document.body.removeChild(loadingMsg);
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);