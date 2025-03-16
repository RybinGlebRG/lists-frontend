import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid';


export default function ItemRow(props){
    const uuid = uuidv4();    
    const [isExpand,setExpand] = useState(false);

    // ------------------------------------
    const propsTitle = props.title;
    const propsStatusIcon = props.statusIcon;
    const propsData = props.data;
    const propsButtons = props.buttons;
    const propsChainData = props.chainData; 
    const propsNote = props.note;
    const propsTags = props.tags;
    // ------------------------------------

    let chain; 
    if (props.chainData !== undefined && props.chainData.length > 0){
        chain = propsChainData.map(item=>{
            return(
                <li class="list-group-item">
                    <ItemRow
                        data={item.data}
                        buttons={item.buttons}
                    />
                </li>
            )
        })

        let expand;
        if (isExpand){
            expand = (
                <div class="row">
                    <div class="col d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
                            <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                        </svg>
                    </div>
                </div>
                
            )
        } else {
            expand = (
                <div class="row">
                    <div class="col d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                </div>
            )
        }


        chain = (
            <div class="row ps-4 pe-4">
                <div class="col border-top">
                    <div class="row mb-3 mt-3">
                        <div class="col-md-auto">
                            <button 
                                class="btn btn-light border border-secondary" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target={"#collapseExample"+uuid} 
                                aria-expanded="false" 
                                aria-controls={"collapseExample"+uuid}
                                onClick={()=>{
                                    if (isExpand){
                                        setExpand(false)
                                    } else {
                                        setExpand(true)
                                    }
                                }}
                            >
                                {expand}
                            </button>
                        </div>
                    </div>
                    <div class="collapse" id={"collapseExample"+uuid}>
                        <div class="row">
                            <div class="col">
                                <ul class="list-group ms-4">
                                {chain}
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    const buttons = propsButtons.map(item => {
        return (
            <li class="list-group-item list-group-item-action border-0 p-0">                       
                <button
                    type="button"
                    class="btn btn-link w-100 h-100 rounded-0 p-0"
                    onClick={item.onClick}
                >
                    <div class="row w-100 h-100 m-0">
                        <div class="col-md-auto p-0 border-start h-75 align-self-center"/>
                        <div class="col d-flex justify-content-center align-items-center p-0">
                            {item.SVG}
                        </div>
                    </div>                                    
                </button>
            </li>
        )
    })

    let note;

    if (props.note !== undefined){
        note = (
            <div class="col">       
                <div class="row justify-content-between p-3 w-100 h-100">
                    <div class="col border-start">
                        <p><u>Note</u></p>
                        <p>{propsNote}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div class="row">
            <div class="col">
                <div class="row" >
                    <div class="col">
                        <div class="row justify-content-between p-3">
                            <div class="col-auto">
                                {propsStatusIcon}
                            </div>
                            <div class="col ps-0 pt-1">
                                <h6 class="font-weight-bold">{propsTitle}</h6>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                {propsTags}    
                            </div>    
                        </div>
                        <div class="row">
                            <div class="col">                    
                                <div  class="row justify-content-between p-3">
                                    {propsData}
                                </div>
                            </div>
                            {note}
                            
                        </div>
                        
                    </div>
                    <div class="col-6 d-flex justify-content-center align-items-center">
                        <ul class="list-group list-group-horizontal list-group-flush w-100 h-100 offset-md-10">
                            {buttons}
                        </ul>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        {chain}
                    </div>
                </div>
            </div>
        </div>
    )
}