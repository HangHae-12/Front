import { atom } from "recoil";

export const kindergartenAtom = atom({
    key: "kindergartenInfor",
    default: {
        address: "",
        id: "",
        logoImageUrl: "",
        name: "",
    },
});

export const useProfileAtom = atom({
    key: "userProfile",
    default: {
        birthday: "",
        email: "",
        name: "",
        phoneNumber: "",
        profileImageUrl: "",
        resolution: "",
        role: "",
    },
});