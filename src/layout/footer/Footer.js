const Footer = () => {
  const footer = document.createElement("footer");
  document.body.appendChild(footer);

  footer.innerHTML = `
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section footer-about">
                    <h3>MovieHub</h3>
                    <p>Nền tảng xem phim trực tuyến hàng đầu với hàng nghìn bộ phim chất lượng cao, phụ đề tiếng Việt và trải nghiệm xem phim tuyệt vời.</p>
                    <div class="social-links">
                        <a href="#" title="Facebook">f</a>
                        <a href="#" title="Twitter">𝕏</a>
                        <a href="#" title="Instagram">📷</a>
                        <a href="#" title="YouTube">▶</a>
                    </div>
                </div>

                <div class="footer-section">
                    <h3>Danh Mục</h3>
                    <ul>
                        <li><a href="#">Phim Mới</a></li>
                        <li><a href="#">Phim Lẻ</a></li>
                        <li><a href="#">Phim Bộ</a></li>
                        <li><a href="#">Phim Chiếu Rạp</a></li>
                        <li><a href="#">Top IMDb</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Thể Loại</h3>
                    <ul>
                        <li><a href="#">Hành Động</a></li>
                        <li><a href="#">Tâm Lý</a></li>
                        <li><a href="#">Kinh Dị</a></li>
                        <li><a href="#">Hài Hước</a></li>
                        <li><a href="#">Khoa Học Viễn Tưởng</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Hỗ Trợ</h3>
                    <ul>
                        <li><a href="#">Câu Hỏi Thường Gặp</a></li>
                        <li><a href="#">Trung Tâm Trợ Giúp</a></li>
                        <li><a href="#">Điều Khoản Sử Dụng</a></li>
                        <li><a href="#">Chính Sách Bảo Mật</a></li>
                        <li><a href="#">Liên Hệ</a></li>
                    </ul>
                </div>

                <div class="footer-section newsletter">
                    <h3>Đăng Ký Nhận Tin</h3>
                    <p style="color: #b3b3b3; font-size: 14px;">Nhận thông báo về phim mới và ưu đãi đặc biệt</p>
                    <form class="newsletter-form">
                        <input type="email" placeholder="Email của bạn" required>
                        <button type="submit">Đăng Ký</button>
                    </form>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="payment-methods">
                    <span>VISA</span>
                    <span>MASTERCARD</span>
                    <span>PAYPAL</span>
                    <span>MOMO</span>
                    <span>VNPAY</span>
                </div>
                <p style="margin-top: 20px;">© 2024 MovieHub. Tất cả quyền được bảo lưu.</p>
                <p>Thiết kế bởi MovieHub Team</p>
            </div>
        </div>
    </footer>`;
};

export { Footer };
