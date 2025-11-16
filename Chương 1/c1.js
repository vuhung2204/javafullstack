// c1.js

let students = [];

// Thêm sinh viên
$('#studentForm').on('submit', function(e) {
    e.preventDefault();
    
    const student = {
        id: $('#studentId').val(),
        name: $('#studentName').val(),
        class: $('#studentClass').val(),
        score: parseFloat($('#studentScore').val())
    };
    
    students.push(student);
    renderTable();
    
    // Hiển thị thông báo thành công
    $('#successAlert').fadeIn().delay(2000).fadeOut();
    
    // Reset form
    this.reset();
});

// Xếp loại sinh viên
function getGrade(score) {
    if (score >= 9) return '<span class="badge bg-success">Xuất Sắc</span>';
    if (score >= 8) return '<span class="badge bg-primary">Giỏi</span>';
    if (score >= 7) return '<span class="badge bg-info">Khá</span>';
    if (score >= 5) return '<span class="badge bg-warning">Trung Bình</span>';
    return '<span class="badge bg-danger">Yếu</span>';
}

// Render bảng
function renderTable() {
    const tbody = $('#studentTableBody');
    tbody.empty();
    
    if (students.length === 0) {
        tbody.append('<tr><td colspan="7" class="text-center text-muted">Chưa có dữ liệu</td></tr>');
        return;
    }
    
    students.forEach((student, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.class}</td>
                <td>${student.score}</td>
                <td>${getGrade(student.score)}</td>
                <td>
                    <button class="btn btn-sm btn-warning btn-action" onclick="editStudent(${index})">✏️ Sửa</button>
                    <button class="btn btn-sm btn-danger btn-action" onclick="deleteStudent(${index})">🗑️ Xóa</button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });
}

// Xóa sinh viên
function deleteStudent(index) {
    if (confirm('Bạn có chắc muốn xóa sinh viên này?')) {
        students.splice(index, 1);
        renderTable();
    }
}

// Sửa sinh viên
function editStudent(index) {
    const student = students[index];
    $('#studentId').val(student.id);
    $('#studentName').val(student.name);
    $('#studentClass').val(student.class);
    $('#studentScore').val(student.score);
    
    students.splice(index, 1);
    renderTable();
}

// Xuất JSON
$('#exportJSON').on('click', function() {
    const json = JSON.stringify(students, null, 2);
    downloadFile(json, 'students.json', 'application/json');
});

// Xuất XML
$('#exportXML').on('click', function() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<students>\n';
    students.forEach(student => {
        xml += '  <student>\n';
        xml += `    <id>${student.id}</id>\n`;
        xml += `    <name>${student.name}</name>\n`;
        xml += `    <class>${student.class}</class>\n`;
        xml += `    <score>${student.score}</score>\n`;
        xml += '  </student>\n';
    });
    xml += '</students>';
    downloadFile(xml, 'students.xml', 'application/xml');
});

// Tải file
function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}