module.exports = async (limit, offset, columnName, condition, field, client) => {
   const result = {
      totalCount: 0,
      data: [],
   }
   try {
      let res;
      // These queries can be dirty but I did not find any solution without installing addition package for putting columnName.
      if (columnName) {
         switch (condition) {
            case 'equal':
               res = await client.query(`SELECT *, count(*) OVER() AS totalCount FROM "tableName" WHERE ${columnName}=$1 order by "id" offset $2 limit $3;`,
                  [field, offset, limit]);
               result.totalCount = parseInt(res.rows[0]?.totalcount);
               result.data = res.rows;
               break
            case 'contains':
               res = await client.query(`SELECT *, count(*) OVER() AS totalCount FROM "tableName" WHERE ${columnName}::text LIKE $1 order by "id" offset $2 limit $3;`,
                  [field, offset, limit]);
               result.totalCount = parseInt(res.rows[0]?.totalcount);
               result.data = res.rows;
               break
            case 'moreThan':
               res = await client.query(`SELECT *, count(*) OVER() AS totalCount FROM "tableName" WHERE $1 < ${columnName} order by "id" offset $2 limit $3;`,
                  [field, offset, limit]);
               result.totalCount = parseInt(res.rows[0]?.totalcount);
               result.data = res.rows;
               break
            case 'lessThan':
               res = await client.query(`SELECT *, count(*) OVER() AS totalCount FROM "tableName" WHERE $1 > ${columnName} order by "id" offset $2 limit $3;`,
                  [field, offset, limit]);
               result.totalCount = parseInt(res.rows[0]?.totalcount);
               result.data = res.rows;
               break
            default:
               res = await client.query(`SELECT *, count(*) OVER() AS totalCount FROM "tableName" order by "id" offset $1 limit $2;`,
                  [offset, limit]);
               result.totalCount = parseInt(res.rows[0]?.totalcount);
               result.data = res.rows;
               break
         }

      } else {
         res = await client.query(`SELECT *, count(*) OVER() AS totalCount FROM "tableName" order by "id" offset $1 limit $2;`,
            [offset, limit]);
         result.totalCount = parseInt(res.rows[0]?.totalcount);
         result.data = res.rows;
      }
   } catch (err) {
      throw err;
   }

   return result;
}