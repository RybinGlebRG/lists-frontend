import { BookStatus } from "../bookstatus/BookStatus";
import BookType from "../bookType/BookType";
import Book from "./Book";
import * as readingRecordFactory from '../readingrecord/readingRecordFactory'
import Series from "../series/Series";
import Tag from "../tag/Tag";
import * as dateUtils from '../../utils/dateUtils';

export function fromResponseBook(dto: ResponseBook) {

    return new Book(
        dto.bookId,
        dto.title,
        new BookStatus(
            dto.bookStatus.statusId,
            dto.bookStatus.statusName
        ),
        dateUtils.fromStrinUtcToDate(dto.insertDate),
        dateUtils.fromStrinUtcToDate(dto.lastUpdateDate),
        dto.lastChapter,
        dto.note,
        dto.bookType != null ? new BookType(
                dto.bookType.typeId,
                dto.bookType.typeName
            ) : null,
        dto.itemType,
        dto.chain.length > 0 ? dto.chain.map(item => fromResponseBook(item)) : [],
        dto.readingRecords.length > 0 ? dto.readingRecords.map(item => readingRecordFactory.fromReadingRecordResponse(item)) : [],
        dto.tags.map(item => new Tag(item.tagId, item.name)),
        dto.textAuthors,
        dto.seriesList.map(item => new Series(item.seriesId, item.title)),
        dto.url,
    );

}
