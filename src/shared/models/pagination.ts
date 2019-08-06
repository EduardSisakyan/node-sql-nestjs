export class Pagination<PaginationObject> {
  constructor(
    public items: PaginationObject[],
    public itemCount: number,
    public totalItems: number,
    public pageCount: number,
  ) {}
}
