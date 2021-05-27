import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../State";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
