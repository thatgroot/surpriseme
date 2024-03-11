import { create } from "zustand";

type Contact = {
  name: string;
  phone: number | string;
};

type DOB = {
  date: number;
  month: number;
  year: number;
};

type Channel = "whatsapp" | "sms" | "";

type State = {
  dob: DOB;
  bio: Contact;
  bestie: Contact;
  message: any;
  channel: Channel;
};

type SetDobAction = (newDob: DOB) => void;
type SetBioAction = (newBio: Contact) => void;
type SetBestieAction = (newBestie: Contact) => void;
type SetMessageAction = (newMessage: string) => void;
type SetChannelAction = (newChannel: Channel) => void;

type Actions = {
  setDob: SetDobAction;
  setBio: SetBioAction;
  setBestie: SetBestieAction;
  setMessage: SetMessageAction;
  setChannel: SetChannelAction;
};

const useDataStore = create<State & Actions>((set) => ({
  dob: { date: 1, month: 1, year: 2000 }, // Initial values for dob
  bio: { name: "", phone: "" }, // Initial values for bio
  bestie: { name: "", phone: "" }, // Initial values for bestie
  message: "",
  channel: "whatsapp",
  setDob: (dob: DOB) => set({ dob }),
  setBio: (bio: Contact) => set({ bio }),
  setBestie: (bestie: Contact) => set({ bestie }),
  setMessage: (message: any) => set({ message }),
  setChannel: (channel: Channel) => set({ channel }),
}));

export default useDataStore;
