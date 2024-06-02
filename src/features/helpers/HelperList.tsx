import { useGetAllHelperQuery } from "./helperApiSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { Alert, Box } from "@mui/material";
import { Close } from "@mui/icons-material";
import Helper from "./Helper";

function HelperList() {
  const { data, isError, error, isLoading, isSuccess } = useGetAllHelperQuery(
    "helperList",
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      pollingInterval: 60000,
    }
  );

  let content;

  if (isLoading) {
    content = <LoadingScreen />;
  } else if (isError) {
    console.log(error);
    content = (
      <Alert icon={<Close fontSize="inherit" />} severity="error">
        {JSON.stringify(error, null, 2)}
      </Alert>
    );
  } else if (isSuccess) {
    const { ids, entities } = data;
    content = (
      <Box gap={"1rem"}>
        {ids.map((id) => {
          const helper = entities[id];
          return <Helper key={id} {...helper} />;
        })}
      </Box>
    );
  }

  return content;
}

export default HelperList;
