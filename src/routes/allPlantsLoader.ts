import { plantApi } from "@/redux/features/plant.api";
import { store } from "@/redux/store";

export async function allPlantsLoader() {
  const subscription = store.dispatch(
    plantApi.endpoints.getAllPlants.initiate(undefined),
  );

  // Wait for the query to resolve using `subscription.then(...)`
  const result = await new Promise((resolve, reject) => {
    const unsubscribe = subscription.subscribe({
      next: (data) => {
        if (!data.isLoading) {
          resolve(data.data);
          unsubscribe();
        }
      },
      error: (err) => {
        reject(err);
        unsubscribe();
      },
    });
  });

  return result;
}
