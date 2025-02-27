import { Document } from '../types/references.types';

// Mock data for references
const MOCK_REFERENCES: Record<string, Document[]> = {
  'default': [
    {
      id: 'doc1',
      title: 'Quy chế đào tạo UEH 2023',
      content: `Điều 15. Đánh giá kết quả học tập
1. Kết quả học tập của sinh viên được đánh giá sau từng học kỳ qua các tiêu chí sau:
a) Số tín chỉ của các học phần mà sinh viên đăng ký học vào đầu mỗi học kỳ (gọi tắt là khối lượng học tập đăng ký).
b) Điểm trung bình chung học kỳ là điểm trung bình có trọng số của các học phần mà sinh viên đăng ký học trong học kỳ đó, với trọng số là số tín chỉ tương ứng của từng học phần.
c) Khối lượng kiến thức tích lũy là khối lượng tính bằng tổng số tín chỉ của những học phần đã được đánh giá theo thang điểm chữ A, B, C, D tính từ đầu khóa học.
d) Điểm trung bình chung tích lũy là điểm trung bình của các học phần và được đánh giá bằng các điểm chữ A, B, C, D mà sinh viên đã tích lũy được, tính từ đầu khóa học cho tới thời điểm được xem xét vào lúc kết thúc mỗi học kỳ.`,
      relevanceScore: 95
    },
    {
      id: 'doc2',
      title: 'Hướng dẫn đăng ký môn học UEH 2023',
      content: `HƯỚNG DẪN ĐĂNG KÝ MÔN HỌC TRỰC TUYẾN
1. Sinh viên truy cập vào trang web đăng ký môn học tại địa chỉ: http://dkmh.ueh.edu.vn
2. Đăng nhập bằng tài khoản và mật khẩu được cấp
3. Chọn học kỳ cần đăng ký
4. Tìm kiếm môn học cần đăng ký theo mã môn hoặc tên môn học
5. Chọn lớp học phần phù hợp với thời khóa biểu cá nhân
6. Kiểm tra thông tin đăng ký và xác nhận
7. In phiếu đăng ký môn học để lưu trữ

Lưu ý: Sinh viên cần đăng ký đúng thời gian quy định. Sau thời gian này, hệ thống sẽ không cho phép đăng ký thêm.`,
      relevanceScore: 87
    },
    {
      id: 'doc3',
      title: 'Quy định về học phí UEH 2023-2024',
      content: `QUY ĐỊNH VỀ HỌC PHÍ NĂM HỌC 2023-2024
1. Mức học phí:
   - Chương trình đại trà: 410.000 đồng/tín chỉ
   - Chương trình chất lượng cao: 820.000 đồng/tín chỉ
   - Chương trình tiên tiến: 1.230.000 đồng/tín chỉ

2. Thời hạn đóng học phí:
   - Học kỳ 1: Từ 15/08/2023 đến 15/09/2023
   - Học kỳ 2: Từ 15/01/2024 đến 15/02/2024
   - Học kỳ hè: Từ 01/06/2024 đến 15/06/2024

3. Hình thức đóng học phí:
   - Thanh toán trực tuyến qua cổng thanh toán của trường
   - Chuyển khoản qua ngân hàng
   - Đóng trực tiếp tại phòng Tài chính - Kế toán

4. Chính sách miễn giảm học phí:
   - Đối tượng chính sách: Theo quy định của Nhà nước
   - Sinh viên có hoàn cảnh khó khăn: Xét duyệt theo từng trường hợp cụ thể`,
      relevanceScore: 72
    },
    {
      id: 'doc4',
      title: 'Lịch thi học kỳ 1 năm học 2023-2024',
      content: `LỊCH THI HỌC KỲ 1 NĂM HỌC 2023-2024
Thời gian thi: Từ ngày 02/01/2024 đến ngày 20/01/2024

Quy định chung:
1. Sinh viên phải có mặt tại phòng thi trước giờ thi ít nhất 15 phút
2. Mang theo thẻ sinh viên hoặc CMND/CCCD khi đi thi
3. Không được mang tài liệu, thiết bị điện tử vào phòng thi (trừ các môn được phép sử dụng tài liệu)
4. Sinh viên vắng thi không có lý do chính đáng sẽ nhận điểm 0
5. Sinh viên đi thi muộn quá 15 phút sẽ không được dự thi

Lịch thi chi tiết được cập nhật trên website của trường và gửi đến email sinh viên.`,
      relevanceScore: 45
    },
  ]
};

export const getReferencesForMessage = (messageId: string): Document[] => {
  // In a real application, you would fetch references based on the messageId
  // For this mock, we'll return the default references
  return MOCK_REFERENCES['default'] || [];
}; 