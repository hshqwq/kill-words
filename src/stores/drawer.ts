import { atom } from "recoil";

export const ADrawer = atom<boolean>({
    key: 'drawer',
    default: false
})