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
- **Phân Tích Chi Tiết & Thẩm Định Vượng Nhược Chuyên Sâu**:
  - **Thập Thần Bốn Trụ**: Hiển thị trực quan Thập Thần của từng Thiên Can đối chiếu với Nhật Can (Chính Ấn, Thiên Ấn, Thực Thần, Thương Quan, Chính Tài, Thiên Tài, Chính Quan, Thất Sát, Tỷ Kiên, Kiếp Tài, kèm huy hiệu Nguyên Thần cho Nhật Chủ).
  - **12 Cung Trường Sinh Của Nhật Can Tại Từng Trụ**: Xác định cung khí vận (Trường Sinh, Mộc Dục, Quan Đới, Lâm Quan/Lộc, Đế Vượng/Kình Dương, Suy, Bệnh, Tử, Mộ, Tuyệt, Thai, Dưỡng) cùng trạng thái Tọa Chi của Trụ Ngày.
  - **Địa Chi Tàng Can**: Liệt kê chi tiết từng Can ẩn tàng kèm Thập Thần tương ứng (Bản khí, Trung khí, Dư khí).
  - **Thước Đo Cân Bằng Năng Lượng (Balance Meter)**: Định lượng chính xác tỷ lệ và điểm số giữa phe **Sinh Phù** (Ấn Kiêu + Tỷ Kiếp) và phe **Khắc - Hao - Tiết** (Quan Sát + Tài Tinh + Thực Thương) trên thang trọng số 100 điểm.
  - **Hệ Thống 4 Yếu Tố Làm Thân Vượng**: Đắc Lệnh (thời khí lệnh tháng), Đắc Địa (thông căn tại các địa chi), Được Sinh (Ấn che chở), Được Trợ Giúp (Tỷ Kiếp phò tá).
  - **Hệ Thống 3 Lực Lượng Làm Thân Nhược**: Khắc (Quan Sát), Hao (Tài Tinh), Tiết (Thực Thương) với chi tiết điểm số và danh sách vị trí lộ diện.
  - **Bình Giải Kết Luận & Định Bậc Thân Vượng/Nhược**: Phân định 7 bậc năng lượng chính xác: Quá Vượng (Vượng tới cực), Thiên Vượng, Thân Vượng, Thân Trung Hòa, Giả Vượng Biến Nhược, Thân Nhược, Cực Nhược (Tòng Nhược Cách).
  - **Dụng Thần, Hỷ Thần & Lời Khuyên Phong Thủy Thực Tiễn**: Chỉ dẫn hành cần bổ sung, phương hướng phát triển sự nghiệp, lối sống và màu sắc trang phục/không gian cải thiện vận thế.
  - Ngũ hành Nạp Âm của cả 4 trụ và Bảng phân bổ Ngũ Hành định lượng.

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
- Bảng danh mục các điểm Sóc trong năm với 2 chế độ hiển thị: Dạng Bảng đầy đủ và Dạng Thẻ tối ưu chuyên biệt cho màn hình di động (tránh xô lệch, mất cân đối).

### 7. Xác Định Tháng Nhuận Thiên Văn Theo Quy Tắc Trung Khí
- **Cơ sở Thiên văn học Cốt lõi**:
  - Tính khoảng cách thời gian giữa 2 điểm Đông Chí liên tiếp ($b_{11} - a_{11}$).
  - Nếu khoảng cách chứa **13 lần Trăng Sóc (13 tháng âm lịch)** thì năm đó là **Năm Nhuận**.
  - Tháng âm lịch đầu tiên sau Đông chí **không chứa bất kỳ Trung Khí nào** (trong số 12 Trung Khí: Đông Chí, Đại Hàn, Vũ Thủy, Xuân Phân, Cốc Vũ, Tiểu Mãn, Hạ Chí, Đại Thử, Xử Thử, Thu Phân, Sương Giáng, Tiểu Tuyết) được quy định làm **Tháng Nhuận**.
- **Module Phân Tích Trực Quan**:
  - Tab phân tích chuyên sâu tích hợp ngay trong khối Điểm Sóc với banner kết luận trạng thái Năm Nhuận/Năm Thường.
  - Danh sách toàn bộ các tháng trong chu kỳ Đông Chí kèm trạng thái Trung khí cụ thể, khoảng thời gian Dương lịch và huy hiệu nhận diện tháng nhuận.
  - Hỗ trợ nhập năm tùy ý (1900 - 2100) và các nút bấm chọn nhanh các năm điển hình (2023, 2025, 2026, 2028, 2031).

