export class MenuData {
  constructor(
    public menuItemId: number,
    public menuName: String,
    public menuMenus: String,
    public startDate: Date,
    public endDate: Date,
    public startTime: String,
    public endTime: String,
    public frequency: String,
    public createdBy: String,
    public createdOn: Date
  ) {}
}
