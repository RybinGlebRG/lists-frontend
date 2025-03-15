
export default function TagsList(props){

    const tags = props.tags;

    let result = tags.map(tag => (
        <div class="col-md-auto pe-0">
            <span class="badge text-bg-secondary">{tag.name}</span>
        </div>
    ))

    return (
        <div class="row justify-content left">
                {result}
		</div>
    )
}
