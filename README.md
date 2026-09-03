# ỨNG DỤNG LỊCH ÂM DƯƠNG & BÁT TỰ THIÊN VĂN CHÍNH XÁC CAO

Ứng dụng web toàn diện tra cứu Lịch Vạn Niên, Âm Dương Lịch, Lá số Bát Tự Tứ Trụ, Ngày Giờ Hoàng Đạo, Điểm Sóc và 24 Tiết Khí Thiên Văn học với độ chính xác cao dựa trên các thuật toán cơ học thiên thể (NASA JPL / VSOP87 / Jean Meeus).

---

## 🌟 TỔNG QUAN TÍNH NĂNG CHÍNH

### 1. Lịch Vạn Niên & Bloc Lịch Hàng Ngày
- **Lưới Lịch Tháng Toàn Diện**: Hiển thị song song ngày Dương lịch và ngày Âm lịch trên cùng một ô lưới; đánh dấu ngày Sóc (Mùng 1), ngày Rằm (15), ngày Hoàng đạo, ngày chuyển Tiết khí, và các ngày lễ truyền thống Việt Nam / quốc tế.
- **Bloc Lịch Chi Tiết**:
  - Thứ trong tuần, ngày Dương lịch, ngày/tháng/năm Âm lịch và năm Can Chi.
  - Can Chi ngày, Can Chi tháng, Can Chi năm, Giờ đầu ngày (Giáp Tý/Bính Tý...).
  - Giờ Hoàng Đạo và Giờ Hắc Đạo trong 12 canh giờ (kèm con giáp và khung giờ chuẩn).
  - Ngũ hành Nạp Âm của ngày.
  - Trực (Thập nhị Trực: Kiến, Trừ, Mãn, Bình, Định, Chấp, Phá, Nguy, Thành, Thâu, Khai, Bế).
  - Sao Nhị Thập Bát Tú (28 vì tinh tú cai quản ngày kèm tính chất Kiết/Hung).
  - Hướng xuất hành đón Hỷ Thần, Tài Thần, Hạc Thần (tránh đi ngược hướng hung).
  - Việc nên làm và việc kiêng kỵ trong ngày.
- **Điều Hướng Linh Hoạt**: Chọn nhanh Hôm nay, nút Lùi/Tiến tháng, lướt chọn nhanh Năm (1900 - 2100) và Tháng trực quan.

### 2. Công Cụ Đổi Ngày Âm - Dương
- Chuyển đổi chính xác 2 chiều giữa Dương lịch (Gregorian Calendar) và Âm lịch Việt Nam (múi giờ chuẩn UTC+7).
- Hỗ trợ đầy đủ xử lý các năm có **Tháng Nhuận** theo quy luật thiên văn Việt Nam.
- Xem thông tin Can Chi, Tiết khí và ngày trong tuần tức thì ngay sau khi chuyển đổi.

### 3. Tra Cứu Ngày Tốt / Xấu & Ngày Xuất Hành
- **Khổng Minh Lục Diệu**: Tra cứu trạng thái cát hung thời vận của ngày (Tốc Hỷ, Đại An, Tiểu Cát, Lưu Niên, Xích Khẩu, Không Vong).
- **Hệ Thống Sao Ngọc Hạp Thông Thư**: Liệt kê chi tiết các Cát Tinh (Sao tốt: Thiên Đức, Nguyệt Đức, Thiên Hỷ, Sinh Khí...) và Hung Tinh (Sao xấu: Sát Chủ, Thọ Tử, Tam Nương, Nguyệt Kỵ...).
- Bộ lọc ngày theo mục đích công việc: Cưới hỏi, Động thổ, Khai trương, Xuất hành, Nhập trạch.

### 4. Bát Tự Tứ Trụ Chuẩn Thiên Văn (Bốn Trụ Năm - Tháng - Ngày - Giờ)
- **Chuẩn Hóa Tiết Khí**:
  - **Trụ Năm**: Được tính chuyển năm mới chính xác tại thời khắc **Lập Xuân** ($315^\circ$ kinh độ hoàng đạo Mặt Trời), không phụ thuộc vào mùng 1 Tết Âm lịch.
  - **Trụ Tháng**: Được phân định nghiêm ngặt theo **12 Tiết (Tiết Lệnh)** của thiên văn học (Dần từ Lập Xuân, Mão từ Kinh Trập, Thìn từ Thanh Minh...), kết hợp quy luật khởi Can tháng theo khẩu quyết **Ngũ Hổ Độn**.
  - **Trụ Ngày (Nhật Chủ)**: Tính toán dựa trên số ngày Julian ($JD$) chính xác liên tục hàng nghìn năm.
  - **Trụ Giờ**: Tính theo 12 canh giờ và khẩu quyết **Ngũ Thử Độn**.
