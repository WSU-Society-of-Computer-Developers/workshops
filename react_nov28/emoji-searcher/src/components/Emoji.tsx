import React from "react";
import { emojiBankType } from "../types"

interface EmojiPropsType extends emojiBankType {
    myFunction: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Emoji(props: EmojiPropsType ) {
    return (
        <div onClick={props.myFunction} className="item">
            {props.name} {props.char}
        </div>
    )
}