import { BookStatus } from "../bookstatus/BookStatus";
import ReadingRecord from "./ReadingRecord";
import * as dt from '../../utils/dateUtils';

export function fromReadingRecordResponse(dto: ReadingRecordResponse) {
    return new ReadingRecord(
        dto.recordId,
        dto.bookId,
        new BookStatus(
            dto.bookStatus.statusId,
            dto.bookStatus.statusName
        ),
        dt.fromString(dto.startDate),
        dto.endDate != null ? dt.fromString(dto.endDate) : null,
        dto.lastChapter
    );
}