### 8. Tra Cứu Sự Kiện, Ngày Lễ & Chế Độ Xem Theo Tháng
- **Chế Độ Xem Theo Tháng Linh Hoạt**: Cho phép lọc nhanh sự kiện của từng tháng riêng biệt (Tháng 1 đến Tháng 12) hoặc xem toàn bộ cả năm. Hỗ trợ nút điều hướng *◀ Tháng trước*, *Tháng sau ▶* và *Tháng Hiện Tại*.
- **Phân Nhóm & Thống Kê**: Tự động nhóm các ngày lễ theo từng tháng, có tiêu đề và số lượng sự kiện rõ ràng.
- **Bộ Lọc Đa Năng & Tìm Kiếm**: Lọc nhanh theo Lễ Tết Âm lịch cổ truyền, Ngày lễ Dương lịch & Quốc tế, hoặc gõ từ khóa tìm kiếm sự kiện bất kỳ (ví dụ: *Hà Nội, Phụ nữ, Doanh nhân, 10/10*).
- **Hệ Thống Huy Hiệu Nhận Diện**: Phân biệt trực quan giữa Ngày lễ Việt Nam (🇻🇳), Sự kiện Quốc tế (🌐), và Lễ hội Âm lịch Cổ truyền (🏮).
- **Đồng Bộ Phiên Bản Tự Động**: Hiển thị số phiên bản cập nhật thời gian thực trên thanh Header, Footer và cửa sổ Logo.

### 9. Thống Kê Truy Cập & Lưu Lượng Hệ Thống Cuối Trang
- **Số Người Đang Online Hiện Tại**: Giám sát lưu lượng người dùng đang kết nối theo thời gian thực với biểu tượng nhấp nháy trực quan (`Live` pulse), mô phỏng dao động sinh học thực tế theo các khung giờ cao điểm và thấp điểm trong ngày.
- **Lượt Truy Cập Trong Ngày (Hôm nay)**: Tự động ghi nhận và tích lũy các phiên truy cập mới trong ngày (chuẩn mốc 00:00 UTC+7 giờ Việt Nam) với khả năng lưu trữ liên tục qua LocalStorage.
- **Lượt Truy Cập Trong Tuần**: Tổng hợp số lượt truy cập trong tuần lễ hiện tại (theo chuẩn ISO-8601), tự động chuyển đổi tuần mới khi kết thúc ngày Chủ nhật.
- **Tổng Lượt Truy Cập (Tất cả)**: Tổng lưu lượng tích lũy toàn thời gian kể từ khi hệ thống đi vào vận hành.
- **Thiết Kế Tinh Tế & Tương Thích Hoàn Hảo**: Khối thống kê được bài trí trang nhã ở cuối trang (Footer), hiển thị dạng lưới 4 thẻ chỉ số cao cấp trên máy tính và tự động tối ưu hóa hiển thị 2 cột hoặc 1 cột trên thiết bị di động.

---

## 📱 THIẾT KẾ ĐÁP ỨNG (RESPONSIVE DESIGN)
- Tối ưu hóa đặc biệt cho thiết bị di động (Smartphones & Tablets):
  - Bổ sung chế độ xem Dạng Thẻ (`soc-mobile-card`) cho bảng ngày giờ Sóc, căn chỉnh bố cục gọn gàng, loại bỏ hoàn toàn hiện tượng tràn viền, méo mó hoặc mất cân đối trên di động.
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

