import GamesList from "./list"
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
    }

    return(
        <div>{display}</div>
    )
}