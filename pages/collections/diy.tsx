/** @jsx jsx */
import { jsx } from "@emotion/core";
import Fuse from "fuse.js";
import CollectionHeaderBar from "../../components/compositions/CollectionHeaderBar";
import RecipeItem from "../../components/primitives/RecipeItem";
import useLocalstorage, {
  LocalStorageKeys
} from "../../components/hooks/useLocalstorage";
import { styles as generalStyles } from "../../util/theme";

const recipeData = require("../../data/recipes.json");

const fuse = new Fuse<any[], {}>(recipeData, {
  isCaseSensitive: false,
  findAllMatches: false,
  includeMatches: false,
  includeScore: false,
  useExtendedSearch: false,
  minMatchCharLength: 1,
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  keys: ["name"]
});

export default function Collections() {
  const [search, setSearch] = useLocalstorage<string>(
    LocalStorageKeys.BUGS_SEARCH,
    ""
  );
  const filtered = search
    ? fuse.search(search).map<any>(d => d.item)
    : recipeData;
  return (
    <>
      <CollectionHeaderBar />
      <div
        css={{
          margin: "0px auto",
          textAlign: "center",
          padding: 10,
          maxWidth: 1000
        }}
      >
        <input
          css={generalStyles.input}
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {filtered.map(recipe => (
          <RecipeItem key={recipe.name} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
