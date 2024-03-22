import Text from "./Text";
import RepositoryListContainer from "./RepositoryListContainer";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { SearchBar } from "@rneui/themed";
import { useDebounce } from "use-debounce";
import { useRepositories } from "../hooks/useRepositories";

const RepositoryList = () => {
  const [sort, setSort] = useState("CREATED_AT");
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [searchKeyword] = useDebounce(search, 500);

  const { repositories, fetchMore, error, loading, refetch } = useRepositories({
    first: 3,
    // ...
  });

  const handleSort = () => {
    switch (true) {
      case sort === "CREATED_AT":
        setOrderBy("CREATED_AT");
        setOrderDirection("DESC");
        refetch();
        break;
      case sort === "DESC":
        setOrderBy("RATING_AVERAGE");
        setOrderDirection("DESC");
        refetch();
        break;
      case sort === "ASC":
        setOrderBy("RATING_AVERAGE");
        setOrderDirection("ASC");
        refetch();
        break;
    }
  };

  if (loading) {
    return (
      <Text style={{ alignSelf: "center", paddingVertical: 100 }}>
        Loading...
      </Text>
    );
  }
  const updateSearch = (search) => {
    setSearch(search);
  };
  const onEndReach = () => {
    console.log("You have reached the end of the list");
  };
  return (
    <>
      <SearchBar
        placeholder="Search..."
        onChangeText={updateSearch}
        value={search}
      />
      <Picker
        selectedValue={sort}
        onValueChange={(itemValue, itemIndex) => {
          setSort(itemValue), handleSort();
        }}
      >
        <Picker.Item label="Lateset Repositories" value="CREATED_AT" />
        <Picker.Item label="Highest Rated Repositories" value="DESC" />
        <Picker.Item label="Lowest Rated Repositories" value="ASC" />
      </Picker>
      <RepositoryListContainer
        onEndReach={onEndReach}
        repositories={repositories}
      />
    </>
  );
};

export default RepositoryList;
