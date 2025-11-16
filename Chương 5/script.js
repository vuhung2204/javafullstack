// Bài 1: Thêm hàng vào bảng
function bai1() {
    const html = `
        <div class="ket-qua">
            <h3>Bảng sản phẩm:</h3>
            <table id="bangSanPham">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Laptop</td>
                        <td>15,000,000đ</td>
                        <td>Còn hàng</td>
                    </tr>
                </tbody>
            </table>
            <button onclick="themHang()" style="margin-top: 10px;">➕ Thêm hàng mới</button>
        </div>
    `;
    document.getElementById('ketqua1').innerHTML = html;
}

function themHang() {
    const bang = document.getElementById('bangSanPham').getElementsByTagName('tbody')[0];
    const hangMoi = bang.insertRow();
    hangMoi.innerHTML = `
        <td>Sản phẩm ${bang.rows.length + 1}</td>
        <td>${Math.floor(Math.random() * 20000000)}đ</td>
        <td>Còn hàng</td>
    `;
}

// Bài 2: Đổi màu chữ
function bai2() {
    const mauSac = ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#FF1493'];
    const chu = 'TRÊN';
    let html = '<div class="ket-qua"><div id="chu-mau">';
    
    for (let i = 0; i < chu.length; i++) {
        const mau = mauSac[Math.floor(Math.random() * mauSac.length)];
        html += `<span style="color: ${mau}">${chu[i]}</span>`;
    }
    
    html += '</div></div>';
    document.getElementById('ketqua2').innerHTML = html;
}

// Bài 3: Cửa sổ cảnh báo
function bai3() {
    const ketQua = confirm('Đây là cửa sổ cảnh báo!\nBạn có muốn tiếp tục không?');
    const thongBao = ketQua ? 
        '✅ Bạn đã nhấn OK' : 
        '❌ Bạn đã nhấn Cancel';
    
    document.getElementById('ketqua3').innerHTML = `
        <div class="ket-qua">
            <p style="font-size: 18px; font-weight: bold;">${thongBao}</p>
        </div>
    `;
}

// Bài 4: Liên kết Wikipedia
function bai4() {
    document.getElementById('ketqua4').innerHTML = `
        <div class="ket-qua">
            <p>Nhấn vào liên kết bên dưới để truy cập Wikipedia:</p>
            <a href="https://vi.wikipedia.org" target="_blank" 
               style="color: #667eea; font-size: 18px; font-weight: bold; text-decoration: none;">
                🌐 Đến Wikipedia Tiếng Việt
            </a>
        </div>
    `;
}

// Bài 5: Ô nhập liệu và nút
function bai5() {
    document.getElementById('ketqua5').innerHTML = `
        <div class="ket-qua">
            <p>Nhập văn bản và nhấn nút để xử lý:</p>
            <input type="text" id="oNhapLieu" placeholder="Nhập nội dung tại đây...">
            <button onclick="xuLyDuLieu()">📤 Gửi</button>
            <div id="ketQuaNhap" style="margin-top: 10px;"></div>
        </div>
    `;
}

function xuLyDuLieu() {
    const noiDung = document.getElementById('oNhapLieu').value;
    if (noiDung.trim() === '') {
        alert('⚠️ Vui lòng nhập nội dung!');
        return;
    }
    document.getElementById('ketQuaNhap').innerHTML = `
        <p style="color: #27ae60; font-weight: bold;">
            ✅ Bạn đã nhập: "${noiDung}"
        </p>
    `;
}

// Xóa tất cả kết quả
function xoaTatCa() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById('ketqua' + i).innerHTML = '';
    }
    alert('🗑️ Đã xóa tất cả kết quả!');
}