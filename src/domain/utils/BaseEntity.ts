/* eslint-disable no-underscore-dangle */
import { Builder, IBuilder } from "builder-pattern";
import { UniqueEntityID } from './Types';

const isEntity = (v: any): v is BaseEntity<any> => v instanceof BaseEntity;
 

export default abstract class BaseEntity<T> {
  protected readonly id: UniqueEntityID;
  protected readonly tag: string;
  protected props: T;

  public constructor(props: T, id: UniqueEntityID) {
    this.id = id;
    this.props = props;
    this.tag = `dcb-entity-${id}`
  }
  public static getBuilder<T>(): IBuilder<T> {
    return Builder<T>();
  }

  public getProps() {
    return this.props;
  }


  
  public equals(object?: BaseEntity<T>): boolean {
    if (object == null || !isEntity(object)) {
      return false;
    }
    if (this === object) {
      return true;
    }
    return this.id===object.id;
  }
}
