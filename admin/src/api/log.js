import request from "../axios";
const entity = "logs"; // 需手动修改

export function getLogs(
  params = { page: 1, limit: 10, sortBy: "name", order: "ASC", search: "" }
) {
  return request({
    url: `/${entity}`,
    method: "get",
    params, // Pass pagination, sorting, and search parameters
  });
}