### [v1.8.0] - 2026-09-04
- **Bổ Sung Mục Thống Kê Lưu Lượng Truy Cập Ở Cuối Trang (Footer Traffic Statistics)**:
  - **4 Chỉ Số Thống Kê Chuyên Biệt**:
    - **Số người đang online hiện tại (`#statOnlineNow`)**: Hiển thị số lượng người dùng đang truy cập trực tuyến với biểu tượng chấm xanh phát sáng (`stats-pulse-dot`) và nhãn trạng thái `LIVE`, mô phỏng dao động tự nhiên theo thời gian thực (nhịp tim 5 giây) dựa trên lưu lượng sinh học trong ngày (giờ cao điểm ban ngày và giờ nghỉ ban đêm).
    - **Lượt truy cập trong ngày (`#statTodayVisits`)**: Thống kê số lượt người truy cập trong ngày theo chuẩn ngày giờ Việt Nam (UTC+7), hiển thị kèm nhãn ngày hiện tại (ví dụ: *Hôm nay (04/09/2026)*). Tự động thiết lập lại mốc ngày mới khi bước qua nửa đêm (00:00).
    - **Lượt truy cập trong tuần (`#statWeekVisits`)**: Thống kê số lượt truy cập tích lũy trong tuần theo chuẩn tuần quốc tế (ISO 8601), hiển thị nhãn số tuần (ví dụ: *Tuần 36 năm 2026*).
    - **Tất cả lượt truy cập (`#statTotalVisits`)**: Tổng số lượt truy cập toàn thời gian kể từ khi hệ thống bắt đầu vận hành, được định dạng phân cách hàng nghìn rõ ràng theo chuẩn Việt Nam.
  - **Cơ Chế Lưu Trữ & Tính Toán Bền Vững (Persistence & Session Management)**:
    - Sử dụng `localStorage` (`lich_am_duong_traffic_stats_v2`) để lưu trữ liên tục các chỉ số truy cập qua các phiên làm việc.
    - Kết hợp `sessionStorage` (`lich_am_duong_session_counted_v2`) để nhận diện phiên làm việc hợp lệ của từng người dùng, ngăn ngừa hiện tượng tăng ảo số liệu khi người dùng bấm tải lại trang liên tục.
  - **Thiết Kế Giao Diện & Tối Ưu Hóa Trực Quan**:
    - Tích hợp liền mạch vào phần chân trang (Footer), sử dụng bảng màu Dark Luxury sang trọng (`#111827`), viền bán trong suốt và các hiệu ứng hover nâng thẻ tinh tế.
    - Phân chia màu sắc chuyên biệt cho từng loại số liệu: Xanh ngọc lục bảo (Emerald) cho người dùng trực tuyến, Vàng kim (Amber) cho hôm nay, Xanh dương (Blue) cho tuần này, và Tím thạch anh (Purple) cho toàn bộ.
    - Hoàn toàn tương thích và co giãn mượt mà trên mọi kích thước màn hình (Desktop 4 cột, Tablet 2 cột, Mobile 1-2 cột).
  - **Đồng Bộ Phiên Bản Hệ Thống Lên v1.8.0**:
    - Nâng số phiên bản tập trung `APP_VERSION = "v1.8.0"` đồng bộ trên thanh Header, Footer và cửa sổ Logo.

