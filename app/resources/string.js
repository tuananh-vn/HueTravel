// LOGIN messages
export const no_internet_remind =
  'Vui lòng kiểm tra lại kết nối internet của bạn!';
export const login_processing = 'Đang đăng nhập';
export const verify_otp_processing = 'Đang xác nhận mã OTP';
export const verify_user_processing = 'Đang xác nhận thông tin KTV';
export const invalid_phone_number = 'Số điện thoại không hợp lệ!';
export const phone_not_exist = 'Số điện thoại không tồn tại trên hệ thống';
export const email_not_exist = 'Email không tồn tại trên hệ thống';
export const invalid_otp = 'Mã OTP không chính xác!';
export const otp_required = 'Vui lòng nhập mã OTP';
export const unknown_error =
  'Lỗi không xác định, xin hãy chạy lại ứng dụng và thử lại :(';
export const login_failed = 'Đăng nhập thất bại';

// CUSTOMER messages
export const cannot_find_potential =
  'Không tìm thấy phiếu khách hàng tiềm năng tương ứng!';
export const potential_already_lost =
  'Phiếu KHTN đã bị đóng.\nHãy tạo lại báo giá với chức năng "Thêm vào giỏ hàng"';
export const checking_customer = 'Đang kiểm tra thông tin khách hàng';
export const adding_potential = 'Đang thêm phiếu khách hàng tiềm năng';
export const add_customer_successfully = 'Bạn đã lưu khách hàng thành công!';
export const add_potential_successfully =
  'Bạn đã thêm phiếu khách hàng tiềm năng thành công!';
export const potential_already_exists =
  'Đã có sẵn phiếu khách hàng tiềm năng này!';
export const updating_potential = 'Đang cập nhật khách hàng tiềm năng';
export const potential_not_found = 'Không tìm thấy phiếu khách hàng tiềm năng';
export const customer_already_handled =
  'Khách hàng đang được chăm sóc bởi KTV %s';
export const input_name_or_mobile = 'Nhập tên hoặc số điện thoại';
export const close_potential_remind = 'Bạn có chắc muốn đóng phiếu không?';
export const finding_customer = 'Đang tìm thông tin khách hàng';
export const customer_not_found = 'Không tìm thấy khách hàng!';
export const no_potential_customers = 'Bạn chưa có khách hàng tiềm năng nào!';
export const close_potential_notice =
  'Phiếu đã được đóng lại rồi nên không thể cập nhật!';

// SALE messages
export const creating_order = 'Đang gửi đơn hàng';
export const create_order_successfully =
  'Đơn hàng đang được xử lý trên Magento!\nVui lòng kiểm tra trạng thái trong mục "Quản lý đơn hàng"';
export const create_order_fail = 'Đặt đơn thất bại';
export const creating_quotation = 'Đang gửi báo giá';
export const create_quotation_successfully = 'Bạn đã gửi báo giá thành công!';
export const quotation_already_expired = 'Báo giá đã\nhết hạn'; // just to make button look nicer
export const quotation_already_sale = 'Báo giá đã\nthành đơn hàng'; // just to make button look nicer
export const unknown_shipping_district =
  'Mục giao hàng: không tìm thấy mã quận huyện';
export const unknown_billing_district =
  'Mục khách hàng: không tìm thấy mã quận huyện';
export const unknown_district = 'Không tìm thấy mã quận huyện';
export const gcafe_incorrect = 'Gcafe ID không hợp lệ!';
export const missing_gcafe_or_mobile = 'Chưa nhập số điện thoại hoặc Gcafe ID!';
export const please_input_gcafe_or_mobile =
  'Vui lòng nhập GcafeID hoặc số điện thoại!';
export const mobile_incorrect = 'Số điện thoại không hợp lệ!';
export const missing_customer_name = 'Bạn chưa nhập tên khách hàng!';
export const province_incorrect = 'Tên thành phố không đúng!';
export const district_incorrect = 'Tên quận huyện không đúng!';
export const missing_address = 'Bạn chưa nhập địa chỉ khách hàng!';
export const email_incorrect = 'Địa chỉ email không đúng!';
export const billing_section = 'Mục khách hàng: ';
export const shipping_section = 'Mục giao hàng: ';
export const deposit_incorrect = 'Số tiền đặt cọc không đúng!';
export const no_orders = 'Bạn chưa có đơn hàng nào!';

// BUNDLE & PRODUCT messages
export const confirm_delete_item_in_bundle =
  'Bạn có chắc chắn muốn bỏ linh kiện này?';
export const confirm_save_bundle = 'Bạn muốn lưu dàn máy này?';
export const group_bundle_empty = 'Cấu hình dàn máy chưa có sản phẩm nào!';
export const group_bundle_has_out_of_stock =
  'Cấu hình dàn máy có sản phẩm đã hết hàng!';
export const save_bundle_success = 'Lưu cấu hình dàn máy thành công!';
export const please_enter_bundle_name = 'Vui lòng nhập tên dàn máy';
export const loading_recommendation = 'Đang tìm kiếm dàn máy...';
export const adding_items_to_cart = 'Đang thêm vào giỏ hàng...';
export const invalid_item_quantity =
  'Số lượng sản phẩm phải là một số trong khoảng từ 0 đến 500, xin hãy kiểm tra lại!';
