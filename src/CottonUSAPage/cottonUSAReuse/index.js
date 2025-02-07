import React from "react";

export const cottonUSAProduct = (props) =>{
    const {imgUrl1 , imgUrl2 , name , price , colorIterm , total , quantity} = props
    return(
        <div>
            {imgUrl1} - {imgUrl2} - {name} - {price} - {colorIterm} - {total} - {quantity}
        </div>
    )
}