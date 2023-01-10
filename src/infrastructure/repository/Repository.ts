import database from "infrastructure/db/db.config"
import { Knex } from "knex";

interface DataObject {
    [key: string]: any;
}

interface QueryObject {
    [key: string]: any;
}

interface Filter {
    limit: number;
    page: number;
    sort: string;
    search: string;
    searchFields: string[] | string;
    query: QueryObject
}




export default abstract class Repository {
    protected tableName;

    constructor(tableName: string) {
      this.tableName = tableName
    }

    static getModel(tableName: string) {
        return database(tableName);
    }
  
    async insert(params: DataObject) {
      return await database(this.tableName).insert(params);
    };
  
    // buildQuery(filter: Partial<Filter>, isCounting) {
	// 	if (!filter) {
	// 		if (isCounting)
	// 			return database.count();

	// 		return database.();
	// 	}

	// 	const q = {
	// 		where: {}
	// 	};

	// 	// Text search
	// 	if (_.isString(filter.search) && filter.search !== "") {
	// 		let fields = [];
	// 		if (filter.searchFields) {
	// 			fields = _.isString(filter.searchFields) ? filter.searchFields.split(" ") : filter.searchFields;
	// 		}

	// 		const searchConditions = fields.map(f => {
	// 			return {
	// 				[f]: {
	// 					[Op.like]: "%" + filter.search + "%"
	// 				}
	// 			};
	// 		});

	// 		if (filter.query) {
	// 			q.where[Op.and] = [
	// 				filter.query,
	// 				{ [Op.or]: searchConditions }
	// 			];
	// 		} else {
	// 			q.where[Op.or] = searchConditions;
	// 		}
	// 	} else if (filter.query) {
	// 		Object.assign(q.where, filter.query);
	// 	}

	// 	// Sort
	// 	if (filter.sort) {
	// 		let sort = this.transformSort(filter.sort);
	// 		if (sort)
	// 			q.order = sort;
	// 	}

	// 	// Offset
	// 	if (_.isNumber(filter.offset) && filter.offset > 0)
	// 		q.offset = filter.offset;

	// 	// Limit
	// 	if (_.isNumber(filter.limit) && filter.limit > 0)
	// 		q.limit = filter.limit;

	// 	if (isCounting)
	// 		return this.model.count(q);

	// 	return this.model.f(q);
	// }

    /**
     * 
     * @param query 
     * @param field 
     * @returns 
     */
    async findOne ( query: QueryObject, field: string | string[]) {
      return await database(this.tableName)
        .where(query)
        .select(field)
        .first();
    };

    /**
     * * Available filter props:
	 * 	- limit
	 *  - offset
	 *  - sort
	 *  - search
	 *  - searchFields
	 *  - query
     * @param filter
     * @param field 
     * @returns 
     */
    async find (filter?: Partial<Filter>, field?: string | string[]) {
      return await database(this.tableName).where(filter ?? {}).select(field ?? "*");
    };

    async update(params: DataObject) {
        return await database(this.tableName).update(params);
      };


  }