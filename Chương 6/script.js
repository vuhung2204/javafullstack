// ========== Navigation ==========
function showPage(pageId) {
    // Ẩn tất cả các trang
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Bỏ active cho tất cả các nút
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Hiển thị trang được chọn
    document.getElementById(pageId).classList.add('active');
    
    // Tìm nút tương ứng và thêm active
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(pageId)) {
            btn.classList.add('active');
        }
    });
}

// ========== Page 2: Form với cảnh báo khi đóng ==========
let formChanged = false;

// Đợi DOM load xong mới add event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Theo dõi thay đổi trong form
    ['name', 'email', 'phone', 'address'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', () => {
                formChanged = true;
            });
        }
    });
});

// Cảnh báo khi đóng trang nếu có dữ liệu chưa lưu
window.addEventListener('beforeunload', (e) => {
    if (formChanged) {
        e.preventDefault();
        e.returnValue = 'Bạn có chắc muốn rời khỏi trang? Dữ liệu chưa lưu sẽ bị mất.';
    }
});

// Submit form
function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    if (!name || !email || !phone || !address) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    alert(`Đăng ký thành công!\n\nThông tin:\nHọ tên: ${name}\nEmail: ${email}\nSĐT: ${phone}\nĐịa chỉ: ${address}`);
    formChanged = false;
    
    // Reset form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
}

// ========== Page 3: Upload file với progress bar ==========
let selectedFile = null;

function handleFileSelect(event) {
    selectedFile = event.target.files[0];
    
    if (selectedFile) {
        document.getElementById('fileName').textContent = 
            `${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)} KB)`;
        document.getElementById('progressContainer').style.display = 'block';
        document.getElementById('progressFill').style.width = '0%';
        document.getElementById('progressText').textContent = '0%';
        document.getElementById('uploadBtn').style.display = 'block';
    }
}

function startUpload() {
    let progress = 0;
    document.getElementById('uploadBtn').style.display = 'none';
    
    const interval = setInterval(() => {
        progress += 10;
        document.getElementById('progressFill').style.width = progress + '%';
        document.getElementById('progressText').textContent = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            document.getElementById('progressText').innerHTML = 
                '<span style="color: #10b981; font-weight: bold;">✓ Hoàn thành</span>';
        }
    }, 300);
}

// ========== Page 4: Biểu đồ thời tiết ==========
const weatherData = [
    { day: 'T2', temp: 28, rain: 20 },
    { day: 'T3', temp: 30, rain: 10 },
    { day: 'T4', temp: 27, rain: 60 },
    { day: 'T5', temp: 29, rain: 30 },
    { day: 'T6', temp: 31, rain: 5 },
    { day: 'T7', temp: 32, rain: 0 },
    { day: 'CN', temp: 30, rain: 15 }
];

function initCharts() {
    // Biểu đồ cột - Nhiệt độ
    const maxTemp = Math.max(...weatherData.map(d => d.temp));
    const barChart = document.getElementById('barChart');
    
    if (!barChart) return; // Kiểm tra element tồn tại
    
    barChart.innerHTML = ''; // Clear nội dung cũ
    
    weatherData.forEach(data => {
        const barContainer = document.createElement('div');
        barContainer.style.flex = '1';
        barContainer.style.display = 'flex';
        barContainer.style.flexDirection = 'column';
        barContainer.style.alignItems = 'center';
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(data.temp / maxTemp) * 100}%`;
        
        const value = document.createElement('div');
        value.className = 'bar-value';
        value.textContent = data.temp + '°';
        bar.appendChild(value);
        
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = data.day;
        
        barContainer.appendChild(bar);
        barContainer.appendChild(label);
        barChart.appendChild(barContainer);
    });

    // Biểu đồ tròn - Xác suất mưa
    const pieCharts = document.getElementById('pieCharts');
    
    if (!pieCharts) return; // Kiểm tra element tồn tại
    
    pieCharts.innerHTML = ''; // Clear nội dung cũ
    
    weatherData.forEach(data => {
        const pieContainer = document.createElement('div');
        pieContainer.className = 'pie-chart';
        
        const percentage = data.rain;
        const circumference = 2 * Math.PI * 40;
        const offset = circumference - (percentage / 100) * circumference;
        
        pieContainer.innerHTML = `
            <div class="circle">
                <svg width="120" height="120">
                    <circle cx="60" cy="60" r="40" stroke="#e5e7eb" stroke-width="10" fill="none"/>
                    <circle cx="60" cy="60" r="40" stroke="#3b82f6" stroke-width="10" fill="none"
                        stroke-dasharray="${circumference}" 
                        stroke-dashoffset="${offset}"/>
                </svg>
                <div class="circle-text">${percentage}%</div>
            </div>
            <div class="bar-label">${data.day}</div>
        `;
        
        pieCharts.appendChild(pieContainer);
    });
}

// ========== Page 5: Grid cổ phiếu ==========
const stockData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.45, change: 2.34, changePercent: 1.33 },
    { symbol: 'MSFT', name: 'Microsoft', price: 374.82, change: -1.23, changePercent: -0.33 },
    { symbol: 'GOOGL', name: 'Alphabet', price: 139.67, change: 3.45, changePercent: 2.53 },
    { symbol: 'AMZN', name: 'Amazon', price: 145.23, change: 1.89, changePercent: 1.32 },
    { symbol: 'TSLA', name: 'Tesla', price: 242.84, change: -5.67, changePercent: -2.28 },
    { symbol: 'META', name: 'Meta Platforms', price: 318.56, change: 4.23, changePercent: 1.35 },
    { symbol: 'NVDA', name: 'NVIDIA', price: 495.22, change: 12.34, changePercent: 2.56 },
    { symbol: 'NFLX', name: 'Netflix', price: 428.91, change: -2.45, changePercent: -0.57 }
];

function initStocks() {
    const stockGrid = document.getElementById('stockGrid');
    
    if (!stockGrid) return; // Kiểm tra element tồn tại
    
    stockGrid.innerHTML = ''; // Clear nội dung cũ
    
    stockData.forEach(stock => {
        const card = document.createElement('div');
        card.className = `stock-card ${stock.change >= 0 ? 'positive' : 'negative'}`;
        
        card.innerHTML = `
            <div class="stock-symbol">${stock.symbol}</div>
            <div class="stock-name">${stock.name}</div>
            <div class="stock-price">$${stock.price}</div>
            <div class="stock-change ${stock.change >= 0 ? 'positive' : 'negative'}">
                ${stock.change >= 0 ? '▲' : '▼'} $${Math.abs(stock.change)} 
                (${stock.changePercent >= 0 ? '+' : ''}${stock.changePercent}%)
            </div>
        `;
        
        stockGrid.appendChild(card);
    });
}

// ========== Khởi tạo khi trang load xong ==========
window.addEventListener('load', () => {
    initCharts();
    initStocks();
});

// Backup: Khởi tạo khi DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    initStocks();
});