export const checking_product_price = 'Đang kiểm tra giá sản phẩm';
export const product_price_changed =
  'Có sản phẩm mới được cập nhật về giá.\nVui lòng kiểm tra tổng tiền mới !';
export const single_product_price_changed =
  'Sản phẩm %s có giá đổi từ %s\u20ab thành %s\u20ab';
export const single_product_out_of_stock = 'Sản phẩm %s đã hết hàng';
export const add_quote_to_cart = 'Thêm vào giỏ hàng';
export const cart_not_empty =
  'Giỏ hàng hiện tại của bạn sẽ bị xóa khi thêm các sản phẩm từ báo giá này !';
export const content_not_found = 'Không tìm thấy thông tin chi tiết!';
export const empty_cart_message = 'Giỏ hàng của bạn chưa có sản phẩm!';
export const single_product = 'Sản phẩm lẻ';
export const confirm_empty_cart =
  'Tất cả sản phẩm trong giỏ hàng sẽ bị xóa.\nBạn có chắc chắn không?';
export const cart_deleted = 'Giỏ hàng đã được xóa!';
export const no_product_in_cart = 'Giỏ hàng chưa có sản phẩm nào!';
export const error_invalid_price = 'Giá đã nhập không hợp lệ!';
export const error_price_must_greater_than_zero = 'Giá đến phải lớn hơn 0!';
export const clear_filter = 'Xóa bộ lọc';
export const error_load_product_detail_fail =
  'Không tìm thấy chi tiết sản phẩm!';
export const unknown_error_empty_cart =
  'Giỏ hàng không có sản phẩm nào.\nVui lòng thử tạo lại giỏ hàng, hoặc liên hệ team Dev để được hỗ trợ';
export const cannot_load_categories = 'Không lấy được danh mục sản phẩm';

// CS messages
export const cs_updating_ticket = 'Đang cập nhật phiếu';
export const cs_closing_ticket = 'Đang đóng phiếu';
export const cs_book_meeting_for_ticket = 'Đặt lịch để gán phiếu #%s cho\n%s';
export const cs_ktv_not_chosen_yet = 'Bạn chưa chọn KTV !';
export const cs_assign_ticket_success = 'Phiếu đã được gán thành công !';
export const cs_take_ticket_success = 'Bạn đã nhận phiếu thành công !';
export const cs_schedule_ticket_success = 'Bạn đã đặt lịch thành công !';
export const cs_add_ticket_note_success = 'Bạn đã thêm ghi chú thành công !';
export const cs_close_ticket_success = 'Bạn đã đóng phiếu thành công !';
export const cs_not_in_assignable_list =
  'Bạn không nằm trong danh sách có thể nhận phiếu này !';
export const cs_inaccurate_address =
  'App không tìm thấy địa chỉ cụ thể và chỉ tìm được đến khu vực !';
export const not_owning_notice =
  'Bạn cần được gán phiếu này mới có thể cập nhật!';

// NOTIFICATION messages
export const PN_permission_not_allowed =
  'Ứng dụng chưa được cho phép nhận thông báo!';
export const delete_notification = 'Xóa thông báo';
export const confirm_delete_unread_notification =
  'Bạn chưa đọc thông báo này. Bạn có muốn xóa nó không?';
export const clear_notification = 'Xóa thông báo đã đọc';
export const clear_logistic_readed = 'Xóa thông báo giao vận';
export const clear_cs_readed = 'Xóa thông báo GCafe';

// APP common messages
export const feature_under_construct = 'Chức năng đang được xây dựng';
export const app_exit_confirm = 'Bạn muốn thoát khỏi ứng dụng?';
export const new_version = 'Phiên bản mới';
export const under_maintainance = 'Đang bảo trì';
export const version_update_optional = 'App đã có phiên bản mới!';
export const version_update_mandatory_prompt_restart =
  'App có bản cập nhật quan trọng!\nXin hãy khởi động lại để cập nhật.';
export const version_update_mandatory_prompt_downloading =
  'App đang tải phiên bản mới về...\nXin bạn vui lòng chờ một vài phút rồi khởi động lại app.';
export const version_update_mandatory_prompt_success =
  'App đã cập nhật thành công!';
export const version_update_optional_store = 'App đã có phiên bản mới!';
export const version_update_mandatory_store =
  'App có bản cập nhật quan trọng!\nXin hãy cập nhật để tiếp tục sử dụng.';
export const version_under_maintainance =
  'Server đang trong thời gian bảo trì.\nXin vui lòng quay lại sau.';
export const version_downloaded =
  'App vừa tải xuống phiên bản mới.\nXin hãy khởi động lại để cập nhật!';
export const app_permissions_missing =
  'Để App hoạt động tốt nhất, bạn vui lòng:';
export const app_PN_permission = '• Cho phép App gửi thông báo';
export const app_LOC_permission = '• Cho phép App truy cập thông tin định vị';
export const device_LOC_enabled = '• Bật dịch vụ định vị của điện thoại';

