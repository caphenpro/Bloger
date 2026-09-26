/**
 * ============================================================================
 * HỆ THỐNG DỮ LIỆU & THUẬT TOÁN THẦN SÁT (THAN SAT ENGINE)
 * Tác phẩm tham chiếu: Khâm Định Hiệp Kỷ Biện Phương Thư (欽定協紀辨方書)
 *                     & Ngọc Hạp Thông Thư (玉匣通書)
 * 
 * CHUYÊN ĐỀ 1: BỘ LỤC ĐỨC (6 ĐẠI CÁT TINH TỐI TÔN)
 * Tổng hợp từ Niên gia (Can năm Thái Tuế) và Nguyệt gia (Lệnh tháng):
 * 1. Tuế Đức (Cát thần đại diện cho ân đức Thái Tuế - Niên gia)
 * 2. Tuế Đức Hợp (Sao tương hợp âm dương với Tuế Đức - Niên gia)
 * 3. Thiên Đức (Sao đại cát thuộc Nguyệt gia theo thời khí)
 * 4. Thiên Đức Hợp (Sao tương hợp với Thiên Đức)
 * 5. Nguyệt Đức (Sao đại cát khởi từ Tam hợp Ngũ hành của Nguyệt lệnh)
 * 6. Nguyệt Đức Hợp (Sao tương hợp với Nguyệt Đức)
 * *Đặc điểm cốt lõi: Tất cả 6 sao trong bộ Lục Đức đều đi theo Thiên can.
 * 
 * CHUYÊN ĐỀ 2: THẦN SÁT KHỞI THEO THÁNG (HUNG SÁT & CÁT TINH)
 * 1. Sao Nguyệt Yếm (Nguyệt Yểm / Họa Thần - Nghịch hành 12 tháng)
 * 2. Sao Ngũ Quỷ (Bạch Hổ của Nguyệt Yếm / "Âm ở trong âm")
 * 3. Sao Yếm Đối (Lục xung đối xứng 180° với Nguyệt Yếm)
 * 
 * Thiết kế: Registry tập hợp chung toàn bộ Thần Sát trong hệ thống, phục vụ tra cứu
 * trực nhật trong ngày theo dạng bảng biểu hoặc danh sách chuẩn mực.
 * ============================================================================
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ThanSatDataModule = factory();
    root.THAN_SAT_REGISTRY = root.ThanSatDataModule.THAN_SAT_REGISTRY;
    root.ThanSatEngine = root.ThanSatDataModule.ThanSatEngine;
  }
})(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  // 10 Thiên Can
  const CAN_NAMES = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];

  // 12 Địa Chi theo chiều thuận (kim đồng hồ: Tý -> Hợi)
  const CHI_NAMES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  
  // 12 Nguyệt Kiến của 12 tháng Âm Lịch (Tháng 1 kiến Dần ... Tháng 12 kiến Sửu)
  const MONTH_KIEN_CHI = {
    1: { chi: "Dần", chiIndex: 2, name: "Tháng Giêng (Kiến Dần)" },
    2: { chi: "Mão", chiIndex: 3, name: "Tháng 2 (Kiến Mão)" },
    3: { chi: "Thìn", chiIndex: 4, name: "Tháng 3 (Kiến Thìn)" },
    4: { chi: "Tỵ", chiIndex: 5, name: "Tháng 4 (Kiến Tỵ)" },
    5: { chi: "Ngọ", chiIndex: 6, name: "Tháng 5 (Kiến Ngọ)" },
    6: { chi: "Mùi", chiIndex: 7, name: "Tháng 6 (Kiến Mùi)" },
    7: { chi: "Thân", chiIndex: 8, name: "Tháng 7 (Kiến Thân)" },
    8: { chi: "Dậu", chiIndex: 9, name: "Tháng 8 (Kiến Dậu)" },
    9: { chi: "Tuất", chiIndex: 10, name: "Tháng 9 (Kiến Tuất)" },
    10: { chi: "Hợi", chiIndex: 11, name: "Tháng 10 (Kiến Hợi)" },
    11: { chi: "Tý", chiIndex: 0, name: "Tháng 11 (Kiến Tý)" },
    12: { chi: "Sửu", chiIndex: 1, name: "Tháng Chạp (Kiến Sửu)" }
  };

  // Phương vị tương ứng với 12 Địa Chi
  const CHI_DIRECTIONS = {
    "Tý": "Chính Bắc (Cung Khảm - 0°)",
    "Sửu": "Đông Bắc lệch Bắc (Cung Cấn - 30°)",
    "Dần": "Đông Bắc lệch Đông (Cung Cấn - 60°)",
    "Mão": "Chính Đông (Cung Chấn - 90°)",
    "Thìn": "Đông Nam lệch Đông (Cung Tốn - 120°)",
    "Tỵ": "Đông Nam lệch Nam (Cung Tốn - 150°)",
    "Ngọ": "Chính Nam (Cung Ly - 180°)",
    "Mùi": "Tây Nam lệch Nam (Cung Khôn - 210°)",
    "Thân": "Tây Nam lệch Tây (Cung Khôn - 240°)",
    "Dậu": "Chính Tây (Cung Đoài - 270°)",
    "Tuất": "Tây Bắc lệch Tây (Cung Càn - 300°)",
    "Hợi": "Tây Bắc lệch Bắc (Cung Càn - 330°)"
  };

  /**
   * ==========================================================================
   * THUẬT TOÁN BỘ LỤC ĐỨC (HIỆP KỶ BIỆN PHƯƠNG THƯ)
   * ==========================================================================
   */

  /**
   * 1. Tuế Đức (Nhóm Niên Gia - Xác định theo Can năm Thái Tuế)
   * - Can Dương (Giáp: 0, Bính: 2, Mậu: 4, Canh: 6, Nhâm: 8): Tại chính Thiên can của năm đó.
   * - Can Âm (Ất: 1, Đinh: 3, Kỷ: 5, Tân: 7, Quý: 9): Tại Thiên can Dương tương hợp ngũ hợp với Can năm
   *   (Ất hợp Canh: 6, Đinh hợp Nhâm: 8, Kỷ hợp Giáp: 0, Tân hợp Bính: 2, Quý hợp Mậu: 4).
   * Quy luật toán học: Can của Tuế Đức luôn là can Dương trong cặp ngũ hợp.
   */
  function calcTueDucCanIndex(yearCanIndex) {
    const c = ((parseInt(yearCanIndex, 10) % 10) + 10) % 10;
    return (c % 2 === 0) ? c : (c + 5) % 10;
  }

  /**
   * 2. Tuế Đức Hợp (Nhóm Niên Gia - Xác định theo Can năm Thái Tuế)
   * - Can Dương: Tại Thiên can Âm tương hợp với Can năm (Giáp tại Kỷ: 5, Bính tại Tân: 7, Mậu tại Quý: 9, Canh tại Ất: 1, Nhâm tại Đinh: 3).
   * - Can Âm: Tại chính Thiên can Âm của năm đó (Ất: 1, Đinh: 3, Kỷ: 5, Tân: 7, Quý: 9).
   * Quy luật toán học: Can của Tuế Đức Hợp luôn là can Âm trong cặp ngũ hợp.
   */
  function calcTueDucHopCanIndex(yearCanIndex) {
    const c = ((parseInt(yearCanIndex, 10) % 10) + 10) % 10;
    return (c % 2 === 0) ? (c + 5) % 10 : c;
  }

  /**
   * 3. Nguyệt Đức (Nhóm Nguyệt Gia 1 - Tam hợp Ngũ hành của Nguyệt lệnh)
   * Đóng ở vị trí Thiên can Dương mang Ngũ hành vượng của Tam hợp cục tháng:
   * - Tháng Dần, Ngọ, Tuất (Tam hợp Hỏa cục): Nguyệt Đức tại Bính (can 2).
   * - Tháng Thân, Tý, Thìn (Tam hợp Thủy cục): Nguyệt Đức tại Nhâm (can 8).
   * - Tháng Hợi, Mão, Mùi (Tam hợp Mộc cục): Nguyệt Đức tại Giáp (can 0).
   * - Tháng Tỵ, Dậu, Sửu (Tam hợp Kim cục): Nguyệt Đức tại Canh (can 6).
   */
  function calcNguyetDucCanIndex(lunarMonth) {
    const m = ((parseInt(lunarMonth, 10) - 1) % 12 + 12) % 12 + 1;
    if ([1, 5, 9].includes(m)) return 2; // Bính
    if ([7, 11, 3].includes(m)) return 8; // Nhâm
    if ([10, 2, 6].includes(m)) return 0; // Giáp
    if ([4, 8, 12].includes(m)) return 6; // Canh
    return 2;
  }

  /**
   * 4. Nguyệt Đức Hợp (Nhóm Nguyệt Gia 1 - Thiên can tương hợp với Nguyệt Đức)
   * - Tháng Dần, Ngọ, Tuất (Nguyệt Đức Bính): Nguyệt Đức Hợp tại Tân (can 7).
   * - Tháng Thân, Tý, Thìn (Nguyệt Đức Nhâm): Nguyệt Đức Hợp tại Đinh (can 3).
   * - Tháng Hợi, Mão, Mùi (Nguyệt Đức Giáp): Nguyệt Đức Hợp tại Kỷ (can 5).
   * - Tháng Tỵ, Dậu, Sửu (Nguyệt Đức Canh): Nguyệt Đức Hợp tại Ất (can 1).
   */
  function calcNguyetDucHopCanIndex(lunarMonth) {
    const ndCan = calcNguyetDucCanIndex(lunarMonth);
    return (ndCan + 5) % 10;
  }

  /**
   * 5. Thiên Đức (Nhóm Nguyệt Gia 2 - Khẩu quyết 12 tháng)
   * - Tháng 1 (Dần): Can Đinh (3)
   * - Tháng 2 (Mão): Thân (Địa Chi Thân - index 8 hoặc phương Khôn)
   * - Tháng 3 (Thìn): Can Nhâm (8)
   * - Tháng 4 (Tỵ): Can Tân (7)
   * - Tháng 5 (Ngọ): Càn (Địa Chi Hợi - index 11 hoặc phương Càn)
   * - Tháng 6 (Mùi): Can Giáp (0)
   * - Tháng 7 (Thân): Can Quý (9)
   * - Tháng 8 (Dậu): Cấn (Địa Chi Dần - index 2 hoặc phương Cấn)
   * - Tháng 9 (Tuất): Can Bính (2)
   * - Tháng 10 (Hợi): Can Ất (1)
   * - Tháng 11 (Tý): Tốn (Địa Chi Tỵ - index 5 hoặc phương Tốn)
   * - Tháng 12 (Sửu): Can Canh (6)
   */
  function calcThienDucInfo(lunarMonth) {
    const m = ((parseInt(lunarMonth, 10) - 1) % 12 + 12) % 12 + 1;
    const map = {
      1:  { can: 3, chi: null, targetName: "Đinh (Thiên can Đinh)", formula: "Tháng Giêng tại Đinh" },
      2:  { can: null, chi: 8, targetName: "Thân (Địa chi Thân / Cung Khôn)", formula: "Tháng 2 tại Thân (Khôn)" },
      3:  { can: 8, chi: null, targetName: "Nhâm (Thiên can Nhâm)", formula: "Tháng 3 tại Nhâm" },
      4:  { can: 7, chi: null, targetName: "Tân (Thiên can Tân)", formula: "Tháng 4 tại Tân" },
      5:  { can: null, chi: 11, targetName: "Càn (Địa chi Hợi / Cung Càn)", formula: "Tháng 5 tại Càn (Hợi)" },
      6:  { can: 0, chi: null, targetName: "Giáp (Thiên can Giáp)", formula: "Tháng 6 tại Giáp" },
      7:  { can: 9, chi: null, targetName: "Quý (Thiên can Quý)", formula: "Tháng 7 tại Quý" },
      8:  { can: null, chi: 2, targetName: "Cấn (Địa chi Dần / Cung Cấn)", formula: "Tháng 8 tại Cấn (Dần)" },
      9:  { can: 2, chi: null, targetName: "Bính (Thiên can Bính)", formula: "Tháng 9 tại Bính" },
      10: { can: 1, chi: null, targetName: "Ất (Thiên can Ất)", formula: "Tháng 10 tại Ất" },
      11: { can: null, chi: 5, targetName: "Tốn (Địa chi Tỵ / Cung Tốn)", formula: "Tháng 11 tại Tốn (Tỵ)" },
      12: { can: 6, chi: null, targetName: "Canh (Thiên can Canh)", formula: "Tháng 12 tại Canh" }
    };
    return map[m];
  }

  /**
   * 6. Thiên Đức Hợp (Nhóm Nguyệt Gia 2 - Can/Chi tương hợp với Thiên Đức)
   * - Tháng 1 (Dần): Can Nhâm (8)
   * - Tháng 2 (Mão): Tị (Địa Chi Tỵ - index 5 hoặc quẻ Tốn)
   * - Tháng 3 (Thìn): Can Đinh (3)
   * - Tháng 4 (Tỵ): Can Bính (2)
   * - Tháng 5 (Ngọ): Tốn (Địa Chi Tỵ - index 5 hoặc quẻ Tốn)
   * - Tháng 6 (Mùi): Can Kỷ (5)
   * - Tháng 7 (Thân): Can Mậu (4)
   * - Tháng 8 (Dậu): Khôn (Địa Chi Thân - index 8 hoặc quẻ Khôn)
   * - Tháng 9 (Tuất): Can Tân (7)
   * - Tháng 10 (Hợi): Can Canh (6)
   * - Tháng 11 (Tý): Càn (Địa Chi Hợi - index 11 hoặc quẻ Càn)
   * - Tháng 12 (Sửu): Can Ất (1)
   */
  function calcThienDucHopInfo(lunarMonth) {
    const m = ((parseInt(lunarMonth, 10) - 1) % 12 + 12) % 12 + 1;
    const map = {
      1:  { can: 8, chi: null, targetName: "Nhâm (Thiên can Nhâm)", formula: "Tháng Giêng tại Nhâm" },
      2:  { can: null, chi: 5, targetName: "Tị (Địa chi Tỵ / Cung Tốn)", formula: "Tháng 2 tại Tị (Tốn)" },
      3:  { can: 3, chi: null, targetName: "Đinh (Thiên can Đinh)", formula: "Tháng 3 tại Đinh" },
      4:  { can: 2, chi: null, targetName: "Bính (Thiên can Bính)", formula: "Tháng 4 tại Bính" },
      5:  { can: null, chi: 5, targetName: "Tốn (Địa chi Tỵ / Cung Tốn)", formula: "Tháng 5 tại Tốn (Tỵ)" },
      6:  { can: 5, chi: null, targetName: "Kỷ (Thiên can Kỷ)", formula: "Tháng 6 tại Kỷ" },
      7:  { can: 4, chi: null, targetName: "Mậu (Thiên can Mậu)", formula: "Tháng 7 tại Mậu" },
      8:  { can: null, chi: 8, targetName: "Khôn (Địa chi Thân / Cung Khôn)", formula: "Tháng 8 tại Khôn (Thân)" },
      9:  { can: 7, chi: null, targetName: "Tân (Thiên can Tân)", formula: "Tháng 9 tại Tân" },
      10: { can: 6, chi: null, targetName: "Canh (Thiên can Canh)", formula: "Tháng 10 tại Canh" },
      11: { can: null, chi: 11, targetName: "Càn (Địa chi Hợi / Cung Càn)", formula: "Tháng 11 tại Càn (Hợi)" },
      12: { can: 1, chi: null, targetName: "Ất (Thiên can Ất)", formula: "Tháng 12 tại Ất" }
    };
    return map[m];
  }

  /**
   * Tính vị trí Địa Chi Nguyệt Yếm cho một tháng Âm Lịch (1 đến 12)
   * Tháng 1 khởi Tuất (index 10), mỗi tháng lùi 1 vị trí (nghịch hành)
   */
  function calcNguyetYemChiIndex(lunarMonth) {
    const m = ((parseInt(lunarMonth, 10) - 1) % 12 + 12) % 12 + 1;
    let idx = (10 - (m - 1)) % 12;
    if (idx < 0) idx += 12;
    return idx;
  }

  /**
   * Tính vị trí Địa Chi Ngũ Quỷ (Bạch Hổ của Nguyệt Yếm)
   */
  function calcNguQuyChiIndex(lunarMonth) {
    const yemIdx = calcNguyetYemChiIndex(lunarMonth);
    return (yemIdx + 1) % 12;
  }

  /**
   * Tính vị trí Địa Chi Yếm Đối (đối xung 180° với Nguyệt Yếm)
   */
  function calcYemDoiChiIndex(lunarMonth) {
    const yemIdx = calcNguyetYemChiIndex(lunarMonth);
    return (yemIdx + 6) % 12;
  }

  /**
   * Bảng phân bổ chi tiết 12 Tháng của các sao Thần Sát khởi theo Tháng
   */
  function generate12MonthsTable() {
    const list = [];
    for (let m = 1; m <= 12; m++) {
      const kien = MONTH_KIEN_CHI[m];
      const yemIdx = calcNguyetYemChiIndex(m);
      const yemChi = CHI_NAMES[yemIdx];
      const nguQuyIdx = calcNguQuyChiIndex(m);
      const nguQuyChi = CHI_NAMES[nguQuyIdx];
      const doiIdx = calcYemDoiChiIndex(m);
      const doiChi = CHI_NAMES[doiIdx];

      list.push({
        month: m,
        monthName: kien.name,
        monthKienChi: kien.chi,
        monthKienIndex: kien.chiIndex,
        yemChi: yemChi,
        yemChiIndex: yemIdx,
        nguQuyChi: nguQuyChi,
        nguQuyIndex: nguQuyIdx,
        doiChi: doiChi,
        doiIndex: doiIdx,
        yemDirection: CHI_DIRECTIONS[yemChi],
        nguQuyDirection: CHI_DIRECTIONS[nguQuyChi],
        summary: `Tháng ${m} (${kien.chi}): Nguyệt Yếm tại ${yemChi}, Ngũ Quỷ tại ${nguQuyChi}, Yếm Đối tại ${doiChi}`
      });
    }
    return list;
  }

  /**
   * Bảng đối chiếu Bộ Lục Đức cho 12 tháng theo Can năm được chọn
   */
  function generateLucDucReferenceTable(yearCanIndex) {
    const yCanIdx = ((parseInt(yearCanIndex, 10) % 10) + 10) % 10;
    const yCan = CAN_NAMES[yCanIdx];
    const tueDucCan = CAN_NAMES[calcTueDucCanIndex(yCanIdx)];
    const tueDucHopCan = CAN_NAMES[calcTueDucHopCanIndex(yCanIdx)];

    const months = [];
    for (let m = 1; m <= 12; m++) {
      const ndCanIdx = calcNguyetDucCanIndex(m);
      const ndhCanIdx = calcNguyetDucHopCanIndex(m);
      const tdInfo = calcThienDucInfo(m);
      const tdhInfo = calcThienDucHopInfo(m);

      months.push({
        month: m,
        kienChi: MONTH_KIEN_CHI[m].chi,
        tueDucCan: tueDucCan,
        tueDucHopCan: tueDucHopCan,
        nguyetDucCan: CAN_NAMES[ndCanIdx],
        nguyetDucHopCan: CAN_NAMES[ndhCanIdx],
        thienDucTarget: tdInfo.targetName,
        thienDucHopTarget: tdhInfo.targetName
      });
    }

    return {
      yearCan: yCan,
      yearCanIndex: yCanIdx,
      tueDucCan: tueDucCan,
      tueDucHopCan: tueDucHopCan,
      months: months
    };
  }

  /**
   * ==========================================================================
   * BỘ TỪ ĐIỂN TẬP TRUNG: THAN_SAT_REGISTRY
   * ==========================================================================
   */
  const THAN_SAT_REGISTRY = {
    // ------------------------------------------------------------------------
    // NHÓM BỘ LỤC ĐỨC (6 ĐẠI CÁT TINH TỐI TÔN)
    // ------------------------------------------------------------------------
    "tue_duc": {
      id: "tue_duc",
      name: "Tuế Đức",
      hanzi: "歲德",
      alias: "Tuế Đức Cát Thần",
      category: "cat",
      typeLabel: "Niên Gia Cát Thần (Bộ Lục Đức)",
      level: "Đại Cát Tối Tôn",
      scope: "year_day",
      order: 1,
      badgeClass: "badge-tue-duc",
      icon: "👑",

      originRule: "Tuế Đức xác định theo Can năm Thái Tuế: Đối với năm Can Dương (Giáp, Bính, Mậu, Canh, Nhâm) tại chính Thiên can của năm đó; Đối với năm Can Âm (Ất, Đinh, Kỷ, Tân, Quý) tại Thiên can Dương tương hợp ngũ hợp với Can năm (Ất tại Canh, Đinh tại Nhâm, Kỷ tại Giáp, Tân tại Bính, Quý tại Mậu).",

      formulaSummary: "Can năm Dương lấy chính Can; Can năm Âm lấy Can Dương ngũ hợp. Ngày có Can trùng với Can Tuế Đức là ngày đắc sao Tuế Đức.",

      meaning: "Tuế Đức là cát thần tối tôn đại diện cho ân huệ, phúc đức vô biên của Thái Tuế (vua quản hạt năm), có năng lực hóa giải bách sát hung thần, nghênh đón cát khánh hanh thông, bảo hộ bản mệnh gia đạo hưng thịnh.",

      nghi: "Đại cát cho trăm việc trọng đại: Khởi công động thổ, thượng lương, giá thú cưới hỏi, xuất hành, khai trương mở hàng, nhậm chức, tế tự cầu phúc, bái yết quý nhân, an táng.",

      ky: "Không có đại kỵ; chỉ cần giữ tâm chính trực, tránh làm việc phi pháp gian xảo."
    },

    "tue_duc_hop": {
      id: "tue_duc_hop",
      name: "Tuế Đức Hợp",
      hanzi: "歲德合",
      alias: "Tuế Đức Hợp Quý Nhân",
      category: "cat",
      typeLabel: "Niên Gia Cát Thần (Bộ Lục Đức)",
      level: "Đại Cát Hòa Hợp",
      scope: "year_day",
      order: 2,
      badgeClass: "badge-tue-duc-hop",
      icon: "🤝",

      originRule: "Tuế Đức Hợp xác định theo Can năm Thái Tuế: Đối với năm Can Dương tại Thiên can Âm tương hợp ngũ hợp với Can năm (Giáp tại Kỷ, Bính tại Tân, Mậu tại Quý, Canh tại Ất, Nhâm tại Đinh); Đối với năm Can Âm tại chính Thiên can Âm của năm đó (Ất tại Ất, Đinh tại Đinh, Kỷ tại Kỷ, Tân tại Tân, Quý tại Quý).",

      formulaSummary: "Can năm Dương lấy Can Âm ngũ hợp; Can năm Âm lấy chính Can năm đó. Ngày có Can trùng với Can Tuế Đức Hợp là ngày đắc sao Tuế Đức Hợp.",

      meaning: "Tuế Đức Hợp là cát thần tương hợp âm dương với Tuế Đức, chủ về nhân hòa, liên minh kết giao bền vững, gia đạo an vui thuận hòa, quý nhân trợ mệnh, hóa hung thành cát.",

      nghi: "Đại cát cho hôn nhân giá thú, đính hôn kết duyên, ký kết khế ước hợp đồng, liên kết hợp tác kinh doanh, khai trương, xuất hành, giải trừ mâu thuẫn tranh chấp.",

      ky: "Thất hứa bội ước, gây chia rẽ bất hòa, lừa gạt bạn hàng."
    },

    "thien_duc": {
      id: "thien_duc",
      name: "Thiên Đức",
      hanzi: "天德",
      alias: "Thiên Đức Quý Nhân",
      category: "cat",
      typeLabel: "Nguyệt Gia Cát Thần (Bộ Lục Đức)",
      level: "Đại Cát Cứu Giải",
      scope: "month_day",
      order: 3,
      badgeClass: "badge-thien-duc",
      icon: "⭐",

      originRule: "Thiên Đức thuộc Nguyệt gia theo thời khí 12 tháng: Tháng 1 (Dần) tại Đinh; Tháng 2 (Mão) tại Thân; Tháng 3 (Thìn) tại Nhâm; Tháng 4 (Tỵ) tại Tân; Tháng 5 (Ngọ) tại Càn (Hợi); Tháng 6 (Mùi) tại Giáp; Tháng 7 (Thân) tại Quý; Tháng 8 (Dậu) tại Cấn (Dần); Tháng 9 (Tuất) tại Bính; Tháng 10 (Hợi) tại Ất; Tháng 11 (Tý) tại Tốn (Tỵ); Tháng 12 (Sửu) tại Canh.",

      formulaSummary: "Th.1 tại Đinh ➔ Th.2 tại Thân ➔ Th.3 tại Nhâm ➔ Th.4 tại Tân ➔ Th.5 tại Càn ➔ Th.6 tại Giáp ➔ Th.7 tại Quý ➔ Th.8 tại Cấn ➔ Th.9 tại Bính ➔ Th.10 tại Ất ➔ Th.11 tại Tốn ➔ Th.12 tại Canh.",

      meaning: "Thiên Đức là cát thần tối cao của thời khí thiên đạo, mang đức hiếu sinh của Trời, chủ về từ bi phúc đức, tiêu tai giải ách, hóa giải bách sát, gặp hung hóa cát.",

      nghi: "Cầu phúc, tế tự, cưới hỏi đính hôn, xuất hành, khai trương, động thổ, nhậm chức, hòa giải hiềm khích, kết giao bằng hữu quý nhân.",

      ky: "Kiện tụng, tranh chấp thị phi, tạo oán kết thù."
    },

    "thien_duc_hop": {
      id: "thien_duc_hop",
      name: "Thiên Đức Hợp",
      hanzi: "天德合",
      alias: "Thiên Đức Hợp Cát Thần",
      category: "cat",
      typeLabel: "Nguyệt Gia Cát Thần (Bộ Lục Đức)",
      level: "Đại Cát Tương Trợ",
      scope: "month_day",
      order: 4,
      badgeClass: "badge-thien-duc-hop",
      icon: "🤝",

      originRule: "Thiên Đức Hợp là can/chi tương hợp với Thiên Đức: Th.1 tại Nhâm; Th.2 tại Tị; Th.3 tại Đinh; Th.4 tại Bính; Th.5 tại Tốn; Th.6 tại Kỷ; Th.7 tại Mậu; Th.8 tại Khôn; Th.9 tại Tân; Th.10 tại Canh; Th.11 tại Càn; Th.12 tại Ất.",

      formulaSummary: "Th.1 tại Nhâm ➔ Th.2 tại Tị ➔ Th.3 tại Đinh ➔ Th.4 tại Bính ➔ Th.5 tại Tốn ➔ Th.6 tại Kỷ ➔ Th.7 tại Mậu ➔ Th.8 tại Khôn ➔ Th.9 tại Tân ➔ Th.10 tại Canh ➔ Th.11 tại Càn ➔ Th.12 tại Ất.",

      meaning: "Can/Chi hợp của Thiên Đức theo nguyên lý âm dương ngũ hợp, phò trì bình an, hóa giải hung sát, tăng thêm thiện duyên cát lành bền vững.",

      nghi: "Ký kết giao thương, kết giao quý nhân, khởi sự làm ăn, xuất hành, cưới hỏi giá thú, hòa giải tranh chấp.",

      ky: "Bất tín bội nghĩa, nói lời ác độc, gây chia rẽ nghi kỵ."
    },

    "nguyet_duc": {
      id: "nguyet_duc",
      name: "Nguyệt Đức",
      hanzi: "月德",
      alias: "Nguyệt Đức Quý Nhân",
      category: "cat",
      typeLabel: "Nguyệt Gia Cát Thần (Bộ Lục Đức)",
      level: "Đại Cát Hanh Thông",
      scope: "month_day",
      order: 5,
      badgeClass: "badge-nguyet-duc",
      icon: "🌙",

      originRule: "Nguyệt Đức đóng ở vị trí Thiên can Dương mang Ngũ hành vượng của Tam hợp cục tháng: Tháng Dần, Ngọ, Tuất (Hỏa cục) tại Bính; Tháng Thân, Tý, Thìn (Thủy cục) tại Nhâm; Tháng Hợi, Mão, Mùi (Mộc cục) tại Giáp; Tháng Tỵ, Dậu, Sửu (Kim cục) tại Canh.",

      formulaSummary: "Tam hợp Hỏa (Dần-Ngọ-Tuất) tại Bính ➔ Thủy (Thân-Tý-Thìn) tại Nhâm ➔ Mộc (Hợi-Mão-Mùi) tại Giáp ➔ Kim (Tỵ-Dậu-Sửu) tại Canh.",

      meaning: "Dương can vượng khí của Tam hợp cục tháng, mang đức của Trăng (Âm đức), chủ về phúc thọ an khang, vạn sự hanh thông, tiêu tai giải nạn, sinh sôi nảy nở.",

      nghi: "Khai trương buôn bán, ký kết giao dịch, cầu tài lộc, cưới hỏi giá thú, xuất hành, an gia định cư, mưu cầu việc lớn.",

      ky: "Tranh cãi hiềm khích, làm việc trái đạo lý, oán thán thị phi."
    },

    "nguyet_duc_hop": {
      id: "nguyet_duc_hop",
      name: "Nguyệt Đức Hợp",
      hanzi: "月德合",
      alias: "Nguyệt Đức Hợp Cát Thần",
      category: "cat",
      typeLabel: "Nguyệt Gia Cát Thần (Bộ Lục Đức)",
      level: "Đại Cát Sinh Tài",
      scope: "month_day",
      order: 6,
      badgeClass: "badge-nguyet-duc-hop",
      icon: "🌿",

      originRule: "Nguyệt Đức Hợp là can ngũ hợp của Nguyệt Đức: Tháng Dần, Ngọ, Tuất (Nguyệt Đức Bính) tại Tân; Tháng Thân, Tý, Thìn (Nguyệt Đức Nhâm) tại Đinh; Tháng Hợi, Mão, Mùi (Nguyệt Đức Giáp) tại Kỷ; Tháng Tỵ, Dậu, Sửu (Nguyệt Đức Canh) tại Ất.",

      formulaSummary: "Hỏa cục tại Tân ➔ Thủy cục tại Đinh ➔ Mộc cục tại Kỷ ➔ Kim cục tại Ất.",

      meaning: "Can hợp của Nguyệt Đức theo Ngũ hợp, khí vận hòa duyệt sinh tài, tăng trưởng duyên lành, gia đạo êm ấm, trăm việc thuận buồm xuôi gió.",

      nghi: "Dạm ngõ cưới hỏi, ăn hỏi rước dâu, hội họp liên hoan, khai trương cửa hàng, giao dịch ký kết, xuất hành.",

      ky: "Tâm tính nóng nảy, tranh giành tị hiềm, phụ bạc ân tình."
    },

    // ------------------------------------------------------------------------
    // NHÓM HUNG SÁT KHỞI THEO THÁNG
    // ------------------------------------------------------------------------
    "nguyet_yem": {
      id: "nguyet_yem",
      name: "Nguyệt Yếm",
      hanzi: "月厭",
      alias: "Nguyệt Yểm, Họa Thần",
      category: "hung",
      typeLabel: "Hung Thần / Ác Tinh",
      level: "Đại Hung (Cực Kỵ)",
      scope: "month_day",
      order: 7,
      badgeClass: "badge-nguyet-yem",
      icon: "⚡",

      originRule: "Tháng Giêng (tháng Dần) khởi Nguyệt Yếm tại Tuất. Sau đó, cứ mỗi tháng tiếp theo thì Nguyệt Yếm di chuyển nghịch hành (lùi 1 vị trí Địa Chi theo chiều ngược kim đồng hồ).",

      formulaSummary: "Th.1 tại Tuất ➔ Th.2 tại Dậu ➔ Th.3 tại Thân ➔ Th.4 tại Mùi ➔ Th.5 tại Ngọ ➔ Th.6 tại Tỵ ➔ Th.7 tại Thìn ➔ Th.8 tại Mão ➔ Th.9 tại Dần ➔ Th.10 tại Sửu ➔ Th.11 tại Tý ➔ Th.12 tại Hợi.",

      meaning: "Nguyệt Yếm là hung thần đại biểu cho khí u ám, yểm bùa, ngăn trở, thị phi ngấm ngầm của âm khí chuyển vần, làm suy giảm dương quang, gây trắc trở cho các việc khởi tạo và phát triển.",

      nghi: "Tống quái trừ tà, dẹp bỏ chướng ngại cũ, phá dỡ công trình hư hỏng, sám hối, thiền định, an phận thủ thường.",

      ky: "Đại kỵ giá thú hôn nhân cưới hỏi (Âm Dương Bất Tương tuyệt đối loại trừ), xuất hành xe hoa, khởi công động thổ, khai trương mở cửa hàng, an táng, nhập trạch về nhà mới.",

      checkMatch: function(lunarMonth, dayChiIndex) {
        const targetIdx = calcNguyetYemChiIndex(lunarMonth);
        const isMatch = (parseInt(dayChiIndex, 10) === targetIdx);
        return {
          isMatch: isMatch,
          starId: "nguyet_yem",
          starName: "Nguyệt Yếm",
          targetChi: CHI_NAMES[targetIdx],
          targetChiIndex: targetIdx,
          dayChi: CHI_NAMES[dayChiIndex],
          dayChiIndex: dayChiIndex,
          lunarMonth: lunarMonth,
          message: isMatch
            ? `⚠️ Hôm nay phạm SAO NGUYỆT YẾM (Địa Chi ${CHI_NAMES[dayChiIndex]}) - Hung thần u ám, đại kỵ cưới hỏi, xuất hành, khởi sự!`
            : `✅ Không phạm Sao Nguyệt Yếm.`
        };
      }
    },

    "ngu_quy": {
      id: "ngu_quy",
      name: "Ngũ Quỷ",
      hanzi: "五鬼",
      alias: "Bạch Hổ của Nguyệt Yếm, Ngũ Quỷ Nguyệt Lệnh",
      category: "hung",
      typeLabel: "Hung Thần / Ác Sát",
      level: "Đại Hung (Cực Kỵ)",
      scope: "month_day",
      order: 8,
      badgeClass: "badge-ngu-quy",
      icon: "👻",

      originRule: "Ngũ Quỷ (khởi theo Tháng): Ngũ Quỷ chính là vị trí Bạch Hổ của Nguyệt Yếm, đóng ở ngay phía sau Nguyệt Yếm đại diện cho tính 'âm ở trong âm'. Phương vị Bạch Hổ đi sau Nguyệt Yếm trong từng tháng chính là sao Ngũ Quỷ.",

      formulaSummary: "Th.1 tại Hợi ➔ Th.2 tại Tuất ➔ Th.3 tại Dậu ➔ Th.4 tại Thân ➔ Th.5 tại Mùi ➔ Th.6 tại Ngọ ➔ Th.7 tại Tỵ ➔ Th.8 tại Thìn ➔ Th.9 tại Mão ➔ Th.10 tại Dần ➔ Th.11 tại Sửu ➔ Th.12 tại Tý.",

      meaning: "Đại diện cho tính chất 'âm ở trong âm' (u ám tột cùng), đi ngay phía sau Nguyệt Yếm tại phương vị Bạch Hổ. Chủ về tà khí ngấm ngầm, tiểu nhân quấy phá, thị phi kiện tụng, bệnh tật, hao tán tài vật, tai bay vạ gió trên đường đi.",

      nghi: "Trừ tà giải hạn, sám hối, dọn dẹp uế khí, tu thân tích đức, an phận giữ mình, tĩnh dưỡng tránh tranh chấp.",

      ky: "Đại kỵ xuất hành đi xa (đặc biệt kỵ xuất hành - phòng tai nạn, trắc trở, mất của), cưới hỏi giá thú (dễ sinh nghi kỵ, chia rẽ, bất hòa), động thổ đào móng, khai trương mở hàng, ký kết hợp đồng thương mại lớn, an táng, nhập trạch.",

      checkMatch: function(lunarMonth, dayChiIndex) {
        const targetIdx = calcNguQuyChiIndex(lunarMonth);
        const isMatch = (parseInt(dayChiIndex, 10) === targetIdx);
        return {
          isMatch: isMatch,
          starId: "ngu_quy",
          starName: "Ngũ Quỷ",
          targetChi: CHI_NAMES[targetIdx],
          targetChiIndex: targetIdx,
          dayChi: CHI_NAMES[dayChiIndex],
          dayChiIndex: dayChiIndex,
          lunarMonth: lunarMonth,
          message: isMatch
            ? `⚠️ Hôm nay phạm SAO NGŨ QUỶ (Địa Chi ${CHI_NAMES[dayChiIndex]} - Bạch Hổ sau Nguyệt Yếm) - Đại kỵ xuất hành, cưới hỏi, khởi sự!`
            : `✅ Không phạm Sao Ngũ Quỷ.`
        };
      }
    },

    "yem_doi": {
      id: "yem_doi",
      name: "Yếm Đối",
      hanzi: "厭對",
      alias: "Lục Xung Nguyệt Yếm",
      category: "hung",
      typeLabel: "Hung Thần (Đối Xung)",
      level: "Hung (Nên tránh)",
      scope: "month_day",
      order: 9,
      badgeClass: "badge-yem-doi",
      icon: "⚔️",

      originRule: "Yếm Đối là vị trí Lục Xung đối xứng 180° với sao Nguyệt Yếm trong tháng. Tháng Giêng khởi tại Thìn, sau đó cứ mỗi tháng nghịch hành lùi 1 vị trí Địa Chi.",

      formulaSummary: "Th.1 tại Thìn ➔ Th.2 tại Mão ➔ Th.3 tại Dần ➔ Th.4 tại Sửu ➔ Th.5 tại Tý ➔ Th.6 tại Hợi ➔ Th.7 tại Tuất ➔ Th.8 tại Dậu ➔ Th.9 tại Thân ➔ Th.10 tại Mùi ➔ Th.11 tại Ngọ ➔ Th.12 tại Tỵ.",

      meaning: "Thế trực xung trực diện với khí trường u ám của Nguyệt Yếm, tạo dao động xung tán bất lợi cho sự hòa hợp và bền lâu.",

      nghi: "Phá dỡ công trình cũ, thanh lý đồ phế liệu, điều trị bệnh tật, giải trừ chướng ngại.",

      ky: "Hôn nhân cưới hỏi, đính hôn, xuất hành xe hoa, hòa giải tranh chấp, ký kết hợp tác kinh doanh.",

      checkMatch: function(lunarMonth, dayChiIndex) {
        const targetIdx = calcYemDoiChiIndex(lunarMonth);
        const isMatch = (parseInt(dayChiIndex, 10) === targetIdx);
        return {
          isMatch: isMatch,
          starId: "yem_doi",
          starName: "Yếm Đối",
          targetChi: CHI_NAMES[targetIdx],
          targetChiIndex: targetIdx,
          dayChi: CHI_NAMES[dayChiIndex],
          dayChiIndex: dayChiIndex,
          lunarMonth: lunarMonth,
          message: isMatch
            ? `⚠️ Hôm nay phạm SAO YẾM ĐỐI (Địa Chi ${CHI_NAMES[dayChiIndex]} - Đối xung Nguyệt Yếm). Cần thận trọng trong hôn nhân và giao dịch.`
            : `✅ Không phạm Sao Yếm Đối.`
        };
      }
    }
  };

  /**
   * ==========================================================================
   * THAN SAT ENGINE
   * ==========================================================================
   */
  const ThanSatEngine = {
    CAN_NAMES: CAN_NAMES,
    CHI_NAMES: CHI_NAMES,
    MONTH_KIEN_CHI: MONTH_KIEN_CHI,
    CHI_DIRECTIONS: CHI_DIRECTIONS,

    calcTueDucCanIndex: calcTueDucCanIndex,
    calcTueDucHopCanIndex: calcTueDucHopCanIndex,
    calcNguyetDucCanIndex: calcNguyetDucCanIndex,
    calcNguyetDucHopCanIndex: calcNguyetDucHopCanIndex,
    calcThienDucInfo: calcThienDucInfo,
    calcThienDucHopInfo: calcThienDucHopInfo,
    generateLucDucReferenceTable: generateLucDucReferenceTable,

    calcNguyetYemChiIndex: calcNguyetYemChiIndex,
    calcNguQuyChiIndex: calcNguQuyChiIndex,
    calcYemDoiChiIndex: calcYemDoiChiIndex,
    generate12MonthsTable: generate12MonthsTable,

    getStarInfo: function(starId) {
      return THAN_SAT_REGISTRY[starId] || null;
    },

    getAllStars: function() {
      return Object.values(THAN_SAT_REGISTRY);
    },

    isNguyetYemDay: function(lunarMonth, dayChiIndex) {
      return THAN_SAT_REGISTRY.nguyet_yem.checkMatch(lunarMonth, dayChiIndex);
    },

    isNguQuyDay: function(lunarMonth, dayChiIndex) {
      return THAN_SAT_REGISTRY.ngu_quy.checkMatch(lunarMonth, dayChiIndex);
    },

    isYemDoiDay: function(lunarMonth, dayChiIndex) {
      return THAN_SAT_REGISTRY.yem_doi.checkMatch(lunarMonth, dayChiIndex);
    },

    /**
     * Thẩm định toàn diện các Thần Sát có mặt trong ngày được tra cứu
     * Bao gồm:
     * - Bộ Lục Đức (Tuế Đức, Tuế Đức Hợp, Thiên Đức, Thiên Đức Hợp, Nguyệt Đức, Nguyệt Đức Hợp)
     * - Nguyệt Yếm, Ngũ Quỷ, Yếm Đối
     * - Hoàng Đạo / Hắc Đạo, Quý Nhân, Âm Dương Bất Tương, Mẫu Thương, Nguyệt Phá, Thập Nhị Trực, 28 Tú.
     */
    inspectDayThanSat: function(lunarDay, lunarMonth, lunarYear, dayCanIndex, dayChiIndex, jd, appHelpers, yearCanIndex) {
      const activeStars = [];
      const m = ((parseInt(lunarMonth, 10) - 1) % 12 + 12) % 12 + 1;
      const chIdx = parseInt(dayChiIndex, 10);
      const canIdx = parseInt(dayCanIndex, 10);

      // Xác định Can năm (Niên Can): nếu không truyền thì tính từ lunarYear
      let yCanIdx;
      if (typeof yearCanIndex === 'number' && !isNaN(yearCanIndex)) {
        yCanIdx = ((yearCanIndex % 10) + 10) % 10;
      } else {
        const yNum = parseInt(lunarYear, 10) || 2026;
        yCanIdx = ((yNum + 6) % 10 + 10) % 10;
      }
      const yCanName = CAN_NAMES[yCanIdx];

      // ----------------------------------------------------------------------
      // 1. KIỂM TRA BỘ LỤC ĐỨC (6 ĐẠI CÁT TINH TỐI TÔN)
      // ----------------------------------------------------------------------
      const lucDucMatches = [];

      // A. Tuế Đức (Niên Gia - Theo Can năm)
      const targetTueDucCan = calcTueDucCanIndex(yCanIdx);
      if (canIdx === targetTueDucCan) {
        const star = THAN_SAT_REGISTRY.tue_duc;
        const starObj = {
          id: "tue_duc",
          name: "Tuế Đức",
          hanzi: "歲德",
          category: "cat",
          typeLabel: "Niên Gia Cát Thần (Bộ Lục Đức)",
          level: "Đại Cát Tối Tôn",
          icon: "👑",
          badgeClass: "badge-tue-duc",
          originRule: `Năm Can ${yCanName}: Tuế Đức đắc tại Can ${CAN_NAMES[targetTueDucCan]} (${(yCanIdx % 2 === 0) ? 'Chính Can năm Dương' : 'Can Dương ngũ hợp của năm Âm'}). Ngày hôm nay là ngày Can ${CAN_NAMES[canIdx]} nên đắc SAO TUẾ ĐỨC.`,
          meaning: star.meaning,
          nghi: star.nghi,
          ky: star.ky
        };
        activeStars.push(starObj);
        lucDucMatches.push(starObj);
      }

      // B. Tuế Đức Hợp (Niên Gia - Theo Can năm)
      const targetTueDucHopCan = calcTueDucHopCanIndex(yCanIdx);
      if (canIdx === targetTueDucHopCan) {
        const star = THAN_SAT_REGISTRY.tue_duc_hop;
        const starObj = {
          id: "tue_duc_hop",
          name: "Tuế Đức Hợp",
          hanzi: "歲德合",
          category: "cat",
          typeLabel: "Niên Gia Cát Thần (Bộ Lục Đức)",
          level: "Đại Cát Hòa Hợp",
          icon: "🤝",
          badgeClass: "badge-tue-duc-hop",
          originRule: `Năm Can ${yCanName}: Tuế Đức Hợp đắc tại Can ${CAN_NAMES[targetTueDucHopCan]} (${(yCanIdx % 2 === 0) ? 'Can Âm ngũ hợp của năm Dương' : 'Chính Can năm Âm'}). Ngày hôm nay là ngày Can ${CAN_NAMES[canIdx]} nên đắc SAO TUẾ ĐỨC HỢP.`,
          meaning: star.meaning,
          nghi: star.nghi,
          ky: star.ky
        };
        activeStars.push(starObj);
        lucDucMatches.push(starObj);
      }

      // C. Nguyệt Đức (Nguyệt Gia 1 - Tam Hợp Ngũ Hành tháng)
      const targetNguyetDucCan = calcNguyetDucCanIndex(m);
      if (canIdx === targetNguyetDucCan) {
        const star = THAN_SAT_REGISTRY.nguyet_duc;
        const starObj = {
          id: "nguyet_duc",
          name: "Nguyệt Đức",
          hanzi: "月德",
          category: "cat",
          typeLabel: "Nguyệt Gia Cát Thần (Bộ Lục Đức)",
          level: "Đại Cát Hanh Thông",
          icon: "🌙",
          badgeClass: "badge-nguyet-duc",
          originRule: `Tháng ${m} (${MONTH_KIEN_CHI[m].chi}): Nguyệt Đức đắc tại Can ${CAN_NAMES[targetNguyetDucCan]} (Dương can vượng của Tam hợp cục tháng). Ngày Can ${CAN_NAMES[canIdx]} đắc SAO NGUYỆT ĐỨC.`,
          meaning: star.meaning,
          nghi: star.nghi,
          ky: star.ky
        };
        activeStars.push(starObj);
        lucDucMatches.push(starObj);
      }

      // D. Nguyệt Đức Hợp (Nguyệt Gia 1 - Thiên Can ngũ hợp của Nguyệt Đức)
      const targetNguyetDucHopCan = calcNguyetDucHopCanIndex(m);
      if (canIdx === targetNguyetDucHopCan) {
        const star = THAN_SAT_REGISTRY.nguyet_duc_hop;
        const starObj = {
          id: "nguyet_duc_hop",
          name: "Nguyệt Đức Hợp",
          hanzi: "月德合",
          category: "cat",
          typeLabel: "Nguyệt Gia Cát Thần (Bộ Lục Đức)",
          level: "Đại Cát Sinh Tài",
          icon: "🌿",
          badgeClass: "badge-nguyet-duc-hop",
          originRule: `Tháng ${m}: Nguyệt Đức Hợp đắc tại Can ${CAN_NAMES[targetNguyetDucHopCan]} (Ngũ hợp tương sinh với Nguyệt Đức). Ngày Can ${CAN_NAMES[canIdx]} đắc SAO NGUYỆT ĐỨC HỢP.`,
          meaning: star.meaning,
          nghi: star.nghi,
          ky: star.ky
        };
        activeStars.push(starObj);
        lucDucMatches.push(starObj);
      }

      // E. Thiên Đức (Nguyệt Gia 2 - 12 tháng)
      const tdInfo = calcThienDucInfo(m);
      let matchThienDuc = false;
      if (tdInfo.can !== null && canIdx === tdInfo.can) {
        matchThienDuc = true;
      } else if (tdInfo.chi !== null && chIdx === tdInfo.chi) {
        matchThienDuc = true;
      }
      if (matchThienDuc) {
        const star = THAN_SAT_REGISTRY.thien_duc;
        const starObj = {
          id: "thien_duc",
          name: "Thiên Đức",
          hanzi: "天德",
          category: "cat",
          typeLabel: "Nguyệt Gia Cát Thần (Bộ Lục Đức)",
          level: "Đại Cát Cứu Giải",
          icon: "⭐",
          badgeClass: "badge-thien-duc",
          originRule: `Tháng ${m} (${MONTH_KIEN_CHI[m].chi}): Thiên Đức đáo tại ${tdInfo.targetName}. Ngày hôm nay (${CAN_NAMES[canIdx]} ${CHI_NAMES[chIdx]}) đắc SAO THIÊN ĐỨC.`,
          meaning: star.meaning,
          nghi: star.nghi,
          ky: star.ky
        };
        activeStars.push(starObj);
        lucDucMatches.push(starObj);
      }

      // F. Thiên Đức Hợp (Nguyệt Gia 2 - Can/Chi hợp Thiên Đức)
      const tdhInfo = calcThienDucHopInfo(m);
      let matchThienDucHop = false;
      if (tdhInfo.can !== null && canIdx === tdhInfo.can) {
        matchThienDucHop = true;
      } else if (tdhInfo.chi !== null && chIdx === tdhInfo.chi) {
        matchThienDucHop = true;
      }
      if (matchThienDucHop) {
        const star = THAN_SAT_REGISTRY.thien_duc_hop;
        const starObj = {
          id: "thien_duc_hop",
          name: "Thiên Đức Hợp",
          hanzi: "天德合",
          category: "cat",
          typeLabel: "Nguyệt Gia Cát Thần (Bộ Lục Đức)",
          level: "Đại Cát Tương Trợ",
          icon: "🤝",
          badgeClass: "badge-thien-duc-hop",
          originRule: `Tháng ${m} (${MONTH_KIEN_CHI[m].chi}): Thiên Đức Hợp đáo tại ${tdhInfo.targetName}. Ngày hôm nay (${CAN_NAMES[canIdx]} ${CHI_NAMES[chIdx]}) đắc SAO THIÊN ĐỨC HỢP.`,
          meaning: star.meaning,
          nghi: star.nghi,
          ky: star.ky
        };
        activeStars.push(starObj);
        lucDucMatches.push(starObj);
      }

      // ----------------------------------------------------------------------
      // 2. KIỂM TRA HUNG SÁT THÁNG (NGŨ QUỶ, NGUYỆT YẾM, YẾM ĐỐI)
      // ----------------------------------------------------------------------
      // Sao Ngũ Quỷ (Bạch Hổ của Nguyệt Yếm - Đại Hung)
      const checkNguQuy = THAN_SAT_REGISTRY.ngu_quy.checkMatch(m, chIdx);
      if (checkNguQuy.isMatch) {
        activeStars.push({
          id: "ngu_quy",
          name: "Ngũ Quỷ",
          hanzi: "五鬼",
          category: "hung",
          typeLabel: "Hung Thần / Ác Sát",
          level: "Đại Hung (Cực Kỵ)",
          icon: "👻",
          badgeClass: "badge-ngu-quy",
          originRule: `Tháng ${m} Ngũ Quỷ tại ${CHI_NAMES[checkNguQuy.targetChiIndex]}: Là vị trí Bạch Hổ đi sau Nguyệt Yếm ('âm ở trong âm').`,
          meaning: THAN_SAT_REGISTRY.ngu_quy.meaning,
          nghi: THAN_SAT_REGISTRY.ngu_quy.nghi,
          ky: THAN_SAT_REGISTRY.ngu_quy.ky
        });
      }

      // Sao Nguyệt Yếm (Đại Hung)
      const checkYem = THAN_SAT_REGISTRY.nguyet_yem.checkMatch(m, chIdx);
      if (checkYem.isMatch) {
        activeStars.push({
          id: "nguyet_yem",
          name: "Nguyệt Yếm",
          hanzi: "月厭",
          category: "hung",
          typeLabel: "Hung Thần / Ác Tinh",
          level: "Đại Hung (Cực Kỵ)",
          icon: "⚡",
          badgeClass: "badge-nguyet-yem",
          originRule: `Tháng ${m} Nguyệt Yếm tại ${CHI_NAMES[checkYem.targetChiIndex]}: Khởi Tháng Giêng tại Tuất, mỗi tháng lùi 1 vị trí (nghịch hành).`,
          meaning: THAN_SAT_REGISTRY.nguyet_yem.meaning,
          nghi: THAN_SAT_REGISTRY.nguyet_yem.nghi,
          ky: THAN_SAT_REGISTRY.nguyet_yem.ky
        });
      }

      // Sao Yếm Đối (Hung - Lục Xung Nguyệt Yếm)
      const checkDoi = THAN_SAT_REGISTRY.yem_doi.checkMatch(m, chIdx);
      if (checkDoi.isMatch) {
        activeStars.push({
          id: "yem_doi",
          name: "Yếm Đối",
          hanzi: "厭對",
          category: "hung",
          typeLabel: "Hung Thần (Đối Xung)",
          level: "Hung (Nên tránh)",
          icon: "⚔️",
          badgeClass: "badge-yem-doi",
          originRule: `Tháng ${m} Yếm Đối tại ${CHI_NAMES[checkDoi.targetChiIndex]}: Vị trí Lục Xung đối xứng 180° với Nguyệt Yếm.`,
          meaning: THAN_SAT_REGISTRY.yem_doi.meaning,
          nghi: THAN_SAT_REGISTRY.yem_doi.nghi,
          ky: THAN_SAT_REGISTRY.yem_doi.ky
        });
      }

      // ----------------------------------------------------------------------
      // 3. TÍCH HỢP CÁC SAO TỪ HỆ THỐNG ỨNG DỤNG NẾU CÓ HELPER
      // ----------------------------------------------------------------------
      if (appHelpers) {
        // Hoàng Đạo / Hắc Đạo trực nhật
        if (typeof appHelpers.getDayHoangDao === 'function' && appHelpers.HOANG_DAO_DETAILS) {
          const hdStar = appHelpers.getDayHoangDao(m, chIdx);
          const hdDetail = appHelpers.HOANG_DAO_DETAILS[hdStar.name];
          if (hdDetail) {
            activeStars.push({
              id: `hoang_dao_${hdStar.name}`,
              name: hdStar.name,
              hanzi: hdStar.isHoangDao ? "黃道" : "黑道",
              category: hdStar.isHoangDao ? "cat" : "hung",
              typeLabel: hdStar.isHoangDao ? "Hoàng Đạo (Cát Thần)" : "Hắc Đạo (Hung Thần)",
              level: hdStar.isHoangDao ? "Cát Tinh" : "Hung Tinh",
              icon: hdStar.isHoangDao ? "✨" : "🌑",
              badgeClass: hdStar.isHoangDao ? "badge-hoangdao" : "badge-hacdao",
              originRule: `Sao trực nhật thuộc vòng 12 Thần Sát Hoàng Đạo / Hắc Đạo (${hdDetail.fullName || hdStar.name}).`,
              meaning: hdDetail.meaning || (hdStar.isHoangDao ? "Cát tinh soi chiếu, vạn sự hanh thông thuận lợi." : "Hung sát trực nhật, cần cẩn trọng ngừa thị phi rủi ro."),
              nghi: hdDetail.nghi || "Tiến hành công việc theo kế hoạch.",
              ky: hdDetail.ky || "Tránh mạo hiểm, tranh cãi bất hòa."
            });
          }
        }

        // Âm Dương Bất Tương / Âm Tương / Dương Tương
        if (typeof appHelpers.getBatTuongInfo === 'function') {
          const bt = appHelpers.getBatTuongInfo(m, canIdx, chIdx);
          if (bt.code === 1) {
            activeStars.push({
              id: "bat_tuong",
              name: "Âm Dương Bất Tương",
              hanzi: "陰陽不將",
              category: "cat",
              typeLabel: "Cát Tinh Hôn Nhân",
              level: "Đại Cát (Chuyên Hỷ Sự)",
              icon: "💍",
              badgeClass: bt.badgeClass || "badge-hoangdao",
              originRule: "Can Chi ngày phối hợp tiết khí tháng đạt thế cân bằng điều hòa Âm Dương tuyệt đối.",
              meaning: "Âm Dương quân bình, vợ chồng hòa thuận tương kính, gia đạo hưng vượng bền vững trăm năm.",
              nghi: "Đại cát cho giá thú, cưới hỏi, ăn hỏi, đính hôn, rước dâu, nhập phòng hoa chúc.",
              ky: "Không có kiêng kỵ lớn."
            });
          } else if (bt.code === 2) {
            activeStars.push({
              id: "duong_tuong",
              name: "Dương Tương",
              hanzi: "陽將",
              category: "hung",
              typeLabel: "Hung Sát Hôn Nhân",
              level: "Hung (Sát Nam Chủ)",
              icon: "⚠️",
              badgeClass: bt.badgeClass || "badge-hacdao",
              originRule: "Dương khí quá vượng cô độc xung sát trong quan hệ hôn phối.",
              meaning: "Dương khí lấn át thái quá, sát hại nam chủ trong việc hôn nhân giá thú.",
              nghi: "Việc thường nhật, công việc xã hội.",
              ky: "Kỵ cưới hỏi, đính hôn, dạm ngõ (bất lợi cho chú rể / đấng mày râu)."
            });
          } else if (bt.code === 3) {
            activeStars.push({
              id: "am_tuong",
              name: "Âm Tương",
              hanzi: "陰將",
              category: "hung",
              typeLabel: "Hung Sát Hôn Nhân",
              level: "Hung (Sát Nữ Chủ)",
              icon: "⚠️",
              badgeClass: bt.badgeClass || "badge-hacdao",
              originRule: "Âm khí quá thịnh u uất xung sát trong quan hệ phối ngẫu.",
              meaning: "Âm khí thâm trầm lấn át dương quang, sát hại nữ chủ trong hôn phối.",
              nghi: "Việc thường nhật, tĩnh dưỡng an thần.",
              ky: "Kỵ cưới hỏi, rước dâu, nhập phòng hoa chúc (bất lợi cho cô dâu)."
            });
          } else if (bt.code === 4) {
            activeStars.push({
              id: "am_duong_cau_tuong",
              name: "Âm Dương câu Tương",
              hanzi: "陰陽俱將",
              category: "hung",
              typeLabel: "Hung Sát Cực Kỵ",
              level: "Đại Hung (Hôn Nhân)",
              icon: "⛔",
              badgeClass: bt.badgeClass || "badge-hacdao",
              originRule: "Cả khí Âm và Dương đều xung khắc kịch liệt, hỗn loạn trường khí.",
              meaning: "Hình khắc sâu sắc giữa hai bên, chủ về phân ly, trắc trở, xung đột gia đạo.",
              nghi: "Tạm gác việc hôn nhân, tu tâm dưỡng tính.",
              ky: "Tuyệt đối kỵ cưới hỏi, giá thú, đính hôn."
            });
          }
        }

        // Mẫu Thương (Cát Tinh Dưỡng Dục)
        if (typeof appHelpers.getMauThuongInfo === 'function') {
          const mt = appHelpers.getMauThuongInfo(m, chIdx);
          if (mt && mt.isMauThuong) {
            activeStars.push({
              id: "mau_thuong",
              name: "Mẫu Thương",
              hanzi: "母倉",
              category: "cat",
              typeLabel: "Cát Tinh Dưỡng Dục",
              level: "Cát Tinh (Sinh Sôi)",
              icon: "🌾",
              badgeClass: mt.badgeClass || "badge-hoangdao",
              originRule: `Lệnh tháng sinh Địa Chi ngày theo quy luật ngũ hành tương sinh mẫu - tử (${mt.detail || ''}).`,
              meaning: mt.meaning || "Đại diện cho sự chở che, nuôi dưỡng, sinh sôi tích lũy trường tồn của đất trời.",
              nghi: mt.nghi || "Khai kho nạp tài, gieo trồng thu hoạch, giá thú cưới hỏi, nhập trạch, cầu an, dưỡng bệnh.",
              ky: "Không có kiêng kỵ đặc biệt."
            });
          }
        }

        // Nguyệt Phá (Phá Nhật - Lục Xung Chi Tháng)
        if (typeof appHelpers.getNguyetPhaInfo === 'function') {
          const np = appHelpers.getNguyetPhaInfo(m, chIdx);
          if (np && np.isNguyetPha) {
            activeStars.push({
              id: "nguyet_pha",
              name: "Nguyệt Phá",
              hanzi: "月破",
              category: "hung",
              typeLabel: "Đại Hung Sát",
              level: "Đại Hung (Phá Tán)",
              icon: "💥",
              badgeClass: np.badgeClass || "badge-hacdao",
              originRule: `Địa Chi ngày ${CHI_NAMES[chIdx]} lục xung trực diện với Nguyệt Kiến tháng ${m}.`,
              meaning: "Khí trường xung đột kịch liệt phá vỡ sự ổn định, chủ hao tổn, đổ vỡ, chia rẽ.",
              nghi: "Phá dỡ công trình cũ, phá dỡ chướng ngại, dọn dẹp vệ sinh.",
              ky: "Đại kỵ khởi công động thổ, cưới hỏi, khai trương, ký kết, mua bán lớn, an táng."
            });
          }
        }

        // Thập Nhị Trực (Kiến, Trừ, Mãn, Bình, Định, Chấp, Phá, Nguy, Thành, Thâu, Khai, Bế)
        if (typeof appHelpers.getDayTrucVaSao === 'function' && appHelpers.TRUC_DETAILS) {
          const { truc, sao } = appHelpers.getDayTrucVaSao(m, chIdx, jd);
          const trucDetail = appHelpers.TRUC_DETAILS[truc];
          if (trucDetail) {
            const isHungTruc = ['Phá', 'Nguy', 'Bế'].includes(truc);
            activeStars.push({
              id: `truc_${truc}`,
              name: `Trực ${truc}`,
              hanzi: "直",
              category: isHungTruc ? "hung" : "cat",
              typeLabel: `Thập Nhị Trực (${isHungTruc ? 'Hung Trực' : 'Cát Trực'})`,
              level: isHungTruc ? "Hung" : "Cát",
              icon: "📌",
              badgeClass: isHungTruc ? "badge-hacdao" : "badge-hoangdao",
              originRule: `Trực nhật luân chuyển theo Khẩu Quyết Thập Nhị Trực (Trực ${truc}).`,
              meaning: trucDetail.meaning || `Trực ${truc} chủ sự quản hạt vận khí ngày theo quy luật sinh khắc thiên địa.`,
              nghi: trucDetail.nghi || "Tiến hành công việc theo lịch biểu dụng sự.",
              ky: trucDetail.ky || "Tránh hành động bất cẩn, làm việc mạo hiểm."
            });
          }

          // Nhị Thập Bát Tú (28 Sao Chiếu Ngày)
          if (sao && appHelpers.SAO_28_DETAILS) {
            const saoDetail = appHelpers.SAO_28_DETAILS[sao];
            if (saoDetail) {
              const isHungSao = saoDetail.nature && saoDetail.nature.includes('Hung');
              activeStars.push({
                id: `sao_28_${sao}`,
                name: `Sao ${sao}`,
                hanzi: "宿",
                category: isHungSao ? "hung" : "cat",
                typeLabel: `Nhị Thập Bát Tú (${saoDetail.nature || 'Tinh Tú'})`,
                level: isHungSao ? "Hung Tú" : "Cát Tú",
                icon: "⭐",
                badgeClass: isHungSao ? "badge-hacdao" : "badge-hoangdao",
                originRule: `Sao chiếu ngày thuộc 28 Tinh Tú thiên văn cổ (${saoDetail.fullName || sao}).`,
                meaning: isHungSao
                  ? "Hung tú soi chiếu hạ giới, chủ trắc trở, phân tán hao tổn, cần tĩnh tại cẩn trọng."
                  : "Cát tú soi chiếu, tăng trưởng trường khí cát tường, thuận lợi cho việc mưu cầu phúc lạc.",
                nghi: saoDetail.nghi || "Làm việc theo kế hoạch.",
                ky: saoDetail.ky || "Tránh việc phiêu lưu rủi ro."
              });
            }
          }
        }
      }

      const yemIdx = calcNguyetYemChiIndex(m);
      const nguQuyIdx = calcNguQuyChiIndex(m);
      const doiIdx = calcYemDoiChiIndex(m);

      const catStars = activeStars.filter(s => s.category === 'cat');
      const hungStars = activeStars.filter(s => s.category === 'hung');

      return {
        lunarDay,
        lunarMonth: m,
        lunarYear,
        yearCan: yCanName,
        yearCanIndex: yCanIdx,
        dayCan: CAN_NAMES[canIdx],
        dayCanIndex: canIdx,
        dayChi: CHI_NAMES[chIdx],
        dayChiIndex: chIdx,
        yemChi: CHI_NAMES[yemIdx],
        nguQuyChi: CHI_NAMES[nguQuyIdx],
        doiChi: CHI_NAMES[doiIdx],
        hasNguyetYem: checkYem.isMatch,
        hasNguQuy: checkNguQuy.isMatch,
        hasYemDoi: checkDoi.isMatch,
        lucDucMatches: lucDucMatches,
        hasLucDuc: lucDucMatches.length > 0,
        activeStars: activeStars,
        catStars: catStars,
        hungStars: hungStars,
        totalActiveCount: activeStars.length
      };
    }
  };

  return {
    THAN_SAT_REGISTRY: THAN_SAT_REGISTRY,
    ThanSatEngine: ThanSatEngine
  };
});