- **Phân Tích Chi Tiết**:
  - Địa Chi Tàng Can (Can ẩn tàng trong từng Chi).
  - Thập Thần đối chiếu với Nhật Chủ (Chính Ấn, Thiên Ấn, Thực Thần, Thương Quan, Chính Tài, Thiên Tài, Chính Quan, Thất Sát, Tỷ Kiên, Kiếp Tài).
  - Ngũ hành Nạp Âm của cả 4 trụ.
  - Bảng thống kê định lượng phân bổ Ngũ Hành (Kim, Mộc, Thủy, Hỏa, Thổ) nhằm tìm Hỷ Thần / Dụng Thần trợ mệnh.

### 5. Thiên Văn Học NASA/VSOP87 & 24 Tiết Khí Thời Gian Thực
- **Độ Chính Xác Tuyệt Đối**: Áp dụng các công thức giải tích cơ học thiên thể (VSOP87 / Jean Meeus / NASA JPL) tính toán kinh độ hoàng đạo biểu kiến của Mặt Trời ($L_\odot$) có hiệu chỉnh chương động (nutation) và quang sai (aberration).
- **Phân Định 12 Tiết và 12 Khí**:
  - **12 Tiết (Tiết Lệnh)**: Lập Xuân ($315^\circ$), Kinh Trập ($345^\circ$), Thanh Minh ($15^\circ$), Lập Hạ ($45^\circ$), Mang Chủng ($75^\circ$), Tiểu Thử ($105^\circ$), Lập Thu ($135^\circ$), Bạch Lộ ($165^\circ$), Hàn Lộ ($195^\circ$), Lập Đông ($225^\circ$), Đại Tuyết ($255^\circ$), Tiểu Hàn ($285^\circ$).
  - **12 Khí (Trung Khí)**: Vũ Thủy ($330^\circ$), Xuân Phân ($0^\circ$), Cốc Vũ ($30^\circ$), Tiểu Mãn ($60^\circ$), Hạ Chí ($90^\circ$), Đại Thử ($120^\circ$), Xử Thử ($150^\circ$), Thu Phân ($180^\circ$), Sương Giáng ($210^\circ`), Tiểu Tuyết ($240^\circ$), Đông Chí ($270^\circ$), Đại Hàn ($300^\circ$).
- **Live Ticker Tọa Độ Mặt Trời**:
  - Cập nhật thời gian thực tọa độ Mặt Trời dạng độ, phút, giây (`° ' "`) và Cung Hoàng Đạo thiên văn.
  - Thanh tiến trình hiển thị % đã qua trong tiết khí hiện tại.
  - Đồng hồ đếm ngược từng giây đến thời khắc chuyển tiết tiếp theo (chính xác đến giây theo giờ Việt Nam UTC+7).
- **Tab Tra Cứu 24 Tiết Khí**: Bảng tính thời điểm chuyển tiết của toàn bộ 24 tiết khí theo từng năm (1900 - 2100) kèm bộ lọc theo Tiết Lệnh, Trung Khí, hoặc 4 điểm Phân / Chí. Nhấp vào tiết khí sẽ đồng bộ ngay lập tức sang ngày tương ứng trên Lịch Vạn Niên.

### 6. Điểm Sóc (New Moon) & Khởi Ngày Mùng 1 Âm Lịch
- Tính toán chính xác thời điểm giao hội Mặt Trời – Mặt Trăng (Điểm Sóc) theo múi giờ UTC+7.
- Quy định khoa học: Ngày Dương lịch chứa điểm Sóc là ngày Mùng 1 Âm lịch (bắt đầu từ 00:00:00 của ngày đó).
- Xác định độ dài tháng Âm lịch: Tháng Đủ (30 ngày) hoặc Tháng Thiếu (29 ngày).
- Bảng danh mục các điểm Sóc trong năm với tính năng mở rộng/thu gọn thông minh.

---

## 📱 THIẾT KẾ ĐÁP ỨNG (RESPONSIVE DESIGN)
- Tối ưu hóa đặc biệt cho thiết bị di động (Smartphones & Tablets):
  - Bố cục khối Bloc Lịch dạng hàng ngang cân xứng (`.bloc-hero-row`), giảm chiều cao chiếm dụng, tạo sự thông thoáng.
  - Tự động thu gọn bảng Điểm Sóc trên màn hình nhỏ để ưu tiên nội dung lịch hàng ngày.
  - Thanh trạng thái thiên văn trực tiếp co giãn tự động theo 2 cột.
  - Hỗ trợ thao tác cảm ứng mượt mà, cỡ chữ và độ tương phản màu sắc đạt chuẩn WCAG AA.

---

## 🏷️ QUY TẮC SỐ HOÁ PHIÊN BẢN (SEMANTIC VERSIONING)

Ứng dụng tuân thủ chuẩn **Semantic Versioning (SemVer) 2.0.0**:
$$\text{Phiên bản} = \text{MAJOR}.\text{MINOR}.\text{PATCH}$$

- **MAJOR (Số chính)**: Thay đổi lớn về kiến trúc, phá vỡ tính tương thích ngược, hoặc đại tu toàn bộ giao diện/chức năng.
- **MINOR (Số phụ)**: Bổ sung tính năng mới, module chức năng mới, nâng cấp thuật toán lớn mà vẫn đảm bảo tính tương thích ngược.
- **PATCH (Số bản vá)**: Sửa lỗi nhỏ, cải thiện hiệu năng, tinh chỉnh CSS/giao diện, cập nhật dữ liệu lịch hoặc tài liệu.

> **QUY ĐỊNH BẮT BUỘC KHI CẬP NHẬT:**  
> Mỗi lần có bất kỳ cập nhật nào (dù là thêm tính năng, sửa lỗi, hay tinh chỉnh giao diện), phiên bản trong `package.json` và bảng **LỊCH SỬ CẬP NHẬT (CHANGELOG)** ở phần dưới của file `README.md` này **BẮT BUỘC PHẢI ĐƯỢC GHI NHẬN LẠI ĐẦY ĐỦ**.

---

## 📜 LỊCH SỬ CẬP NHẬT (CHANGELOG)

### [v1.3.1] - 2026-09-02
- **Tài liệu hóa & Quản lý phiên bản**:
  - Tạo file `README.md` số hoá toàn bộ tính năng, kiến trúc thiên văn và quy chuẩn quản lý phiên bản.
  - Thiết lập hướng dẫn cập nhật liên tục cho các phiên bản tiếp theo.
  - Cập nhật số phiên bản đồng bộ trong `package.json` (`1.3.1`).

---

### [v1.3.0] - 2026-09-02
- **Tối ưu hóa Giao diện Di động (Mobile Responsive Overhaul)**:
  - **Thiết kế lại Khối Bloc Lịch Ngày**: Cấu trúc lại khối hiển thị số ngày Dương lịch và cụm Âm lịch theo hàng ngang (`.bloc-hero-row`), điều chỉnh kích thước chữ số ngày Dương tinh tế (2.5rem), giảm hơn 50% chiều cao thừa giúp tránh chiếm trọn màn hình điện thoại.
  - **Tối ưu hóa Lưới Lịch Tháng**: Cân chỉnh lại chiều cao ô lịch (`min-height: 42px - 46px`) và tỷ lệ font chữ, đảm bảo 6 hàng tuần hiển thị cân đối, không bị tràn viền trên màn hình hẹp (dưới 380px).
  - **Thu Gọn Bảng Điểm Sóc Thông Minh**: Tự động thu gọn bảng danh sách 12–14 điểm Sóc trong năm khi truy cập trên thiết bị di động (≤ 768px), cho phép người dùng xem ngay Bloc thông tin ngày mà không cần cuộn trang dài.
  - **Responsive Banner Thiên Văn Trực Tiếp**: Tự động co giãn thanh trạng thái kinh độ Mặt Trời thành lưới 2 cột gọn gàng trên mobile, căn chỉnh nút chuyển tab toàn diện.

---

### [v1.2.0] - 2026-09-02
- **Tích hợp Thuật toán Thiên văn học NASA JPL / VSOP87 Tính 24 Tiết Khí**:
  - Ứng dụng giải thuật cơ học thiên thể tính toán kinh độ hoàng đạo biểu kiến của Mặt Trời ($L_\odot$) kèm hiệu chỉnh quang sai và chương động.
  - Phân định rõ ràng theo chuẩn học thuật giữa **12 Tiết (Tiết Lệnh)** và **12 Khí (Trung Khí)**.
  - **Thanh Thiên Văn Thời Gian Thực (Live Ticker)**:
    - Đo kinh độ Mặt Trời theo thời gian thực dạng độ, phút, giây (`° ' "`) và cung hoàng đạo tương ứng.
    - Hiển thị tiến trình phần trăm của tiết khí hiện tại.
    - Đồng hồ đếm ngược từng giây đến thời điểm chuyển tiết tiếp theo (độ chính xác đến giây theo UTC+7).
  - **Tab Tra Cứu 24 Tiết Khí Độc Lập**: Bảng tra cứu 24 tiết khí theo từng năm với bộ lọc nhanh (Tất cả, 12 Tiết, 12 Khí, 4 Điểm Phân/Chí), hỗ trợ nhấp để đồng bộ ngay sang Lịch Vạn Niên.
  - **Chuẩn Hóa Bát Tự Tứ Trụ Theo Thiên Văn**:
    - Trụ Năm khởi chính xác tại thời khắc **Lập Xuân** ($315^\circ$).
    - Trụ Tháng chuyển lệnh chính xác tại 12 Tiết Lệnh thiên văn kết hợp khẩu quyết Ngũ Hổ Độn.

---

### [v1.1.0] - 2026-09-02
- **Tích hợp Điểm Sóc & Khởi Ngày Mùng 1 Âm Lịch**:
  - Xây dựng thuật toán tính toán thời điểm Sóc (New Moon - giao hội Mặt Trăng và Mặt Trời) theo kinh độ thiên văn múi giờ Việt Nam UTC+7.
  - Xác định chính xác ngày chứa thời điểm Sóc là ngày Mùng 1 Âm lịch (tính từ 00:00:00).
  - Bổ sung bảng danh mục toàn bộ các điểm Sóc trong năm Dương lịch, xác định tháng Đủ (30 ngày) và tháng Thiếu (29 ngày).
  - Thêm thẻ thông tin điểm Sóc của tháng trên giao diện Bloc Lịch hàng ngày.

---

### [v1.0.0] - 2026-09-02
- **Phát hành phiên bản đầu tiên của Ứng dụng Lịch Âm Dương & Bát Tự**:
  - Giao diện Lịch Vạn Niên tương tác chọn ngày/tháng/năm.
  - Bloc Lịch chi tiết: Dương lịch, Âm lịch, Can Chi ngày/tháng/năm, Giờ Hoàng đạo, Tiết khí, Ngũ hành Nạp Âm.
  - Tra cứu Nhị thập bát tú, Thập nhị Trực, Hướng xuất hành Cát/Hung.
  - Bộ công cụ Đổi Ngày Âm - Dương nhanh chóng (1900 - 2100).
  - Bảng tra cứu Ngày Hoàng Đạo, Hắc Đạo, Khổng Minh Lục Diệu và Cát Tinh / Hung Tinh.
  - Trình lập Lá số Bát Tự Tứ Trụ: Can Chi 4 trụ, Địa Chi Tàng Can, Thập Thần, phân bổ Ngũ Hành.
  - Thiết lập giao diện màu sắc truyền thống (Đỏ chu sa, Vàng hoàng kim, Nền kem ấm áp).

---

## 💻 CÔNG NGHỆ SỬ DỤNG
- **Frontend Core**: HTML5, CSS3 hiện đại, Vanilla JavaScript / TypeScript.
- **Styling**: Hệ thống CSS tùy biến linh hoạt, tích hợp Tailwind CSS utility classes, thiết kế theo phong cách truyền thống trang nhã.
- **Thuật toán Thiên văn**:
  - VSOP87 / Jean Meeus Astronomical Algorithms (Kinh độ Mặt Trời, Điểm Sóc, Phương trình thời gian).
  - Hồ Ngọc Đức Astronomical Vietnamese Lunar Calendar Algorithms.
- **Môi trường**: Node.js, Vite, Express, TypeScript.

---

## 📌 HƯỚNG DẪN CẬP NHẬT CHO CÁC PHIÊN BẢN TIẾP THEO
Mỗi khi phát triển tính năng mới, tối ưu hóa hoặc sửa lỗi:
1. Xác định loại phiên bản cần nâng: `MAJOR` (tính năng lớn/thay đổi nền tảng), `MINOR` (tính năng/thuật toán mới), hoặc `PATCH` (sửa lỗi/giao diện).
2. Cập nhật trường `"version"` trong file `package.json`.
3. Thêm một mục mới vào phần **📜 LỊCH SỬ CẬP NHẬT (CHANGELOG)** trong file `README.md` theo định dạng:
   ```markdown
   ### [vX.Y.Z] - YYYY-MM-DD
   - **Tên nhóm thay đổi**:
     - Chi tiết thay đổi 1...
     - Chi tiết thay đổi 2...
   ```
4. Kiểm tra biên dịch (`compile_applet`) và kiểm tra cú pháp (`lint_applet`) trước khi hoàn tất.
