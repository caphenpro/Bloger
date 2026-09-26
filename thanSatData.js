/**
 * ============================================================================
 * HỆ THỐNG DỮ LIỆU & THUẬT TOÁN THẦN SÁT (THAN SAT ENGINE)
 * Tác phẩm tham chiếu: Khâm Định Hiệp Kỷ Biện Phương Thư (欽定協紀辨方書)
 *                     & Ngọc Hạp Thông Thư (玉匣通書)
 * 
 * Chuyên đề Thần Sát Khởi Theo Tháng:
 * 1. SAO NGUYỆT YẾM (Nguyệt Yểm / Họa Thần):
 *    - Khởi lệ: Tháng Giêng (tháng Dần) khởi Nguyệt Yếm tại Tuất.
 *    - Luân chuyển: Mỗi tháng tiếp theo lùi 1 vị trí Địa Chi (nghịch hành).
 * 
 * 2. SAO NGŨ QUỶ (Ngũ Quỷ Nguyệt Lệnh / Bạch Hổ của Nguyệt Yếm):
 *    - Khởi lệ: Ngũ Quỷ chính là vị trí Bạch Hổ của Nguyệt Yếm, đóng ở ngay 
 *      phía sau Nguyệt Yếm đại diện cho tính "âm ở trong âm".
 *    - Phương vị Bạch Hổ đi sau Nguyệt Yếm trong từng tháng chính là sao Ngũ Quỷ.
 * 
 * 3. SAO YẾM ĐỐI (Lục xung với Nguyệt Yếm):
 *    - Khởi lệ: Nằm ở vị trí đối xung 180° với Nguyệt Yếm.
 * 
 * Thiết kế: Registry mở rộng, tập hợp chung cho toàn bộ Thần Sát.
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
   * Tính vị trí Địa Chi Nguyệt Yếm cho một tháng Âm Lịch (1 đến 12)
   * Tháng 1 khởi Tuất (index 10), mỗi tháng lùi 1 vị trí:
   * index = (10 - (month - 1)) mod 12
   */
  function calcNguyetYemChiIndex(lunarMonth) {
    const m = ((parseInt(lunarMonth, 10) - 1) % 12 + 12) % 12 + 1;
    let idx = (10 - (m - 1)) % 12;
    if (idx < 0) idx += 12;
    return idx;
  }

  /**
   * Tính vị trí Địa Chi Ngũ Quỷ (Bạch Hổ của Nguyệt Yếm):
   * Đóng ở ngay phía sau Nguyệt Yếm đại diện cho tính "âm ở trong âm"
   * Phương vị Bạch Hổ đi sau Nguyệt Yếm trong từng tháng chính là sao Ngũ Quỷ
   */
  function calcNguQuyChiIndex(lunarMonth) {
    const yemIdx = calcNguyetYemChiIndex(lunarMonth);
    return (yemIdx + 1) % 12;
  }

  /**
   * Tính vị trí Địa Chi Yếm Đối (đối xung với Nguyệt Yếm)
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
   * ==========================================================================
   * BỘ TỪ ĐIỂN TẬP TRUNG: THAN_SAT_REGISTRY
   * ==========================================================================
   */
  const THAN_SAT_REGISTRY = {
    "nguyet_yem": {
      id: "nguyet_yem",
      name: "Nguyệt Yếm",
      hanzi: "月厭",
      alias: "Nguyệt Yểm, Họa Thần",
      category: "hung",
      typeLabel: "Hung Thần / Ác Tinh",
      level: "Đại Hung (Cực Kỵ)",
      scope: "month_day",
      order: 1,
      badgeClass: "badge-nguyet-yem",
      icon: "⚡",

      originRule: "Tháng Giêng (tháng Dần) khởi Nguyệt Yếm tại Tuất. Sau đó, cứ mỗi tháng tiếp theo thì Nguyệt Yếm di chuyển nghịch hành (lùi 1 vị trí Địa Chi theo chiều ngược kim đồng hồ).",

      formulaSummary: "Th.1 tại Tuất ➔ Th.2 tại Dậu ➔ Th.3 tại Thân ➔ Th.4 tại Mùi ➔ Th.5 tại Ngọ ➔ Th.6 tại Tỵ ➔ Th.7 tại Thìn ➔ Th.8 tại Mão ➔ Th.9 tại Dần ➔ Th.10 tại Sửu ➔ Th.11 tại Tý ➔ Th.12 tại Hợi.",

      meaning: "Nguyệt Yếm là ác tinh đại biểu cho khí u ám, yểm bùa, ngăn trở, thị phi ngấm ngầm của âm khí chuyển vần. Làm suy giảm ánh sáng dương quang, gây trắc trở cho các việc khởi tạo và phát triển.",

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
      order: 2,
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
      order: 3,
      badgeClass: "badge-yem-doi",
      icon: "⚔️",

      originRule: "Yếm Đối là vị trí Lục Xung đối xứng 180° với sao Nguyệt Yếm trong tháng. Tháng Giêng khởi tại Thìn, sau đó cứ mỗi tháng nghịch hành lùi 1 vị trí Địa Chi.",

      formulaSummary: "Th.1 tại Thìn ➔ Th.2 tại Mão ➔ Th.3 tại Dần ➔ Th.4 tại Sửu ➔ Th.5 tại Tý ➔ Th.6 tại Hợi ➔ Th.7 tại Tuất ➔ Th.8 tại Dậu ➔ Th.9 tại Thân ➔ Th.10 tại Mùi ➔ Th.11 tại Ngọ ➔ Th.12 tại Tỵ.",

      meaning: "Thế trực xung trực diện với khí trường u ám của Nguyệt Yếm, tạo dao động xung tán bất lợi cho sự hòa hợp và bền lâu.",

      nghi: "Phá dỡ công trình cũ, thanh lý phế liệu, điều trị bệnh tật, giải trừ chướng ngại.",

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
    CHI_NAMES: CHI_NAMES,
    MONTH_KIEN_CHI: MONTH_KIEN_CHI,
    CHI_DIRECTIONS: CHI_DIRECTIONS,

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
     */
    inspectDayThanSat: function(lunarDay, lunarMonth, lunarYear, dayChiIndex, dayCanIndex) {
      const activeStars = [];
      const m = ((parseInt(lunarMonth, 10) - 1) % 12 + 12) % 12 + 1;
      const chIdx = parseInt(dayChiIndex, 10);

      // 1. Kiểm tra Nguyệt Yếm
      const checkYem = THAN_SAT_REGISTRY.nguyet_yem.checkMatch(m, chIdx);
      if (checkYem.isMatch) {
        activeStars.push({
          id: "nguyet_yem",
          name: "Nguyệt Yếm",
          hanzi: "月厭",
          category: "hung",
          level: "Đại Hung",
          icon: "⚡",
          badgeClass: "badge-nguyet-yem",
          originRule: "Tháng 1 tại Tuất, mỗi tháng lùi 1 vị trí Địa Chi (nghịch hành).",
          meaning: THAN_SAT_REGISTRY.nguyet_yem.meaning,
          nghi: THAN_SAT_REGISTRY.nguyet_yem.nghi,
          ky: THAN_SAT_REGISTRY.nguyet_yem.ky
        });
      }

      // 2. Kiểm tra Ngũ Quỷ (Bạch Hổ của Nguyệt Yếm)
      const checkNguQuy = THAN_SAT_REGISTRY.ngu_quy.checkMatch(m, chIdx);
      if (checkNguQuy.isMatch) {
        activeStars.push({
          id: "ngu_quy",
          name: "Ngũ Quỷ",
          hanzi: "五鬼",
          category: "hung",
          level: "Đại Hung",
          icon: "👻",
          badgeClass: "badge-ngu-quy",
          originRule: "Vị trí Bạch Hổ đi sau Nguyệt Yếm trong từng tháng ('âm ở trong âm').",
          meaning: THAN_SAT_REGISTRY.ngu_quy.meaning,
          nghi: THAN_SAT_REGISTRY.ngu_quy.nghi,
          ky: THAN_SAT_REGISTRY.ngu_quy.ky
        });
      }

      // 3. Kiểm tra Yếm Đối
      const checkDoi = THAN_SAT_REGISTRY.yem_doi.checkMatch(m, chIdx);
      if (checkDoi.isMatch) {
        activeStars.push({
          id: "yem_doi",
          name: "Yếm Đối",
          hanzi: "厭對",
          category: "hung",
          level: "Hung (Đối Xung)",
          icon: "⚔️",
          badgeClass: "badge-yem-doi",
          originRule: "Vị trí Lục Xung đối xứng 180° với Nguyệt Yếm.",
          meaning: THAN_SAT_REGISTRY.yem_doi.meaning,
          nghi: THAN_SAT_REGISTRY.yem_doi.nghi,
          ky: THAN_SAT_REGISTRY.yem_doi.ky
        });
      }

      const yemIdx = calcNguyetYemChiIndex(m);
      const nguQuyIdx = calcNguQuyChiIndex(m);
      const doiIdx = calcYemDoiChiIndex(m);

      return {
        lunarDay,
        lunarMonth: m,
        lunarYear,
        dayChi: CHI_NAMES[chIdx],
        dayChiIndex: chIdx,
        yemChi: CHI_NAMES[yemIdx],
        nguQuyChi: CHI_NAMES[nguQuyIdx],
        doiChi: CHI_NAMES[doiIdx],
        hasNguyetYem: checkYem.isMatch,
        hasNguQuy: checkNguQuy.isMatch,
        hasYemDoi: checkDoi.isMatch,
        activeStars: activeStars
      };
    }
  };

  return {
    THAN_SAT_REGISTRY: THAN_SAT_REGISTRY,
    ThanSatEngine: ThanSatEngine
  };
});
