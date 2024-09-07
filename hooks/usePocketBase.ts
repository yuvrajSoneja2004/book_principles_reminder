import { pb } from "@/db/pb";

export const usePocketBase = async <T>(
  collectionName: string,
  setData: React.Dispatch<React.SetStateAction<T[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedData?: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >,
  errorHandler?: (error: any) => void
) => {
  setLoading(true);

  try {
    const res = await pb.collection(collectionName).getList();

    // Set the fetched data
    setData(res.items);

    // Optionally set selected data
    if (setSelectedData) {
      const initialSelected = res.items.reduce(
        (acc: Record<string, boolean>, item: any) => {
          acc[item.id] = false;
          return acc;
        },
        {}
      );
      setSelectedData(initialSelected);
    }
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    if (errorHandler) {
      errorHandler(error);
    }
  } finally {
    setLoading(false);
  }
};
