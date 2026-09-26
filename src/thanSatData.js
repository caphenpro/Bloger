/**
 * ============================================================================
 * HỆ THỐNG DỮ LIỆU & THUẬT TOÁN THẦN SÁT (THAN SAT ENGINE)
 * Tác phẩm tham chiếu: Khâm Định Hiệp Kỷ Biện Phương Thư (欽定協紀辨方書)
 *                     & Ngọc Hạp Thông Thư (玉匣通書)
 * ============================================================================
 */
import ThanSatModule from '../public/thanSatData.js';
export const THAN_SAT_REGISTRY = window.THAN_SAT_REGISTRY || (window.ThanSatDataModule ? window.ThanSatDataModule.THAN_SAT_REGISTRY : {});
export const ThanSatEngine = window.ThanSatEngine || (window.ThanSatDataModule ? window.ThanSatDataModule.ThanSatEngine : {});
export default ThanSatEngine;
