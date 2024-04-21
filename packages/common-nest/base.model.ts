export abstract class BaseModel {
  constructor(partial: Partial<BaseModel>) {
    Object.assign(this, partial);
  }
}
