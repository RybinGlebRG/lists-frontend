import GamesList from "./list"
import GamesAdd from "./add"
import * as forms from "./forms"
import { useSelector } from 'react-redux'
import { RootState } from "../../dao/redux/store"

export default function Games(){
    let store={
        gamesForm: useSelector((state: RootState)=>state.gamesReducer.form)
    }


    let display;

    if (store.gamesForm === forms.LIST){
        display=(
            <GamesList/>
        )
    } else if (store.gamesForm === forms.ADD){
        display=(
            <GamesAdd/>
        )
    }

    return(
        <div className="row justify-content-center">
            <div className="col col-md-10 pr-5">
                {display}
            </div>
        </div>
    )
}