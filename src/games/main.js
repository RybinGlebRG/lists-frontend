import GamesList from "./list"
import GamesAdd from "./add"
import * as forms from "./forms"
import { useSelector } from 'react-redux'

export default function Games(){
    let store={
        gamesForm: useSelector(state=>state.gamesReducer.form)
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
        <div class="row justify-content-center">
            <div class="col col-md-10 pr-5">
                {display}
            </div>
        </div>
    )
}