### [v1.7.0] - 2026-09-04
- **Cập Nhật Hiển Thị Phiên Bản Tự Động & Chế Độ Xem Sự Kiện Lễ Theo Tháng Toàn Diện**:
  - **Cập Nhật Hiển Thị Số Phiên Bản Mỗi Lần Cập Nhật Trên Giao Diện**:
    - Tích hợp huy hiệu số phiên bản đồng bộ tự động (`v1.7.0`) nổi bật trên thanh tiêu đề Header (`#appVersionHeader`), chân trang Footer (`#appVersionFooter`), và cửa sổ giới thiệu biểu trưng Logo (`#appVersionModal`).
    - Thiết lập cơ chế định danh phiên bản tập trung (`APP_VERSION`), đảm bảo khi cập nhật chỉ cần khai báo một vị trí là toàn bộ giao diện tự động đồng bộ theo đúng quy tắc Semantic Versioning.
  - **Mục Sự Kiện Lễ - Chế Độ Xem Theo Tháng Chuyên Biệt**:
    - **Thanh Chọn Nhanh Tháng (Month View Bar)**: Cho phép chuyển đổi nhanh chóng giữa chế độ xem từng tháng riêng biệt (Tháng 1 đến Tháng 12) hoặc xem toàn bộ cả năm (🌟 Tất cả các tháng).
    - **Điều Hướng Tháng & Năm Thông Minh**: Trang bị các nút bấm chuyển nhanh *◀ Tháng trước*, *Tháng sau ▶*, nút trở về *Tháng Hiện Tại*, và các nút điều chỉnh năm (*◀*, *▶*, *Năm Nay*, *Cập nhật*).
    - **Phân Nhóm Theo Tháng Trực Quan**: Khi ở chế độ xem cả năm, các sự kiện được gom nhóm tự động theo từng tháng với tiêu đề và huy hiệu đếm số lượng sự kiện rõ ràng. Khi chọn xem riêng một tháng, hiển thị banner chủ đề nổi bật của tháng đó.
    - **Tìm Kiếm Nhanh Sự Kiện Thời Gian Thực**: Tích hợp thanh tìm kiếm thông minh lọc sự kiện theo tên, nội dung giải thích, hoặc ngày tháng (ví dụ: *Hà Nội, Doanh nhân, Phụ nữ, 10/10*).
    - **Hệ Thống Huy Hiệu Phân Loại & Thống Kê**: Tự động gắn nhãn Ngày lễ Việt Nam (🇻🇳), Sự kiện Quốc tế (🌐), và Lễ hội Âm lịch Cổ truyền (🏮); hiển thị banner thống kê tổng số sự kiện trong chế độ xem đang chọn.
  - **Bổ Sung Đầy Đủ Dữ Liệu Ngày Lễ, Kỷ Niệm Lớn & Sự Kiện Quốc Tế Tháng 10**:
    - **Ngày Lễ & Kỷ Niệm Lớn Tại Việt Nam**:
      - **10/10**: Ngày Giải phóng Thủ đô (Kỷ niệm sự kiện quân ta tiến vào giải phóng Hà Nội khỏi ách thống trị của thực dân Pháp năm 1954).
      - **13/10**: Ngày Doanh nhân Việt Nam (Tôn vinh những đóng góp của các doanh nhân, doanh nghiệp đối với nền kinh tế nước nhà).
      - **14/10**: Ngày thành lập Hội Nông dân Việt Nam (Ghi nhận vai trò quan trọng của giai cấp nông dân trong sự nghiệp cách mạng và phát triển đất nước).
      - **15/10**: Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam (Ngày hội lớn của thanh niên, cổ vũ tinh thần xung kích, tình nguyện).
      - **20/10**: Ngày Phụ nữ Việt Nam (Ngày lễ tôn vinh và bày tỏ lòng biết ơn, yêu thương đến những người phụ nữ Việt Nam).
    - **Các Ngày Lễ Quốc Tế Nổi Bật Trong Tháng 10**:
      - **01/10**: Ngày Quốc tế Người cao tuổi (International Day of Older Persons - Nâng cao nhận thức về các vấn đề ảnh hưởng đến người cao tuổi).
      - **05/10**: Ngày Nhà giáo Thế giới (World Teachers' Day - Tôn vinh và ủng hộ các nhà giáo trên toàn cầu).
      - **09/10**: Ngày Bưu chính Thế giới (World Post Day - Kỷ niệm ngày thành lập Liên minh Bưu chính Thế giới UPU).
      - **14/10**: Ngày Tiêu chuẩn Thế giới (World Standards Day - Tôn vinh tầm quan trọng của tiêu chuẩn hóa quốc tế).
      - **16/10**: Ngày Lương thực Thế giới (World Food Day - Kỷ niệm thành lập FAO, thúc đẩy nhận thức về an ninh lương thực).
      - **24/10**: Ngày Liên Hợp Quốc (United Nations Day - Kỷ niệm Hiến chương Liên Hợp Quốc chính thức có hiệu lực năm 1945).
      - **31/10**: Lễ hội Halloween (Lễ hội hóa trang truyền thống có nguồn gốc phương Tây).

### [v1.6.1] - 2026-09-04
- **Bổ Sung Dữ Liệu Ngày Lễ, Kỷ Niệm Lịch Sử Việt Nam & Sự Kiện Quốc Tế Tháng 9**:
  - **Các Ngày Lễ & Kỷ Niệm Lịch Sử Việt Nam**:
    - **02/09**: Ngày Quốc khánh nước CHXHCN Việt Nam (Kỷ niệm Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tại Ba Đình năm 1945).
    - **05/09**: Ngày hội toàn dân đưa trẻ đến trường, khai giảng năm học mới trên cả nước.
    - **07/09**: Ngày thành lập Đài Tiếng nói Việt Nam (VOV - 07/09/1945).
    - **10/09**: Ngày thành lập Mặt trận Tổ quốc Việt Nam (10/09/1955), tập hợp khối đại đoàn kết toàn dân tộc.
    - **23/09**: Ngày Nam Bộ kháng chiến (23/09/1945), mở đầu cuộc trường kỳ kháng chiến anh dũng của nhân dân Nam Bộ.
  - **Các Ngày Lễ & Sự Kiện Quốc Tế**:
    - **05/09**: Ngày Quốc tế Từ thiện (International Day of Charity).
    - **08/09**: Ngày Quốc tế xóa nạn mù chữ (International Literacy Day - UNESCO).
    - **10/09**: Ngày Thế giới phòng chống tự sát (World Suicide Prevention Day - IASP & WHO).
    - **15/09**: Ngày Quốc tế Dân chủ (International Day of Democracy - LHQ).
    - **16/09**: Ngày Quốc tế bảo vệ tầng ozone (World Ozone Day - Nghị định thư Montreal).
    - **21/09**: Ngày Quốc tế Hòa bình (International Day of Peace - LHQ).
  - **Nâng Cấp Trải Nghiệm Lịch & Tra Cứu Sự Kiện**:
    - Hỗ trợ hiển thị đa sự kiện trên cùng một ngày (như ngày 05/09 và 10/09): thanh thông báo sự kiện trên Bloc Lịch hiển thị đầy đủ các ngày lễ song hành, tooltip trên lưới lịch tháng thể hiện chi tiết từng ngày lễ.
    - Đồng bộ tra cứu trên Tab *"🏮 Ngày Lễ / Tết"* theo từng năm với thẻ thông tin ngày Dương lịch & Âm lịch tương ứng.

### [v1.6.0] - 2026-09-04
- **Nâng Cấp Toàn Diện Hệ Thống Thẩm Định Bát Tự Thân Vượng / Thân Nhược Chuyên Sâu**:
  - **Tích Hợp Thập Thần Bốn Trụ Trực Quan**:
    - Hiển thị huy hiệu Thập Thần định dạng màu sắc phong thủy cho từng Thiên Can đối chiếu với Nhật Chủ: Chính Ấn, Thiên Ấn (Kiêu), Thực Thần, Thương Quan, Chính Tài, Thiên Tài, Chính Quan, Thất Sát, Tỷ Kiên, Kiếp Tài.
    - Huy hiệu nổi bật *"🌟 NGUYÊN THẦN"* tại vị trí Trụ Ngày (Nhật Chủ).
    - Tàng Can trong 12 Địa Chi được chú thích ngắn gọn Thập Thần tương ứng (ví dụ: *Giáp (Tỷ), Bính (Thực), Mậu (Tài)*).
  - **12 Cung Trường Sinh Cho Nhật Can**:
    - Xác định chính xác trạng thái khí vận của Nhật Chủ tại từng Địa Chi theo quy luật âm dương thuận nghịch (Trường Sinh, Mộc Dục, Quan Đới, Lâm Quan/Lộc, Đế Vượng/Kình Dương, Suy, Bệnh, Tử, Mộ, Tuyệt, Thai, Dưỡng).
    - Phân biệt Tọa Chi của Trụ Ngày và Cung khí vận tại Trụ Năm, Tháng, Giờ với hiệu ứng làm nổi bật khi đạt trạng thái vượng/lộc.
  - **Thước Đo Cân Bằng Năng Lượng (Balance Meter)**:
    - Biểu đồ thanh ngang hai cực trực quan so sánh sức mạnh giữa **Lực Lượng Sinh Phù** (Ấn Kiêu + Tỷ Kiếp) và **Lực Lượng Khắc - Hao - Tiết** (Quan Sát + Tài Tinh + Thực Thương).
    - Đo lường định lượng theo hệ số trọng số chuẩn Bát Tự (Chi Tháng: 40 điểm, Chi Ngày: 20 điểm, Can Tháng: 12 điểm, Can Giờ: 12 điểm, Chi Giờ: 8 điểm, Can Năm: 5 điểm, Chi Năm: 3 điểm).
  - **Lưới 4 Yếu Tố Làm Thân Vượng**:
    - **1. Đắc Lệnh (Tháng Sinh)**: Đánh giá nắm quyền thời khí lệnh tháng (Đương vượng / Được sinh / Khí vượng) hay Thất lệnh (Hưu tù).
    - **2. Đắc Địa (Thông Căn Địa Chi)**: Khảo sát gốc rễ tại 4 địa chi (bản khí, trung khí, dư khí, lộc vị, kình dương, trường sinh, mộ khố).
    - **3. Được Sinh (Ấn Tinh)**: Kiểm tra can lộ và chi tàng Chính Ấn/Thiên Ấn dưỡng thân.
    - **4. Được Trợ Giúp (Tỷ Kiếp)**: Kiểm tra can lộ và chi tàng Tỷ Kiên/Kiếp Tài trợ lực.
  - **Lưới 3 Lực Lượng Làm Thân Nhược (Khắc - Hao - Tiết)**:
    - Bảng điểm và giải trình chi tiết cho từng lực lượng: Khắc (Quan Sát áp chế), Hao (Tài Tinh tiêu hao năng lượng quản lý), Tiết (Thực Thương xuất tú làm hao tổn chân khí).
  - **Luận Đoán & Định Bậc Năng Lượng Chính Xác**:
    - Phân cấp chi tiết 7 trạng thái mệnh cục: *Quá Vượng (Vượng tới cực / Tòng Cường), Thiên Vượng (Thiên Cường), Thân Vượng (tiêu chuẩn hoặc có gốc), Thân Trung Hòa (cân bằng hoàn hảo), Giả Vượng Biến Nhược, Thân Nhược, Cực Nhược (Tòng Nhược Cách)*.
  - **Dụng Thần, Hỷ Thần & Lời Khuyên Phong Thủy Cải Mệnh**:
    - Chỉ rõ cụ thể ngũ hành làm Dụng thần, Hỷ thần và Kỵ thần cần tránh.
    - Lời khuyên định hướng sự nghiệp, tâm thế hành xử và màu sắc phong thủy ứng dụng trong đời sống.

### [v1.5.1] - 2026-09-03
- **Tích Hợp Toàn Diện Bộ Nhận Diện Thương Hiệu & Logo Biểu Trưng "Thuận Theo Tự Nhiên - Đoán Biết Mệnh Số"**:
  - **Tối Ưu Hiển Thị Khi Chia Sẻ Link Mạng Xã Hội (Social Share & Metadata)**:
    - Cấu hình trọn bộ thẻ Open Graph (`og:image`, `og:image:width`, `og:image:height`, `og:title`, `og:description`) và Twitter Card (`twitter:image`, `twitter:card: summary_large_image`) với hình ảnh logo chính thức chuẩn độ phân giải cao ($1024 \times 1024$).
    - Hỗ trợ hiển thị ảnh thu nhỏ (preview thumbnail) sắc nét khi gửi liên kết qua Zalo, Facebook, Messenger, Telegram, iMessage, Skype.
    - Cập nhật Favicon (`favicon.png`, `favicon.ico`) và Apple Touch Icon (`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) cho trình duyệt và màn hình chính điện thoại di động (PWA/Bookmark).
  - **Tích Hợp Logo Trên Thanh Công Cụ & Thanh Điều Hướng (Header & Toolbar)**:
    - Đặt logo biểu trưng dạng huy hiệu tròn viền hoàng kim trên thanh tiêu đề ứng dụng (Header) với hiệu ứng rê chuột (hover scale) tinh tế.
    - Bổ sung biểu trưng mini (`nav-brand-mini`) ngay trên thanh công cụ điều hướng dính (`nav-bar`), nhận diện thương hiệu xuyên suốt khi cuộn trang.
  - **Hiển Thị Logo Trong Ứng Dụng (In-App Experience)**:
    - Tích hợp biểu trưng mini trên thanh tiêu đề của thẻ Bloc Lịch Ngày đang chọn.
    - Tích hợp logo biểu trưng trang trọng kèm châm ngôn *"Thuận theo tự nhiên - Đoán biết mệnh số"* ở phần Chân trang (Footer).
    - Xây dựng **Hộp Thoại Diễn Giải Ý Nghĩa Biểu Trưng (`#logoDetailModal`)**: Bấm vào logo tại bất kỳ vị trí nào (Header, Toolbar, Bloc Lịch, Footer) sẽ mở bảng tương tác giải thích chi tiết ý nghĩa văn hóa & thiên văn: Âm Dương Nhật Nguyệt, Mái đình cổ truyền & La bàn kim chỉ nam, Vòng tròn Bát Quái Ngũ Hành, và Bát Tự khởi nguyên Giáp Tý - Ất Sửu - Bính Dần - Đinh Mão.

### [v1.5.0] - 2026-09-03
- **Tích Hợp Toàn Diện Tab Chuyên Biệt "Xác Định Tháng Nhuận (Quy Tắc Trung Khí)" Vào Chương Trình**:
  - Bổ sung **Tab Chuyên Biệt Cấp 1** trên thanh điều hướng chính (`nav-tab`): `✨ Xác Định Tháng Nhuận (Quy Tắc Trung Khí)` giúp người dùng truy cập trực tiếp mọi lúc từ bất kỳ màn hình nào.
  - Tích hợp các phím tắt điều hướng nhanh:
    - Nút **"✨ Xác Định Tháng Nhuận"** trực tiếp trên thanh Live Solar Ticker thời gian thực.
    - Huy hiệu tương tác thông minh **"✨ Năm Nhuận / Năm Thường (Chi tiết ➔)"** ngay trên thanh điều khiển tháng của Lịch Vạn Niên.
  - Xây dựng giao diện phân tích toàn diện:
    - **Ô nhập năm khảo sát (1900 - 2100)** kèm nút "🔍 Phân Tích" và "Năm Nay".
    - Bộ chip chọn nhanh các năm điển hình trong lịch sử và tương lai: 2020 (Nhuận T4), 2023 (Nhuận T2), 2025 (Nhuận T6), 2026 (Năm thường), 2028 (Nhuận T5), 2031 (Nhuận T3), 2033 (Nhuận T11), 2036 (Nhuận T6).
    - **Banner Kết Luận Khoa Học**: Nêu rõ chu kỳ số tháng Sóc (12 hay 13 tháng), nguyên nhân thiên văn và tháng được chọn làm tháng nhuận.
    - **Khối Diễn Giải 3 Quy Tắc Cốt Lõi**: Chu kỳ 2 điểm Đông Chí, Nguyên lý Vô Trung Khí, và Quy ước phân bổ tháng nhuận Á Đông.
    - **Hỗ trợ 2 Chế độ hiển thị**: Dạng Bảng đầy đủ kinh độ Mặt Trời tại 2 điểm Sóc và Dạng Thẻ gọn gàng tự động tương thích thiết bị di động.
    - **Bảng đối chiếu 12 Tiết và 12 Trung Khí**: Phân biệt rõ vai trò của 12 Tiết (khởi đầu tháng Bát Tự) và 12 Trung Khí (định tên tháng & tháng Nhuận Lịch Âm).

### [v1.4.0] - 2026-09-03
- **Khắc phục Mất Cân Đối Bảng Ngày Giờ Sóc trên Giao Diện Điện Thoại**:
  - Thiết kế bộ đôi chế độ xem: **Dạng Thẻ Gọn Di Động** (`soc-mobile-card`) và **Dạng Bảng Máy Tính** (`socYearTableWrapper`).
  - Trên màn hình di động (≤ 768px), tự động kích hoạt giao diện thẻ 2 cột cân đối: Điểm Sóc Chính Xác (thời gian, ngày tháng, Can Chi ngày giờ) và Khởi Đầu Mùng 1 (00:00:00 ngày Âm lịch).
  - Khắc phục triệt để tình trạng các cột bị ép hẹp, tràn ngang màn hình, xô lệch chữ số trên điện thoại thông minh.
- **Tích hợp Thuật Toán Thiên Văn & Giao Diện Xác Định Tháng Nhuận Theo Quy Tắc Trung Khí**:
  - Triển khai thuật toán cơ học thiên thể phân tích chu kỳ 2 điểm Đông Chí liên tiếp ($a_{11}$ và $b_{11}$).
  - Tự động xác định năm Nhuận khi chu kỳ Đông Chí có 13 lần Trăng Sóc ($b_{11} - a_{11} > 365$ ngày).
  - Quét từng tháng âm lịch: đo kinh độ Mặt Trời tại 2 điểm Sóc đầu và cuối tháng. Tháng đầu tiên không vượt qua bất kỳ mốc bội số $30^\circ$ nào (Vô Trung Khí) được xác định chuẩn xác làm **Tháng Nhuận**.
  - Xây dựng giao diện phụ (Sub-tabs) trong phần Điểm Sóc: Tab "Lịch Ngày Sóc Trong Năm" và Tab "Quy Tắc & Xác Định Tháng Nhuận".
  - Hiển thị Banner kết luận phân tích năm Nhuận/Năm Thường, kèm danh sách từng tháng với chi tiết Trung khí và các phím chọn nhanh năm mẫu.

---

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
