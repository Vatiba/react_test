export type DataType = {
   id: number,
   date: string,
   name: string,
   quantity: number,
   distance: number,
}[]

export type DataServerType = {
   totalCount: number,
   data: DataType
}