// APP common short messages
export const loading = 'Đang tải dữ liệu';
export const load_data_error = 'Có lỗi xảy ra khi tải dữ liệu!';
export const load_data_error_and_retry =
  'Có lỗi xảy ra khi tải dữ liệu!\nThử lại';
export const no_matching_results = 'Không có kết quả tương ứng!';
export const request_timed_out = 'Thời gian server phản hồi quá lâu';
export const encounter_error = 'Gặp lỗi khi xử lý!';
export const assign_ticket = 'Gán phiếu';
export const see_detail = 'Xem chi tiết';
export const agree = 'Đồng ý';
export const retry = 'Thử lại';
export const ok = 'OK';
export const close = 'Đóng';
export const confirm = 'Xác nhận';
export const feedback = 'Góp ý';
export const change_area = 'Đổi khu vực';
export const logout = 'Đăng xuất';
export const choose = 'Chọn';
export const no = 'Không';
export const yes = 'Có';
export const sure = 'Chắc chắn';
export const error = 'Lỗi';
export const back = 'Quay lại';
export const close_now = 'Đóng phiếu ngay';
export const save = 'Lưu';
export const create_order = 'Đặt đơn';
export const update = 'Cập nhật';
export const restart = 'Khởi động lại';
export const ignore = 'Bỏ qua';
export const later = 'Để sau';
export const setup = 'Cài đặt';
export const cancel = 'Hủy';

// ENUMS...
export const PN_title = {
  meeting_today: 'Lịch hẹn khách hàng',
  meeting_miss: 'Khách hàng chưa liên hệ',
  quotation_today: 'Báo giá đến hạn',
  quotation_expire: 'Báo giá đã hết hạn',
  this_month_orders: 'Đơn hàng trong tháng %d',
  this_week_quotations: 'Báo giá trong tuần %s'
};

export const PN_message = {
  meeting_today: 'Hôm nay bạn có %d khách hàng đến lịch hẹn.\nChúc may mắn!',
  meeting_miss: 'Hôm qua bạn có %d khách hàng chưa liên hệ',
  quotation_today: 'Hôm nay bạn có %d báo giá đến hạn',
  quotation_expire: 'Hôm qua bạn có %d báo giá đã hết hạn',
  this_month_orders:
    'Tháng %d bạn đã tạo %d đơn hàng với tổng giá trị %s \u20ab',
  this_week_quotations:
    'Tuần %s bạn đã gửi %d báo giá với tổng giá trị %s \u20ab'
};

export const potential_status = {
  new: 'Mới',
  qualified: 'Đang liên hệ',
  proposition: 'Đã báo giá',
  won: 'Thắng',
  lost: 'Thua'
};

export const order_status = {
  ordering: 'Đang xử lý',
  sale: 'Đặt hàng thành công',
  order_failed: 'Đặt hàng thất bại',
  expired: 'Đã hết hạn'
};

export const PN_caption = {
  promotion: 'KHUYẾN MÃI',
  order: 'ĐƠN HÀNG',
  gcafe: 'GCAFE',
  customer: 'KHÁCH HÀNG',
  quotation: 'BÁO GIÁ',
  finance: 'TÀI CHÍNH',
  logistic: 'VẬN CHUYỂN'
};

export const screen_title = {
  logistic: 'Giao vận',
  gcafe: 'Gcafé',
  finance: 'Công nợ',
  home: 'Trang chủ',
  sale: 'Bán hàng',
  notification_detail: 'Nội dung thông báo',
  substitute_product: 'Sản phẩm thay thế',
  bundle_detail: 'Chi tiết dàn máy',
  bundle_list: 'Danh sách cấu hình',
  bundle_setting: 'Tùy chỉnh dàn máy',
  cart: 'Giỏ hàng',
  filter: 'Bộ lọc',
  product_list: 'Danh mục sản phẩm',
  product_detail: 'Chi tiết sản phẩm',
  promotion: 'Chương trình khuyến mãi',
  promotion_detail: 'Chi tiết khuyến mãi',
  potential_customer: 'Khách hàng tiềm năng',
  potential_customer_detail: 'Thông tin khách hàng tiềm năng',
  fill_customer_info: 'Nhập thông tin khách hàng',
  order_detail: 'Đơn hàng',
  order_manage: 'Quản lý đơn hàng',
  quotation_detail: 'Chi tiết báo giá',
  select_bundle: 'Danh sách dàn máy',
  bundle_creation: 'Thông tin dàn máy',
  group_bundle_creation: 'Xây dựng cấu hình dàn máy',
  group_bundle_detail: 'Chi tiết cấu hình dàn máy',
  cs_gcafe: 'Xử lý phiếu Gcafe',
  ticket_assign: 'Danh sách KTV',
  ticket_detail: 'Chi tiết phiếu #%s',
  mapview: 'Bản đồ',
  select_category: 'Chọn danh mục sản phẩm',
  user_ticket_history: 'Lịch sử phiếu GCafe'
};
