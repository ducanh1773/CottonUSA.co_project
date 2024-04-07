import React from "react";
import "./index.css"
import HeaderCottonUSA from "../HeaderCottonUSA";
import EndPageCottonUSA from "../endPage";

function ContactPageUSA() {
    return (
        <div>
            <div>
                <HeaderCottonUSA></HeaderCottonUSA>
            </div>
            <div className="allPageCottonUSA">
                <div className="mainLeftAllPageCottonUSAContact">
                    <h3>Liên hệ với chúng tôi</h3>
                    <h1>Bạn có câu hỏi gì không</h1>
                    <p>Hotline: 0346628986</p>
                    <p>Email: support@cottonusa.co</p>
                </div>
                <div className="mainRightAllPageCottonUSAContact">

                    <form>
                        <div className="inputNameInMainRightAllPageCottonUSAContact">
                            <div>
                                <input placeholder="Tên"></input>
                            </div>
                            <div>
                                <input placeholder="E-mail"></input>
                            </div>
                        </div>
                        <div className="messageInAllPageContact">
                            <div>
                                <input placeholder="Lời nhắn"></input>
                            </div>
                        </div>
                        <button className="sendMassageContactPageCottonUSA">Gửi lời nhắn</button>
                    </form>
                </div>
            </div>
            <div>
                <EndPageCottonUSA>  </EndPageCottonUSA>
            </div>
        </div>
    )
}

export default ContactPageUSA;