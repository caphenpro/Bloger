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

  // Danh mục 12 Địa Chi theo chiều thuận (kim đồng hồ: Tý -> Hợi)
  const CHI_NAMES = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  
  // Tương ứng 12 Nguyệt Kiến của 12 tháng Âm Lịch (Tháng 1 kiến Dần ... Tháng 12 kiến Sửu)
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

  // Phương vị Bát Quái / 24 Sơn Hướng tương ứng với 12 Địa Chi
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

  // Lục xung Địa Chi (đối xung 180 độ)
  const LUC_XUNG_MAP = {
    "Tý": "Ngọ", "Sửu": "Mùi", "Dần": "Thân", "Mão": "Dậu",
    "Thìn": "Tuất", "Tỵ": "Hợi", "Ngọ": "Tý", "Mùi": "Sửu",
    "Thân": "Dần", "Dậu": "Mão", "Tuất": "Thìn", "Hợi": "Tỵ"
  };

  /**
   * Tính vị trí Địa Chi Nguyệt Yếm cho một tháng Âm Lịch (1 đến 12)
   * Thuật toán: Tháng 1 khởi Tuất (index 10), mỗi tháng lùi 1 vị trí:
   * index = (10 - (month - 1)) mod 12
   */
  function calcNguyetYemChiIndex(lunarMonth) {
    const m = ((parseInt(lunarMonth, 10) - 1) % 12 + 12) % 12 + 1;
    let idx = (10 - (m - 1)) % 12;
    if (idx < 0) idx += 12;
    return idx;
  }

  /**
   * Tính vị trí Địa Chi Yếm Đối (đối xung với Nguyệt Yếm)
   */
  function calcYemDoiChiIndex(lunarMonth) {
    const yemIdx = calcNguyetYemChiIndex(lunarMonth);
    return (yemIdx + 6) % 12;
  }

  /**
   * Bảng phân bổ chi tiết 12 Tháng của Sao Nguyệt Yếm
   */
  function generateNguyetYem12MonthsTable() {
    const list = [];
    for (let m = 1; m <= 12; m++) {
      const kien = MONTH_KIEN_CHI[m];
      const yemIdx = calcNguyetYemChiIndex(m);
      const yemChi = CHI_NAMES[yemIdx];
      const doiIdx = calcYemDoiChiIndex(m);
      const doiChi = CHI_NAMES[doiIdx];
      const direction = CHI_DIRECTIONS[yemChi];

      list.push({
        month: m,
        monthName: kien.name,
        monthKienChi: kien.chi,
        monthKienIndex: kien.chiIndex,
        yemChi: yemChi,
        yemChiIndex: yemIdx,
        yemDoiChi: doiChi,
        yemDoiIndex: doiIdx,
        direction: direction,
        lunarCycleStep: `Nghịch hành bước thứ ${m} (Khởi Tuất tại Th.1 ➔ lùi về ${yemChi})`,
        summary: `Tháng ${m} (${kien.chi}): Nguyệt Yếm tại ${yemChi}, Yếm Đối tại ${doiChi}`
      });
    }
    return list;
  }

  /**
   * ==========================================================================
   * BỘ TỪ ĐIỂN TẬP TRUNG: THAN_SAT_REGISTRY
   * Tập hợp tất cả các Thần Sát (Cát Tinh, Hung Tinh) của hệ thống.
   * Khởi đầu với SAO NGUYỆT YẾM, các sao tiếp theo được bổ sung vào đây.
   * ==========================================================================
   */
  const THAN_SAT_REGISTRY = {
    "nguyet_yem": {
      id: "nguyet_yem",
      name: "Nguyệt Yếm",
      hanzi: "月厭",
      alias: "Nguyệt Yểm, Họa Thần",
      category: "hung", // 'hung' | 'cat'
      typeLabel: "Hung Thần / Ác Tinh",
      level: "Đại Hung (Cực Kỵ)",
      scope: "month_day", // Khởi theo tháng chiếu ngày
      order: 1,
      badgeClass: "badge-nguyet-yem",
      icon: "⚡",
      
      originRule: "Quy luật khởi lệ: Tháng Giêng (tháng Dần) khởi Nguyệt Yếm tại Tuất. Sau đó, cứ mỗi tháng tiếp theo thì Nguyệt Yếm di chuyển nghịch hành (lùi 1 vị trí Địa Chi theo chiều ngược kim đồng hồ).",
      
      formulaSummary: "Tháng 1 tại Tuất ➔ Tháng 2 tại Dậu ➔ Tháng 3 tại Thân ➔ Tháng 4 tại Mùi ➔ Tháng 5 tại Ngọ ➔ Tháng 6 tại Tỵ ➔ Tháng 7 tại Thìn ➔ Tháng 8 tại Mão ➔ Tháng 9 tại Dần ➔ Tháng 10 tại Sửu ➔ Tháng 11 tại Tý ➔ Tháng 12 tại Hợi.",
      
      astronomicalMeaning: "Theo Dịch lý và Thiên văn cổ, Nguyệt Kiến là nơi Dương khí và Đẩu chuôi chỉ tới (thuận hành theo chiều kim đồng hồ); trong khi đó Nguyệt Yếm là nơi Âm khí âm thầm dâng lên từ phương Tuất (Càn vị - nơi mặt trời lặn, âm khí khởi sinh) và nghịch hành luân chuyển. Khí u ám này yểm hãm ánh quang minh của nhật nguyệt, nên gọi là Nguyệt Yếm.",
      
      classicalCitation: "Khâm Định Hiệp Kỷ Biện Phương Thư (quyển 10 - Nghĩa Lệ): 'Nguyệt Yếm giả, âm khí dĩ khởi, yểm tức dương quang dã. Chính nguyệt kiến Dần khởi Tuất, nghịch hành thập nhị thần, dữ Nguyệt Kiến tương hợp... Bất khả dĩ giá thú, xuất hành, khai trương, động thổ'.",
      
      influence: "Chủ về âm tà, yểm bùa, ngăn trở, thị phi, trắc trở ngấm ngầm, bất hòa, bệnh tật và tai ương bất ngờ. Khi gặp ngày Nguyệt Yếm thì mưu sự đại sự dễ rơi vào cảnh dở dang, hao tổn nguyên khí.",
      
      tabooWorks: [
        "Giá thú, hôn nhân cưới hỏi, dạm ngõ, rước dâu (Đại kỵ - Âm Dương Bất Tương tuyệt đối loại trừ)",
        "Xuất hành đi xa, khởi hành công tác, nghênh đón xe hoa",
        "Động thổ khởi công, đào móng, đặt đá xây dựng nhà cửa",
        "Khai trương cửa hàng, ký kết hợp đồng thương mại lớn",
        "Nhập trạch, về nhà mới, an vị bàn thờ gia tiên",
        "An táng, cải táng, chôn cất",
        "Cầu tài, nhậm chức, tế tự cầu phúc"
      ],
      
      suitableWorks: [
        "Tống quái trừ tà, dẹp bỏ chướng ngại cũ",
        "Phá dỡ công trình cũ nát, tiêu hủy giấy tờ hư hại",
        "Tu thân dưỡng tính, tụng kinh sám hối, thiền định",
        "Nghỉ ngơi, tĩnh dưỡng, tránh tranh chấp khẩu thiệt"
      ],
      
      mitigation: "Nếu buộc phải hành sự sự vụ thông thường vào ngày này: Cần chọn giờ Hoàng Đạo cát tinh đắc lực (Thanh Long, Minh Đường, Kim Quỹ), phối hợp với ngày đắc Quý Nhân Tứ Đức (Thiên Đức, Nguyệt Đức, Thiên Xá) để lấy phúc đức hóa giải hung khí. Riêng việc Hôn Nhân Trăm Năm thì cổ thư tuyệt đối khuyên tránh xa ngày Nguyệt Yếm và Yếm Đối.",

      // Hàm kiểm tra một ngày cụ thể có phạm Nguyệt Yếm hay không
      checkMatch: function(lunarMonth, dayChiIndex) {
        const targetIdx = calcNguyetYemChiIndex(lunarMonth);
        const isMatch = (parseInt(dayChiIndex, 10) === targetIdx);
        const yemChi = CHI_NAMES[targetIdx];
        const dayChi = CHI_NAMES[dayChiIndex];
        return {
          isMatch: isMatch,
          starId: "nguyet_yem",
          starName: "Nguyệt Yếm",
          targetChi: yemChi,
          targetChiIndex: targetIdx,
          dayChi: dayChi,
          dayChiIndex: dayChiIndex,
          lunarMonth: lunarMonth,
          message: isMatch 
            ? `⚠️ Hôm nay phạm SAO NGUYỆT YẾM (Địa Chi ${dayChi}) - Hung thần yểm phá, đại kỵ cưới hỏi, xuất hành, khởi sự!`
            : `✅ Không phạm Sao Nguyệt Yếm (Tháng này Nguyệt Yếm tại ${yemChi}, hôm nay là ngày ${dayChi}).`
        };
      },

      // Lấy toàn bộ 12 tháng
      getTable12Months: generateNguyetYem12MonthsTable
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
      order: 2,
      badgeClass: "badge-yem-doi",
      icon: "⚔️",

      originRule: "Quy luật khởi lệ: Yếm Đối là thần sát nằm ở vị trí Lục Xung (đối diện 180°) với sao Nguyệt Yếm. Tháng Giêng khởi tại Thìn (đối xung với Tuất), sau đó cứ mỗi tháng nghịch hành lùi 1 cung Địa Chi.",

      formulaSummary: "Tháng 1 tại Thìn ➔ Tháng 2 tại Mão ➔ Tháng 3 tại Dần ➔ Tháng 4 tại Sửu ➔ Tháng 5 tại Tý ➔ Tháng 6 tại Hợi ➔ Tháng 7 tại Tuất ➔ Tháng 8 tại Dậu ➔ Tháng 9 tại Thân ➔ Tháng 10 tại Mùi ➔ Tháng 11 tại Ngọ ➔ Tháng 12 tại Tỵ.",

      astronomicalMeaning: "Thế trực xung trực diện với khí trường u ám của Nguyệt Yếm. Hai luồng khí nghịch hành va đập tạo nên dao động xung tán, bất lợi cho các việc cầu sự ổn định lâu dài.",

      influence: "Chủ về xung đột, chia rẽ, cãi vã, trở ngại trên đường đi, hao tán tài vật. Kỵ cưới hỏi, hòa giải, ký kết hợp tác.",

      tabooWorks: [
        "Hôn nhân cưới hỏi, đính hôn, nạp thái",
        "Xuất hành đi xa, giao dịch ký kết",
        "Khởi công, động thổ"
      ],

      suitableWorks: [
        "Phá dỡ, thanh lý đồ cũ, trị bệnh"
      ],

      mitigation: "Dùng các giờ Lục Hợp, Tam Hợp với chi ngày để hòa giải xung lực.",

      checkMatch: function(lunarMonth, dayChiIndex) {
        const targetIdx = calcYemDoiChiIndex(lunarMonth);
        const isMatch = (parseInt(dayChiIndex, 10) === targetIdx);
        const doiChi = CHI_NAMES[targetIdx];
        const dayChi = CHI_NAMES[dayChiIndex];
        return {
          isMatch: isMatch,
          starId: "yem_doi",
          starName: "Yếm Đối",
          targetChi: doiChi,
          targetChiIndex: targetIdx,
          dayChi: dayChi,
          dayChiIndex: dayChiIndex,
          lunarMonth: lunarMonth,
          message: isMatch
            ? `⚠️ Hôm nay phạm SAO YẾM ĐỐI (Địa Chi ${dayChi} - Đối xung với Nguyệt Yếm) - Cần thận trọng trong giao dịch và hôn nhân.`
            : `✅ Không phạm Sao Yếm Đối.`
        };
      }
    }

    /**
     * CƠ CHẾ SẴN SÀNG TIẾP NHẬN CÁC THẦN SÁT TIẾP THEO:
     * - thien_duc: Thiên Đức Quý Nhân (Cát thần tháng 1 Đinh, 2 Thân...)
     * - nguyet_duc: Nguyệt Đức Quý Nhân (Cát thần tháng 1 Bính, 2 Giáp...)
     * - thien_xa: Thiên Xá Cát Thần (Ngày Mậu Dần mùa xuân, Giáp Ngọ mùa hạ...)
     * - nguyet_pha: Nguyệt Phá Hung Thần (Chi ngày lục xung chi tháng)
     * - sat_chu: Sát Chủ Nhật (Theo 4 mùa / 12 tháng)
     * - thu_tu: Thụ Tử Nhật
     * - tam_nuong: Tam Nương Sát (Mùng 3, 7, 13, 18, 22, 27)
     * - nguyet_ky: Nguyệt Kỵ (Mùng 5, 14, 23)
     */
  };

  /**
   * ==========================================================================
   * CỖ MÁY TÍNH TOÁN & TRA CỨU: ThanSatEngine
   * Cung cấp các hàm API tra cứu, thẩm định và quét lịch cho toàn bộ ứng dụng
   * ==========================================================================
   */
  const ThanSatEngine = {
    CHI_NAMES: CHI_NAMES,
    MONTH_KIEN_CHI: MONTH_KIEN_CHI,
    CHI_DIRECTIONS: CHI_DIRECTIONS,
    LUC_XUNG_MAP: LUC_XUNG_MAP,

    // Lấy thông tin Nguyệt Yếm cho một tháng âm lịch
    getNguyetYemForMonth: function(lunarMonth) {
      const m = ((parseInt(lunarMonth, 10) - 1) % 12 + 12) % 12 + 1;
      const kien = MONTH_KIEN_CHI[m];
      const yemIdx = calcNguyetYemChiIndex(m);
      const yemChi = CHI_NAMES[yemIdx];
      const doiIdx = calcYemDoiChiIndex(m);
      const doiChi = CHI_NAMES[doiIdx];
      const dir = CHI_DIRECTIONS[yemChi];

      return {
        month: m,
        monthName: kien.name,
        kienChi: kien.chi,
        kienIndex: kien.chiIndex,
        yemChi: yemChi,
        yemChiIndex: yemIdx,
        yemDoiChi: doiChi,
        yemDoiIndex: doiIdx,
        direction: dir,
        ruleText: `Tháng ${m} (${kien.chi}): Nguyệt Yếm tại ${yemChi}, Yếm Đối tại ${doiChi}`,
        stepDescription: m === 1 
          ? "Khởi lệ: Tháng Giêng (tháng Dần) khởi Nguyệt Yếm tại Tuất."
          : `Tháng ${m}: Nguyệt Yếm lùi ${m - 1} cung nghịch hành từ Tuất ➔ đóng tại ${yemChi}.`
      };
    },

    // Kiểm tra nhanh xem ngày có phạm Nguyệt Yếm không
    isNguyetYemDay: function(lunarMonth, dayChiIndex) {
      return THAN_SAT_REGISTRY.nguyet_yem.checkMatch(lunarMonth, dayChiIndex);
    },

    // Kiểm tra nhanh xem ngày có phạm Yếm Đối không
    isYemDoiDay: function(lunarMonth, dayChiIndex) {
      return THAN_SAT_REGISTRY.yem_doi.checkMatch(lunarMonth, dayChiIndex);
    },

    // Lấy bảng 12 tháng đầy đủ của Nguyệt Yếm
    getNguyetYem12MonthsTable: function() {
      return generateNguyetYem12MonthsTable();
    },

    // Lấy chi tiết thông tin một sao từ registry
    getStarInfo: function(starId) {
      return THAN_SAT_REGISTRY[starId] || null;
    },

    // Lấy danh sách tất cả Thần Sát trong hệ thống
    getAllStars: function() {
      return Object.values(THAN_SAT_REGISTRY);
    },

    /**
     * Thẩm định toàn diện các Thần Sát có mặt trong ngày được chọn
     * @param {number} lunarDay - Ngày âm lịch (1..30)
     * @param {number} lunarMonth - Tháng âm lịch (1..12)
     * @param {number} lunarYear - Năm âm lịch
     * @param {number} dayChiIndex - Địa chi của ngày (0..11, 0: Tý)
     * @param {number} dayCanIndex - Thiên can của ngày (0..9, 0: Giáp)
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
          category: "hung",
          level: "Đại Hung",
          icon: "⚡",
          badgeClass: "badge-nguyet-yem",
          desc: `Phạm ngày Nguyệt Yếm (Chi ${CHI_NAMES[chIdx]} của tháng ${m}). Đại kỵ giá thú hôn nhân, xuất hành xa, động thổ, khai trương!`,
          avoid: THAN_SAT_REGISTRY.nguyet_yem.tabooWorks
        });
      }

      // 2. Kiểm tra Yếm Đối
      const checkDoi = THAN_SAT_REGISTRY.yem_doi.checkMatch(m, chIdx);
      if (checkDoi.isMatch) {
        activeStars.push({
          id: "yem_doi",
          name: "Yếm Đối",
          category: "hung",
          level: "Hung (Đối Xung)",
          icon: "⚔️",
          badgeClass: "badge-yem-doi",
          desc: `Phạm ngày Yếm Đối (Chi ${CHI_NAMES[chIdx]} đối xung với Nguyệt Yếm). Nên thận trọng trong giao dịch và hôn sự.`,
          avoid: THAN_SAT_REGISTRY.yem_doi.tabooWorks
        });
      }

      const nguyetYemInfo = ThanSatEngine.getNguyetYemForMonth(m);

      return {
        lunarDay,
        lunarMonth: m,
        lunarYear,
        dayChi: CHI_NAMES[chIdx],
        dayChiIndex: chIdx,
        nguyetYemInfo,
        hasNguyetYem: checkYem.isMatch,
        hasYemDoi: checkDoi.isMatch,
        activeStars: activeStars,
        starCount: activeStars.length
      };
    },

    /**
     * Tìm tất cả các ngày trong một tháng dương lịch có phạm sao Nguyệt Yếm hoặc Yếm Đối
     * (Cần truyền vào hàm chuyển đổi convertSolar2Lunar và getDayCanChi)
     */
    scanMonthForStarDays: function(solarYear, solarMonth, convertSolar2LunarFn, getDayCanChiFn) {
      const daysInMonth = new Date(solarYear, solarMonth, 0).getDate();
      const results = {
        yemDays: [],
        doiDays: [],
        allDays: []
      };

      for (let d = 1; d <= daysInMonth; d++) {
        const [lDay, lMonth, lYear] = convertSolar2LunarFn(d, solarMonth, solarYear);
        const dayCanChi = getDayCanChiFn(d, solarMonth, solarYear);
        const chiIdx = dayCanChi.chiIndex;

        const isYem = THAN_SAT_REGISTRY.nguyet_yem.checkMatch(lMonth, chiIdx).isMatch;
        const isDoi = THAN_SAT_REGISTRY.yem_doi.checkMatch(lMonth, chiIdx).isMatch;

        const dayItem = {
          solarDay: d,
          solarMonth: solarMonth,
          solarYear: solarYear,
          lunarDay: lDay,
          lunarMonth: lMonth,
          lunarYear: lYear,
          dayCanChi: dayCanChi.text,
          dayChi: dayCanChi.chi,
          dayChiIndex: chiIdx,
          isNguyetYem: isYem,
          isYemDoi: isDoi
        };

        if (isYem) results.yemDays.push(dayItem);
        if (isDoi) results.doiDays.push(dayItem);
        results.allDays.push(dayItem);
      }

      return results;
    },

    /**
     * Dữ liệu đồ họa phục vụ hiển thị Vòng Tròn 12 Cung Địa Chi (12 Zodiac Wheel)
     * Góc độ: Tý ở trên cùng (270° hoặc 90° tùy chuẩn), xếp theo chiều kim đồng hồ
     */
    get12ChiWheelAngles: function() {
      // 12 cung sắp xếp theo vòng tròn:
      // Tý (Bắc: 270° / góc trên cùng), Sửu (300°), Dần (330°), Mão (Đông: 0° / 360°),
      // Thìn (30°), Tỵ (60°), Ngọ (Nam: 90°), Mùi (120°), Thân (150°), Dậu (Tây: 180°),
      // Tuất (210°), Hợi (240°)
      const angles = [
        { chi: "Tý", idx: 0, deg: 270, label: "Tý (Bắc)" },
        { chi: "Sửu", idx: 1, deg: 300, label: "Sửu" },
        { chi: "Dần", idx: 2, deg: 330, label: "Dần" },
        { chi: "Mão", idx: 3, deg: 0, label: "Mão (Đông)" },
        { chi: "Thìn", idx: 4, deg: 30, label: "Thìn" },
        { chi: "Tỵ", idx: 5, deg: 60, label: "Tỵ" },
        { chi: "Ngọ", idx: 6, deg: 90, label: "Ngọ (Nam)" },
        { chi: "Mùi", idx: 7, idx: 7, deg: 120, label: "Mùi" },
        { chi: "Thân", idx: 8, deg: 150, label: "Thân" },
        { chi: "Dậu", idx: 9, deg: 180, label: "Dậu (Tây)" },
        { chi: "Tuất", idx: 10, deg: 210, label: "Tuất" },
        { chi: "Hợi", idx: 11, deg: 240, label: "Hợi" }
      ];
      return angles;
    }
  };

  return {
    THAN_SAT_REGISTRY: THAN_SAT_REGISTRY,
    ThanSatEngine: ThanSatEngine
  };
});
