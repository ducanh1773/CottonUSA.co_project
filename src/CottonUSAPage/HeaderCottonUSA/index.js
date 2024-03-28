import React from "react";
import "./index.css"
import { BoxIconElement } from "boxicons";
import { useState } from "react";
import { Link } from "react-router-dom";
function HeaderCottonUSA() {
    const [showIterm, setShowIterm] = useState(false);
    const [showCollection, setShowCollection] = useState(false);
    const showHoodieIterm = () => {
        setShowIterm(true);
    }

    const hideHoodieIterm = () => {
        setShowIterm(false)
    }

    const showCollectionIterm = () => {
        setShowCollection(!showCollection)
    }

    return (
        <div>
            <div className="allHeaderPage" >
                <div className="logoCottonUSA">
                    <img src='https://360.com.vn/wp-content/uploads/2022/06/logo.svg'></img>
                </div>
                <div className="allItermSearchCottonUSA">
                    <Link to="/"><h2>Trang chủ</h2></Link>
                    <Link to="/collection/t-shirt"><h2>T-Shirt</h2></Link>
                    <div className="itermDropdownHeader" onMouseEnter={showHoodieIterm} >
                        <h2>Hoodie</h2>
                        <box-icon name='chevron-down' ></box-icon>
                    </div>
                    <div className="itermDropdownHeader" onMouseEnter={showCollectionIterm}>
                        <h2>Collection</h2>
                        <box-icon name='chevron-down' ></box-icon>
                    </div>
                </div>
                <div className="iconHeaderCottonUSA">
                    <box-icon name='search-alt-2'></box-icon>
                    <Link to="/dangnhapCottonUSA"><box-icon name='user' ></box-icon></Link>
                    <box-icon name='cart' ></box-icon>
                </div>
            </div>
            {showIterm &&
                <div className="itermDropDownHoodies " onMouseLeave={hideHoodieIterm} >
                    <p>MLB Hoodie</p>
                    <p>NBA Hoodie</p>
                    <p>NLF Hoodie</p>
                    <p>Stussy Hoodie</p>
                </div>
            }
            {showCollection &&
                <div className="itermDropDownHoodies itermDropdownMore" onMouseLeave={showCollectionIterm}>
                    <p>MLB Hoodie</p>
                    <p>NBA Hoodie</p>
                    <p>NLF Hoodie</p>
                    <p>Stussy Hoodie</p>
                </div>
            }

        </div>
    )
}

export default HeaderCottonUSA;