import { plantApi } from "@/redux/features/plant.api";
import { store } from "@/redux/store";

const allPlantsLoader = async () => {
  await store.dispatch(
    plantApi.util.prefetch("getAllPlants", undefined, {
      force: false,
      ifOlderThan: 10,
    }),
  );
  return null;
};
export default allPlantsLoader;
