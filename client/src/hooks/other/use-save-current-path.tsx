import { useNavigationStore } from "@stores/navigation.store";
import { Href, usePathname } from "expo-router";

export default function useSaveCurrentPath() {
  const pathname = usePathname();
  const { setReturnRoute } = useNavigationStore();

  const savePath = () => {
    console.log(pathname,"save-path");
    
    setReturnRoute(pathname as Href);
  };

  return { savePath };
}
