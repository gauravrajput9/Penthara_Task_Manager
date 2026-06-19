
import { useSearchParams } from "react-router-dom";

const TasksList = () => {
  const [params] = useSearchParams();
  const status = params.get("status") || "all";
  console.log(status)

  return <div>TasksList</div>;
};

export default TasksList;
