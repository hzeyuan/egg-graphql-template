import { Field, Int, ObjectType, InputType, registerEnumType } from 'type-graphql';

export enum SortByEnum {
  CREATEDAT_ASC = "CREATEDAT_ASC",
  CREATEDAT_DESC = "CREATEDAT_DESC",
  UPDATEDAT_ASC = "UPDATEDAT_ASC",
  UPDATEDAT_DESC = "UPDATEDAT_DESC"
}

registerEnumType(SortByEnum, {
  name: 'SortByEnum',
}) 