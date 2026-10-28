# Lịch Âm Dương & Bát Tự

**Vòng Xoay Duyên Khởi — Giao thoa Thời Gian và Nhân Duyên**

Ứng dụng web tra cứu lịch âm dương Việt Nam, tiết khí và các hệ thống mệnh lý phương Đông. Dự án hướng tới việc đặt lịch pháp và các phương pháp truyền thống trong một giao diện thống nhất; kết quả mệnh lý nên được xem là thông tin tham khảo văn hóa, không phải kết luận khoa học hay lời khuyên thay thế cho quyết định cá nhân.

- **Ứng dụng trực tuyến:** https://lichamduong-battu.vercel.app/
- **Mã nguồn:** https://github.com/caphenpro/Bloger
- **Phiên bản hiện tại:** `1.47.0` (theo `package.json`)

## Chức năng chính

Các nhóm chức năng được phát triển trong ứng dụng gồm:

- **Lịch vạn niên:** xem lịch dương và âm lịch, điều hướng ngày/tháng/năm và xem thông tin ngày được chọn.
- **Can Chi và tiết khí:** tra cứu thông tin Can Chi, các mốc tiết khí và dữ liệu thời gian liên quan.
- **Đổi lịch âm – dương:** chuyển đổi ngày theo lịch Việt Nam, có xét tháng nhuận.
- **Tra cứu ngày và giờ:** hiển thị một số hệ thống chọn ngày truyền thống như Hoàng đạo/Hắc đạo, Thập nhị Trực, Nhị thập bát Tú và các thần sát được tích hợp.
- **Bát Tự Tứ Trụ:** lập và xem thông tin Tứ Trụ cùng các yếu tố diễn giải mệnh lý.
- **Kỳ Môn Độn Giáp:** công cụ lập bàn và tra cứu theo các tham số ngày giờ.
- **Hôn nhân và trạch nhật:** công cụ đối chiếu tuổi, cung mệnh và khảo sát thời điểm theo các quy tắc truyền thống.
- **Hồ sơ và báo cáo:** một số màn hình hỗ trợ xem chi tiết hoặc xuất dữ liệu để lưu lại.

> Phạm vi hiển thị và kết quả cụ thể có thể thay đổi theo phiên bản triển khai. Các thuật ngữ như “cát”, “hung”, “hợp” hay “kỵ” thuộc hệ thống quy ước truyền thống, không phải dự báo chắc chắn về sự kiện thực tế.

## Công nghệ

- **Giao diện / công cụ build:** Vite
- **React:** React 19 và React DOM
- **Ngôn ngữ:** JavaScript, TypeScript và JSX/TSX
- **CSS:** Tailwind CSS 4 cùng CSS tùy chỉnh
- **Biểu tượng và hiệu ứng:** Lucide React, Motion
- **Tích hợp AI:** gói `@google/genai`; việc sử dụng cần cấu hình khóa API phù hợp với môi trường triển khai.

### Cấu trúc đáng chú ý

- `index.html`: tệp giao diện và phần triển khai ứng dụng chính hiện có.
- `src/main.tsx`: điểm khởi chạy React.
- `src/App.tsx`: component gốc React.
- `thanSatData.js`: dữ liệu liên quan đến thần sát.
- `package.json`: thông tin gói, phiên bản và các lệnh phát triển.
- `vite.config.ts`, `tsconfig.json`: cấu hình build và TypeScript.
- `.env.example`: ví dụ biến môi trường.

## Chạy dự án tại máy

Yêu cầu Node.js và npm. Từ thư mục dự án, chạy:

```bash
npm install
npm run dev
```

Vite sẽ khởi chạy máy chủ phát triển tại cổng `3000` theo cấu hình hiện tại.

### Kiểm tra bản build

```bash
npm run lint
npm run build
npm run preview
```

- `npm run lint`: kiểm tra kiểu TypeScript theo cấu hình hiện tại.
- `npm run build`: tạo bản build trong thư mục `dist`.
- `npm run preview`: chạy thử bản build đã tạo.

## Triển khai trên Vercel

Dự án đã có bản triển khai tại đường dẫn ở đầu tài liệu. Khi triển khai lại:

1. Kết nối repository với Vercel.
2. Chọn framework/build tool phù hợp với Vite.
3. Dùng lệnh build `npm run build` và thư mục đầu ra `dist`.
4. Nếu tính năng AI cần khóa API, cấu hình biến môi trường trong phần quản lý dự án của nền tảng triển khai. Không đưa khóa bí mật vào mã nguồn hoặc commit lên Git.
5. Sau khi deploy, kiểm tra trực tiếp các luồng chính trên cả điện thoại và máy tính.

## Cấu hình môi trường

Xem `.env.example` để biết các biến môi trường được dự án khai báo. Giá trị trong tệp ví dụ chỉ là mẫu, không phải khóa API hợp lệ. Chỉ cấu hình khóa thật trong môi trường riêng tư của nền tảng chạy ứng dụng.

## Lưu ý về độ chính xác

Lịch âm, thời điểm tiết khí và các phép tính Can Chi phụ thuộc vào quy tắc lịch pháp, múi giờ và thuật toán được sử dụng. Nên kiểm thử bằng các ngày đối chiếu đã biết, đặc biệt tại thời điểm chuyển ngày, đầu tháng âm lịch, tháng nhuận và thời điểm giao tiết. Các phần luận giải huyền học phản ánh quy tắc của hệ thống truyền thống, không nên trình bày như kết quả đã được khoa học thực nghiệm xác nhận.

## Quản lý phiên bản

Phiên bản ứng dụng được khai báo trong `package.json`. Khi thay đổi mã nguồn, cập nhật phiên bản theo Semantic Versioning và ghi lại nội dung thay đổi tại đầu mục lịch sử phiên bản trong tài liệu này:

- **PATCH** (`x.y.Z`): sửa lỗi hoặc điều chỉnh nhỏ.
- **MINOR** (`x.Y.0`): bổ sung tính năng tương thích ngược.
- **MAJOR** (`X.0.0`): thay đổi lớn có thể ảnh hưởng đến cách sử dụng.

### Lịch sử cập nhật

### [v1.47.0] - 2026-10-28
- **Hợp nhất và chuẩn hóa mục Tra Cứu Cát Hung**:
  - Hợp nhất mục tra cứu Thần Sát và Ngày Cát Hung trong lịch ngày (thẻ bloc lịch ngày) thành một mục duy nhất.
  - Đổi tên chuẩn hóa thành **Tra Cứu Cát Hung** trên thanh điều hướng chính, thẻ tóm tắt bloc lịch ngày và module khảo sát chi tiết.
  - Tối ưu hóa các nút chuyển đổi và tra cứu nhanh giúp đối chiếu trực tiếp giữa lịch ngày và bảng thẩm định cát hung chi tiết theo thời gian.

- **v1.46.0 — 2026-10-11:** phiên bản được khai báo hiện tại trong `package.json`. README được biên tập lại để mô tả ngắn gọn mục đích, nhóm chức năng, công nghệ và cách chạy/triển khai dự án. Bản sửa tài liệu này không thay đổi mã ứng dụng hay số phiên bản.
