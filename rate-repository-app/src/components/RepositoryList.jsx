import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import Text from "./Text";
import RepositoryListContainer from "./RepositoryListContainer";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const RepositoryList = () => {
  const [sort, setSort] = useState("CREATED_AT");
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { orderBy, orderDirection },
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

  return (
    <>
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
      <RepositoryListContainer repositories={data.repositories} />
    </>
  );
};

export default RepositoryList;
