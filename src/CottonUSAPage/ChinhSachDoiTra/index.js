import React from "react";
import HeaderCottonUSA from "../HeaderCottonUSA";
import EndPageCottonUSA from "../endPage";
import "./index.css"
function ReturnPolicy() {
    return (
        <div>
            <div className="headerOnAboutUSPage">
                <HeaderCottonUSA></HeaderCottonUSA>
            </div>
            <div className="subjectReturnPolicy">
                <h1>Chính sách đổi trả & bảo hành</h1>
            </div>
            <div className="firstPolicyReturnPolicy">
                <div >
                    <h4>1. Dịch vụ đổi hàng tận nơi:</h4>

                    <p>Thấu hiểu được sự bất tiện khi muốn đổi sản phẩm do không vừa, bạn phải mang sản phẩm ra bưu cục và chờ đợi một thời gian để nhận lại món đồ ưng ý của mình. COTTON USA đã phát triển dịch vụ hỗ trợ bạn đổi hàng tận nơi nhằm mang lại sự tiện lợi và trải nghiệm tuyệt vời khi mua hàng:
                        <br></br>
                        <br></br>
                        - Shipper sẽ đến tận nhà đổi hàng cho bạn
                        <br></br>
                        <br></br>
                        - Áp dụng 01 lần đổi/ 01 đơn hàng
                        <br></br>
                        <br></br>

                        - Áp dụng đổi hàng với tất cả các sản phẩm (không bao gồm sản phẩm trong chương trình sale) thời gian đổi hàng trong vòng 30 ngày kể từ ngày khách hàng nhận bưu phẩm.
                        <br></br>
                        <br></br>
                        - Trường hợp sản phẩm hết size bạn mong muốn, COTTON USA sẽ hỗ trợ đổi sang sản phẩm khác bằng giá trị hoặc cao hơn, trường hợp bạn không đồng ý đổi sản phẩm khác, COTTON USA sẽ refund lại giá trị đơn hàng (Lưu ý không refund đối với sản phẩm sale).
                        <br></br>
                        <br></br>
                        - Chi phí vận chuyển khi đổi hàng được COTTON USA hỗ trợ 1 chiều cho bạn (bạn chỉ cần thanh toán phí ship khi nhận sản phẩm đúng) và 2 chiều đối với sản phẩm do lỗi sản xuất.</p>
                </div>
                <div>
                    <h4>2. Điều kiện đổi hàng</h4>

                    <p>- Chỉ nhận đổi sản phẩm khi có trường hợp phát sinh lỗi từ nhà sản xuất (ố màu, phai màu, lỗi chất liệu, lỗi đường may,...) hoặc giao nhầm sản phẩm.
                        <br></br>
                        <br></br>
                        - Sản phẩm đổi phải chưa qua sử dụng, chưa qua giặt tẩy, không bị vấy bẩn, ám mùi, còn giữ nguyên hóa đơn mua hàng và nhãn mác, sản phẩm đổi phải còn nguyên quà tặng kèm (nếu có).
                        <br></br>
                        <br></br>
                        - Sản phẩm đổi phải có giá trị tương đương hoặc cao hơn sản phẩm được đổi. Vui lòng thanh toán chi phí chênh lệch giá trị sản phẩm nếu có.</p>

                </div>
                <div>
                    <h4>3. Quy trình đổi hàng:</h4>
                    <p>Khách hàng vui lòng đọc kỹ Điều kiện đổi hàng, kiểm tra kỹ sản phẩm trước khi đổi và thực hiện các bước sau:</p>
                    <div className="stepPolicyReturn">
                        <h4>+ Bước 1: </h4>
                        <p> Nhắn tin  Facebook, Instagram chính thức của COTTON USA.</p>
                    </div>
                    <div  className="stepPolicyReturn">
                        <h4>+ Bước 2: </h4>
                        <p>Cung cấp cho nhân viên cskh video unbox sản phẩm theo hướng dẫn bên dưới.</p>
                    </div>
                    <div  className="stepPolicyReturn">
                        <h4>+ Bước 3:</h4>
                        <p>Cung cấp cho COTTON USA thông tin địa chỉ của bạn gồm: Họ tên, số điện thoại, địa chỉ đồng thời quay video gói hàng có dán thông tin (Họ tên, số điện thoại, địa chỉ)</p>
                    </div>
                    <div  className="stepPolicyReturn">
                        <h4>+ Bước 4:</h4>
                        <p>Sau khi xác nhận đổi hàng, COTTON USA gửi hàng đúng size/ mẫu về địa chỉ của bạn đồng thời shipper sẽ nhận lại sản phẩm sai size của COTTON USA.</p>
                    </div>
                    <div>* Cách thức quay unbox sản phẩm:</div>
                </div>
            </div>
            <div>
                <EndPageCottonUSA></EndPageCottonUSA>
            </div>
        </div>
    )

}
export default ReturnPolicy
