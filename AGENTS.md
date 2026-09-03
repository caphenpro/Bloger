# QUY TẮC PHÁT TRIỂN & CẬP NHẬT DỰ ÁN (PROJECT RULES FOR AGENTS)

## 📌 QUY TẮC BẮT BUỘC VỀ QUẢN LÝ PHIÊN BẢN & CHANGELOG (USER INSTRUCTION)

Người dùng đã yêu cầu rõ ràng:
> "Tạo file readme để thông tin về ứng dụng và thông tin về mỗi lần cập nhật số hoá phiên bản cập nhật, mỗi lần cập nhật điều thông tin lại trên file này"

Do đó, đối với **MỖI LẦN CẬP NHẬT ỨNG DỤNG** trong tương lai (dù là thêm tính năng, chỉnh sửa thuật toán, tối ưu giao diện hay sửa lỗi):

1. **Số hóa phiên bản (Semantic Versioning - SemVer)**:
   - Tăng số phiên bản tương ứng trong `package.json` (`"version": "X.Y.Z"`).
   - Quy tắc:
     - `MAJOR`: Thay đổi lớn về kiến trúc hoặc đại tu toàn bộ giao diện/chức năng.
     - `MINOR`: Thêm tính năng mới, tab mới, thuật toán mới.
     - `PATCH`: Tối ưu giao diện, sửa lỗi, chỉnh sửa hiển thị, cập nhật dữ liệu.

2. **Cập nhật đầy đủ vào `README.md`**:
   - Thêm bản ghi mới lên đầu danh sách mục **📜 LỊCH SỬ CẬP NHẬT (CHANGELOG)** trong file `/README.md` theo định dạng chuẩn:
     ```markdown
     ### [vX.Y.Z] - YYYY-MM-DD
     - **Tiêu đề nhóm thay đổi**:
       - Chi tiết cụ thể thay đổi...
     ```
   - Cập nhật phần tổng quan tính năng nếu có tính năng mới được bổ sung.
