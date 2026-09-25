/**
 * ============================================================================
 * HỆ THỐNG DỮ LIỆU & THUẬT TOÁN THẦN SÁT (THAN SAT ENGINE)
 * Tác phẩm tham chiếu: Khâm Định Hiệp Kỷ Biện Phương Thư (欽定協紀辨方書)
 *                     & Ngọc Hạp Thông Thư (玉匣通書)
 * 
 * Khởi đầu chuyên đề: SAO NGUYỆT YẾM (Nguyệt Yểm / Họa Thần)
 * - Quy luật khởi lệ: Tháng Giêng (tháng Dần) khởi Nguyệt Yếm tại Tuất.
 * - Sau đó, cứ mỗi tháng tiếp theo thì Nguyệt Yếm di chuyển nghịch hành
 *   (lùi 1 vị trí Địa Chi theo chiều ngược kim đồng hồ).
 * - Yếm Đối (Lục xung với Nguyệt Yếm): chuyển động nghịch hành đối xứng.
 * 
 * Cấu trúc File: Registry tập hợp chung, Module hóa & Sẵn sàng mở rộng 
 * cho toàn bộ các Cát Thần và Hung Sát trong tương lai.
 * ============================================================================
 */

export * from '../public/thanSatData.js';
import thanSatModule from '../public/thanSatData.js';
export default thanSatModule;
