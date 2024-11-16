import React, { CSSProperties } from 'react'

interface Poll{
    id:number;
    totalCount:number;
    question: string;
    options: Option[];
}

interface Option{
    id:number;
    option:string;
    votes:number;
}

interface PollProps{
    pollId:number;
    title:string;
    options:Option[];
    isMultiple?:boolean;
    onVote:(pollId:number,selectedOptions:number[])=>Promise<Option[]>;
    onVoteRemove:(pollId:number,selectedOptions:number[])=>Promise<Option[]>;
    styles?:PollStyles;

}

interface PollStyles{
    Container?:CSSProperties;
    Title?:CSSProperties;
    optionsConatiner?:CSSProperties;
    optionLabel?:CSSProperties;
    optionInput?:CSSProperties;
    optionVotes?:CSSProperties;
    progressBar?:CSSProperties;
    progressBarFill?:CSSProperties;
    removeVoteButton?:CSSProperties;

}



const Pollwidget = (props: PollProps) => {
  return (
    <div>

    </div>
  )
}

export default Pollwidget