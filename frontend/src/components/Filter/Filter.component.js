import { useHistory, useLocation } from "react-router-dom";
import { Select, Option } from "./Filter.styled";

export const Filter = () => {
    const location = useLocation();
    const history = useHistory();
    return(
        <Select
            value={
              new URLSearchParams(location.search).get("sorting") || "date:desc"
            }
            onChange={(e) => {
              const tagsParam = new URLSearchParams(location.search).get(
                "tags"
              );
              let newParams;
              if (tagsParam) {
                newParams = new URLSearchParams({
                  tags: tagsParam,
                  sorting: e.target.value,
                });
              } else {
                newParams = new URLSearchParams({
                  sorting: e.target.value,
                });
              }
              history.push({
                pathname: "/",
                search: "?" + newParams,
              });
            }}
            style={{ backgroundColor: "black" }}
          >
            <Option value="date:asc">Date ascending</Option>
            <Option value="date:desc">Date descending</Option>
            <Option value="rating:asc">Rating ascending</Option>
            <Option value="rating:desc">Rating descending</Option>
            <Option value="views:asc">Views ascending</Option>
            <Option value="views:desc">Views descending</Option>
            <Option value="commentCount:asc">Comments ascending</Option>
            <Option value="commentCount:desc">Comments descending</Option>
          </Select>
    )
}