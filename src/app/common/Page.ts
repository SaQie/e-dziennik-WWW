export interface Page<T>{
    pagesCount: number;
    actualPage: number;
    itemsOnPage: number;
    itemsTotalCount: number;
    content: T;
}