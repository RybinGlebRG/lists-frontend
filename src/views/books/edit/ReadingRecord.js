export default function ReadingRecord({record, handleChange}){
    return(
        <div class="row">
			<div class="col">
                <input 
                    class="form-control" 
                    type="datetime-local" 
                    name="readingRecordStart"
                    value={record.startDate}
                    onChange={handleChange}
                />
			</div>
            <div class="col">
                <input 
                    class="form-control" 
                    type="datetime-local" 
                    name="readingRecordEnd"
                    value={record.endDate}
                    onChange={handleChange}
                />
			</div>
		</div>
    );
}