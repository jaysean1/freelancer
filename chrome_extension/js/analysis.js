// /Users/qiansui/Desktop/Freelancer/chrome_extension/js/analysis.js
// This file contains the JavaScript functionality for the analysis page
// It handles the progress animation and display of transport plans

document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('progressBar');
    const statusText = document.getElementById('statusText');
    const steps = [
        document.getElementById('step1'),
        document.getElementById('step2'),
        document.getElementById('step3'),
        document.getElementById('step4'),
        document.getElementById('step5')
    ];
    const plansContainer = document.getElementById('plansContainer');
    const loadingSkeleton = document.getElementById('loadingSkeleton');
    
    const statusTexts = [
        "Analyzing your requirements and preferences...",
        "Searching for matching loads across Australia...",
        "Fetching detailed information for potential matches...",
        "Using AI to evaluate optimal routes and profitability...",
        "Generating personalized transport plans based on your truck specs..."
    ];
    
    let currentStep = 0;
    
    // 初始化进度条和步骤状态
    function resetProgress() {
        // 设置进度条宽度为0
        progressBar.style.width = '0%';
        
        // 重置所有步骤指示器
        steps.forEach((step, idx) => {
            const stepElement = step.querySelector('div');
            const stepIcon = step.querySelector('svg');
            stepElement.classList.remove('bg-blue-600');
            stepElement.classList.add('bg-gray-200');
            stepIcon.classList.remove('text-white');
            stepIcon.classList.add('text-gray-500');
        });
        
        // 重置状态文本
        statusText.textContent = statusTexts[0];
    }

    function updateStep(step) {
        // Update progress bar
        progressBar.style.width = (step + 1) * 20 + '%';
        
        // Update step indicators
        for (let i = 0; i <= step; i++) {
            const stepElement = steps[i].querySelector('div');
            const stepIcon = steps[i].querySelector('svg');
            
            stepElement.classList.remove('bg-gray-200');
            stepElement.classList.add('bg-blue-600');
            stepIcon.classList.remove('text-gray-500');
            stepIcon.classList.add('text-white');
        }
        
        // Update status text
        statusText.textContent = statusTexts[step];
    }
    
    // 生成随机延迟时间，使加载更自然
    function randomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 模拟进度步骤
    function progressStep() {
        if (currentStep < 5) {
            // 直接更新当前步骤
            updateStep(currentStep);
            currentStep++;
            // 使用随机延迟进行下一步
            setTimeout(progressStep, randomDelay(600, 1800)); // 每步0.6~1.8秒
        } else {
            // 完成所有步骤后显示计划
            setTimeout(() => {
                // Show plans and hide skeleton
                plansContainer.classList.remove('hidden');
                loadingSkeleton.classList.add('hidden');
            }, 500);
        }
    }
    
    // 确保每次都从头开始动画
    resetProgress();
    currentStep = 0;
    progressStep();
    
    // Add click event listeners to load cards to navigate to detail page
    const loadCards = document.querySelectorAll('.load-card');
    loadCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get the plan title
            const planTitle = this.querySelector('h3').textContent;
            
            // Save selected plan to chrome.storage
            chrome.storage.local.set({selectedPlan: planTitle}, function() {
                // Navigate to detail page
                window.location.href = 'detail.html';
            });
        });
    });
    
    // Make "View Details" links work
    const detailLinks = document.querySelectorAll('a[href="detail.html"]');
    detailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the plan title from the parent card
            const planTitle = this.closest('.load-card').querySelector('h3').textContent;
            
            // Save selected plan to chrome.storage
            chrome.storage.local.set({selectedPlan: planTitle}, function() {
                // Navigate to detail page
                window.location.href = 'detail.html';
            });
        });
    });
});
