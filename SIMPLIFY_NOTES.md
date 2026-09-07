# 📝 Ghi Chú Sửa Phần Âm Dương Bất Tương

## 🎯 Mục đích
Đơn giản hóa hiển thị phần "Âm Dương Bất Tương" trên Bloc Lịch:
- ❌ Loại bỏ toàn bộ phần "Nghi Kỵ Dụng Sự" (các card "Nên làm/Kiêng cữ")
- ✅ Chỉ hiển thị: **Loại Bất Tương + Ý nghĩa rõ ràng**
- ✅ Giữ lại badge màu sắc để phân biệt

## 📌 Các trường hợp cần hiển thị

### 1. **Bất Tương** (Xanh lá)
```
🟢 Bất Tương: Âm dương hòa hợp, tốt cho cưới hỏi, nạp lễ, rước dâu
```

### 2. **Dương Tương** (Cam)
```
🟠 Dương Tương: Khí Dương thái quá, hại nam chủ (kỵ chú rể) trong hôn lễ
```

### 3. **Âm Tương** (Cam đỏ)
```
🟠 Âm Tương: Khí Âm thái quá, hại nữ chủ (kỵ cô dâu) trong hôn lễ
```

### 4. **Câu Tương** (Đỏ)
```
🔴 Câu Tương: Cả Âm và Dương đều xung khắc, hại cả hai (đại kỵ cưới hỏi)
```

### 5. **Không xét** (Xám)
```
⬜ Không xét: Không thuộc quy tắc sinh khắc, ngày trung lập
```

## 🔧 Nơi cần sửa
- File: `index.html`
- Tìm: CSS class `.bloc-nghi-ky-section` và JavaScript function render Bất Tương
- Sửa: Thay thế logic hiển thị card từ "nhiều card nghi kỵ" → "1 dòng thông tin đơn giản"

## ✅ Kết quả sau sửa
Phần Bất Tương sẽ hiển thị gọn gàng, chỉ 1-2 dòng với badge màu sắc rõ ràng.
