import { useSelector} from 'react-redux'
import * as forms from './forms'
import BacklogList from './list/BacklogList';

export default function Backlog(): JSX.Element {

    const store={
        form: useSelector((state: any) => state.backlogReducer.form),
    }

    let result: JSX.Element | null = null;
    if (store.form === forms.LIST){
        result = (<BacklogList/>)
    } else {
        result = (
            <div>Form not selected</div>
        )
    }

    return(
        <div className="row justify-content-center">
            <div className="col col-md-10 pr-5">
                {result}
            </div>
        </div>
    );

}
