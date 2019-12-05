export class Doc {
  constructor(
    public title: string,
    public source: string,
    public date: string,
    public docId: string,
    public preview: string,
    public tags: string[],
    public comment: string
  ) {}
}
